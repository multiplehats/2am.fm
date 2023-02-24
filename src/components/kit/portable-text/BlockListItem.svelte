<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';

	export let portableText: BlockComponentProps;

	$: ({ value } = portableText);
</script>

<div>List</div>
