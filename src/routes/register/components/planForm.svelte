<script>
    // Component imports
    import BackButton from "./backButton.svelte";

    // Indicates how many steps of the register process have been completed
    export let currentStep = 0;
</script>

<BackButton bind:currentStep></BackButton>
