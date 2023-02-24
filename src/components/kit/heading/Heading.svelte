<script lang="ts">
	import { cn } from 'src/utils/class-utils';
	import { balancer } from 'svelte-action-balancer';

	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
</script>

<svelte:element
	this={as}
	data-cy="heading"
	{...$$props}
	class={cn('font-heading font-bold text-black', $$props.class)}
	use:balancer
>
	<slot />
</svelte:element>
