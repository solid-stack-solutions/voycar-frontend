<script>
    // Indicates how many steps of the register process have been completed
    export let currentStep = 0;
</script>

<!-- Continue button -->
<div class="flex flex-col items-center">
    <button
        class="variant-filled-primary btn w-full"
        on:click={() => {
            currentStep++;
        }}
    >
        Weiter
    </button>
</div>
