<script>
    // Callback function to handle the onClick event
    export let onClick;
</script>

<!-- Continue button -->
<div class="flex flex-col items-center">
    <button
        class="variant-filled-primary btn w-full"
        on:click={onClick}
    >
        Weiter
    </button>
</div>
