<div class="relative pt-1">
    <div class="placeholder mb-4 h-8 w-60 animate-pulse" />
    <div class="space-y-2">
        {#each { length: 3 } as _}
            <div class="placeholder h-10 animate-pulse"></div>
        {/each}
    </div>
    <div class="placeholder absolute right-0 mt-2 h-12 w-60 animate-pulse" />
</div>
