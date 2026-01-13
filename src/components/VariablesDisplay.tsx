import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAppStore } from '../store/useAppStore';
import { getTranslation } from '../data/translations';

export const VariablesDisplay: React.FC = () => {
	const { variables, language } = useAppStore();
	const t = getTranslation(language);

	return (
		<div className="space-y-4">
			<div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
				<ReactMarkdown
					components={{
						p: ({ children }) => <p className="mb-0 text-sm text-purple-800">{children}</p>,
						strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
						code: ({ children }) => <code className="bg-purple-100 px-1 py-0.5 rounded text-purple-900 font-mono text-xs">{children}</code>,
					}}
				>
					{t['variables-hint']}
				</ReactMarkdown>
			</div>
			<div className="bg-white rounded-xl p-5 space-y-2.5">
				{Object.entries(variables).map(([name, value]) => (
					<div
						key={name}
						className="flex justify-between items-center p-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl border-l-4 border-primary-500 text-lg animate-fade-in"
					>
						<span className="font-bold text-primary-600">{name}</span>
						<span className="text-2xl text-red-500 font-mono font-bold">
							{value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};
