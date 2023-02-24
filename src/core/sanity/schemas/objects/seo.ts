import { Flame } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'seo',
	title: 'SEO & Social',
	type: 'object',
	icon: Flame,
	fields: [
		defineField({
			name: 'title',
			title: 'Title for SEO & Social sharing',
			description:
				'Make it as enticing as possible to convert users in social feeds and search engine searches. Ideally between 15 and 70 characters.',
			type: 'string',
			validation: (Rule) => Rule.max(160)
		}),
		defineField({
			name: 'description',
			title: 'Short description for SEO & Social sharing',
			description:
				"⚡️ Optional but highly encouraged as it'll help us convert more visitors from search engines and social. Ideally between 70 and 160 characters.",
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.max(160)
		}),
		defineField({
			name: 'image',
			title: 'Image for SEO & Social sharing',
			description:
				'⚡️ Optional but highly encouraged as it will help us convert more visitors from search engines and social. Ideally between 1200x630 and 2048x2048 pixels.',
			type: 'image',
			options: {
				hotspot: true
			}
		})
	]
});
