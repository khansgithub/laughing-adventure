import { useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getTranslation } from '../data/translations';

export const useCodeExecution = () => {
	// Get individual pieces instead of entire store to avoid stale closures
	const language = useAppStore((state) => state.language);
	const executionSpeed = useAppStore((state) => state.executionSpeed);
	const t = getTranslation(language);

	const stepForward = useCallback((): boolean => {
		// CRITICAL: Get fresh state each time, don't use captured closure
		const store = useAppStore.getState();
		const line = store.currentLine;
		const stepExp = t.stepExplanations;
		// First step - initialization
		if (line === -1) {
			store.setCurrentLine(0);
			store.updateVariable('Sum', 0);
			store.setCurrentExplanation(stepExp.init);
			return true;
		}
		// Line 0: Sum = 0
		if (line === 0) {
			store.setCurrentLine(1);
			store.setCurrentIteration(1);
			store.updateVariable('i', 1);
			store.setCurrentExplanation(stepExp.loop.replace(/{i}/g, '1'));
			return true;
		}

		// Line 1: For loop
		if (line === 1) {
			if (store.variables.i <= 20) {
				store.setCurrentLine(2);
				const modResult = store.variables.i % 4;

				store.setCurrentExplanation(
					stepExp.check
						.replace('{i}', String(store.variables.i))
						.replace('{result}', String(modResult))
				);

				return true;
			} else {
				store.setCurrentLine(8);
				return false;
			}
		}

		// Line 2: Select Case
		if (line === 2) {
			const modResult = store.variables.i % 4;
			if (modResult === 0) {
				store.setCurrentLine(3);
			} else {
				store.setCurrentLine(5);
			}
			return true;
		}

		// Line 3: Case 0
		if (line === 3) {
			store.setCurrentLine(4);
			return true;
		}

		// Line 4: Sum = Sum + i
		if (line === 4) {
			const prevSum = store.variables.Sum;
			const newSum = prevSum + store.variables.i;
			store.updateVariable('Sum', newSum);
			store.setCurrentExplanation(
				stepExp.add
					.replace('{i}', String(store.variables.i))
					.replace('{prevSum}', String(prevSum))
					.replace('{newSum}', String(newSum))
			);

			store.setCurrentLine(6);
			return true;
		}

		// Line 5: Case 1,2,3
		if (line === 5) {
			const modResult = store.variables.i % 4;
			store.setCurrentExplanation(
				stepExp.skip
					.replace('{i}', String(store.variables.i))
					.replace('{result}', String(modResult))
			);
			store.setCurrentLine(6);
			return true;
		}

		// Line 6: End Select
		if (line === 6) {
			store.setCurrentLine(7);
			return true;
		}

		// Line 7: Next
		if (line === 7) {
			const newI = store.variables.i + 1;

			store.updateVariable('i', newI);
			const newIteration = store.currentIteration + 1;
			store.setCurrentIteration(newIteration);
			if (newI <= 20) {
				store.setCurrentLine(1);
				store.setCurrentExplanation(
					stepExp.loop.replace(/{i}/g, String(newI))
				);
				return true;
			} else {
				store.setCurrentLine(8);
				return false;
			}
		}

		return false;
	}, [t]);

	const startExecution = useCallback(() => {
		const store = useAppStore.getState();
		if (store.isRunning) {
			return;
		}

		// Don't reset if already at start, otherwise we'd be in an inconsistent state
		// The reset should have been called explicitly by the user via resetExecution
		store.setIsRunning(true);
		const autoRun = () => {
			const hasMore = stepForward();
			if (hasMore) {
				const timer = setTimeout(autoRun, executionSpeed);
				useAppStore.getState().setAutoRunTimer(timer);
			} else {
				const finalState = useAppStore.getState();
				finalState.setIsRunning(false);
				const finalSum = finalState.variables.Sum;

				finalState.setCurrentExplanation(
					t.stepExplanations.complete.replace('{sum}', String(finalSum))
				);
				finalState.setAutoRunTimer(null);
			}
		};


		autoRun();
	}, [stepForward, executionSpeed, t]);

	const resetExecution = useCallback(() => {
		const store = useAppStore.getState();
		store.reset();
		store.setCurrentExplanation(t.clickToStart);
	}, [t]);

	return {
		stepForward,
		startExecution,
		resetExecution,
	};
};
