import { slugWithType } from '../objects/slugWithType';
import trackType from './track.schema';
import { Speaker } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'radioStation',
	title: 'Radio Station',
	icon: Speaker,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Radio Station Name',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		slugWithType('radio', 'name'),
		defineField({
			name: 'coverImage',
			title: 'Cover image',
			type: 'image'
		}),
		defineField({
			name: 'tracks',
			title: 'Tracks',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: trackType.name }]
				}
			],
			validation: (rule) => rule.required()
		})
	]
});
