"use client";

import { useState } from "react";
import { Wrench, Loader2 } from "lucide-react";

export default function FunctionCalling() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const callFunction = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/function-calling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed to call function");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error calling function:", error);
      setResult({ error: "Failed to process request" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Wrench className="w-6 h-6 text-green-600 dark:text-green-400" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Function Calling
        </h2>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Test Mistral AI's function calling capabilities. Try asking about the
        weather or performing calculations.
      </p>

      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
        <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-1">
          Available Functions:
        </p>
        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
          <li>• get_weather(location, unit) - Get weather information</li>
          <li>• calculate(expression) - Perform mathematical calculations</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Your Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="E.g., What's the weather in San Francisco? or Calculate 15 * 42"
            className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button
          onClick={callFunction}
          disabled={isLoading || !message.trim()}
          className="w-full px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Wrench className="w-5 h-5" />
              Execute
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="flex-1 mt-4 space-y-3">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Result
          </h3>

          {result.message && (
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Response:
              </p>
              <p className="text-zinc-900 dark:text-zinc-100">
                {result.message}
              </p>
            </div>
          )}

          {result.toolCalls && result.toolCalls.length > 0 && (
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                Functions Called:
              </p>
              {result.toolCalls.map((call: any, idx: number) => (
                <div key={idx} className="mb-2 last:mb-0">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>{call.name}</strong>
                  </p>
                  <code className="text-xs text-green-600 dark:text-green-400">
                    {JSON.stringify(call.arguments, null, 2)}
                  </code>
                </div>
              ))}
            </div>
          )}

          {result.functionResults && result.functionResults.length > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
              <p className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                Function Results:
              </p>
              {result.functionResults.map((res: any, idx: number) => (
                <div key={idx} className="mb-2 last:mb-0">
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    <strong>{res.name}:</strong> {res.result}
                  </p>
                </div>
              ))}
            </div>
          )}

          {result.error && (
            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">
                {result.error}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
