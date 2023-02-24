import { Cog } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'settings',
	title: 'Settings',
	type: 'document',
	icon: Cog,
	preview: { select: { title: 'title', subtitle: 'description' } },
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			name: 'title',
			description: 'This field is the title of your blog.',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'seo',
			title: 'Standaard SEO instellingen',
			type: 'seo'
		})
	]
});
