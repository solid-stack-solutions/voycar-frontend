<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    // Import backend urls and fetch function
    import { urls, tryFetchingRestricted } from "$lib/util.js";

    // Definitions
    const toastStore = getToastStore();

    // Export data from parent component
    export let personalData;

    let lastplanValue;
    let editEnabled = false;
    let planReference;
    let planData = new Promise((resolve, reject) => {});

    // Success toast
    const successToast = {
        message: "Deine Daten wurden erfolgreich aktualisiert",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-secondary",
    };

    // Warning toast
    const warningToast = {
        message: "Du hast keine zu aktualisierenden Daten eingegeben",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-warning",
    };

    // Error toast
    const errorToast = {
        message: "Deine Daten konnten nicht aktualisiert werden",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-error",
    };

    // Functions
    function checkPlanNameDidntChange(planValue) {
        return planValue == lastplanValue;
    }

    function resolvePlanNameToPlanId(planName) {
        let plan = planData.find((plan) => plan.name == planName);
        if (plan === undefined) {
            throw new Error("Planname is not in backend plan list");
        }
        return plan.id;
    }

    function resetFieldOnCancel() {
        if (editEnabled) {
            document.getElementById("selectField").value = lastplanValue;
        }
    }

    // Retrieves all available plans at mounting time
    onMount(() => {
        planData = new Promise(async (resolve, reject) => {
            try {
                // Fetch backend for plan data with retry policy
                const response = await tryFetchingRestricted(urls.get.allPlans);

                if (response.ok) {
                    planData = await response.json();
                    lastplanValue = resolvePlanNameToPlanId(
                        personalData.planName,
                    );
                } else {
                    throw new Error("Error while fetching data");
                }
            } catch (err) {
                reject(err); // Reject the promise so Svelte can handle it
            }
        });
    });

    // Makes a request to the backend to update the plan data of the user
    async function updatePlanData() {
        if (editEnabled) {
            editEnabled = false;
        }
        if (checkPlanNameDidntChange(planReference.value)) {
            toastStore.trigger(warningToast);
            return;
        }
        try {
            const mybody = { planId: planReference.value };
            console.log(mybody);
            const response = await tryFetchingRestricted(
                urls.put.newPlanData,
                "PUT",
                mybody,
            );
            if (response.ok) {
                toastStore.trigger(successToast);
                lastplanValue = planReference.value;
            } else {
                throw new Error("Update failed");
            }
        } catch (err) {
            console.log(err);
            toastStore.trigger(errorToast);
        }
    }
</script>

{#await planData}
    <p>Tarife werden geladen...</p>
{:then planData}
    <div class="relative h-full">
        <div class="flex flex-row space-x-2">
            <p class="self-center">Aktueller Tarif:</p>
            <select
                class="select w-2/4 capitalize"
                size="1"
                id="selectField"
                value={resolvePlanNameToPlanId(personalData.planName)}
                disabled={!editEnabled}
                bind:this={planReference}
            >
                {#each planData as plan}
                    <option value={plan.id}>{plan.name}</option>
                {/each}
            </select>
        </div>
        <div dir="rtl" class="absolute bottom-6 right-2">
            <button
                type="button"
                class="variant-filled-warning btn btn-md"
                on:click={() => {
                    resetFieldOnCancel();
                    editEnabled = !editEnabled;
                }}
            >
                {#if editEnabled}
                    Abbrechen
                {:else}
                    Bearbeiten
                {/if}
                <img src="/editIcon.svg" alt="edit icon" />
            </button>
            {#if editEnabled}
                <button
                    type="button"
                    class="variant-filled-primary btn btn-md"
                    on:click={updatePlanData}
                >
                    Aktualisieren
                    <img src="/saveIcon.svg" alt="save icon" />
                </button>
            {/if}
        </div>
    </div>
{/await}
