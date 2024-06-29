<script>
    // Component imports
    import ContinueButton from "./continueButton.svelte";
    import PasswordInputs from "$lib/passwordWithValidate.svelte";

    // Import utilities
    import { validateEmail } from "$lib/util.js";

    // Definitions
    const indicatorStatus = {
        none: "",
        warning: "!border-warning-400",
    };

    // Will get value "error" or "warning" according to validators
    let emailIndicator = indicatorStatus.none;

    // Formfield binding references
    export let formData = {
        email: "",
        password: "",
    };

    // Indicates how many steps of the register process have been completed
    export let currentStep = 0;

    // Functions
    // Will be bound to the PasswordInput component
    let validatePassword;

    function validateInput() {
        if (!validateEmail(formData.email)) {
            emailIndicator = indicatorStatus.warning;
            return;
        }

        emailIndicator = indicatorStatus.none;

        if (!validatePassword()) {
            return;
        }

        currentStep++;
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
{#if emailIndicator === indicatorStatus.warning}
    <div class="flex flex-col items-center justify-center transition-opacity">
        <p class="text-sm text-warning-400">
            Bitte gib eine valide Email-Adresse ein
        </p>
    </div>
{/if}

<PasswordInputs
    bind:password={formData.password}
    bind:validateInput={validatePassword}
/>

<ContinueButton onClick={validateInput} />
