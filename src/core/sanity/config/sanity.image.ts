import { dataset, projectId } from './sanity.api';
import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: SanityImageSource) => imageBuilder.image(source).auto('format');
