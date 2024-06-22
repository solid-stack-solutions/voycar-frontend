<script>
    // Definitions
    const indicatorStatus = {
        none: "",
        sucess: "input-success",
        warning: "input-warning",
        error: "input-error",
    };
    // Will get value "input-error" or "input-warning" according to validators
    let emailIndicator = indicatorStatus.none;
    let passwordIndicator = indicatorStatus.none;

    let showPassword = false;
    let showPasswordValidate = false;
    let btnIcon = {
        locked: "🔐",
        unlocked: "🔓",
    };

    // Indicates how many steps of the register process have been completed
    export let registerStep = 0;
</script>

<form class="p-4 border-2 rounded-md border-secondary-500 space-y-3">
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
        class="relative input-group input-group-divider grid-cols-[auto_1fr_auto]"
    >
        <input
            class="w-72 {passwordIndicator}"
            type={showPassword ? "text" : "password"}
            id="password_input"
            placeholder="Dein super sicheres Passwort 😉"
        />
        <button
            class="right-0 leading-5 variant-filled-secondary"
            on:click={() => (showPassword = !showPassword)}
        >
            {#if showPassword}
                {btnIcon.unlocked}
            {:else}
                {btnIcon.locked}
            {/if}
        </button>
    </div>
    <div
        class="relative input-group input-group-divider grid-cols-[auto_1fr_auto]"
    >
        <input
            class="w-72 {passwordIndicator}"
            type={showPasswordValidate ? "text" : "password"}
            id="password_input_validate"
            placeholder="Wiederhole dein Passwort"
        />
        <button
            class="right-0 leading-5 variant-filled-secondary"
            on:click={() => (showPasswordValidate = !showPasswordValidate)}
        >
            {#if showPasswordValidate}
                {btnIcon.unlocked}
            {:else}
                {btnIcon.locked}
            {/if}
        </button>
    </div>

    <!-- Continue button -->
    <div class="flex flex-col items-center">
        <button
            class="btn variant-filled-primary w-full"
            on:click={() => {
                registerStep++;
            }}
        >
            Weiter
        </button>
    </div>
</form>
