<script>
    // Component imports
    import UserInfoForm from "./components/userInfoForm.svelte";
    import MemberInfoForm from "./components/memberInfoForm.svelte";
    import PlanForm from "./components/planForm.svelte";

    // The steps of the register process and how many have been completed
    const registerSteps = ["User", "Member", "Plan"];
    let currentStep = 0;
</script>

<!-- Register page -->
<div class="mt-4 flex flex-col items-center justify-center">
    <h2 class="h2 mb-8">Bei Voycar registrieren</h2>
    <div
        class="w-full items-center justify-center space-y-4 sm:w-auto sm:min-w-96"
    >
        <form class="space-y-3 rounded-md border-2 border-secondary-500 p-4">
            {#if registerSteps[currentStep] == "User"}
                <UserInfoForm bind:currentStep />
            {:else if registerSteps[currentStep] == "Member"}
                <MemberInfoForm bind:currentStep />
            {:else if registerSteps[currentStep] == "Plan"}
                <PlanForm bind:currentStep />
            {/if}
        </form>

        {#if registerSteps[currentStep] == "User"}
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
