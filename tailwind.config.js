/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					500: '#667eea',
					600: '#5a67d8',
					700: '#4c51bf',
				},
				secondary: {
					500: '#764ba2',
				}
			},
			animation: {
				'pulse-once': 'pulse 0.5s ease-in-out',
				'fade-in': 'fadeIn 0.3s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateX(-10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				}
			}
		},
	},
	plugins: [],
}
