import { CodeLine } from '../types';

export const codeLines: CodeLine[] = [
	{ line: 'Sum = 0', indent: 0, type: 'assignment' },
	{ line: 'For i = 1 to 20', indent: 0, type: 'for-start' },
	{ line: 'Select Case (i Mod 4)', indent: 1, type: 'select-case' },
	{ line: 'Case 0', indent: 2, type: 'case-0' },
	{ line: 'Sum = Sum + i', indent: 3, type: 'add' },
	{ line: 'Case 1,2,3', indent: 2, type: 'case-other' },
	{ line: 'End Select', indent: 1, type: 'end-select' },
	{ line: 'Next', indent: 0, type: 'next' }
];
