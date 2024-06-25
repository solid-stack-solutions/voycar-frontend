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
    export let currentStep = 0;
</script>

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
<div class="input-group input-group-divider relative grid-cols-[auto_1fr_auto]">
    <input
        class="w-72 {passwordIndicator}"
        type={showPassword ? "text" : "password"}
        id="password_input"
        placeholder="Dein super sicheres Passwort 😉"
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
<div class="input-group input-group-divider relative grid-cols-[auto_1fr_auto]">
    <input
        class="w-72 {passwordIndicator}"
        type={showPasswordValidate ? "text" : "password"}
        id="password_input_validate"
        placeholder="Wiederhole dein Passwort"
    />
    <button
        class="absolute right-1 top-1 flex h-8 w-14 items-center rounded-r-full border-l-2 border-surface-500 bg-surface-700 pl-4"
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
        class="variant-filled-primary btn w-full"
        on:click={() => {
            currentStep++;
        }}
    >
        Weiter
    </button>
</div>
