import { SanityImageObjectExtendSchema } from './image';
import { z } from 'zod';

export const SeoSchema = z.object({
	_type: z.literal('seo'),
	description: z.string().nullable(),
	title: z.string().nullable(),
	image: SanityImageObjectExtendSchema.nullable()
});
