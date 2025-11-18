"use client";

import { useState } from "react";
import { MessageSquare, Code, Layers, Wrench, Sparkles } from "lucide-react";
import ChatInterface from "./components/ChatInterface";
import CodeGeneration from "./components/CodeGeneration";
import Embeddings from "./components/Embeddings";
import FunctionCalling from "./components/FunctionCalling";

type Tab = "chat" | "code" | "embeddings" | "functions";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");

  const tabs = [
    { id: "chat" as Tab, label: "Chat", icon: MessageSquare, color: "blue" },
    { id: "code" as Tab, label: "Code Gen", icon: Code, color: "blue" },
    { id: "embeddings" as Tab, label: "Embeddings", icon: Layers, color: "purple" },
    { id: "functions" as Tab, label: "Functions", icon: Wrench, color: "green" },
  ];

  return (
    <div className="flex h-screen bg-white dark:bg-black">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Salman's Mistral
            </h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Playground
            </p>
          </div>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Features
          </h3>
          <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
            <li>• Streaming responses</li>
            <li>• Multiple models</li>
            <li>• Code generation</li>
            <li>• Vector embeddings</li>
            <li>• Function calling</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "chat" && <ChatInterface />}
        {activeTab === "code" && <CodeGeneration />}
        {activeTab === "embeddings" && <Embeddings />}
        {activeTab === "functions" && <FunctionCalling />}
      </div>
    </div>
  );
}

