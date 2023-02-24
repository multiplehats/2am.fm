import { SeoSchema } from './seo';
import { z } from 'zod';

export const SettingsSchema = z.object({
	title: z.string().nullable(),
	seo: SeoSchema.nullable()
});

export type Settings = z.infer<typeof SettingsSchema>;
