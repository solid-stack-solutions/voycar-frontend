<script>
    // Indicates how many steps of the register process have been completed
    export let currentStep = 0;
</script>

<button
    class="variant-soft btn btn-sm"
    type="button"
    on:click={() => currentStep--}
>
    <img
        src="/chevron-leftIcon.svg"
        class="pr-2"
        alt="Pfeil nach links"
    />Zurück
</button>
