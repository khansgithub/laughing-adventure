import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAppStore } from '../store/useAppStore';
import { getTranslation } from '../data/translations';

interface TooltipProps {
	keyword: string | null;
	x: number;
	y: number;
}

export const Tooltip: React.FC<TooltipProps> = ({ keyword, x, y }) => {
	const { language } = useAppStore();
	const t = getTranslation(language);

	if (!keyword) return null;

	const tooltipData = t.keywords[keyword];
	if (!tooltipData) return null;

	return (
		<div
			className="fixed bg-gray-900 text-white p-5 rounded-xl max-w-md text-sm leading-relaxed shadow-2xl z-50 border-2 border-primary-500 opacity-100 transition-opacity duration-300 pointer-events-none max-h-fit overflow-y-auto"
			style={{ left: `${x}px`, top: `${y}px` }}
		>
			<h4 className="text-yellow-400 mb-3 font-semibold text-lg">
				{tooltipData.title}
			</h4>
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
