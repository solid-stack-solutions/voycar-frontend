<script>
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    // Import utilities
    import {
        urls,
        validateEmail,
        tryFetchingPublic,
        toaster,
    } from "$lib/util.js";

    // Definitions
    const toastStore = getToastStore();
    const indicatorStatus = {
        none: "",
        warning: "!border-warning-400",
    };

    // Toast settings
    const toastSuccsess = {
        message: "Email zum Zurücksetzen erfolgreich verschickt",
        bg: "secondary",
    };
    const toastBackendUnavailable = {
        message: "Zurücksetzen nicht möglich. Versuche es später erneut.",
        bg: "error",
    };

    // Formfield bindings
    let emailInput;
    let emailReference;
    let submitBtnReference;

    // Will get value "error" or "warning" according to validators
    let emailIndicator = indicatorStatus.none;

    // Functions
    function enableForm() {
        emailReference.disabled = false;
        submitBtnReference.disabled = false;
    }
    function disabledForm() {
        emailReference.disabled = true;
        submitBtnReference.disabled = true;
    }

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
            toastStore.trigger(toaster(toastSuccsess));
            return true;
        } catch (err) {
            toastStore.trigger(toaster(toastBackendUnavailable));
            return false;
        }
    }

    async function handleFormSubmit() {
        disabledForm();
        if (!validateEmail(emailInput)) {
            emailIndicator = indicatorStatus.warning;
            enableForm();
            return;
        }

        emailIndicator = indicatorStatus.none;

        if (!(await fetchResetToken(emailInput))) {
            // Fetch was unsuccessful
            enableForm();
            return;
        }
        goto("/login");
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
                bind:this={emailReference}
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
                <button
                    class="variant-filled-primary btn w-full"
                    type="submit"
                    bind:this={submitBtnReference}
                >
                    E-Mail senden
                </button>
            </div>
        </form>
    </div>
</div>
