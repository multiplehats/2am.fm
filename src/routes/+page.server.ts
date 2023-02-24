import { getRadioStations } from '$lib/radio/queries';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        radioStations: getRadioStations()
    };
}) satisfies PageServerLoad;