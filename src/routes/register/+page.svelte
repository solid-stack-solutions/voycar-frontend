<script>
    // Component imports
    import UserInfoForm from "./components/userInfoForm.svelte";
    import MemberInfoForm from "./components/memberInfoForm.svelte";
    import PlanForm from "./components/planForm.svelte";
    // Import utilities
    import { urls, tryFetchingPublic } from "$lib/util.js";

    // The steps of the register process and how many have been completed
    const registerSteps = ["User", "Member", "Plan", "Finish"];
    let currentStep = 0;

    let formData = {
        userData: {},
        memberData: {
            firstName: "",
            lastName: "",
            street: "",
            houseNumber: "",
            postalCode: "",
            city: "",
            country: "Germany",
            birthDate: "",
            birthPlace: "",
            phoneNumber: "",
        },
        planData: {},
    };

    // Functions
    async function handleFormSubmit() {
        currentStep++;

        // Make register request to backend
        try {
            const requestBody = {
                ...formData.userData,
                ...formData.memberData,
                ...formData.planData,
            };
            console.log(requestBody);
            const response = await tryFetchingPublic(
                urls.post.register,
                "POST",
                requestBody,
            );

            if (response.ok) {
                // ToDo register success, inform user about verify mail
                console.log("Register success");
            } else {
                // ToDo handle possible error messages
                throw new Error("unexpected result");
            }
        } catch (err) {
            throw err;
        }
    }
</script>

<!-- Register page -->
<div class="mt-4 flex flex-col items-center justify-center">
    <h2 class="h2 mb-8">Bei Voycar registrieren</h2>
    <div
        class="w-full items-center justify-center space-y-4 sm:w-auto sm:min-w-96"
    >
        {#if registerSteps[currentStep] != "Finish"}
            <form
                class="space-y-3 rounded-md border-2 border-secondary-500 p-4"
                on:submit={handleFormSubmit}
            >
                {#if registerSteps[currentStep] == "User"}
                    <UserInfoForm
                        bind:currentStep
                        bind:formData={formData.userData}
                    />
                {:else if registerSteps[currentStep] == "Member"}
                    <MemberInfoForm
                        bind:currentStep
                        bind:formData={formData.memberData}
                    />
                {:else if registerSteps[currentStep] == "Plan"}
                    <PlanForm
                        bind:currentStep
                        bind:formData={formData.planData}
                    />
                {/if}
            </form>
        {:else}
            <div
                class="flex-col-2 flex items-center justify-between rounded-md border-2 border-secondary-500 p-4"
            >
                <p>Registrierungsdaten werden verarbeitet...</p>
            </div>
        {/if}

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
