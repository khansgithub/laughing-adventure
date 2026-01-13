import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getTranslation } from '../data/translations';

export const ExplanationBox: React.FC = () => {
	const { currentExplanation, language, currentLine, setCurrentExplanation } = useAppStore();
	const t = getTranslation(language);

	useEffect(() => {
		if (currentLine === -1 && !currentExplanation) {
			setCurrentExplanation(t.clickToStart);
		}
	}, [currentLine, currentExplanation, setCurrentExplanation, t]);

	return (
		<div className="bg-white rounded-xl p-5 mt-5 leading-relaxed text-base">
			<h3 className="text-primary-500 mb-4 text-2xl font-bold">
				{t['current-iteration']}
			</h3>
			<p className="text-gray-700 text-lg">{currentExplanation || t.clickToStart}</p>
		</div>
	);
};
