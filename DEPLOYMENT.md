# Deployment Notes

## Important: API Routes Requirement

This application uses Next.js API routes which require a server runtime. **It cannot be deployed as a static site to GitHub Pages** in its current form.

## Recommended Deployment Options

### Option 1: Vercel (Recommended)

#### Method A: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy to Production**
```bash
cd mistral-chat-app
vercel --prod
```

4. **Add Environment Variable**
```bash
vercel env add MISTRAL_API_KEY
```
   - Paste your Mistral API key when prompted
   - Select "Production" environment

5. **Redeploy with Environment Variable**
```bash
vercel --prod
```

Your app is now live! 🎉

#### Method B: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add `MISTRAL_API_KEY` environment variable in project settings
5. Deploy!

### Option 2: Netlify
1. Connect your GitHub repository
2. Set build command: `cd mistral-chat-app && npm run build`
3. Set publish directory: `mistral-chat-app/.next`
4. Add `MISTRAL_API_KEY` environment variable
5. Deploy

### Option 3: Railway/Render
Both platforms support Next.js with API routes out of the box.

## Why Not GitHub Pages?

GitHub Pages only supports static file hosting. This app requires:
- Server-side API routes (`/api/*`)
- Environment variables for API keys
- Streaming responses

## Alternative: Client-Side Implementation

To deploy on GitHub Pages, you would need to:
1. Remove all `/api` routes
2. Call Mistral AI directly from the client
3. **Warning**: This exposes your API key to users (not recommended)

For production apps with API keys, always use a server-side solution.
