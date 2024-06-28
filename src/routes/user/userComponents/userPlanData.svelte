<script>
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    // Import backend urls
    import { urls, tryFetchingRestricted } from "$lib/util.js";

    // Definitions
    const toastStore = getToastStore();

    export let personalData;

    let formEditEnabled = false;
    let planReference;
    let planData = new Promise((resolve, reject) => {});

    // Success toast Settings
    const successToast = {
        message: "Deine Daten wurden erfolgreich aktualisiert",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-secondary",
    };

    // Warning toast Settings
    const warningToast = {
        message: "Du hast keine zu aktualisierenden Daten eingegeben",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-warning",
    };

    // Error toast Settings
    const errorToast = {
        message: "Deine Daten konnten nicht aktualisiert werden",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-error",
    };

    // Functions

    function checkPlanNameDidntChange(planValue) {
        return planValue == personalData.planName;
    }

    // Collects data from form field and removes unnecessary keys for request
    function collectData(planValue) {
        delete personalData["memberId"];
        delete personalData["email"];
        personalData["planId"] = planValue;
        return personalData;
    }

    function resolvePlanNameToPlanId(planName) {
        for (let index = 0; index < planData.length; index++) {
            if (planData[index].name == planName) {
                return planData[index].id;
            }
        }
        throw new Error("Planname is not in backend plan list");
    }

    // Retrieves all available plans at mounting time
    onMount(() => {
        planData = new Promise(async (resolve, reject) => {
            try {
                // Fetch backend for plan data with retry policy
                const response = await tryFetchingRestricted(urls.get.allPlans);

                if (response.ok) {
                    planData = await response.json();
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
        if (formEditEnabled) {
            formEditEnabled = false;
        }
        if (checkPlanNameDidntChange(planReference.value)) {
            toastStore.trigger(warningToast);
            return;
        }
        try {
            const mybody = collectData(planReference.value);
            const response = await tryFetchingRestricted(
                urls.put.newPersonalData,
                "PUT",
                mybody,
            );
            if (response.ok) {
                toastStore.trigger(successToast);
                needReload = true;
            } else {
                throw new Error("Update failed");
            }
        } catch (err) {
            toastStore.trigger(errorToast);
        }
    }
</script>

{#await planData}
    <p>loading</p>
{:then planData}
    <div class="relative h-full">
        <div class="flex flex-row space-x-2">
            <p class="self-center">Aktueller Tarif:</p>
            <select
                class="select w-2/4"
                size="1"
                value={resolvePlanNameToPlanId(personalData.planName)}
                disabled={!formEditEnabled}
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
                on:click={() => (formEditEnabled = !formEditEnabled)}
            >
                Bearbeiten
                {#if formEditEnabled}
                    verlassen
                {/if}
                <img src="/editIcon.svg" alt="edit icon" />
            </button>
            {#if formEditEnabled}
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
