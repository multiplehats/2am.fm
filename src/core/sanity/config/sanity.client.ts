import { PUBLIC_SANITY_API_READ_TOKEN } from '$env/static/public';
import { config } from './sanity.api';
import sanityClient from '@sanity/client';
import { makeSafeQueryRunner } from 'groqd';

export const client = (withToken = false) =>
	withToken
		? sanityClient({
				...config,
				useCdn: false,
				token: PUBLIC_SANITY_API_READ_TOKEN
		  })
		: sanityClient(config);

export const runSanityQuery = makeSafeQueryRunner(
	//      👇 add a second arg
	(query, params: Record<string, unknown> = {}) => client(false).fetch(query, params)
);
