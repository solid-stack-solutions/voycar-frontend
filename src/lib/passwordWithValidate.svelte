<script>
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
    let passwordIndicator = indicatorStatus.none;
    let passwordValidateIndicator = indicatorStatus.none;

    // Formfield binding references
    let passwordRefernce;
    let passwordValidateReference;

    let showPassword = false;
    let showPasswordValidate = false;
    const btnIcon = {
        locked: "🔐",
        unlocked: "🔓",
    };

    // External reference to password input
    export let password;

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

    export function validatePassword() {
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

    /**
     * Cheks if the password matches specific requirements of
     * password regex. Additionally checks if both passwords
     * are equal.
     * Warnings will be dislayed when the user input is not correct.
     * After calling this the password variable will be set to the
     * entered value, indepedant wheather the input is valid or not.
     * @returns boolean - true, if all inputs are valid
     * @see passwordRegexPattern
     * @see password
     */
    export const validateInput = () => {
        // Save the password
        password = passwordRefernce.value;

        if (!validatePassword()) {
            passwordIndicator = indicatorStatus.warning;
            return false;
        }

        passwordIndicator = indicatorStatus.none;

        if (!checkPasswordEquality()) {
            return false; // Passwords are not equal
        }

        return true;
    };
</script>

<!--
@component
This is a component with two Password Input fields. 
The validate function can be used to validate the user input 
and provide the user with information about the required inputs.
-->

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
<!-- Password validate field -->
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
