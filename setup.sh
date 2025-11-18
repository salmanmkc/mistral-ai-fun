#!/bin/bash

echo "🚀 Mistral AI Showcase App - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Navigate to the app directory
cd mistral-chat-app

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  No .env.local file found"
    echo "📝 Creating .env.local from template..."
    
    if [ -f .env.local.example ]; then
        cp .env.local.example .env.local
        echo "✅ Created .env.local file"
    else
        echo "MISTRAL_API_KEY=your_mistral_api_key_here" > .env.local
        echo "✅ Created .env.local file"
    fi
    
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your Mistral API key"
    echo "   Get your API key from: https://console.mistral.ai/"
    echo ""
else
    echo "✅ .env.local file already exists"
    echo ""
fi

echo "=========================================="
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your Mistral API key to .env.local"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "=========================================="
