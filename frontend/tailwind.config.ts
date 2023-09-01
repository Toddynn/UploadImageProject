import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			screens: {
				xlsm: '360px',

				xsm: '385px',

				mdsm: '468px',

				gm: '910px',

				'3xl': '1636px',
			},
			colors: {
				background: '#262D38',
				darkGray: '#374151',
				lightBlue: '#97B2DE',
				smoothBlue: '#6C7F9E',
			},
		},
	},
	plugins: [],
};
export default config;
