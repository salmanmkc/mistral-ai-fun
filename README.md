# 🚀 Mistral AI Fun

A comprehensive showcase application demonstrating the power of Mistral AI's capabilities using Next.js, TypeScript, and modern web technologies.

## ✨ Features

This application includes multiple interactive demos:

### 🤖 **Chat Interface**
- Real-time streaming conversations with Mistral AI
- Support for multiple models (Tiny, Small, Medium, Large)
- Beautiful, responsive chat UI with dark mode
- Conversation history management

### 💻 **Code Generation**
- Generate code in 7+ programming languages
- Powered by Codestral model
- Real-time streaming code output
- Syntax-highlighted code display

### 🔢 **Text Embeddings**
- Convert text into vector embeddings
- Using Mistral's embedding model
- View embedding dimensions and vectors
- Perfect for semantic search applications

### 🔧 **Function Calling**
- Demonstrate AI-powered tool usage
- Pre-configured functions (weather, calculator)
- Interactive function execution
- Real-time results display

## 🎯 Quick Start

### Prerequisites
- Node.js 18 or higher
- A Mistral AI API key ([Get one free](https://console.mistral.ai/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/salmanmkc/mistral-ai-fun.git
cd mistral-ai-fun
```

2. **Run the setup script** (macOS/Linux)
```bash
./setup.sh
```

Or **manually install**:
```bash
cd mistral-chat-app
npm install
```

3. **Configure your API key**
   
Create a `.env.local` file in the `mistral-chat-app` directory:
```bash
MISTRAL_API_KEY=your_mistral_api_key_here
```

4. **Start the development server**
```bash
cd mistral-chat-app
npm run dev
```

5. **Open your browser**
   
Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI SDK**: Mistral AI Official SDK (@mistralai/mistralai)
- **Icons**: Lucide React
- **UI Components**: Custom components with Tailwind

## 📦 Project Structure

```
mistral-ai-fun/
├── mistral-chat-app/          # Main Next.js application
│   ├── app/
│   │   ├── api/               # API routes for Mistral AI
│   │   │   ├── chat/          # Streaming chat endpoint
│   │   │   ├── code-generation/
│   │   │   ├── embeddings/
│   │   │   └── function-calling/
│   │   ├── components/        # React components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── CodeGeneration.tsx
│   │   │   ├── Embeddings.tsx
│   │   │   └── FunctionCalling.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── public/
│   └── package.json
├── setup.sh                   # Automated setup script
└── README.md
```

## 🚀 Deployment

This application requires a server runtime for API routes. **GitHub Pages static hosting is not supported.**

### Quick Deploy with Vercel CLI

The fastest way to deploy:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd mistral-chat-app
vercel --prod

# Add your Mistral API key
vercel env add MISTRAL_API_KEY
# Paste your key and select "Production"

# Redeploy with environment variable
vercel --prod
```

### Other Deployment Options

#### **Vercel Dashboard**
1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `MISTRAL_API_KEY` environment variable in settings
4. Deploy!

#### **Netlify**
1. Connect GitHub repository
2. Build command: `cd mistral-chat-app && npm run build`
3. Publish directory: `mistral-chat-app/.next`
4. Add `MISTRAL_API_KEY` environment variable
5. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions and other platform options.

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MISTRAL_API_KEY` | Your Mistral AI API key | Yes |

## 📚 Available Models

| Model | Best For | Speed |
|-------|----------|-------|
| Mistral Tiny | Simple tasks, quick responses | ⚡⚡⚡ |
| Mistral Small | Balanced performance | ⚡⚡ |
| Mistral Medium | Complex reasoning | ⚡ |
| Mistral Large | Most capable, detailed tasks | ⚡ |
| Codestral | Code generation | ⚡⚡ |

## 🎨 Features in Detail

### Chat Interface
- Streaming responses for real-time interaction
- Model selection dropdown
- Clean message bubbles
- Auto-scrolling conversation
- Dark mode support

### Code Generation
- Multi-language support (Python, JS, TS, Java, C++, Rust, Go)
- Streaming code output
- Code block formatting
- Language-specific prompts

### Embeddings
- Text-to-vector conversion
- Display embedding dimensions
- Preview vector values
- Use for semantic search

### Function Calling
- Weather lookup simulation
- Calculator function
- View function arguments
- See execution results

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for learning or building your own applications!

## 🙏 Acknowledgments

- Built with [Mistral AI](https://mistral.ai/)
- Powered by [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

- [Mistral AI Documentation](https://docs.mistral.ai/)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/salmanmkc/mistral-ai-fun/issues)

---

**Made with ❤️ by Salman**
