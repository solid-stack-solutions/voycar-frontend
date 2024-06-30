<script>
    import PasswordInputs from "$lib/passwordWithValidate.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { urls, tryFetchingPublic } from "$lib/util.js";

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
            password: password
        }
        const url = urls.post.resetPassword + token;
        try {
            const response  = await tryFetchingPublic(url, "POST", requestBody);
            if (response.ok) {
                // ToDo success toast + redirect to login
            } else if (response.status == 400) {
                // ToDo error toast invalid token + redirect to login
            } else {
                throw new Error("Unexpected result");
            }
        } catch (err) {
            // ToDo error toast + redirct to login
        }
    }

    function handleFormSubmit() {
        if (!validatePassword()) {
            return; // Password is invalid
        };
        fetchPasswordReset(passwordInput, tokenInput);
    }

    onMount(() => {
        if (! ($page.params?.token)) {
            // ToDo error toast + redirect to login
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
                <button
                    class="variant-filled-primary btn w-full"
                    type="submit"
                >
                    Zurücksetzen
                </button>
            </div>
        </form>
    </div>
</div>