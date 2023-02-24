import { browser } from '$app/environment';
import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
    if( browser ) {
        // setRadioStations(data.radioStations);
    }
    return {
        ...data
    };
}) satisfies PageLoad;