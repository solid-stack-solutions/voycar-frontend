<script>
    // Import 🐦
    import { ConstantBackoff, handleAll, retry } from "cockatiel";
    import { getToastStore } from "@skeletonlabs/skeleton";

    // Import backend urls
    import { urls } from "$lib/util.js";
    
    // Definitions
    export let personalData;

    const toastStore = getToastStore();
    let formEditEnabled = false;
    let planReference;

     // Policy for fetching
     const retryPolicy = retry(handleAll, {
        maxAttempts: 3, // Try 3 times
        backoff: new ConstantBackoff(50), // Wait 50ms after each try
    });

    // Toast Settings
    const successToast = {
        message: "Deine Daten wurden erfolgreich aktualisiert",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-secondary",
    };

    const warningToast = {
        message: "Du hast keine zu aktualisierenden Daten eingegeben",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-warning",
    };

    const errorToast = {
        message: "Deine Daten konnten nicht aktualisiert werden",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-error",
    };


    function checkPlanNameDidntChange(planValue){
        return planValue == personalData.planName;
    }

    function collectData(planValue){
        delete personalData['memberId'];
        delete personalData['email'];
        personalData["planName"] = planValue;
        return personalData;
    }
    // Makes a request to the backend to update the data of the user
    async function updatePlanData() {
        if (formEditEnabled) {
            formEditEnabled = false;
        }
        if(checkPlanNameDidntChange(planReference.value)){
            toastStore.trigger(warningToast);
            return;
        }
        try {
            const mybody = collectData(planReference.value);
            console.log(JSON.stringify(mybody));
            const response = await retryPolicy.execute(() =>
                fetch(
                    new Request(urls.put.newPersonalData, {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(mybody),
                    }),
                ),
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

<div class="relative h-full">
    <div class="flex flex-row space-x-2">
        <p class="self-center">Aktueller Tarif:</p>
        <select 
            class="select w-2/4" 
            size="1" 
            value="{personalData.planName}"
            disabled = {!formEditEnabled}
            bind:this={planReference}
            >
            <option value="basic">Basic</option>
            <option value="reduced">Reduziert</option>
            <option value="exclusive">Exklusiv</option>
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
