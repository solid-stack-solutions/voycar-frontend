<script>
    // Import utilities
    import { urls, validateEmail, tryFetchingPublic } from "$lib/util.js";

    // Definitions
    const indicatorStatus = {
        none: "",
        warning: "!border-warning-400",
    };

    // Formfield bindings
    let emailInput;
    let submitBtnReference;

    // Will get value "error" or "warning" according to validators
    let emailIndicator = indicatorStatus.none;

    // Functions
    async function fetchResetToken(email) {
        const requestBody = {
            email: email,
        };
        try {
            await tryFetchingPublic(
                urls.post.forgotPassword,
                "POST",
                requestBody,
            );
            // ToDo toast EMail sent
            return true;
        } catch (err) {
            // ToDo toast backend unavailable
            return false;
        }
    }

    async function handleFormSubmit() {
        submitBtnReference.disabled = true;
        if (!validateEmail(emailInput)) {
            emailIndicator = indicatorStatus.warning;
            submitBtnReference.disabled = false
            return;
        }

        emailIndicator = indicatorStatus.none;
        
        if (!await fetchResetToken(emailInput)) {
            // Fetch was unsuccessful
            submitBtnReference.disabled = false;
            return;
        }
        // ToDo goto login
    }
</script>

<div class="mt-4 flex flex-col items-center justify-center">
    <h2 class="h2 mb-8">Password zurücksetzen</h2>
    <div
        class="w-full items-center justify-center space-y-4 sm:w-auto sm:min-w-96"
    >
        <form
            class="space-y-3 rounded-md border-2 border-secondary-500 p-4"
            on:submit={handleFormSubmit}
        >
            <!-- Email field -->
            <label class="label" for="email_input">
                <span class="font-semibold">Email</span>
            </label>
            <input
                class="input {emailIndicator}"
                type="text"
                id="email_input"
                placeholder="beispiel.organisation@mail.com"
                bind:value={emailInput}
            />
            {#if emailIndicator === indicatorStatus.warning}
                <div
                    class="flex flex-col items-center justify-center transition-opacity"
                >
                    <p class="text-sm text-warning-400">
                        Bitte gib eine valide Email-Adresse ein
                    </p>
                </div>
            {/if}

            <!-- Continue button -->
            <div class="flex flex-col items-center">
                <button class="variant-filled-primary btn w-full" type="submit" bind:this={submitBtnReference}>
                    E-Mail senden
                </button>
            </div>
        </form>
    </div>
</div>
