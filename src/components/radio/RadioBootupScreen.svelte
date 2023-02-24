<script lang="ts">
	import { pressStart } from '$lib/radio/stores';
	import { fullyInitalized, pressedStart } from '$lib/radio/stores/store';
	import isTouch from '$lib/shared/utils/is-touch';
	import { onMount } from 'svelte';

	let isTouchDevice = false;

	onMount(() => {
		isTouchDevice = isTouch();
	});
</script>

<div
	class="absolute w-full text-2xl font-serif h-full text-white bg-black z-30 flex items-center content-center justify-center"
>
	{#if $fullyInitalized}
		<button
			class="h-full w-full border border-transparent select-auto cursor-pointer rounded-none bg-transparent py-2 px-4"
			on:click={() => pressStart()}
		>
			{#if isTouchDevice}
				Tap to play
			{:else}
				Press space to play
			{/if}
		</button>
	{:else}
		<span class="select-none">Booting up...</span>
	{/if}
</div>
