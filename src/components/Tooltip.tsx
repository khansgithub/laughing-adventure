import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAppStore } from '../store/useAppStore';
import { getTranslation } from '../data/translations';

interface TooltipProps {
	keyword: string | null;
	x: number;
	y: number;
	tooltipRef: React.RefObject<HTMLDivElement>;
	onClose: () => void;
}

export const Tooltip: React.FC<TooltipProps> = ({ keyword, x, y, tooltipRef, onClose }) => {
	const { language } = useAppStore();
	const t = getTranslation(language);

	if (!keyword) return null;

	const tooltipData = t.keywords[keyword];
	if (!tooltipData) return null;

	return (
		<div
			ref={tooltipRef}
			className="fixed bg-gray-900 text-white p-5 rounded-xl max-w-md text-sm leading-relaxed shadow-2xl z-50 border-2 border-primary-500 opacity-100 transition-opacity duration-300 max-h-[25dvh] overflow-y-auto"
			style={{ left: `${x}px`, top: `${y}px` }}
		>
			<div className="flex justify-between items-start mb-3">
				<h4 className="text-yellow-400 font-semibold text-lg">
					{tooltipData.title}
				</h4>
				<button
					onClick={onClose}
					className="text-gray-400 hover:text-white transition-colors ml-4 flex-shrink-0"
					aria-label="Close tooltip"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<div className="text-gray-100 prose prose-invert prose-sm max-w-none">
				<ReactMarkdown
					components={{
						p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
						strong: ({ children }) => <strong className="font-semibold text-yellow-300">{children}</strong>,
						code: ({ children }) => <code className="bg-gray-800 px-1.5 py-0.5 rounded text-yellow-200 font-mono text-xs">{children}</code>,
						ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
						li: ({ children }) => <li className="ml-2">{children}</li>,
						ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
					}}
				>
					{tooltipData.desc}
				</ReactMarkdown>
			</div>
		</div>
	);
};
