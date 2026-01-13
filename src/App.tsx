import React from 'react';
import { useAppStore } from './store/useAppStore';
import { getTranslation } from './data/translations';
import { LanguageToggle } from './components/LanguageToggle';
import { CodeDisplay } from './components/CodeDisplay';
import { DebuggerControls } from './components/DebuggerControls';
import { IterationDisplay } from './components/IterationDisplay';
import { VariablesDisplay } from './components/VariablesDisplay';
import { ExplanationBox } from './components/ExplanationBox';
import { SummarySection } from './components/SummarySection';

const App: React.FC = () => {
	const { language } = useAppStore();
	const t = getTranslation(language);

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 p-5">
			<div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
				{/* Header */}
				<header className="flex justify-between items-center mb-8 flex-wrap gap-4">
					<h1 className="text-primary-500 text-5xl font-bold drop-shadow-md">
						{t['main-title']}
					</h1>
					<LanguageToggle />
				</header>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					{/* Left Column - Code Display */}
					<section className="bg-gray-100 rounded-2xl p-6 shadow-md">
						<h2 className="text-primary-500 mb-5 text-3xl font-bold border-b-4 border-primary-500 pb-2.5">
							{t['code-title']}
						</h2>
						
						<CodeDisplay />
						
						<div className="mt-6">
							<DebuggerControls />
						</div>
						
						<IterationDisplay />
					</section>

					{/* Right Column - Variables and Explanation */}
					<section className="bg-gray-100 rounded-2xl p-6 shadow-md">
						<h2 className="text-primary-500 mb-5 text-3xl font-bold border-b-4 border-primary-500 pb-2.5">
							{t['variables-title']}
						</h2>
						
						<VariablesDisplay />
						
						<ExplanationBox />
					</section>
				</div>

				{/* Summary Section */}
				<section>
					<SummarySection />
				</section>
			</div>
		</div>
	);
};

export default App;
