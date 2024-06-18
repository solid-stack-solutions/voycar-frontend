<div>
    <div class="placeholder animate-pulse pb-4 pl-2 w-60 h-6"></div>
    <div class="p-4 space-y-6">
		<div class="grid grid-cols-2 gap-8">
            {#each {length: 10} as _,i }
            <div class="placeholder animate-pulse h-6" />
            {/each}
		</div>
		<div class="grid grid-cols-4 gap-4">
			{#each {length: 4} as _,i }
            <div class="placeholder animate-pulse h-4" />
            {/each}
		</div>
        {#each {length: 2} as _,i }
            <div class="grid grid-cols-4 gap-4">
                <div class="placeholder animate-pulse" />
                <div class="placeholder animate-pulse" />
            </div>
        {/each}
    </div>
   </div>