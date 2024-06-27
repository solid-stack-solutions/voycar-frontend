<script>
    // Definitions
    let formEditEnabled = false;
    // export let paymentName;
    // ToDo logic for backend fetch


</script>

<div class="relative h-full p-2">
    <div class="flex h-full flex-col">
        <p>Zahlungsmittel:</p>
        <!-- ToDo logic for show/hide payment data -->
        <!-- ToDo logic to only show available payment methods instead of hardcoded text -->
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
            <button type="button" class="variant-filled-error btn btn-md">
                <!-- ToDo logic for delete button -->
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
                class="variant-filled-success btn btn-md"
                on:click={() => {
                    if (formEditEnabled) {
                        formEditEnabled = false;
                    }
                    }}>
                    <!-- ToDo logic for update button -->
                    Aktualisieren
                    <img src="/saveIcon.svg" alt="save icon" />
                </button>
            {/if}
        </div>
    </div>
</div>
