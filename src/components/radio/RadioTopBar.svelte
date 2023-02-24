<script lang="ts">
	import { currentTime } from '$lib/radio/widgets/clock';
</script>

<div
	class="border-box text-white select-none px-4 w-screen py-2 h-8 font-serif fixed top-0 left-0 z-50"
>
	<div class="flex flex-row justify-between items-center">
		<div>2am.fm</div>

		<div>
			{$currentTime}
		</div>
	</div>
</div>
