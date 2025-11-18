# Quick Start Guide

Get up and running with Mistral AI Fun in minutes!

## 1. Prerequisites

- **Node.js 18+**: [Download here](https://nodejs.org/)
- **Mistral AI API Key**: [Get free key](https://console.mistral.ai/)

## 2. Clone & Install

```bash
# Clone the repository
git clone https://github.com/salmanmkc/mistral-ai-fun.git
cd mistral-ai-fun

# Run setup script (macOS/Linux)
./setup.sh

# OR manually install
cd mistral-chat-app
npm install
```

## 3. Configure API Key

Create `.env.local` in the `mistral-chat-app` directory:

```bash
MISTRAL_API_KEY=your_api_key_here
```

💡 **Tip**: Get your API key from [Mistral AI Console](https://console.mistral.ai/)

## 4. Run the App

```bash
cd mistral-chat-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 5. Explore Features

### Chat Interface
- Select a model from the dropdown
- Type your message
- See streaming responses in real-time

### Code Generation
- Choose a programming language
- Describe what you want to build
- Watch code generate in real-time

### Embeddings
- Enter any text
- Generate vector embeddings
- View embedding dimensions

### Function Calling
- Ask about weather or calculations
- See AI choose and execute functions
- View results in real-time

## Troubleshooting

### "Cannot find module" errors
```bash
cd mistral-chat-app
rm -rf node_modules package-lock.json
npm install
```

### "Invalid API Key"
- Check your `.env.local` file exists
- Verify your API key is correct
- Make sure there are no extra spaces

### Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

## Next Steps

- Read the full [README](./README.md)
- Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting options
- See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute

## Need Help?

- [Mistral AI Docs](https://docs.mistral.ai/)
- [Open an Issue](https://github.com/salmanmkc/mistral-ai-fun/issues)
- [Next.js Docs](https://nextjs.org/docs)
