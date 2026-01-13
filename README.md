# Interactive Code Learning App

A modern, bilingual (English/Korean) interactive web application designed to teach children coding concepts through visual execution and step-by-step debugging.

## Features

- 🌏 **Bilingual Support**: Full English and Korean translations with native-level explanations
- 🐛 **Interactive Debugger**: Step through code line-by-line and watch variables change
- 💡 **Hover Tooltips**: Learn about keywords by hovering over them
- 🎨 **Beautiful UI**: Modern, colorful design built with React and Tailwind CSS
- 📊 **Real-time Visualization**: See variables update as the code executes
- ⚡ **Adjustable Speed**: Control execution speed for better learning
- 📱 **Responsive Design**: Works great on all screen sizes

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **clsx** - Dynamic className composition

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── CodeDisplay.tsx
│   ├── DebuggerControls.tsx
│   ├── ExplanationBox.tsx
│   ├── IterationDisplay.tsx
│   ├── LanguageToggle.tsx
│   ├── SummarySection.tsx
│   ├── Tooltip.tsx
│   └── VariablesDisplay.tsx
├── data/               # Static data and translations
│   ├── codeLines.ts
│   └── translations.ts
├── hooks/              # Custom React hooks
│   ├── useCodeExecution.ts
│   └── useTooltip.ts
├── store/              # Zustand store
│   └── useAppStore.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## How It Works

The app demonstrates a simple Visual Basic-style loop that:
1. Initializes `Sum = 0`
2. Loops from `i = 1` to `20`
3. Checks if each number is divisible by 4 using modulo (`i mod 4`)
4. Adds divisible numbers to the sum
5. Final result: `Sum = 60` (4 + 8 + 12 + 16 + 20)

### Key Features

- **Step-by-Step Execution**: Click "Next Step" to execute one line at a time
- **Auto-Run**: Click "Start" to automatically run through the entire program
- **Speed Control**: Adjust the execution speed from 0.1x to 2.0x
- **Variable Tracking**: Watch `Sum` and `i` update in real-time
- **Interactive Tooltips**: Hover over any keyword to learn what it does
- **Bilingual**: Switch between English and Korean at any time

## Customization

### Adding New Languages

1. Add language type to `src/types/index.ts`:
```typescript
export type Language = 'en' | 'ko' | 'fr';
```

2. Add translations to `src/data/translations.ts`

### Modifying the Code Example

Edit `src/data/codeLines.ts` to change the code being explained. You'll also need to update the execution logic in `src/hooks/useCodeExecution.ts`.

## License

MIT License - feel free to use this for educational purposes!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
