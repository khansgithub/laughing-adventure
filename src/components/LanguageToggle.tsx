import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Language } from '../types';

export const LanguageToggle: React.FC = () => {
	const { language, setLanguage } = useAppStore();

	const handleLanguageChange = (lang: Language) => {
		setLanguage(lang);
	};

	return (
		<div className="flex gap-2.5 bg-gray-200 p-1.5 rounded-full">
			<button
				onClick={() => handleLanguageChange('en')}
				className={`px-5 py-2.5 rounded-full font-bold text-base transition-all duration-300 ${
					language === 'en'
						? 'bg-primary-500 text-white scale-105 shadow-md'
						: 'bg-transparent text-gray-700 hover:bg-gray-300'
				}`}
			>
				English
			</button>
			<button
				onClick={() => handleLanguageChange('ko')}
				className={`px-5 py-2.5 rounded-full font-bold text-base transition-all duration-300 ${
					language === 'ko'
						? 'bg-primary-500 text-white scale-105 shadow-md'
						: 'bg-transparent text-gray-700 hover:bg-gray-300'
				}`}
			>
				한국어
			</button>
		</div>
	);
};
