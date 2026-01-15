import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAppStore } from '../store/useAppStore';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { getTranslation } from '../data/translations';

export const DebuggerControls: React.FC = () => {
	const { language, executionSpeed, setExecutionSpeed, isRunning } = useAppStore();
	const { startExecution, stepForward, resetExecution } = useCodeExecution();
	const t = getTranslation(language);

	const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setExecutionSpeed(parseInt(e.target.value));
	};

	const speedDisplay = ((2100 - executionSpeed) / 1000).toFixed(1);

	return (
		<div className="space-y-5">
			<div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
				<ReactMarkdown
					components={{
						p: ({ children }) => <p className="mb-0 text-sm text-green-800">{children}</p>,
						strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
						code: ({ children }) => <code className="bg-green-100 px-1 py-0.5 rounded text-green-900 font-mono text-xs">{children}</code>,
					}}
				>
					{t['debug-controls-hint']}
				</ReactMarkdown>
			</div>
			<div className="flex gap-4 flex-wrap">
				<button
					onClick={startExecution}
					disabled={isRunning}
					className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-base transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
				>
					<span>▶️</span>
					<span>{t.start}</span>
				</button>
				
				<button
					onClick={stepForward}
					disabled={isRunning}
					className="px-6 py-3 bg-primary-500 text-white rounded-xl font-bold text-base transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
				>
					<span>⏩</span>
					<span>{t.step}</span>
				</button>
				
				<button
					onClick={resetExecution}
					className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold text-base transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
				>
					<span>{isRunning ? '⏹️' : '🔄'}</span>
					<span>{isRunning ? t.stop : t.reset}</span>
				</button>
			</div>
			
			<div className="flex items-center gap-4">
				<label className="font-bold text-primary-500">
					{t.speed}
				</label>
				{/* Labels for left/right values */}
				<div className="flex items-center gap-2 flex-1">
					<span className="text-xs text-gray-400 select-none min-w-[2rem] text-left">0.1</span>
					<input
						type="range"
						min="100"
						max="2000"
						value={executionSpeed}
						step="100"
						onChange={handleSpeedChange}
						className="flex-1 h-2 rounded-lg outline-none bg-primary-400 appearance-none cursor-pointer"
						style={{
							direction: "rtl",
							background: `linear-gradient(to left, #ddd 0%, #ddd ${((executionSpeed - 100) / 1900) * 100}%, #667eea ${((executionSpeed - 100) / 1900) * 100}%, #667eea 100%)`
						}}
					/>
					<span className="text-xs text-gray-400 select-none min-w-[2rem] text-right">2.0</span>
				</div>
				<span className="font-mono font-bold text-primary-600 min-w-[3rem]">
					{speedDisplay}x
				</span>
			</div>
		</div>
	);
};
