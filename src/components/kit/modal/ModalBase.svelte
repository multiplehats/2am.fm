<script lang="ts">
	import { Modal } from 'flowbite';
	import type { Modal as ModalType, ModalOptions, ModalInterface } from 'flowbite';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { cn } from '$lib/shared/utils/class-utils';

	const dispatch = createEventDispatcher<{
		hide: { ctx: ModalInterface }
		show: { ctx: ModalInterface }
		toggle: { ctx: ModalInterface }
	}>();

	type Sizes = "sm" | "md";

	let modal: ModalType | null = null;

	export let id: string;
	export let show = false;
	export let size: Sizes = "md";

	const sizeClasses = {
		sm: "max-w-xl",
		md: "max-w-2xl"
	} satisfies Record<Sizes, string>;

	const modalOptions = {
		placement: 'bottom-right',
		backdrop: 'dynamic',
		backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
		onHide: (ctx) => {
			dispatch('hide', {ctx});
		},
		onShow: (ctx) => {
			dispatch('show', {ctx});
		},
		onToggle: (ctx) => {
			dispatch('toggle', {ctx});
		}
	} satisfies ModalOptions;

	onMount(() => {
		const $modalElement = document.getElementById(id);

        if(!$modalElement) return;

		modal = new Modal($modalElement, modalOptions);
	});

	onDestroy(() => {
		if(modal) {
			modal = null;
		}
	});

	$: if(browser && modal) {
		show ? modal.show() : modal.hide();
	}
</script>

<div
	{id}
	tabindex="-1"
	aria-hidden="true"
	class="fixed top-0 right-0 left-0 z-50 hidden h-modal w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
>
	<div class={cn('relative h-full w-full p-4 md:h-auto', sizeClasses[size], $$props.class)}>
		<slot />
	</div>
</div>
