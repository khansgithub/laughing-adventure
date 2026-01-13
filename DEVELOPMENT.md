# Development Guide

This guide explains the architecture and how to modify the Interactive Code Learning App.

## Architecture Overview

The app follows a modern React architecture with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│              App.tsx                     │
│         (Main Component)                 │
└───────────────┬─────────────────────────┘
                │
    ┌───────────┴───────────┐
    │                       │
┌───▼────────┐      ┌──────▼──────┐
│ Components │      │    Store    │
│   (UI)     │◄─────┤  (Zustand)  │
└────────────┘      └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │    Hooks    │
                    │  (Logic)    │
                    └─────────────┘
```

### Key Technologies

1. **React 18** - Component-based UI
2. **TypeScript** - Type safety
3. **Zustand** - Lightweight state management (simpler than Redux)
4. **Tailwind CSS** - Utility-first styling
5. **Vite** - Fast build tool

## State Management (Zustand)

The app uses **Zustand** for state management. It's much simpler than Redux!

### File: `src/store/useAppStore.ts`

```typescript
// Define your state and actions in one place
export const useAppStore = create<AppState>((set) => ({
  // State
  currentLine: -1,
  variables: { Sum: 0, i: 0 },
  
  // Actions
  setCurrentLine: (line) => set({ currentLine: line }),
  updateVariable: (name, value) => 
    set((state) => ({ 
      variables: { ...state.variables, [name]: value } 
    })),
}));
```

### Using the Store in Components

```typescript
import { useAppStore } from '../store/useAppStore';

function MyComponent() {
  // Select only what you need
  const { currentLine, setCurrentLine } = useAppStore();
  
  // Use it!
  return <div onClick={() => setCurrentLine(5)}>Line: {currentLine}</div>;
}
```

**Benefits:**
- No providers needed
- No reducers or action types
- Direct state updates
- TypeScript autocomplete works perfectly

## Component Structure

### 1. Presentational Components
Pure UI components that receive props and render:
- `LanguageToggle.tsx`
- `Tooltip.tsx`
- `VariablesDisplay.tsx`

### 2. Container Components
Components that connect to the store:
- `CodeDisplay.tsx`
- `DebuggerControls.tsx`
- `ExplanationBox.tsx`

### 3. Layout Components
Components that compose other components:
- `App.tsx`
- `SummarySection.tsx`

## Custom Hooks

### `useCodeExecution.ts`

Handles all execution logic:
```typescript
export const useCodeExecution = () => {
  const store = useAppStore();
  
  const stepForward = () => {
    // Execution logic here
  };
  
  return { stepForward, startExecution, resetExecution };
};
```

**Why a custom hook?**
- Separates business logic from UI
- Reusable across components
- Easier to test
- Cleaner component code

### `useTooltip.ts`

Manages tooltip state:
```typescript
export const useTooltip = () => {
  const [tooltip, setTooltip] = useState({...});
  
  return { tooltip, showTooltip, hideTooltip };
};
```

## Styling with Tailwind CSS

### Utility Classes
Instead of writing CSS, use utility classes:

```tsx
// Traditional CSS
<div className="button">Click me</div>
// styles.css: .button { padding: 12px; background: blue; ... }

// Tailwind
<div className="px-6 py-3 bg-blue-500 rounded-xl">Click me</div>
```

### Dynamic Classes with `clsx`
```tsx
import clsx from 'clsx';

<div className={clsx(
  'base-class',
  { 'active-class': isActive },
  condition && 'conditional-class'
)}>
```

### Custom Theme
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#667eea',  // Change this!
      }
    }
  }
}
```

## How to Modify the App

### 1. Change the Code Example

Edit `src/data/codeLines.ts`:
```typescript
export const codeLines: CodeLine[] = [
  { line: 'Your new code here', indent: 0, type: 'your-type' },
  // ...
];
```

Then update execution logic in `src/hooks/useCodeExecution.ts`.

### 2. Add a New Language

**Step 1:** Add language type in `src/types/index.ts`:
```typescript
export type Language = 'en' | 'ko' | 'es';  // Added Spanish
```

**Step 2:** Add translations in `src/data/translations.ts`:
```typescript
export const translations: Record<Language, Translation> = {
  en: { /* ... */ },
  ko: { /* ... */ },
  es: { 
    'main-title': '¡Aprende a programar!',
    // ... add all translations
  }
};
```

