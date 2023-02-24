<script context="module" lang="ts">
	export const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] satisfies PortableHeadings[];
	export type PortableHeadings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
</script>

<script lang="ts">
	import { Heading } from '$components/kit';
	import type { BlockComponentProps } from '@portabletext/svelte';
	import { cn } from '$lib/shared/utils/class-utils';

	export let portableText: BlockComponentProps;

	let as: PortableHeadings = 'h2';

	$: ({ value: { style } } = portableText);
	$: if (style) {
		as = style as PortableHeadings;
	}

	const classes = {
		h1: 'font-sans font-medium',
		h2: 'font-sans font-medium',
		h3: 'font-sans font-medium',
		h4: 'font-sans font-medium',
		h5: 'font-sans font-medium',
		h6: 'font-sans font-medium',
	} satisfies Record<PortableHeadings, string>;
</script>

{#if style}
	<Heading {as} class={cn(classes[as])}>
		<slot />
	</Heading>
{/if}
