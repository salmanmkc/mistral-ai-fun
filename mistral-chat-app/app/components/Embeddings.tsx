"use client";

import { useState } from "react";
import { Layers, Loader2 } from "lucide-react";

export default function Embeddings() {
  const [text, setText] = useState("");
  const [embedding, setEmbedding] = useState<number[] | null>(null);
  const [dimension, setDimension] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const generateEmbedding = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setEmbedding(null);

    try {
      const response = await fetch("/api/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to generate embedding");

      const data = await response.json();
      setEmbedding(data.embedding);
      setDimension(data.dimension);
    } catch (error) {
      console.error("Error generating embedding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Text Embeddings
        </h2>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Convert text into vector embeddings for semantic search and similarity
        comparisons.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Input Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to generate embeddings..."
            className="w-full h-32 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          onClick={generateEmbedding}
          disabled={isLoading || !text.trim()}
          className="w-full px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Embeddings...
            </>
          ) : (
            <>
              <Layers className="w-5 h-5" />
              Generate Embeddings
            </>
          )}
        </button>
      </div>

      {embedding && (
        <div className="flex-1 mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Embedding Vector
            </h3>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Dimension: {dimension}
            </span>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
            <code className="text-xs text-zinc-900 dark:text-zinc-100">
              [{embedding.slice(0, 10).map((v) => v.toFixed(4)).join(", ")}
              , ... {embedding.length - 10} more values]
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
