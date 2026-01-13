import { useState, useCallback } from 'react';
import { TooltipPosition } from '../types';

export const useTooltip = () => {
	const [tooltip, setTooltip] = useState<TooltipPosition>({
		x: 0,
		y: 0,
		keyword: null,
	});

	const showTooltip = useCallback((keyword: string, x: number, y: number) => {
		setTooltip({ x, y, keyword });
	}, []);

	const hideTooltip = useCallback(() => {
		setTooltip({ x: 0, y: 0, keyword: null });
	}, []);

	return {
		tooltip,
		showTooltip,
		hideTooltip,
	};
};
