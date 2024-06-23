<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";

    // Import 🐦
    import { ConstantBackoff, handleAll, retry } from "cockatiel";

    // Import backend urls
    import { urls } from "$lib/util.js";


    // ToDo Comments

    // Definitions
    // Constants
    const toastStore = getToastStore();

    const mailRegexPattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Enums
    const btnIcon = {
        locked: "🔐",
        unlocked: "🔓",
    };

    const indicatorStatus = {
        none: "border-surface-700",
        sucess: "input-success",
        warning: "border-warning-400",
        error: "border-error-600",
    };

    // Policy for fetching
    const retryPolicy = retry(handleAll, {
        maxAttempts: 3, // Try 3 times
        backoff: new ConstantBackoff(50), // Wait 10ms after each try
    });

    // Toast Settings
    const toast = {
        message: "Sie wurden erfolgreich angemeldet",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-secondary",
    };

    // Variables
    // Will get value "input-error" or "input-warning" according to status of backend fetch and validators
    let emailIndicator = indicatorStatus.none;
    let passwordIndicator = indicatorStatus.none;

    let emailReference;
    let passwordReference;

    let somethingWrong = false;
    let showPassword = false;

    let email = "";
    let password = "";
    let error = "";

    // Functions
    function validateEmail(email) {
        return mailRegexPattern.test(email);
    }

    function resetIndicators() {
        emailIndicator = indicatorStatus.none;
        passwordIndicator = indicatorStatus.none;
        somethingWrong = false;
    }

    // ToDo: anzeigen wenn was falsch ist
    function tryLogin() {
        resetIndicators();
        email = emailReference.value;
        password = passwordReference.value;
        if (validateEmail(email)) {
            fetchLogin();
        } else {
            emailIndicator = indicatorStatus.warning;
        }
    }

    async function fetchLogin() {
        try {
            const mybody = {
                email: email,
                password: password,
            };
            const response = await retryPolicy.execute(() =>
                fetch(
                    new Request(urls.post.login, {
                        method: "POST",
                        body: JSON.stringify(mybody),
                    }),
                ),
            );
            if (response.ok) {  //Login sucessful
                somethingWrong = false;
                toastStore.trigger(toast);
                goto("/");
            } else {    // Login failed on the backend side e.g. because credentials didn't match or account doesn't exists
                throw new Error("Login failed");
            }
        } catch (err) {
            somethingWrong = true;
            emailIndicator = indicatorStatus.error;
            passwordIndicator = indicatorStatus.error;
            error = err.message;
        }
    }
</script>

<!-- Login page -->
<div class="flex flex-col justify-center items-center mt-4">
    <h1 class="h2 mb-8">Bei Voycar anmelden</h1>
    <div class="w-96 justify-center items-center space-y-4">
        <form class="p-4 border-2 rounded-md border-secondary-500 space-y-3">
            <!-- Email field -->
            <label class="label" for="email_input">
                <span>Email</span>
            </label>
            <input
                class="bg-surface-700 text-white border rounded-full transition-colors {emailIndicator} w-full focus:border-primary-500 focus:outline-none focus:ring-0"
                type="text"
                id="email_input"
                placeholder="beispiel.organisation@mail.com"
                bind:this={emailReference}
            />
            {#if emailIndicator == indicatorStatus.warning}
                <div class="flex flex-col justify-center items-center transition-opacity">
                    <p class="text-sm text-warning-500">
                        Bitte gib eine valide Email-Adresse ein
                    </p>
                </div>
            {/if}
            <!-- Password field -->
            <label class="label" for="password_input">
                <span>Passwort</span>
            </label>
            <!-- <div
                class="relative input-group input-group-divider grid-cols-[auto_1fr_auto]"
            > -->
            <div class="relative">
                <input
                    class="bg-surface-700 text-white border rounded-full transition-colors {passwordIndicator} w-full focus:border-primary-500 focus:outline-none focus:ring-0"
                    type={showPassword ? "text" : "password"}
                    id="password_input"
                    placeholder="Dein super sicheres Passwort 😉"
                    bind:this={passwordReference}
                />
                <div>
                    <button
                        class=" absolute bg-surface-700 w-14 border-surface-500 inset-y-0 h-8 top-1 right-1 border-l-2 border-surface-400 pl-4 flex items-center text-md rounded-r-full"
                        on:click={() => (showPassword = !showPassword)}
                    >
                        {#if showPassword}
                            {btnIcon.unlocked}
                        {:else}
                            {btnIcon.locked}
                        {/if}
                    </button>
                </div>
            </div>

            {#if somethingWrong}
                <div class="flex flex-col items-center">
                    <p class="text-sm text-error-500 transition-opacity">
                        Email oder Passwort sind falsch
                    </p>
                </div>
            {/if}

            <!-- Login button -->
            <div class="flex flex-col items-center">
                <button
                    class="btn variant-filled-primary w-full"
                    on:click={tryLogin}>Anmelden</button
                >
            </div>
            <!-- Password reset -->
            <div class="flex justify-center items-center">
                <a class="text-sm text-tertiary-600" href="/forgotPassword"
                    >Passwort vergessen?</a
                >
            </div>
        </form>
        <!-- Sing up for new account link -->
        <div
            class="flex flex-col-2 items-center justify-between border-2 rounded-md border-secondary-500 p-4"
        >
            <p>Neu bei Voycar?</p>
            <a class="text-tertiary-500" href="/register"
                >Neuen Account erstellen</a
            >
        </div>
    </div>
</div>
