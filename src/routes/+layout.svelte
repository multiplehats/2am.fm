<script lang="ts">
	import '../app.css';
	import 'flowbite';
	import toast, { Toaster } from 'svelte-french-toast';
</script>

<Toaster />
<slot />

<style>
	@font-face {
		font-family: 'LORE';
		src: url('/fonts/LORE-Regular.woff2') format('woff2'),
			url('/fonts/LORE-Regular.woff') format('woff');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
		ascent-override: 105%;
	}

	@font-face {
		font-family: 'LORE';
		src: url('/fonts/LORE-Bold.woff2') format('woff2'), url('/fonts/LORE-Bold.woff') format('woff');
		font-weight: bold;
		font-style: normal;
		font-display: swap;
	}
</style>
