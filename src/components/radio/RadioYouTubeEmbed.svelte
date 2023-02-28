<script lang="ts">
	import YouTube from '$components/shared/YouTube.svelte';
	import {
		currentTrack,
		ytPlayerCtxStore,
		ytPlayerReadyStore,
		isPlayingStore,
		isBufferingStore,
		isPausedStore
	} from '$lib/radio/stores/store';
	import { logger } from '$lib/shared/utils/logger';
	import type { Options } from 'youtube-player/dist/types';

	const log = logger('RadioYouTubeEmbed');
	const protocol = import.meta.env.DEV ? 'http' : 'https';
	const playerOptions: Options = {
		host: `${protocol}://www.youtube-nocookie.com`,
		playerVars: {
			color: 'white',
			autoplay: 0,
			controls: 0,
			disablekb: 1,
			modestbranding: 1,
			fs: 0,
			cc_load_policy: 1,
			iv_load_policy: 3,
			playsinline: 1,
			rel: 0,
			enablejsapi: 1,
			origin: window.location.origin
		}
	};
</script>

{#if $currentTrack}
	<div
		class="fixed select-none inset-0 z-0 overflow-hidden opacity-1 transition-transform duration-100 ease-in-out flex items-center justify-center"
	>
		<YouTube
			bind:player={$ytPlayerCtxStore}
			on:play={({ detail }) => {
				log.debug('on:play', detail);
				isPlayingStore.set(true);
				isBufferingStore.set(false);
				isPausedStore.set(false);
			}}
			on:buffering={({ detail }) => {
				log.debug('on:buffering', detail);
				isPlayingStore.set(false);
				isBufferingStore.set(true);
			}}
			on:pause={({ detail }) => {
				log.debug('on:pause', detail);
				isPausedStore.set(true);
				isPlayingStore.set(false);
			}}
			videoId={$currentTrack.youtubeId}
			on:ready={() => ytPlayerReadyStore.set(true)}
		/>
	</div>
{/if}

<style>
	:global(.yt-player) {
		position: relative;
		display: block;
		width: 100%;
		height: 300%;
		transform: scale(1);
	}

	@media (max-width: 1650px) {
		:global(.yt-player) {
			transform: scale(1.3);
		}
	}

	@media (max-width: 1400px) {
		:global(.yt-player) {
			transform: scale(1.5);
		}
	}

	@media (max-width: 1399px) {
		:global(.yt-player) {
			transform: scale(2);
		}
	}

	@media (max-width: 1100px) {
		:global(.yt-player) {
			transform: scale(2.5);
		}
	}

	@media (max-width: 800px) {
		:global(.yt-player) {
			transform: scale(3);
		}
	}

	@media (max-width: 600px) {
		:global(.yt-player) {
			transform: scale(4);
		}
	}

	@media (max-width: 400px) {
		:global(.yt-player) {
			transform: scale(6);
		}
	}
</style>
