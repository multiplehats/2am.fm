import { defineField } from 'sanity';
import slugify from 'slugify';

function formatSlug(input: string, slugStart: string) {
	const slug = slugify(input, { lower: true });
	return slugStart + slug;
}

export function slugWithType(prefix = ``, source = `title`) {
	const slugStart = prefix ? `/${prefix}/` : `/`;

	return defineField({
		name: `slug`,
		type: `slug`,
		options: {
			source,
			slugify: (value: string) => formatSlug(value, slugStart),
			isUnique: (value, context) => context.defaultIsUnique(value, context)
		},
		validation: (Rule) =>
			Rule.required().custom((ctx) => {
				if (typeof ctx?.current === 'undefined') {
					return true;
				}

				if (ctx?.current) {
					if (!ctx?.current.startsWith(slugStart)) {
						return `Slug moet beginnen met "${slugStart}". Klik "Generate" om te resetten.`;
					}

					if (ctx?.current.slice(slugStart.length).split('').includes('/')) {
						return `Slug kan niet nog een "/" hebben na "${slugStart}"`;
					}

					if (ctx?.current === slugStart) {
						return `Slug kan niet leeg zijn`;
					}

					if (ctx?.current.endsWith('/')) {
						return `Slug kan niet eindigen met "/"`;
					}
				}

				return true;
			})
	});
}