**Step 3:** Add button in `src/components/LanguageToggle.tsx`:
```tsx
<button onClick={() => handleLanguageChange('es')}>
  Español
</button>
```

### 3. Add New Variables to Track

**Step 1:** Update types in `src/types/index.ts`:
```typescript
export interface ExecutionState {
  variables: {
    Sum: number;
    i: number;
    myNewVar: number;  // Add here
  };
}
```

**Step 2:** Initialize in `src/store/useAppStore.ts`:
```typescript
const initialState: ExecutionState = {
  variables: { Sum: 0, i: 0, myNewVar: 0 },
};
```

**Step 3:** Update in execution hook when needed:
```typescript
store.updateVariable('myNewVar', someValue);
```

The `VariablesDisplay` component will automatically show it!

### 4. Change Colors/Theme

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
      }
    }
  }
}
```

Or directly in components:
```tsx
// Change from blue to green
className="bg-blue-500" → className="bg-green-500"
```

### 5. Modify Execution Speed Range

Edit `src/components/DebuggerControls.tsx`:
```tsx
<input
  type="range"
  min="50"      // Faster
  max="5000"    // Slower
  value={executionSpeed}
/>
```

### 6. Add New Keywords/Tooltips

Edit `src/data/translations.ts`:
```typescript
keywords: {
  'YourKeyword': {
    title: 'Your Keyword',
    desc: 'Explanation here'
  }
}
```

Then in `CodeDisplay.tsx`, add to the highlighting logic.

## TypeScript Tips

### Type-Safe Store Access
```typescript
// ✅ Good - TypeScript knows the types
const { currentLine } = useAppStore();

// ✅ Good - Type-safe action
store.updateVariable('Sum', 42);

// ❌ Bad - TypeScript error
store.updateVariable('InvalidVar', 42);
```

### Component Props Types
```typescript
interface MyComponentProps {
  title: string;
  count: number;
  onUpdate?: (value: number) => void;  // Optional
}

const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  count, 
  onUpdate 
}) => {
  // TypeScript autocomplete works!
};
```

## Testing the App

### Manual Testing Checklist

- [ ] Language toggle works
- [ ] Step through code line-by-line
- [ ] Auto-run executes completely
- [ ] Variables update correctly
- [ ] Tooltips appear on hover
- [ ] Speed control works
- [ ] Reset button clears state
- [ ] Responsive on mobile

### Dev Tools

- **React DevTools**: Inspect component hierarchy
- **Zustand DevTools**: Track state changes (add middleware)
- **Tailwind CSS IntelliSense**: VSCode extension for class autocomplete

## Performance Considerations

### 1. Memoization
Use `useCallback` for functions passed as props:
```typescript
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);
```

### 2. Selective Store Updates
Only subscribe to what you need:
```typescript
// ✅ Good - only re-renders when currentLine changes
const currentLine = useAppStore((state) => state.currentLine);

// ❌ Less efficient - re-renders on any state change
const store = useAppStore();
```

### 3. Lazy Loading
For large apps, split components:
```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

## Common Patterns

### 1. Conditional Rendering
```tsx
{isVisible && <Component />}
{count > 0 ? <Success /> : <Empty />}
```

### 2. List Rendering
```tsx
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

### 3. Event Handlers
```tsx
<button onClick={() => handleClick(id)}>Click</button>
<input onChange={(e) => setValue(e.target.value)} />
```

## Debugging Tips

### 1. Console Log State
```typescript
const store = useAppStore();
console.log('Current state:', store);
```

### 2. React DevTools
Install the browser extension to inspect component state and props.

### 3. Type Errors
If TypeScript complains, check:
- All types are defined in `src/types/index.ts`
- Store state matches the interface
- Component props match the type definition

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

## Resources

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Docs](https://docs.pmnd.rs/zustand/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/)

## Getting Help

If you encounter issues:
1. Check the console for errors
2. Read error messages carefully (TypeScript errors are usually helpful)
3. Check if dependencies are installed correctly
4. Try clearing node_modules and reinstalling
5. Search for similar issues on Stack Overflow

Happy coding! 🚀
