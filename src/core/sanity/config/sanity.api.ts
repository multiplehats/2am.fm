import type { ClientConfig } from '@sanity/client';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_SANITY_API_VERSION } from '$env/static/public';

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

export const projectId = PUBLIC_SANITY_PROJECT_ID;
export const dataset = PUBLIC_SANITY_DATASET;

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = PUBLIC_SANITY_API_VERSION || "2022-11-15";
// useCdn == true gives fast, cheap responses using a globally distributed cache.
// It makes sense to use the CDN if the GROQ webhook outlined in `pages/api/revalidate.ts` isn't setup yet.
// With the hook setup though it's more important to newer return stale data since the request count is so low, especially after removing the `export const revalidate = 1` statements in `page.tsx` files.
export const useCdn = import.meta.env.PROD;

// This is the document id used for the preview secret that's stored in your dataset.
// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
export const previewSecretId: `${string}.${string}` = "preview.secret";

export const config = {
  apiVersion,
  dataset,
  projectId,
  useCdn,
} satisfies ClientConfig;