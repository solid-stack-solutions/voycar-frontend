<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";

    import { toaster } from "$lib/util.js";
    // Definitions
    export let personalData;

    const toastStore = getToastStore();

    // Variables
    let editEnabled = false;
    // Will be used in future versions
    let paymentName = personalData.paymentName;

    // 🍞
    const infoToast = {
        message: "Dieses Feature ist zur Zeit noch nicht verfügbar",
        bg: "primary",
    };

    function resetRadioButtonsOnCancel() {
        if (editEnabled) {
            document.getElementById("radio1").checked = true;
            document.getElementById("radio2").checked = false;
            document.getElementById("radio3").checked = false;
        }
    }
</script>

<div class="relative h-full p-2">
    <div class="flex h-full flex-col">
        <p>Zahlungsmittel:</p>
        <div class="space-y-2">
            <label class="flex items-center space-x-2">
                <input
                    disabled={!editEnabled}
                    class="radio {editEnabled
                        ? ''
                        : 'hover:cursor-not-allowed'}"
                    type="radio"
                    checked
                    id="radio1"
                    name="radio-direct"
                    value="1"
                />
                <p>PayPal</p>
            </label>
            <label class="flex items-center space-x-2">
                <input
                    disabled={!editEnabled}
                    class="radio {editEnabled
                        ? ''
                        : 'hover:cursor-not-allowed'}"
                    type="radio"
                    id="radio2"
                    name="radio-direct"
                    value="2"
                />
                <p>Kreditkarte</p>
            </label>
            <label class="flex items-center space-x-2">
                <input
                    disabled={!editEnabled}
                    class="radio {editEnabled
                        ? ''
                        : 'hover:cursor-not-allowed'}"
                    type="radio"
                    id="radio3"
                    name="radio-direct"
                    value="3"
                />
                <p>Kryptowährung</p>
            </label>
        </div>
    </div>
    <div class="absolute bottom-6 right-2">
        <!-- Buttons -->
        <div dir="rtl" class="">
            <button
                type="button"
                class="variant-filled-error btn btn-md"
                on:click={() => toastStore.trigger(toaster(infoToast))}
            >
                Löschen
            </button>
            <button
                type="button"
                class="variant-filled-warning btn btn-md"
                on:click={() => {
                    resetRadioButtonsOnCancel();
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
                    on:click={() => {
                        editEnabled = false;
                        toastStore.trigger(toaster(infoToast));
                    }}
                >
                    Aktualisieren
                    <img src="/saveIcon.svg" alt="save icon" />
                </button>
            {/if}
        </div>
    </div>
</div>
