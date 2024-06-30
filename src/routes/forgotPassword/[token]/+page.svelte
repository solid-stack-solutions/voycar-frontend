<script>
    import PasswordInputs from "$lib/passwordWithValidate.svelte";

    // Formfield bindings
    let password;

    // Functions
    // Will be bound to the PasswordInput component
    let validatePassword;

    function handleFormSubmit() {
        validatePassword();
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
            <PasswordInputs
                inputGroupLabel="Neues Passwort"
                bind:password={password}
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