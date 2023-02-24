import { getRadioStationBySlug } from '$lib/radio/queries';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    return {
        station: getRadioStationBySlug(params.station)
    };
}) satisfies PageServerLoad;