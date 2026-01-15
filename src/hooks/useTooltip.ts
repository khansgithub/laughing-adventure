import { useState, useCallback, useEffect, useRef } from 'react';
import { TooltipPosition } from '../types';

export const useTooltip = () => {
	const [tooltip, setTooltip] = useState<TooltipPosition>({
		x: 0,
		y: 0,
		keyword: null,
		keywordElement: null,
	});
	const tooltipRef = useRef<HTMLDivElement>(null);

	const updateTooltipPosition = useCallback((element: HTMLElement) => {
		const rect = element.getBoundingClientRect();
		setTooltip(prev => ({
			...prev,
			x: rect.left,
			y: rect.bottom + 10,
		}));
	}, []);

	const showTooltip = useCallback((keyword: string, element: HTMLElement) => {
		const rect = element.getBoundingClientRect();
		setTooltip({
			x: rect.left,
			y: rect.bottom + 10,
			keyword,
			keywordElement: element,
		});
	}, []);

	const hideTooltip = useCallback(() => {
		setTooltip({ x: 0, y: 0, keyword: null, keywordElement: null });
	}, []);

	const toggleTooltip = useCallback((keyword: string, element: HTMLElement) => {
		// If clicking the same keyword, toggle it off
		if (tooltip.keyword === keyword && tooltip.keywordElement === element) {
			hideTooltip();
		} else {
			showTooltip(keyword, element);
		}
	}, [tooltip.keyword, tooltip.keywordElement, showTooltip, hideTooltip]);

	// Update tooltip position on scroll/resize
	useEffect(() => {
		if (tooltip.keywordElement) {
			const updatePosition = () => {
				updateTooltipPosition(tooltip.keywordElement!);
			};

			window.addEventListener('scroll', updatePosition, true);
			window.addEventListener('resize', updatePosition);

			return () => {
				window.removeEventListener('scroll', updatePosition, true);
				window.removeEventListener('resize', updatePosition);
			};
		}
	}, [tooltip.keywordElement, updateTooltipPosition]);

	// Handle click outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (tooltip.keyword !== null) {
				const target = event.target as HTMLElement;
				// Check if the click is not on the tooltip
				// Keyword clicks won't bubble here due to stopPropagation in CodeDisplay
				if (tooltipRef.current && !tooltipRef.current.contains(target)) {
					hideTooltip();
				}
			}
		};

		if (tooltip.keyword) {
			document.addEventListener('click', handleClickOutside);

			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	}, [tooltip.keyword, hideTooltip]);

	return {
		tooltip,
		showTooltip,
		hideTooltip,
		toggleTooltip,
		tooltipRef,
	};
};
