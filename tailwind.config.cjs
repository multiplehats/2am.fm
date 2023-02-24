const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme');

const brand = {
	50: '#fdf3f3',
	100: '#fce4e4',
	200: '#facecf',
	300: '#f6b1b2',
	400: '#ee7b7d',
	500: '#e25153',
	600: '#ce3436',
	700: '#ad282a',
	800: '#8f2527',
	900: '#782425'
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite/**/*.js',
		'./node_modules/svelte-auth-ui/**/*.{html,js,svelte,ts}'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: brand['300'],
					...brand
				},
				dovegray: {
					50: '#F0F0F0',
					100: '#E0E0E0',
					200: '#C2C2C2',
					300: '#A3A3A3',
					400: '#858585',
					500: '#666666',
					600: '#525252',
					700: '#3D3D3D',
					800: '#292929',
					900: '#141414'
				}
			},
			containerWidth: '1500px',
			container: {
				screens: {
					sm: '100%',
					md: '100%',
					lg: '100%',
					xl: '100%',
					'2xl': '1600px'
				},
				center: true,
				padding: {
					DEFAULT: '2rem',
					sm: '2rem',
					lg: '3rem',
					xl: '4rem',
					'2xl': '4rem'
				}
			},
			fontFamily: {
				// sans: ["var(--font-circular)", ...fontFamily.sans],
				serif: ['LORE', ...fontFamily.serif]
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('flowbite-typography'),
		require('flowbite/plugin'),
		require('@tailwindcss/aspect-ratio')
	]
};
