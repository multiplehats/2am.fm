import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: vercel()
	},

	vitePlugin: {
		experimental: {
			// Enable experimental Svelte inspector; see:
			// https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#inspector
			inspector: {
				toggleKeyCombo: 'control-shift',
				holdMode: true,
				showToggleButton: 'never'
			}
		}
	}
};

export default config;
