<div class="relative pt-1">
    <div class="mb-4 placeholder animate-pulse w-60 h-8" />
    <div class="space-y-2">
        {#each { length: 3 } as _}
            <div class="placeholder animate-pulse h-10"></div>
        {/each}
    </div>
    <div class="placeholder animate-pulse w-60 h-12 absolute right-0 mt-2" />
</div>
