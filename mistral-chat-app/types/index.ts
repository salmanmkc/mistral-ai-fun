export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: number;
}

export type SidePanel = 
  | 'chat'
  | 'code-generation'
  | 'embeddings'
  | 'function-calling'
  | 'json-mode'
  | 'model-comparison';

export interface EmbeddingResult {
  text: string;
  embedding: number[];
  similarity?: number;
}

export interface FunctionCall {
  name: string;
  arguments: Record<string, unknown>;
  result?: unknown;
}
