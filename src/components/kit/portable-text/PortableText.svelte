<script lang="ts">
	import BlockHeading, { type PortableHeadings, headings } from './BlockHeading.svelte';
	import BlockList from './BlockList.svelte';
	import BlockListItem from './BlockListItem.svelte';
	import TypeBreak from './TypeBreak.svelte';
	import { PortableText, type PortableTextComponents } from '@portabletext/svelte';

	export let content: {
		_key?: string | undefined;
		_type: string;
	}[];

	const headingBlocks = headings.reduce((acc, heading) => {
		acc[heading] = BlockHeading;
		return acc;
	}, {} as Record<PortableHeadings, typeof BlockHeading>);
</script>

<PortableText
	value={content}
	components={{
		block: {
			...headingBlocks
		},
		list: {
			bullet: BlockList
		},
		listItem: {
			bullet: BlockListItem
		},
		types: {
			break: TypeBreak
		}
	}}
	onMissingComponent={(message, options) => {
		console.log(message, {
			// eg `someUnknownType`
			type: options.type,

			// 'block' | 'mark' | 'blockStyle' | 'listStyle' | 'listItemStyle'
			nodeType: options.nodeType
		});
	}}
/>
