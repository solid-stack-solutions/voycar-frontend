<script>
    // Definitions
    let somethingWrong = false;

    const indicatorStatus = {
        none: "",
        sucess: "input-success",
        warning: "input-warning",
        error: "input-error",
    };
    // Will get value "input-error" or "input-warning" according to status of backend fetch and validators
    let emailIndicator = indicatorStatus.none;
    let passwordIndicator = indicatorStatus.none;

    let showPassword = false;
    let btnIcon = {
        locked: "🔐",
        unlocked: "🔓",
    };
</script>

<!-- Login page -->
<div class="mt-4 flex flex-col items-center justify-center">
    <h1 class="h2 mb-8">Bei Voycar anmelden</h1>
    <div class="w-96 items-center justify-center space-y-4">
        <form class="space-y-3 rounded-md border-2 border-secondary-500 p-4">
            <!-- Email field -->
            <label class="label" for="email_input">
                <span>Email</span>
            </label>
            <input
                class="input {emailIndicator}"
                type="text"
                id="email_input"
                placeholder="beispiel.organisation@mail.com"
            />
            <!-- Password field -->
            <label class="label" for="password_input">
                <span>Passwort</span>
            </label>
            <div
                class="input-group input-group-divider relative grid-cols-[auto_1fr_auto]"
            >
                <input
                    class="w-72 {passwordIndicator}"
                    type={showPassword ? "text" : "password"}
                    id="password_input"
                    placeholder="Dein super sicheres Passwort 😉"
                />
                <button
                    class="variant-filled-secondary right-0 leading-5"
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
                    <p class="text-sm text-error-500">
                        Email oder Passwort sind falsch
                    </p>
                </div>
            {/if}

            <!-- Login button -->
            <div class="flex flex-col items-center">
                <button class="variant-filled-primary btn w-full"
                    >Anmelden</button
                >
            </div>
            <!-- Password reset -->
            <div class="flex items-center justify-center">
                <a class="text-sm text-tertiary-600" href="/forgotPassword"
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
