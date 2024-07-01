<script>
    // Component imports
    import UserInfoForm from "./components/userInfoForm.svelte";
    import MemberInfoForm from "./components/memberInfoForm.svelte";
    import PlanForm from "./components/planForm.svelte";

    import { goto } from "$app/navigation";

    // Import utilities
    import { urls, tryFetchingPublic } from "$lib/util.js";
    import { getToastStore } from "@skeletonlabs/skeleton";
    const toastStore = getToastStore();

    // The steps of the register process and how many have been completed
    const registerSteps = ["User", "Member", "Plan", "Finish"];
    let currentStep = 0;

    let formData = {
        userData: {},
        // Set these keys explicitly so component can iterate over them
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

    // Toast Settings
    const toastSuccess = {
        message: "Du hast dich erfolgreich registriert",
        timeout: 7000, // Auto dismiss after 7 seconds
        background: "variant-filled-secondary",
    };
    const toastVerifyHint = {
        message:
            "Bitte verifiziere deine Email Adresse bevor du dich einloggst",
        autohide: false, // Do not auto dismiss
        background: "variant-filled-warning",
    };
    const toastError = {
        message:
            "Du hast bei der Registrierung ungültige Daten eingeben.<br>" +
            "Melde dich an, wenn du bereits ein Konto hast.",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 7000, // Auto dismiss after 7 seconds
        background: "variant-filled-error",
    };
    const toastUnknownError = {
        message:
            "Unbekannter Fehler bei Registrierung. Versuche es später erneut.",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 5000, // Auto dismiss after 3 seconds
        background: "variant-filled-error",
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
            const response = await tryFetchingPublic(
                urls.post.register,
                "POST",
                requestBody,
            );

            if (response.ok) {
                toastStore.trigger(toastSuccess);
                toastStore.trigger(toastVerifyHint);
                goto("/login");
            } else if (response.status == 400) {
                // Badrequest
                toastStore.trigger(toastError);
                currentStep = 0; // Goto first step of register process
            } else {
                throw new Error("Unexpected result");
            }
        } catch (err) {
            toastStore.trigger(toastUnknownError);
            goto("/");
        }
    }
</script>
<svelte:head>
    <title>Voycar - Registrieren</title>
</svelte:head>
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
            <div class="rounded-md border-2 border-secondary-500 p-4">
                <div
                    class="w-full animate-pulse rounded-md bg-surface-600 p-2 font-bold"
                >
                    Registrierungsdaten werden verarbeitet
                </div>
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
