# Quick Setup Guide

Follow these steps to get the Interactive Code Learning App running on your machine.

## Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

To check if you have Node.js installed, open a terminal and run:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- And more...

**Note**: This may take 1-2 minutes depending on your internet connection.

### 2. Start Development Server

Once installation is complete, start the development server:

```bash
npm run dev
```

You should see output like:
```
  VITE v5.1.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 3. Open in Browser

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the Interactive Code Learning App running! 🎉

## Available Commands

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## Development Tips

- The app will automatically reload when you make changes to the code
- Press `Ctrl+C` (or `Cmd+C` on Mac) in the terminal to stop the dev server
- All source code is in the `src/` directory
- Edit `src/data/translations.ts` to modify or add translations
- Edit `src/data/codeLines.ts` to change the code example

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.). Check the terminal output for the correct URL.

### Module Not Found Errors

If you see module errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Make sure you're using TypeScript 5.x:
```bash
npm list typescript
```

### Build Errors

Clear the cache and rebuild:
```bash
npm run build -- --force
```

## Building for Production

When you're ready to deploy:

1. Build the production files:
```bash
npm run build
```

2. Test the production build locally:
```bash
npm run preview
```

3. Deploy the `dist/` folder to your hosting service (Netlify, Vercel, GitHub Pages, etc.)

## Project Structure

```
code-learning-app/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── data/           # Translations and code data
│   ├── hooks/          # Custom React hooks
│   ├── store/          # State management (Zustand)
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── tailwind.config.js  # Tailwind CSS config
└── vite.config.ts      # Vite config
```

## Need Help?

- Check the [README.md](README.md) for more detailed information
- Visit [Vite documentation](https://vitejs.dev/)
- Visit [React documentation](https://react.dev/)
- Visit [Tailwind CSS documentation](https://tailwindcss.com/)

Happy coding! 🚀
