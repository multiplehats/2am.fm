<script lang="ts">
	import RadioBackground from '$components/radio/RadioBackground.svelte';
	import RadioBootupScreen from '$components/radio/RadioBootupScreen.svelte';
	import RadioTopBar from '$components/radio/RadioTopBar.svelte';
	import RadioTrackInfo from '$components/radio/RadioTrackInfo.svelte';
	import RadioYouTubeEmbed from '$components/radio/RadioYouTubeEmbed.svelte';
	import { init, pressStart } from '$lib/radio/stores';
	import { radioInitialized, pressedStart } from '$lib/radio/stores/store';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(() => {
		init(data.radioStations);
	});
</script>

<div class="h-screen relative">
	<!-- Always visible-->
	<RadioTopBar />

	<!-- Only visible when the radio is not playing. -->
	{#if !$pressedStart}
		<RadioBootupScreen />
	{:else}
		<!-- Only visible when the radio is playing. -->
		<RadioTrackInfo />
		<RadioBackground />
	{/if}

	<!-- The YouTube embed. -->
	{#if $radioInitialized}
		<RadioYouTubeEmbed />
	{/if}
</div>
