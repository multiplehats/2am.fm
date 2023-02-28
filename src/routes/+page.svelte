<script lang="ts">
	import RadioBackground from '$components/radio/RadioBackground.svelte';
	import RadioBootupScreen from '$components/radio/RadioBootupScreen.svelte';
	import RadioBottomBar from '$components/radio/RadioBottomBar.svelte';
	import RadioTopBar from '$components/radio/RadioTopBar.svelte';
	import RadioTrackInfo from '$components/radio/RadioTrackInfo.svelte';
	import RadioYouTubeEmbed from '$components/radio/RadioYouTubeEmbed.svelte';
	import { init, pressStart } from '$lib/radio/stores';
	import {
		radioInitialized,
		pressedStart,
		currentTrack,
		fullyInitalized
	} from '$lib/radio/stores/store';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(() => {
		init(data.radioStations);
	});
</script>

<svelte:head>
		<title>{$pressedStart ? `NOW PLAYING: ${$currentTrack?.title}` : '2am.fm'}</title>
</svelte:head>

<div class="h-screen relative">
	<RadioTopBar />

	{#if $pressedStart}
		<RadioTrackInfo />
		<RadioBottomBar />
		<RadioBackground />
	{:else}
		<RadioBootupScreen />
	{/if}

	{#if $radioInitialized}
		<RadioYouTubeEmbed />
	{/if}
</div>
