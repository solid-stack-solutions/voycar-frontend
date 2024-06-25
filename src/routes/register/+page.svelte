<script>
    // Component imports
    import UserInfoForm from "./components/userInfoForm.svelte";
    import MemberInfoForm from "./components/memberInfoForm.svelte";

    // Indicates how many steps of the register process have been completed
    let registerStep = 0;
</script>

<!-- Register page -->
<div class="mt-4 flex flex-col items-center justify-center">
    <h2 class="h2 mb-8">Bei Voycar registrieren</h2>
    <div class="w-96 items-center justify-center space-y-4">
        <form class="space-y-3 rounded-md border-2 border-secondary-500 p-4">
            {#if registerStep == 0}
                <UserInfoForm bind:registerStep></UserInfoForm>
            {:else if registerStep == 1}
                <MemberInfoForm bind:registerStep></MemberInfoForm>
            {/if}
        </form>

        {#if registerStep == 0}
            <!-- Go to login link -->
            <div
                class="flex-col-2 flex items-center justify-between rounded-md border-2 border-secondary-500 p-4"
            >
                <p>Bereits registriert?</p>
                <a class="text-tertiary-500" href="/login">Anmelden</a>
            </div>
        {/if}
    </div>
</div>
