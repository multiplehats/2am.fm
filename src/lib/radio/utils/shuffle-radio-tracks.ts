import type { RadioTrack } from '../types';

export function shuffleTracks(tracks: RadioTrack[]) {
	const shuffledTracks = [...tracks];

	for (let i = shuffledTracks.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledTracks[i], shuffledTracks[j]] = [shuffledTracks[j], shuffledTracks[i]];
	}

	log.info('Shuffled tracks:', shuffledTracks);

	return shuffledTracks;
}
