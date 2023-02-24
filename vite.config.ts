import { sveltekit } from '@sveltejs/kit/vite';
import { ssp } from 'sveltekit-search-params/plugin';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [ssp(), sveltekit(), tsconfigPaths()]
});
