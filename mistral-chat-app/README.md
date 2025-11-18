# Mistral AI Showcase App

A comprehensive Next.js application showcasing various Mistral AI capabilities including chat, code generation, embeddings, and function calling.

## Features

- 🤖 **Interactive Chat** - Real-time streaming chat with multiple Mistral AI models
- 💻 **Code Generation** - Generate code in multiple programming languages using Codestral
- 🔢 **Embeddings** - Convert text into vector embeddings for semantic search
- 🔧 **Function Calling** - Demonstrate AI-powered function calling with tools
- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode support
- ⚡ **Fast & Efficient** - Built with Next.js 16 and React 19

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Mistral AI API key ([Get one here](https://console.mistral.ai/))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/salmanmkc/mistral-ai-fun.git
cd mistral-ai-fun/mistral-chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
MISTRAL_API_KEY=your_mistral_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Models

- **Mistral Tiny** - Fast and efficient for simple tasks
- **Mistral Small** - Balanced performance
- **Mistral Medium** - More capable for complex tasks
- **Mistral Large** - Most powerful model
- **Codestral** - Specialized for code generation

## Features Overview

### Chat Interface
Real-time streaming responses with model selection and conversation history.

### Code Generation
Support for Python, JavaScript, TypeScript, Java, C++, Rust, and Go.

### Embeddings
Generate vector embeddings from text for semantic search applications.

### Function Calling
Demonstrate AI tool usage with weather lookup and calculator functions.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI SDK**: Mistral AI Official SDK
- **Icons**: Lucide React

## Deployment

Deploy to Vercel, Netlify, or any platform supporting Next.js with API routes.

Add your `MISTRAL_API_KEY` environment variable in your deployment platform.

## License

MIT

