import { slugWithType } from '../objects/slugWithType';
import { ListMusic } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'artist',
	title: 'Artist',
	icon: ListMusic,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Artist Name',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		slugWithType('artist', 'title')
	]
});
