<script lang="ts">
	import { currentTrack } from '$lib/radio/stores/store';
</script>

<div
	class="absolute bg-transparent w-full h-full justify-center items-center z-40 flex content-center"
>
	<div class="font-serif text-2xl text-white">
		{$currentTrack?.title}
	</div>
</div>
