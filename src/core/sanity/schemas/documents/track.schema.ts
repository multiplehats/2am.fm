import { slugWithType } from '../objects/slugWithType';
import { ListMusic } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'track',
	title: 'Track',
	icon: ListMusic,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		slugWithType('track', 'title'),
		defineField({
			name: 'youtubeId',
			title: 'YouTube ID',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'date',
			title: 'Date',
			type: 'datetime',
			initialValue: () => new Date().toISOString()
		})
	]
});
