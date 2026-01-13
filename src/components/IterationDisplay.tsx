import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { getTranslation } from '../data/translations';

export const IterationDisplay: React.FC = () => {
	const { currentIteration, language } = useAppStore();
	const t = getTranslation(language);

	return (
		<div className="bg-white rounded-xl p-5 text-center mt-5">
			<div className="text-lg text-gray-600 mb-2">
				{t['current-iteration']}
			</div>
			<div className="text-5xl font-bold text-primary-500 my-2.5">
				{currentIteration > 0 ? currentIteration : '-'}
			</div>
		</div>
	);
};
