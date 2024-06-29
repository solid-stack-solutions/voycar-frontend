<script>
    // Component imports
    import ContinueButton from "./continueButton.svelte";

    // Import utilities
    import { validateEmail } from "$lib/util.js";

    // Definitions
    const indicatorStatus = {
        none: "",
        warning: "!border-warning-400",
        error: "!border-error-600",
    };

    /**
     * Password verification: Must...
     * - contain min. 1: lowercase english letter (a-z)
     * - contain min. 1: uppercase english letter (A-Z)
     * - contain min. 1: number (0-9)
     * - contain min. 1: special character
     * - be min. 12 characters total
     */
    const passwordRegexPattern =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{12,}$/;

    // Will get value "error" or "warning" according to validators
    let emailIndicator = indicatorStatus.none;
    let passwordIndicator = indicatorStatus.none;
    let passwordValidateIndicator = indicatorStatus.none;

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
    function checkPasswordEquality() {
        if (passwordRefernce.value !== passwordValidateReference.value) {
            passwordValidateIndicator = indicatorStatus.error;
            return false;
        }
        // Clear previous errors
        passwordValidateIndicator = indicatorStatus.none;
        return true;
    }

    function validatePassword() {
        return passwordRegexPattern.test(passwordRefernce.value);
    }

    /**
     * Removes password warnings or errors when any warnings existed
     * and are no longer valid.
     */
    function rmPasswordWarningsOnValid() {
        if (
            passwordIndicator === indicatorStatus.warning &&
            validatePassword()
        ) {
            passwordIndicator = indicatorStatus.none;
        }
        if (
            passwordValidateIndicator === indicatorStatus.error &&
            checkPasswordEquality()
        ) {
            passwordValidateIndicator = indicatorStatus.none;
        }
    }

    function validateInput() {
        if (!validateEmail(formData.email)) {
            emailIndicator = indicatorStatus.warning;
            return;
        }

        emailIndicator = indicatorStatus.none;

        if (!validatePassword()) {
            passwordIndicator = indicatorStatus.warning;
            return;
        }
        
        passwordIndicator = indicatorStatus.none;

        if (!checkPasswordEquality()) {
            return; // Passwords are not equal
        }

        // Save form data and continue to next step
        formData.password = passwordRefernce.value;
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

<!-- Password field -->
<label class="label" for="password_input">
    <span class="font-semibold">Passwort</span>
</label>
<div
    class="input-group input-group-divider relative grid-cols-[auto_1fr_auto] {passwordIndicator}"
>
    <input
        class="w-64 sm:w-72"
        type={showPassword ? "text" : "password"}
        id="password_input"
        placeholder="Dein super sicheres Passwort ;)"
        bind:this={passwordRefernce}
        on:input={rmPasswordWarningsOnValid}
    />
    <button
        class="absolute right-1 top-1 flex h-8 w-14 items-center rounded-r-full border-l-2 border-surface-500 bg-surface-700 pl-4"
        type="button"
        on:click={() => (showPassword = !showPassword)}
    >
        {#if showPassword}
            {btnIcon.unlocked}
        {:else}
            {btnIcon.locked}
        {/if}
    </button>
</div>
{#if passwordIndicator === indicatorStatus.warning}
    <div class="flex flex-col items-center justify-center transition-opacity">
        <ul class="text-sm text-warning-400">
            <li>Das Passwort muss min. 12 Zeichen lang sein</li>
            <li>Das Passwort muss enthalten:</li>
            <li>- min. 1 Kleinbuchstabe (a-z)</li>
            <li>- min. 1 Großbuchstabe (A-Z)</li>
            <li>- min. 1 Zahl</li>
            <li>- min. 1 Sonderzeichen</li>
        </ul>
    </div>
{/if}

<div
    class="input-group input-group-divider relative grid-cols-[auto_1fr_auto] {passwordValidateIndicator}"
>
    <input
        class="w-64 sm:w-72"
        type={showPasswordValidate ? "text" : "password"}
        id="password_input_validate"
        placeholder="Wiederhole dein Passwort"
        bind:this={passwordValidateReference}
        on:input={checkPasswordEquality}
    />
    <button
        class="absolute right-1 top-1 flex h-8 w-14 items-center rounded-r-full border-l-2 border-surface-500 bg-surface-700 pl-4"
        type="button"
        on:click={() => (showPasswordValidate = !showPasswordValidate)}
    >
        {#if showPasswordValidate}
            {btnIcon.unlocked}
        {:else}
            {btnIcon.locked}
        {/if}
    </button>
</div>
{#if passwordValidateIndicator === indicatorStatus.error}
    <div class="flex flex-col items-center justify-center transition-opacity">
        <p class="text-sm text-error-600">
            Die Passwörter müssen übereinstimmen
        </p>
    </div>
{/if}

<ContinueButton onClick={validateInput} />
