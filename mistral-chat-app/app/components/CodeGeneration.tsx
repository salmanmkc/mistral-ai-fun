"use client";

import { useState } from "react";
import { Code, Loader2 } from "lucide-react";

export default function CodeGeneration() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("python");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateCode = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setGeneratedCode("");

    try {
      const response = await fetch("/api/code-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, language }),
      });

      if (!response.ok) throw new Error("Failed to generate code");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let code = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          code += chunk;
          setGeneratedCode(code);
        }
      }
    } catch (error) {
      console.error("Error generating code:", error);
      setGeneratedCode("Error generating code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Code Generation
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Programming Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="rust">Rust</option>
            <option value="go">Go</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Describe what you want to build
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Create a function to calculate fibonacci numbers"
            className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          onClick={generateCode}
          disabled={isLoading || !prompt.trim()}
          className="w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Code className="w-5 h-5" />
              Generate Code
            </>
          )}
        </button>
      </div>

      {generatedCode && (
        <div className="flex-1 mt-4">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Generated Code
          </h3>
          <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto h-full">
            <code>{generatedCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
