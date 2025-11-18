"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Mic, MicOff, Paperclip, X, FileText, Image as ImageIcon } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  files?: Array<{ name: string; type: string; content?: string }>;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("mistral-tiny");
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<Array<{ name: string; type: string; content?: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let interim = '';
          let final = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript + ' ';
            } else {
              interim += transcript;
            }
          }

          // Update interim transcript for live display
          setInterimTranscript(interim);

          // Add final transcript to input
          if (final) {
            setInput((prev) => prev + final);
            setInterimTranscript(''); // Clear interim after finalizing
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
          if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please allow microphone access in your browser settings.');
          } else if (event.error === 'no-speech') {
            console.log('No speech detected, continuing...');
          }
        };

        recognition.onend = () => {
          console.log('Speech recognition ended');
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('Speech recognition not supported');
      }
    }

    return () => {
      // Cleanup on unmount
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Validate file size (max 5MB for images)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setAttachedFiles((prev) => [
            ...prev,
            { name: file.name, type: file.type, content },
          ]);
        }
      };

      reader.onerror = () => {
        alert(`Error reading file: ${file.name}`);
      };

      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });

    // Clear the input so same file can be selected again
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isRecording) {
      // Stop recording
      recognitionRef.current.stop();
      setIsRecording(false);
      setInterimTranscript(''); // Clear interim when stopping
    } else {
      // Start recording
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        alert('Could not start speech recognition. Please try again.');
      }
    }
  };

  const sendMessage = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      files: attachedFiles.length > 0 ? attachedFiles : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: selectedModel,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      if (reader) {
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantMessage += chunk;

          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = assistantMessage;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-black">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Mistral AI Chat
          </h2>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            <option value="mistral-tiny">Mistral Tiny</option>
            <option value="mistral-small-latest">Mistral Small</option>
            <option value="mistral-medium-latest">Mistral Medium</option>
            <option value="mistral-large-latest">Mistral Large</option>
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Welcome to Mistral AI Chat
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Start a conversation with Mistral AI
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                }`}
              >
                {message.files && message.files.length > 0 && (
                  <div className="mb-2 space-y-1">
                    {message.files.map((file, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm opacity-90">
                        {file.type.startsWith("image/") ? (
                          <ImageIcon className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4">
        <div className="max-w-4xl mx-auto">
          {/* Live Transcription */}
          {isRecording && interimTranscript && (
            <div className="mb-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Listening...</span>
                </div>
              </div>
              <p className="text-sm text-blue-900 dark:text-blue-100 italic">{interimTranscript}</p>
            </div>
          )}

          {/* Attached Files */}
          {attachedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm"
                >
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                  )}
                  <span className="text-zinc-900 dark:text-zinc-100">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            {/* File Upload Button */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,text/*,.pdf,.doc,.docx"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="px-3 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors"
              title="Attach files"
            >
              <Paperclip className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </button>

            {/* Microphone Button */}
            <button
              onClick={toggleRecording}
              disabled={isLoading}
              className={`px-3 py-3 rounded-xl border transition-colors ${
                isRecording
                  ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
                  : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700"
              } disabled:opacity-50`}
              title={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              )}
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || (!input.trim() && attachedFiles.length === 0)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-medium transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
