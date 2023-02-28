<script lang="ts">
	import Pulse from '$components/shared/Pulse.svelte';
	import { togglePlay, playNext } from '$lib/radio/stores';
	import { isPlaying, isBuffering, isPaused } from '$lib/radio/stores/store';
	import { Pause, Play, SkipForward, SkipBack, Book } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
</script>

<div
	in:fly={{ x: 0, y: 100, duration: 500 }}
	class="border-box w-screen group font-serif fixed bottom-0 left-0 z-50"
>
	<div
		class=" bg-white/5 p-6 sm:-mb-4 group-hover:mb-0 transition-all duration-200 ease-in-out
		 ring-1 flex items-center justify-center ring-inset ring-white/10 max-w-screen-sm mx-auto rounded-t-xl h-14"
	>
		<div class="flex items-center space-x-6 justify-center">
			<div class="flex-auto flex items-center justify-evenly">
				<button type="button" class="text-gray-200 xl:block" aria-label="Next">
					<SkipBack class="sm:w-6 sm:h-6 h-5 w-5 fill-current text-current" />
				</button>
			</div>

			<button
				type="button"
				class="group bg-gradient-to-b px-3 py-2 rounded-full text-sm border leading-none from-gray-800 to-gray-800/70 text-gray-200 border-gray-700 transition-all duration-500 mx-auto text-center flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 ring-1 ring-slate-900/5 shadow-md"
				aria-label={$isPlaying ? 'Pause' : $isBuffering ? 'Buffering' : 'Play'}
				disabled={$isBuffering}
				on:click={() => togglePlay()}
			>
				{#if $isPlaying || ($isBuffering)}
					<Pause class="w-8 h-8 fill-current text-current" />
				{:else if $isPaused && !$isBuffering}
					<Play class="w-8 h-8 fill-current text-current" />
				{/if}
			</button>

			<div class="flex-auto flex items-center justify-evenly">
				<button
					type="button"
					on:click={() => playNext()}
					class="text-gray-200 xl:block"
					aria-label="Next"
				>
					<SkipForward class="sm:w-6 sm:h-6 h-5 w-5 fill-current text-current" />
				</button>
			</div>
		</div>
	</div>
</div>
