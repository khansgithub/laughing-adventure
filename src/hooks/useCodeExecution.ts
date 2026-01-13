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
		
		console.log('═══════════════════════════════════════════');
		console.log('[stepForward] >>> CALLED <<<');
		console.log('[stepForward] Current line:', line);
		console.log('[stepForward] Variables:', { ...store.variables });
		console.log('[stepForward] Iteration:', store.currentIteration);
		
		// First step - initialization
		if (line === -1) {
			console.log('[stepForward] ✓ BRANCH: Line -1 (Initialization)');
			console.log('[stepForward] Action: Setting line to 0, Sum to 0');
			store.setCurrentLine(0);
			store.updateVariable('Sum', 0);
			store.setCurrentExplanation(stepExp.init);
			console.log('[stepForward] State after update:', {
				line: store.currentLine,
				Sum: store.variables.Sum
			});
			console.log('[stepForward] Returning: true');
			console.log('═══════════════════════════════════════════');
			return true;
		}
		
		// Line 0: Sum = 0
		if (line === 0) {
			console.log('[stepForward] ✓ BRANCH: Line 0 (Sum = 0)');
			console.log('[stepForward] Action: Setting line to 1, iteration to 1, i to 1');
			store.setCurrentLine(1);
			store.setCurrentIteration(1);
			store.updateVariable('i', 1);
			store.setCurrentExplanation(stepExp.loop.replace(/{i}/g, '1'));
			console.log('[stepForward] State after update:', {
				line: store.currentLine,
				i: store.variables.i,
				iteration: store.currentIteration
			});
			console.log('[stepForward] Returning: true');
			console.log('═══════════════════════════════════════════');
			return true;
		}
		
		// Line 1: For loop
		if (line === 1) {
			console.log('[stepForward] ✓ BRANCH: Line 1 (For loop)');
			console.log('[stepForward] Current i:', store.variables.i);
			console.log('[stepForward] Check: i <= 20?', store.variables.i <= 20);
			if (store.variables.i <= 20) {
				console.log('[stepForward] Action: i <= 20, continuing loop. Setting line to 2');
				store.setCurrentLine(2);
				const modResult = store.variables.i % 4;
				console.log('[stepForward] Calculated mod result:', modResult);
				store.setCurrentExplanation(
					stepExp.check
						.replace('{i}', String(store.variables.i))
						.replace('{result}', String(modResult))
				);
				console.log('[stepForward] State after update:', {
					line: store.currentLine,
					modResult
				});
				console.log('[stepForward] Returning: true');
				console.log('═══════════════════════════════════════════');
				return true;
			} else {
				console.log('[stepForward] Action: i > 20, loop complete. Setting line to 8');
				store.setCurrentLine(8);
				console.log('[stepForward] Returning: false (EXECUTION COMPLETE)');
				console.log('═══════════════════════════════════════════');
				return false;
			}
		}
		
		// Line 2: Select Case
		if (line === 2) {
			console.log('[stepForward] ✓ BRANCH: Line 2 (Select Case)');
			const modResult = store.variables.i % 4;
			console.log('[stepForward] i mod 4 =', modResult);
			if (modResult === 0) {
				console.log('[stepForward] Action: modResult === 0, taking Case 0 branch. Setting line to 3');
				store.setCurrentLine(3);
			} else {
				console.log('[stepForward] Action: modResult !== 0, taking Case 1,2,3 branch. Setting line to 5');
				store.setCurrentLine(5);
			}
			console.log('[stepForward] State after update:', {
				line: store.currentLine
			});
			console.log('[stepForward] Returning: true');
			console.log('═══════════════════════════════════════════');
			return true;
		}
		
		// Line 3: Case 0
		if (line === 3) {
			console.log('[stepForward] ✓ BRANCH: Line 3 (Case 0)');
			console.log('[stepForward] Action: Setting line to 4 (to add i to Sum)');
			store.setCurrentLine(4);
			console.log('[stepForward] State after update:', {
				line: store.currentLine
			});
			console.log('[stepForward] Returning: true');
			console.log('═══════════════════════════════════════════');
			return true;
		}
		
		// Line 4: Sum = Sum + i
		if (line === 4) {
			console.log('[stepForward] ✓ BRANCH: Line 4 (Sum = Sum + i)');
			const prevSum = store.variables.Sum;
			const newSum = prevSum + store.variables.i;
			console.log('[stepForward] Calculation:', prevSum, '+', store.variables.i, '=', newSum);
			store.updateVariable('Sum', newSum);
			store.setCurrentExplanation(
				stepExp.add
					.replace('{i}', String(store.variables.i))
					.replace('{prevSum}', String(prevSum))
					.replace('{newSum}', String(newSum))
			);
			console.log('[stepForward] Action: Setting line to 6 (End Select)');
			store.setCurrentLine(6);
			console.log('[stepForward] State after update:', {
				line: store.currentLine,
				Sum: store.variables.Sum
			});
			console.log('[stepForward] Returning: true');
			console.log('═══════════════════════════════════════════');
			return true;
		}
		
		// Line 5: Case 1,2,3
		if (line === 5) {
			console.log('[stepForward] ✓ BRANCH: Line 5 (Case 1,2,3 - skip)');
			const modResult = store.variables.i % 4;
			console.log('[stepForward] Skipping i =', store.variables.i, '(mod 4 =', modResult, ')');
			store.setCurrentExplanation(
				stepExp.skip
					.replace('{i}', String(store.variables.i))
					.replace('{result}', String(modResult))
			);
			console.log('[stepForward] Action: Setting line to 6 (End Select)');
			store.setCurrentLine(6);
			console.log('[stepForward] State after update:', {
				line: store.currentLine
			});
			console.log('[stepForward] Returning: true');
			console.log('═══════════════════════════════════════════');
			return true;
		}
		
		// Line 6: End Select
		if (line === 6) {
			console.log('[stepForward] ✓ BRANCH: Line 6 (End Select)');
			console.log('[stepForward] Action: Setting line to 7 (Next)');
			store.setCurrentLine(7);
			console.log('[stepForward] State after update:', {
				line: store.currentLine
			});
			console.log('[stepForward] Returning: true');
			console.log('═══════════════════════════════════════════');
			return true;
		}
		
		// Line 7: Next
		if (line === 7) {
			console.log('[stepForward] ✓ BRANCH: Line 7 (Next - loop increment)');
			const oldI = store.variables.i;
			const newI = store.variables.i + 1;
			console.log('[stepForward] Incrementing i:', oldI, '->', newI);
			store.updateVariable('i', newI);
			const newIteration = store.currentIteration + 1;
			console.log('[stepForward] Incrementing iteration:', store.currentIteration, '->', newIteration);
			store.setCurrentIteration(newIteration);
			
			console.log('[stepForward] Check: newI <= 20?', newI <= 20);
			if (newI <= 20) {
				console.log('[stepForward] Action: Continuing loop. Setting line to 1');
				store.setCurrentLine(1);
				store.setCurrentExplanation(
					stepExp.loop.replace(/{i}/g, String(newI))
				);
				console.log('[stepForward] State after update:', {
					line: store.currentLine,
					i: store.variables.i,
					iteration: store.currentIteration
				});
				console.log('[stepForward] Returning: true');
				console.log('═══════════════════════════════════════════');
				return true;
			} else {
				console.log('[stepForward] Action: Loop finished (i > 20). Setting line to 8');
				store.setCurrentLine(8);
				console.log('[stepForward] Returning: false (EXECUTION COMPLETE)');
				console.log('═══════════════════════════════════════════');
				return false;
			}
		}
		
		console.log('[stepForward] ⚠️ WARNING: No branch matched! Line:', line);
		console.log('[stepForward] Returning: false');
		console.log('═══════════════════════════════════════════');
		return false;
	}, [t]);

	const startExecution = useCallback(() => {
		console.log('[startExecution] Called.');
		const store = useAppStore.getState();
		if (store.isRunning) {
			console.log('[startExecution] Aborting: Already running.');
			return;
		}
		
		// Don't reset if already at start, otherwise we'd be in an inconsistent state
		// The reset should have been called explicitly by the user via resetExecution

		console.log('[startExecution] Setting isRunning to true.');
		store.setIsRunning(true);
		
		const autoRun = () => {
			console.log('[autoRun] Invoked.');
			const hasMore = stepForward();
			const currentState = useAppStore.getState();
			console.log(`[autoRun] stepForward result: hasMore=${hasMore}.`);
			console.log('[autoRun] State snapshot:', {
				currentLine: currentState.currentLine,
				currentIteration: currentState.currentIteration,
				variables: { ...currentState.variables },
				isRunning: currentState.isRunning,
			});

			if (hasMore) {
				console.log(`[autoRun] Scheduling next iteration in ${executionSpeed} ms.`);
				const timer = setTimeout(autoRun, executionSpeed);
				useAppStore.getState().setAutoRunTimer(timer);
			} else {
				console.log('[autoRun] Execution done. isRunning set to false.');
				const finalState = useAppStore.getState();
				finalState.setIsRunning(false);
				const finalSum = finalState.variables.Sum;
				console.log('[autoRun] Final sum value:', finalSum);
				finalState.setCurrentExplanation(
					t.stepExplanations.complete.replace('{sum}', String(finalSum))
				);
				finalState.setAutoRunTimer(null);
			}
		};
		
		console.log('[startExecution] Starting autoRun.');
		autoRun();
	}, [stepForward, executionSpeed, t]);

	const resetExecution = useCallback(() => {
		const store = useAppStore.getState();
		store.reset();
		const clickText = language === 'en' 
			? '👆 Click Start to begin!' 
			: '👆 시작 버튼을 눌러보세요!';
		store.setCurrentExplanation(clickText);
	}, [language]);

	return {
		stepForward,
		startExecution,
		resetExecution,
	};
};
