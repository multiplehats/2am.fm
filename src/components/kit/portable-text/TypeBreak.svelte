<div class="relative">
	<div class="absolute inset-0 flex items-center" aria-hidden="true">
		<div class="w-full border-t border-dotted border-dovegray-200" />
	</div>
	<div class="relative flex justify-center">
		<span class="space-x-4 bg-white px-4 text-2xl">
			{#each Array(3) as _, i}
				<span class="select-none px-0.5" key={i}> 🍉 </span>
			{/each}
		</span>
	</div>
</div>
