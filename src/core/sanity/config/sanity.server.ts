import { SANITY_API_WRITE_TOKEN } from '$env/static/private';
import { config } from './sanity.api';
import sanityClient from '@sanity/client';

export const serverClient = sanityClient({
	...config,
	useCdn: false,
	token: SANITY_API_WRITE_TOKEN
});
