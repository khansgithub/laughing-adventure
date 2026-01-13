import { create } from 'zustand';
import { ExecutionState, Language } from '../types';

interface AppState extends ExecutionState {
	language: Language;
	executionSpeed: number;
	currentExplanation: string;
	autoRunTimer: number | null;
	
	// Actions
	setLanguage: (lang: Language) => void;
	setExecutionSpeed: (speed: number) => void;
	setCurrentLine: (line: number) => void;
	setCurrentIteration: (iteration: number) => void;
	updateVariable: (name: 'Sum' | 'i', value: number) => void;
	setIsRunning: (running: boolean) => void;
	setCurrentExplanation: (explanation: string) => void;
	setAutoRunTimer: (timer: number | null) => void;
	reset: () => void;
}

const initialState: ExecutionState = {
	currentLine: -1,
	currentIteration: 0,
	variables: { Sum: 0, i: 0 },
	isRunning: false,
	isPaused: false,
};

export const useAppStore = create<AppState>((set) => ({
	...initialState,
	language: 'en',
	executionSpeed: 1000,
	currentExplanation: '',
	autoRunTimer: null,
	
	setLanguage: (lang) => set({ language: lang }),
	
	setExecutionSpeed: (speed) => set({ executionSpeed: speed }),
	
	setCurrentLine: (line) => set({ currentLine: line }),
	
	setCurrentIteration: (iteration) => set({ currentIteration: iteration }),
	
	updateVariable: (name, value) => 
		set((state) => ({ 
			variables: { ...state.variables, [name]: value } 
		})),
	
	setIsRunning: (running) => set({ isRunning: running }),
	
	setCurrentExplanation: (explanation) => set({ currentExplanation: explanation }),
	
	setAutoRunTimer: (timer) => {
		set((state) => {
			if (state.autoRunTimer) {
				clearTimeout(state.autoRunTimer);
			}
			return { autoRunTimer: timer };
		});
	},
	
	reset: () => set((state) => {
		if (state.autoRunTimer) {
			clearTimeout(state.autoRunTimer);
		}
		return {
			...initialState,
			autoRunTimer: null,
			currentExplanation: '',
		};
	}),
}));
