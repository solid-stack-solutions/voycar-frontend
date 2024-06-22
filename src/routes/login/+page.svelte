<script>
    import { urls } from "$lib/util.js";
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { ConstantBackoff, handleAll, retry } from "cockatiel";
    
    
    // Definitions
    // Constants
    const toastStore = getToastStore();

    const mailRegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const btnIcon = {
        locked: "🔐",
        unlocked: "🔓",
    };

    const indicatorStatus = {
        none: "",
        sucess: "input-success",
        warning: "input-warning",
        error: "input-error",
    };

    const retryPolicy = retry(handleAll, {
        maxAttempts: 3, // Try 3 times
        backoff: new ConstantBackoff(50), // Wait 10ms after each try
    });

    const toast = {
        message: "Sie wurden erfolgreich angemeldet",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-secondary",
    }

    // Variables
    let somethingWrong = false;

    let error = "";
    // Will get value "input-error" or "input-warning" according to status of backend fetch and validators
    let emailIndicator = indicatorStatus.none;
    let passwordIndicator = indicatorStatus.none;

    let showPassword = false;

    let emailReference;
    let passwordReference;

    let email = "";
    let password = ""

    function resetIndicators(){
        emailIndicator = indicatorStatus.none;
        passwordIndicator = indicatorStatus.none;
        somethingWrong = false;
    }

    function tryLogin(){
        resetIndicators();
         email = emailReference.value;
         password = passwordReference.value;
         if (validateMail(email)){
            fetchLogin();
         }else{
            emailIndicator = indicatorStatus.warning;
         }
    }

    function validateMail(email){
        return mailRegexPattern.test(email);
    }

    async function fetchLogin(){
        try{
            const mybody = {
                email : email,
                password : password,
            }
            const response = await retryPolicy.execute(() =>
                fetch(new Request(urls.post.login, {
                method : "POST",
                body : JSON.stringify(mybody),
            })),
            );
            if (response.ok) {
                somethingWrong = false;
                toastStore.trigger(toast);
                goto("/");
            }else{
                somethingWrong = true;
                throw new Error("Login failed")
            }
        } catch (err) {
            somethingWrong = true;
            error = err.message;
        }
    }
</script>

<!-- Login page -->
<div class="flex flex-col justify-center items-center mt-4">
    <h1 class="h2 mb-8">Bei Voycar anmelden</h1>
    <div class="w-96 justify-center items-center space-y-4">
        <form class="p-4 border-2 rounded-md border-secondary-500 space-y-3"
            on:submit={tryLogin}>
            <!-- Email field -->
            <label class="label" for="email_input">
                <span>Email</span>
            </label>
            <input
                class="input {emailIndicator}"
                type="text"
                id="email_input"
                placeholder="beispiel.organisation@mail.com"
                bind:this={emailReference}
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
                    bind:this={passwordReference}
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

            {#if somethingWrong}
                <div class="flex flex-col items-center">
                    <p class="text-sm text-error-500">
                        Email oder Passwort sind falsch
                    </p>
                </div>
            {/if}

            <!-- Login button -->
            <div class="flex flex-col items-center">
                <button class="btn variant-filled-primary w-full" 
                on:click={tryLogin}
                    >Anmelden</button
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
    {email} : {password}: {somethingWrong} : {error}
</div>
