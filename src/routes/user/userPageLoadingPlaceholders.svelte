<div class="relative pt-1">
    <div class="placeholder animate-pulse w-60 h-8 mb-4" />
    <div class="space-y-2">
        {#each { length: 3 } as _}
            <div class="placeholder animate-pulse h-10"></div>
        {/each}
    </div>
    <div class="placeholder animate-pulse absolute w-60 h-12 right-0 mt-2" />
</div>
