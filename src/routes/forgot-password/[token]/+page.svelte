<script>
    import PasswordInputs from "$lib/passwordWithValidate.svelte";
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { urls, tryFetchingPublic, toaster } from "$lib/util.js";

    const toastStore = getToastStore();
    // Toast settings
    const toastSuccess = {
        message: "Erfolgreich zurückgesetzt",
        bg: "secondary",
    };
    const toastInvalidToken = {
        message: "Dein Link ist abgelaufen. Bitte erneut zurücksetzen.",
        timeout: 7000, // Auto dismiss after 7 seconds
        hideDismiss: true, // Hide the dismiss button on toast
        background: "variant-filled-error",
    };
    const toastBackendUnavailable = {
        message: "Zurücksetzen nicht möglich. Versuche es später erneut.",
        bg: "error",
    };

    // Formfield bindings
    let passwordInput;

    // Token from URL
    let tokenInput;

    // Functions
    // Will be bound to the PasswordInput component
    let validatePassword;

    // Functions
    async function fetchPasswordReset(password, token) {
        const requestBody = {
            password: password,
        };
        const url = urls.post.resetPassword + token;
        try {
            const response = await tryFetchingPublic(url, "POST", requestBody);
            if (response.ok) {
                toastStore.trigger(toaster(toastSuccess));
            } else if (response.status == 400) {
                // Badrequest
                toastStore.trigger(toastInvalidToken);
                goto("/forgot-password");
                return;
            } else {
                throw new Error("Unexpected result");
            }
        } catch (err) {
            console.error(err);
            toastStore.trigger(toaster(toastBackendUnavailable));
        } finally {
            goto("/login");
        }
    }

    function handleFormSubmit() {
        if (!validatePassword()) {
            return; // Password is invalid
        }
        fetchPasswordReset(passwordInput, tokenInput);
    }

    onMount(() => {
        // Should not happen due to routing setup, but just in case
        if (!$page.params?.token) {
            goto("/forgot-password");
            return;
        }
        tokenInput = $page.params.token;
    });
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
            <PasswordInputs
                inputGroupLabel="Neues Passwort"
                bind:password={passwordInput}
                bind:validateInput={validatePassword}
            />

            <!-- Continue button -->
            <div class="flex flex-col items-center">
                <button class="variant-filled-primary btn w-full" type="submit">
                    Zurücksetzen
                </button>
            </div>
        </form>
    </div>
</div>
