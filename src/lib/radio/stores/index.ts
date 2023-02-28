import { LOCALSTORAGE_KEY as LS_KEY } from '$lib/shared/constants';
import { logger } from '$lib/shared/utils/logger';
import type { RadioStationQuery } from '../queries';
import { shuffleTracks } from '../utils/shuffle-radio-tracks';
import {
	currentTrack,
	radioStore,
	shuffleEnabledStore,
	ytPlayerCtxStore,
	pressedStartStore,
	fullyInitalized,
	isPlayingStore,
	nextTrack,
	isBufferingStore
} from './store';
import { get } from 'svelte/store';



const log = logger('📻 [actions] radio');

function maybeGetLocalStorage(key: string, value: string) {
	const saved = localStorage.getItem(key);

	if (saved) {
		return saved;
	}

	localStorage.setItem(key, value);

	return value;
}

/**
 * Bootstrap the radio stores
 */
export const init = (radioStations: RadioStationQuery[]) => {
	const savedStation = maybeGetLocalStorage(LS_KEY.currentStationId, radioStations[0].id);
	const savedTrack = maybeGetLocalStorage(LS_KEY.currentTrackId, radioStations[0].tracks[0].id);
	const shuffleEnabled = maybeGetLocalStorage(LS_KEY.shuffleEnabled, 'true') === 'true';

	shuffleEnabledStore.set(shuffleEnabled);

	radioStore.update(() => {
		return radioStations.map((station) => ({
			...station,
			active: station.id === savedStation,
			tracks: station.tracks.map((track) => ({
				...track,
				active: track.id === savedTrack
			}))
		}));
	});
};

/**
 * Change to a specific station.
 */
export const changeStation = (id: string) => {
	radioStore.update((radioStations) => {
		if (!radioStations) {
			throw new Error('No radioStations found');
		}

		const station = radioStations.find((station) => station.id === id);

		if (!station) {
			throw new Error('Tried to change to a station that does not exist');
		}

		log.info('Changing station to:', station.name);

		localStorage.setItem(LS_KEY.currentStationId, station.id);

		return radioStations.map((station) => {
			if (station.id === id) {
				const tracks = get(shuffleEnabledStore) ? shuffleTracks(station.tracks) : station.tracks;
				tracks[0].active = true;

				return {
					...station,
					active: true,
					tracks: tracks
				};
			}

			return {
				...station,
				active: false,
				tracks: station.tracks.map((track) => ({
					...track,
					active: false
				}))
			};
		});
	});
};

/**
 * Change to a specific track.
 */
export const changeTrack = (id: string) => {
	radioStore.update((radioStations) => {
		if (!radioStations) {
			throw new Error('No radioStations found');
		}

		const station = radioStations.find((station) => station.active);

		if (!station) {
			throw new Error('Tried to change to a track that does not exist');
		}

		log.info('Changing track to:', id);

		localStorage.setItem(LS_KEY.currentTrackId, id);

		return radioStations.map((station) => {
			if (station.active) {
				return {
					...station,
					tracks: station.tracks.map((track) => {
						if (track.id === id) {
							return {
								...track,
								active: true
							};
						}

						return {
							...track,
							active: false
						};
					})
				};
			}

			return station;
		});
	});
};

/***********************
 * Actions: Shuffle
 ***********************/

export const toggleShuffle = () => {
	shuffleEnabledStore.update((value) => !value);
};

/***********************
 * Actions: Play, pause, next, prev
 * These are all related to the YT player
 ***********************/

/**
 * Gets pressed when the user first lands on the page.
 */
export const pressStart = () => {
	const ytPlayerCtx = get(ytPlayerCtxStore);
	const currTrack = get(currentTrack);
	const initalised = get(fullyInitalized);

	if (!initalised) {
		throw new Error('YT player not initalised');
	}

	if (!ytPlayerCtx) {
		throw new Error('YT player context not found');
	}

	if (!currTrack) {
		throw new Error('No current track found');
	}

	log.info('Booting up');

	ytPlayerCtx.playVideo();

	setTimeout(() => {
		pressedStartStore.set(true);
	}, 1000);
};

export const togglePlay = () => {
	const ytPlayerCtx = get(ytPlayerCtxStore);
	const isPlaying = get(isPlayingStore);

	if (isPlaying) {
		log.info('Pausing');
		ytPlayerCtx?.pauseVideo();
	} else {
		log.info('Playing');
		ytPlayerCtx?.playVideo();
	}
};

export const playNext = async () => {
	const ytPlayerCtx = get(ytPlayerCtxStore);
	const next = get(nextTrack);

	// isBufferingStore.set(true);

	if (!next) {
		throw new Error('No next track found');
	}

	log.info('Playing next track:', next.title);

	isBufferingStore.set(true);
	changeTrack(next.id);

	setTimeout(async () => {
		await ytPlayerCtx?.playVideo();

		isBufferingStore.set(false);
	}, 300);
};