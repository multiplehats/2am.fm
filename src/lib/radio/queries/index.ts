import { runSanityQuery } from '$core/sanity/config/sanity.client';
import { q, type InferType, type Selection, type TypeFromSelection } from 'groqd';

const TrackSelection = {
	id: ['_id', q.string()],
	title: q.string(),
	youtubeId: q.string(),
	date: q.date()
} satisfies Selection
export type TrackSelection = TypeFromSelection<typeof TrackSelection>

const RadioStationFields = {
	id: ['_id', q.string()],
	name: q.string(),
	tracks: q('tracks[]')
		.filter()
		.deref()
		.grab(TrackSelection)
} satisfies Selection

const RadioStationQuery = q('*')
	.filter("_type == 'radioStation' && slug.current == $slug")
	.grab(RadioStationFields)
	.slice(0);
export type RadioStationQuery = InferType<typeof RadioStationQuery>;

const RadioStationsQuery = q('*').filter("_type == 'radioStation'").grab(RadioStationFields);
export type RadioStationsQuery = InferType<typeof RadioStationsQuery>;

/**
 * Get a radio station by its slug.
 *
 * @param stationSlug Without the "radio/" prefix
 */
export const getRadioStationBySlug = async (stationSlug: string) => {
	const data = await runSanityQuery(RadioStationQuery, {
		slug: `/radio/${stationSlug}`
	});

	return data;
};

/**
 * Get all radio stations.
 */
export const getRadioStations = async () => {
	const data = await runSanityQuery(RadioStationsQuery);

	return data;
};
