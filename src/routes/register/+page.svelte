<script>
    // Component imports
    import UserInfoForm from "./components/userInfoForm.svelte";
</script>

<!-- Register page -->
<div class="flex flex-col justify-center items-center mt-4">
    <h2 class="h2 mb-8">Bei Voycar registrieren</h2>
    <div class="w-96 justify-center items-center space-y-4">
        <UserInfoForm></UserInfoForm>
        <!-- Go to login link -->
        <div
            class="flex flex-col-2 items-center justify-between border-2 rounded-md border-secondary-500 p-4"
        >
            <p>Bereits registriert?</p>
            <a class="text-tertiary-500" href="/login">Anmelden</a>
        </div>
    </div>
</div>
