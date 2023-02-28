import { LOCALSTORAGE_KEY as LS_KEY } from '$lib/shared/constants';
import { lsWritable } from '$lib/shared/utils/localstorage-store';
import type { RadioStationStore } from '../types';
import { derived, writable } from 'svelte/store';
import type { YouTubePlayer } from 'youtube-player/dist/types';


export const shuffleEnabledStore = lsWritable<boolean>(LS_KEY.shuffleEnabled, true);
export const radioStore = writable<RadioStationStore[] | null>(null);
export const isPlayingStore = writable<boolean>(false);
export const isPausedStore = writable<boolean>(false);
export const isBufferingStore = writable<boolean>(false);
export const ytPlayerCtxStore = writable<YouTubePlayer | null>(null);
export const ytPlayerReadyStore = writable<boolean>(false);
export const pressedStartStore = writable<boolean>(false);

export const radioInitialized = derived([radioStore], ([$radioStore]) => {
	return !!$radioStore;
});

export const pressedStart = derived([pressedStartStore], ([$pressedStartStore]) => {
	return $pressedStartStore;
});

export const isPlaying = derived([isPlayingStore], ([$isPlayingStore]) => {
	return $isPlayingStore;
});

export const isBuffering = derived([isBufferingStore], ([$isBufferingStore]) => {
	return $isBufferingStore;
});

export const isPaused = derived([isPausedStore], ([$isPausedStore]) => {
	return $isPausedStore;
});

/***********************
 * Current Station 📻
 ***********************/

const _currentStation = derived(radioStore, ($radio) => {
	if (!$radio) {
		return null;
	}

	return $radio.find((station) => station.active);
});

const _currentStationIndex = derived([radioStore, _currentStation], ([$radio, $currentStation]) => {
	if (!$radio || !$currentStation) {
		return null;
	}

	return $radio.findIndex((station) => station.id === $currentStation.id);
});

export const currentStation = derived(
	[_currentStationIndex, _currentStation],
	([$_currentStationIndex, $_currentStation]) => {
		if ($_currentStationIndex === null || !$_currentStation) {
			return null;
		}

		return {
			index: $_currentStationIndex,
			...$_currentStation
		};
	}
);

/***********************
 * Current Track 🎼
 ***********************/

const _currentTrack = derived(currentStation, ($currentStation) => {
	if (!$currentStation) {
		return null;
	}

	const current = $currentStation.tracks.find((track) => track.active);

	if (current) {
		return current;
	}

	return $currentStation.tracks[0];
});

const _currentTrackIndex = derived(
	[currentStation, _currentTrack],
	([$currentStation, $currentTrack]) => {
		if (!$currentStation || !$currentTrack) {
			return null;
		}

		return $currentStation.tracks.findIndex((track) => track.id === $currentTrack.id);
	}
);

export const currentTrack = derived(
	[_currentTrackIndex, _currentTrack],
	([$_currentTrackIndex, $_currentTrack]) => {
		if ($_currentTrackIndex === null || !$_currentTrack) {
			return null;
		}

		return {
			index: $_currentTrackIndex,
			...$_currentTrack
		};
	}
);

/***********************
 * Next Track 🎼
 ***********************/

export const nextTrack = derived(
	[currentStation, _currentTrackIndex],
	([$currentStation, $_currentTrackIndex]) => {
		if (!$currentStation || $_currentTrackIndex === null) {
			return null;
		}

		const nextIndex = $_currentTrackIndex + 1;

		if (nextIndex >= $currentStation.tracks.length) {
			return $currentStation.tracks[0];
		}

		return $currentStation.tracks[nextIndex];
	}
);

/***********************
 * Previous Track 🎼
 ***********************/

export const previousTrack = derived(
	[currentStation, _currentTrackIndex],
	([$currentStation, $_currentTrackIndex]) => {
		if (!$currentStation || $_currentTrackIndex === null) {
			return null;
		}

		const nextIndex = $_currentTrackIndex - 1;

		if (nextIndex < 0) {
			return $currentStation.tracks[$currentStation.tracks.length - 1];
		}

		return $currentStation.tracks[nextIndex];
	}
);

export const fullyInitalized = derived(
	[radioInitialized, ytPlayerReadyStore, ytPlayerCtxStore, currentTrack],
	([$radioInitialized, $ytPlayerReadyStore, $ytPlayerCtxStore, $currentTrack]) => {
		return !!$radioInitialized && $ytPlayerReadyStore && !!$ytPlayerCtxStore && !!$currentTrack;
	}
);