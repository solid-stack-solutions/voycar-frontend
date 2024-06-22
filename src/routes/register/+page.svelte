<script>
    // Component imports
    import UserInfoForm from "./components/userInfoForm.svelte";
    import MemberInfoForm from "./components/memberInfoForm.svelte";

    // Indicates how many steps of the register process have been completed
    let registerStep = 0;
</script>

<!-- Register page -->
<div class="flex flex-col justify-center items-center mt-4">
    <h2 class="h2 mb-8">Bei Voycar registrieren</h2>
    <div class="w-96 justify-center items-center space-y-4">
        {#if registerStep == 0}
            <UserInfoForm bind:registerStep></UserInfoForm>
            <!-- Go to login link -->
            <div
                class="flex flex-col-2 items-center justify-between border-2 rounded-md border-secondary-500 p-4"
            >
                <p>Bereits registriert?</p>
                <a class="text-tertiary-500" href="/login">Anmelden</a>
            </div>
        {:else if registerStep == 1}
            <MemberInfoForm bind:registerStep></MemberInfoForm>
        {/if}
    </div>
</div>
