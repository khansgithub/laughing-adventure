export type Language = 'en' | 'ko';

export type LineType = 
	| 'assignment' 
	| 'for-start' 
	| 'select-case' 
	| 'case-0' 
	| 'add' 
	| 'case-other' 
	| 'end-select' 
	| 'next';

export interface CodeLine {
	line: string;
	indent: number;
	type: LineType;
}

export interface ExecutionState {
	currentLine: number;
	currentIteration: number;
	variables: {
		Sum: number;
		i: number;
	};
	isRunning: boolean;
	isPaused: boolean;
}

export interface KeywordTooltip {
	title: string;
	desc: string;
}

export interface TooltipPosition {
	x: number;
	y: number;
	keyword: string | null;
	keywordElement: HTMLElement | null;
}
