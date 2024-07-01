<script>
    // Framework imports
    import { goto } from "$app/navigation";

    // Import backend urls
    import { urls, validateEmail, tryFetchingRestricted } from "$lib/util.js";
    import { loggedIn } from "$lib/stores/loggedIn.js";
    import Loading from "$lib/loading.svelte";

    // Definitions
    // Enums
    const btnIcon = {
        locked: "🔐",
        unlocked: "🔓",
    };

    const indicatorStatus = {
        none: "",
        warning: "!border-warning-400",
        error: "!border-error-600",
    };

    // Variables
    // Will get value according to status of backend fetch and validators
    let emailIndicator = indicatorStatus.none;
    let passwordIndicator = indicatorStatus.none;

    // Formfield binding references
    let emailReference;
    let passwordReference;

    let somethingWrong = false;
    let showPassword = false;

    // Reactive statements
    $: if ($loggedIn) {
        goto("/")
    }

    // Functions
    function resetIndicators() {
        emailIndicator = indicatorStatus.none;
        passwordIndicator = indicatorStatus.none;
        somethingWrong = false;
    }

    function tryLogin() {
        resetIndicators();
        let email = emailReference.value;
        let password = passwordReference.value;
        if (validateEmail(email)) {
            fetchLogin(email, password);
        } else {
            emailIndicator = indicatorStatus.warning;
        }
    }

    // Redirects to url and reloads new layout content
    function redirectAndReloadPage(url) {
        window.location.href = url;
    }

    async function fetchLogin(email, password) {
        try {
            const mybody = {
                email: email,
                password: password,
            };
            const response = await tryFetchingRestricted(
                urls.post.login,
                "POST",
                mybody,
            );
            if (response.ok) {
                // Login sucessful
                somethingWrong = false;
                redirectAndReloadPage("/");
            } else {
                // Login failed on the backend side e.g. because credentials didn't match or account doesn't exists
                throw new Error("Login failed");
            }
        } catch (err) {
            somethingWrong = true;
            emailIndicator = indicatorStatus.error;
            passwordIndicator = indicatorStatus.error;
        }
    }
</script>

<!-- Login page -->
{#if $loggedIn === false}
    <div class="mt-4 flex flex-col items-center justify-center">
        <h1 class="h2 mb-8">Bei Voycar anmelden</h1>
        <div class="w-96 items-center justify-center space-y-4">
            <form class="space-y-3 rounded-md border-2 border-secondary-500 p-4">
                <!-- Email field -->
                <label class="label" for="email_input">
                    <span class="font-semibold">Email</span>
                </label>
                <input
                    class="input {emailIndicator}"
                    type="text"
                    id="email_input"
                    placeholder="beispiel.organisation@mail.com"
                    bind:this={emailReference}
                />
                {#if emailIndicator == indicatorStatus.warning}
                    <div
                        class="flex flex-col items-center justify-center transition-opacity"
                    >
                        <p class="text-sm text-warning-500">
                            Bitte gib eine valide Email-Adresse ein
                        </p>
                    </div>
                {/if}
                <!-- Password field -->
                <label class="label" for="password_input">
                    <span class="font-semibold">Passwort</span>
                </label>
                <div class="relative">
                    <input
                        class="input {passwordIndicator}"
                        type={showPassword ? "text" : "password"}
                        id="password_input"
                        placeholder="Dein super sicheres Passwort ;)"
                        bind:this={passwordReference}
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
                        class="variant-filled-primary btn w-full"
                        on:click={tryLogin}>Anmelden</button
                    >
                </div>
                <!-- Password reset -->
                <div class="flex items-center justify-center">
                    <a class="text-sm text-tertiary-500" href="/forgot-password"
                        >Passwort vergessen?</a
                    >
                </div>
            </form>
            <!-- Sing up for new account link -->
            <div
                class="flex-col-2 flex items-center justify-between rounded-md border-2 border-secondary-500 p-4"
            >
                <p>Neu bei Voycar?</p>
                <a class="text-tertiary-500" href="/register"
                    >Neuen Account erstellen</a
                >
            </div>
        </div>
    </div>
{:else}
    <Loading />
{/if}
