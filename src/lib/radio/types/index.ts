import type { RadioStationQuery, TrackSelection } from '../queries';

export type RadioTrack = TrackSelection & {
	active: boolean;
};

export type RadioStationStore = Omit<RadioStationQuery, 'tracks'> & {
	active: boolean;
	tracks: RadioTrack[];
};
