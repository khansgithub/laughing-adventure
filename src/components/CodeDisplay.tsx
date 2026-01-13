import React from 'react';
import ReactMarkdown from 'react-markdown';
import { codeLines } from '../data/codeLines';
import { useAppStore } from '../store/useAppStore';
import { useTooltip } from '../hooks/useTooltip';
import { Tooltip } from './Tooltip';
import { getTranslation } from '../data/translations';
import clsx from 'clsx';

export const CodeDisplay: React.FC = () => {
	const { currentLine, language } = useAppStore();
	const { tooltip, showTooltip, hideTooltip } = useTooltip();
	const t = getTranslation(language);

	const handleKeywordHover = (
		e: React.MouseEvent<HTMLSpanElement>,
		keyword: string
	) => {
		const rect = e.currentTarget.getBoundingClientRect();
		showTooltip(keyword, rect.left + window.scrollX, rect.bottom + window.scrollY + 10);
	};

	const highlightSyntax = (line: string) => {
		let html = line;
		
		// Split by spaces and special characters while preserving them
		const tokens = html.split(/(\s+|[=+(),])/);
		
		return tokens.map((token, idx) => {
			const trimmed = token.trim();
			
			// Keywords
			if (['Sum', 'For', 'to', 'Select', 'Case', 'End', 'Next', 'Mode'].includes(trimmed)) {
				let keyword = trimmed;
				if (trimmed === 'Select' && tokens[idx + 2]?.trim() === 'Case') {
					keyword = 'Select Case';
				}
				if (trimmed === 'End' && tokens[idx + 2]?.trim() === 'Select') {
					keyword = 'End Select';
				}
				
				return (
					<span
						key={idx}
						className="text-purple-400 cursor-help hover:bg-purple-400/20 rounded px-1 transition-colors"
						onMouseEnter={(e) => handleKeywordHover(e, keyword)}
						onMouseLeave={hideTooltip}
					>
						{token}
					</span>
				);
			}
			
			// Variable i
			if (trimmed === 'i') {
				return (
					<span
						key={idx}
						className="text-red-400 cursor-help font-bold hover:bg-red-400/20 rounded px-1 transition-colors"
						onMouseEnter={(e) => handleKeywordHover(e, 'i')}
						onMouseLeave={hideTooltip}
					>
						{token}
					</span>
				);
			}
			
			// Numbers
			if (/^\d+$/.test(trimmed)) {
				return (
					<span key={idx} className="text-orange-400">
						{token}
					</span>
				);
			}
			
			// Operators
			if (['=', '+'].includes(trimmed)) {
				return (
					<span
						key={idx}
						className="text-cyan-400 cursor-help hover:bg-cyan-400/20 rounded px-1 transition-colors"
						onMouseEnter={(e) => handleKeywordHover(e, 'operator')}
						onMouseLeave={hideTooltip}
					>
						{token}
					</span>
				);
			}
			
			return <span key={idx}>{token}</span>;
		});
	};

	return (
		<>
			<div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
				<ReactMarkdown
					components={{
						p: ({ children }) => <p className="mb-0 text-sm text-blue-800">{children}</p>,
						strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
						code: ({ children }) => <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-900 font-mono text-xs">{children}</code>,
					}}
				>
					{t['hover-hint']}
				</ReactMarkdown>
			</div>
			<div className="bg-gray-800 rounded-xl p-5 font-mono text-lg leading-relaxed text-gray-300 overflow-x-auto">
				{codeLines.map((item, idx) => (
					<div
						key={idx}
						className={clsx(
							'block py-1.5 px-2.5 rounded-md transition-all duration-300',
							{
								'pl-10': item.indent === 1,
								'pl-20': item.indent === 2,
								'pl-28': item.indent === 3,
								'bg-gray-600 font-bold filter brightness-110':
								// 'bg-gray-600 text-gray-900 font-bold animate-pulse-once':
									idx === currentLine,
								'hover:bg-white/10': idx !== currentLine,
							}
						)}
					>
						{highlightSyntax(item.line)}
					</div>
				))}
			</div>
			
			<Tooltip keyword={tooltip.keyword} x={tooltip.x} y={tooltip.y} />
		</>
	);
};
