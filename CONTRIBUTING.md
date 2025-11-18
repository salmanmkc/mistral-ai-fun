# Contributing to Mistral AI Fun

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/mistral-ai-fun.git
cd mistral-ai-fun
```

3. Set up the project:
```bash
./setup.sh
```

4. Create a branch:
```bash
git checkout -b feature/your-feature-name
```

## Development Workflow

1. Make your changes
2. Test your changes:
```bash
cd mistral-chat-app
npm run dev
```

3. Build to check for errors:
```bash
npm run build
```

4. Commit your changes:
```bash
git add .
git commit -m "feat: your feature description"
```

5. Push and create a PR:
```bash
git push origin feature/your-feature-name
```

## Commit Message Convention

We use conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## Adding New Features

When adding a new Mistral AI feature:

1. Create API route in `app/api/your-feature/route.ts`
2. Create component in `app/components/YourFeature.tsx`
3. Add tab in `app/page.tsx`
4. Update README with feature description

## Testing

Before submitting a PR:
- [ ] App builds without errors (`npm run build`)
- [ ] All features work as expected
- [ ] No console errors
- [ ] Code is properly formatted
- [ ] README is updated if needed

## Questions?

Feel free to open an issue for any questions or concerns!
