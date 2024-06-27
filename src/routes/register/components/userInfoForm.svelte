<script>
    // Component imports
    import ContinueButton from "./continueButton.svelte";

    // Import utilities
    import { urls, validateEmail } from "$lib/util.js";

    // Definitions
    const indicatorStatus = {
        none: "",
        warning: "!border-warning-400",
        error: "!border-error-600",
    };

    // Formfield binding references
    let emailReference;

    // Will get value "input-error" or "input-warning" according to validators
    let emailIndicator = indicatorStatus.none;
    let passwordIndicator = indicatorStatus.none;

    let showPassword = false;
    let showPasswordValidate = false;
    const btnIcon = {
        locked: "🔐",
        unlocked: "🔓",
    };

    // Formfield binding references
    let passwordRefernce;
    let passwordValidateReference;
    export let formData = {
        email: "",
        password: "",
    };
    // Indicates how many steps of the register process have been completed
    export let currentStep = 0;

    // Functions
    function validateInput() {
        if (validateEmail(emailReference.value)) {
            currentStep++; // Go to next step
        } else {
            emailIndicator = indicatorStatus.warning;
        }
    }
</script>

<!-- Email field -->
<label class="label" for="email_input">
    <span class="font-semibold">Email</span>
</label>
<input
    class="input {emailIndicator}"
    type="text"
    id="email_input"
    placeholder="beispiel.organisation@mail.com"
    bind:value={formData.email}
/>
{#if emailIndicator == indicatorStatus.warning}
    <div class="flex flex-col items-center justify-center transition-opacity">
        <p class="text-sm text-warning-500">Bitte gib eine valide Email-Adresse ein</p>
    </div>
{/if}


<!-- Password field -->
<label class="label" for="password_input">
    <span class="font-semibold">Passwort</span>
</label>
<div class="input-group input-group-divider relative grid-cols-[auto_1fr_auto]">
    <input
        class="w-64 sm:w-72 {passwordIndicator}"
        type={showPassword ? "text" : "password"}
        id="password_input"
        placeholder="Dein super sicheres Passwort ;)"
        bind:this={passwordRefernce}
    />
    <button
        class="absolute right-1 top-1 flex h-8 w-14 items-center rounded-r-full border-l-2 border-surface-500 bg-surface-700 pl-4"
        on:click={() => (showPassword = !showPassword)}
    >
        {#if showPassword}
            {btnIcon.unlocked}
        {:else}
            {btnIcon.locked}
        {/if}
    </button>
</div>
<div class="input-group input-group-divider relative grid-cols-[auto_1fr_auto]">
    <input
        class="w-64 sm:w-72 {passwordIndicator}"
        type={showPasswordValidate ? "text" : "password"}
        id="password_input_validate"
        placeholder="Wiederhole dein Passwort"
        bind:this={passwordValidateReference}
    />
    <button
        class="absolute right-1 top-1 flex h-8 w-14 items-center rounded-r-full border-l-2 border-surface-500 bg-surface-700 pl-4"
        on:click={() => (showPasswordValidate = !showPasswordValidate)}
    >
        {#if showPasswordValidate}
            {btnIcon.unlocked}
        {:else}
            {btnIcon.locked}
        {/if}
    </button>
</div>

<ContinueButton onClick={validateInput} />
