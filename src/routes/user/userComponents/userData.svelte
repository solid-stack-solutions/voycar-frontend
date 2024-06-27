<script>
    // Import 🐦
    import { ConstantBackoff, handleAll, retry } from "cockatiel";
    import { getToastStore } from "@skeletonlabs/skeleton";

    // Import backend urls
    import { urls } from "$lib/util.js";
    // Parent data exports
    export let personalData;

    // Definitions
    const toastStore = getToastStore();
    
    let formEditEnabled = false;
    let needReload = false;

    let firstNameReference;
    let lastNameReference;
    let phonenumberReference;
    let streetReference;
    let houseNumberReference;
    let cityReference;
    let postalCodeReference;

    // Policy for fetching
    const retryPolicy = retry(handleAll, {
        maxAttempts: 3, // Try 3 times
        backoff: new ConstantBackoff(50), // Wait 50ms after each try
    });

    // Toast Settings
    const toast = {
        message: "Deine Daten wurden erfolgreich aktualisiert",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-secondary",
    };

    function collectData(){
        return  {
        firstName:  firstNameReference.value  == '' ? personalData.firstName : firstNameReference.value,
        lastName: lastNameReference.value  == '' ? personalData.lastName : lastNameReference.value,
        street: streetReference.value  == '' ? personalData.street : streetReference.value,
        houseNumber: houseNumberReference.value  == '' ? personalData.houseNumber : houseNumberReference.value,
        postalCode: postalCodeReference.value  == '' ? personalData.postalCode : postalCodeReference.value,
        city: cityReference.value == '' ? personalData.city : cityReference.value,
        country: personalData.country,
        birthDate: personalData.birthDate,
        birthPlace: personalData.birthPlace,
        phoneNumber: phonenumberReference.value  == '' ? personalData.phoneNumber : phonenumberReference.value,
        };
    }

    async function updateUserData() {
        if (formEditEnabled) {
            formEditEnabled = false;
        }
        try {
            const mybody = collectData();
            console.log(JSON.stringify(mybody));
            const response = await retryPolicy.execute(() =>
                fetch(
                    new Request(urls.put.newPersonalPlan, {
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
                toastStore.trigger(toast);
            } else {
                // Login failed on the backend side e.g. because credentials didn't match or account doesn't exists
                throw new Error("Update failed");
            }
        } catch (err) {
        }
    }
</script>

<div class="h-full space-y-2">
    {#if needReload}
       <div class="flex flex-col items-center justify-center h-full">
            <h3 class="h3">
                Daten neu Laden
            </h3>
            <button class="btn variant-filled-primary"  on:click={() => (location.reload())}>Reload</button>
       </div> 
    {:else}
    <div>
        <table class="table-fixed border-separate border-spacing-x-4">
            <tr>
                <th class="text-left">
                    <span class="mr-5">Vorname:</span>
                </th>
                <td>
                    <form id="form">
                        <label class="label">
                            <input
                                disabled={!formEditEnabled}
                                class="form--disabled input variant-form-material"
                                type="text"
                                name="inputField"
                                placeholder={personalData.firstName}
                                bind:this={firstNameReference}
                            />
                        </label>
                    </form>
                </td>
            </tr>
            <tr>
                <th class="text-left">
                    <span class="mr-5">Nachname:</span>
                </th>
                <td class="w-full">
                    <form id="form">
                        <label class="label">
                            <input
                                disabled={!formEditEnabled}
                                class="form--disabled input variant-form-material"
                                type="text"
                                name="inputField"
                                placeholder={personalData.lastName}
                                bind:this={lastNameReference}
                            />
                        </label>
                    </form>
                </td>
            </tr>
            <tr>
                <th class="text-left"> Telefonnummer: </th>
                <td>
                    <form id="form">
                        <label class="label">
                            <input
                                disabled={!formEditEnabled}
                                class="form--disabled input variant-form-material"
                                type="text"
                                name="inputField"
                                placeholder={personalData.phoneNumber}
                                bind:this={phonenumberReference}
                            />
                        </label>
                    </form>
                </td>
            </tr>
            <tr>
                <th class="text-left"> Straße: </th>
                <td>
                    <form id="form">
                        <label class="label">
                            <input
                                disabled={!formEditEnabled}
                                class="form--disabled input variant-form-material"
                                type="text"
                                name="inputField"
                                placeholder={personalData.street}
                                bind:this={streetReference}
                            />
                        </label>
                    </form>
                </td>
            </tr>
            <tr>
                <th class="text-left"> Hausnummer: </th>
                <td>
                    <form id="form">
                        <label class="label">
                            <input
                                disabled={!formEditEnabled}
                                class="form--disabled input variant-form-material"
                                type="text"
                                name="inputField"
                                placeholder={personalData.houseNumber}
                                bind:this={houseNumberReference}
                            />
                        </label>
                    </form>
                </td>
            </tr>
            <tr>
                <th class="text-left">
                    <span class="mr-5">Ort:</span>
                </th>
                <td>
                    <form id="form">
                        <label class="label">
                            <input
                                disabled={!formEditEnabled}
                                class="form--disabled input variant-form-material"
                                type="text"
                                name="inputField"
                                placeholder={personalData.city}
                                bind:this={cityReference}
                            />
                        </label>
                    </form>
                </td>
            </tr>
            <tr>
                <th class="text-left"> Postleitzahl: </th>
                <td>
                    <form id="form">
                        <label class="label">
                            <input
                                disabled={!formEditEnabled}
                                class="form--disabled input variant-form-material"
                                type="text"
                                name="inputField"
                                placeholder={personalData.postalCode}
                                bind:this={postalCodeReference}
                            />
                        </label>
                    </form>
                </td>
            </tr>
        </table>
    </div>
   
<!-- Buttons -->
    <div dir="rtl">
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
                on:click={updateUserData}
            >
                Aktualisieren
                <img src="/saveIcon.svg" alt="save icon" />
            </button>
        {/if}
    </div>
    {/if}
</div>
