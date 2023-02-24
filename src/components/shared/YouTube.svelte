<script lang="ts">
	import { cn } from '$lib/shared/utils/class-utils';
	import { logger } from '$lib/shared/utils/logger';
	import { createEventDispatcher, onMount } from 'svelte';

	/* @vite-ignore */
	import YoutubePlayer from 'youtube-player';
	import PlayerStates from 'youtube-player/dist/constants/PlayerStates';
	import type { Options, YouTubePlayer } from 'youtube-player/dist/types';

	const log = logger('YouTube');

	export let videoId: string; // Youtube video ID (required)
	export let options: Options = {}; // YouTube player options (optional)
	export let player: YouTubePlayer | null = null; // YouTube player instance

	let playerElem: HTMLElement; // player DOM element reference

	const dispatch = createEventDispatcher<{
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ready: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		error: any;
		stateChange: { data: PlayerStates };
		end: { data: PlayerStates };
		play: { data: PlayerStates };
		buffering: { data: PlayerStates };
		pause: { data: PlayerStates };
		playbackRateChange: { data: number };
		playbackQualityChange: { data: string };
	}>();

	// Create and tear down player as component mounts or unmounts
	onMount(() => createPlayer());

	// Update videoId and load new video if URL changes
	$: load(videoId);

	function createPlayer(): () => void {
		player = YoutubePlayer(playerElem, options);

		// Register event handlers
		player.on('ready', (e: CustomEvent) => {
			dispatch('ready', e);
			// Start playing
			load(videoId);
		});

		player.on('error', (e) => {
			let message = 'Unknown error';
			const ev = e as unknown as { data: number };

			if (ev?.data === 2) {
				message =
					'The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.';
			}
			log.error('YouTube Embed API error', e?.data ?? 'Unknown error');
			dispatch('error', e);
		});

		player.on('stateChange', (e: CustomEvent & { data: PlayerStates }) => {
			dispatch('stateChange', e);

			switch (e.data) {
				case PlayerStates.BUFFERING:
					dispatch('buffering', e);
					break;

				case PlayerStates.ENDED:
					dispatch('end', e);
					break;

				case PlayerStates.PLAYING:
					dispatch('play', e);
					break;

				case PlayerStates.PAUSED:
					dispatch('pause', e);
					break;
			}
		});

		player.on('playbackRateChange', (e: CustomEvent<{ data: number }>) => {
			dispatch('playbackRateChange', e.detail);
		});

		player.on('playbackQualityChange', (e: CustomEvent<{ data: string }>) => {
			dispatch('playbackQualityChange', e.detail);
		});

		// Tear down player when done
		return async () => {
			try {
				await player?.destroy();
			} catch (error) {
				const err = new Error('Error destroying player', { cause: error as Error });
				dispatch('error', err);
			}
		};
	}

	function load(videoId: string) {
		// this is needed because the loadVideoById function always starts playing,
		// even if you have set autoplay to 1 whereas the cueVideoById function
		// never starts autoplaying
		if (player && videoId) {
			if (options && options.playerVars && options.playerVars.autoplay === 1) {
				player.loadVideoById(videoId);
			} else {
				player.cueVideoById(videoId);
			}
		}
	}
</script>

<div bind:this={playerElem} class={cn('yt-player', $$props.class)} />
