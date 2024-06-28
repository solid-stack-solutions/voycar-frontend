<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";

    // Definitions
    export let personalData;

    const toastStore = getToastStore();

    // Variables
    let formEditEnabled = false;
    // Will be used in future versions
    let paymentName = personalData.paymentName;

    // 🍞
    const infoToast = {
        message: "Dieses Feature ist zur Zeit noch nicht verfügbar",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-primary",
    };
</script>

<div class="relative h-full p-2">
    <div class="flex h-full flex-col">
        <p>Zahlungsmittel:</p>
        <div class="space-y-2">
            <label class="flex items-center space-x-2">
                <input
                    disabled={!formEditEnabled}
                    class="radio {formEditEnabled
                        ? ''
                        : 'hover:cursor-not-allowed'}"
                    type="radio"
                    checked
                    name="radio-direct"
                    value="1"
                />
                <p>PayPal</p>
            </label>
            <label class="flex items-center space-x-2">
                <input
                    disabled={!formEditEnabled}
                    class="radio {formEditEnabled
                        ? ''
                        : 'hover:cursor-not-allowed'}"
                    type="radio"
                    name="radio-direct"
                    value="2"
                />
                <p>Kreditkarte</p>
            </label>
            <label class="flex items-center space-x-2">
                <input
                    disabled={!formEditEnabled}
                    class="radio {formEditEnabled
                        ? ''
                        : 'hover:cursor-not-allowed'}"
                    type="radio"
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
                on:click={() => toastStore.trigger(infoToast)}
            >
                Löschen
            </button>
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
                    on:click={() => {
                        formEditEnabled = false;
                        toastStore.trigger(infoToast);
                    }}
                >
                    Aktualisieren
                    <img src="/saveIcon.svg" alt="save icon" />
                </button>
            {/if}
        </div>
    </div>
</div>
