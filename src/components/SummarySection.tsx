import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAppStore } from '../store/useAppStore';
import { getTranslation } from '../data/translations';

export const SummarySection: React.FC = () => {
	const { language } = useAppStore();
	const sum = getTranslation(language).summary;

	return (
		<div className="bg-gray-100  text-gray-700 rounded-2xl p-6 shadow-md">
			<h2 className="text-primary-500 mb-5 text-3xl font-bold border-b-4 border-primary-500 pb-2.5">
				{sum.title}
			</h2>
			
			<div className="bg-white rounded-xl p-5 mb-5 leading-relaxed text-base">
				<p className="mb-4 text-lg">{sum.overview}</p>
				{sum.steps.map((step, idx) => (
					<div className="mb-3" key={idx}>
						<ReactMarkdown
							components={{
								p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
								strong: ({ children }) => <strong className="font-semibold text-primary-600">{children}</strong>,
								code: ({ children }) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-primary-700 font-mono text-sm">{children}</code>,
								ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
								li: ({ children }) => <li className="ml-2">{children}</li>,
								ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
							}}
						>
							{step}
						</ReactMarkdown>
					</div>
				))}
			</div>
			
			<div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 text-center text-lg">
				<h3 className="text-3xl mb-4 font-bold">{sum.final}</h3>
				<div className="text-7xl font-bold my-5">60</div>
				<p className="text-xl">{sum.explanation}</p>
			</div>
		</div>
	);
};
