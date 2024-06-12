<script>
    // Definitions
    let formEditEnabled = false;
    // ToDo logic for backend fetch
</script>

<div>
    <div style="flex grid-rows-2">
        Zahlungsmittel:
        <!-- ToDo logic for show/hide payment data -->
        <!-- ToDo logic to only show available payment methods instead of hardcoded text -->
        <div class="space-y-2">
            <label class="flex items-center space-x-2">
                <input
                    disabled={!formEditEnabled}
                    class="radio variant-ghost-primary"
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
                    class="radio"
                    type="radio"
                    name="radio-direct"
                    value="2"
                />
                <p>Kreditkarte</p>
            </label>
            <label class="flex items-center space-x-2">
                <input
                    disabled={!formEditEnabled}
                    class="radio"
                    type="radio"
                    name="radio-direct"
                    value="3"
                />
                <p>Kryptowährung</p>
            </label>
        </div>
    </div>
    <!-- Buttons -->
    <div dir="rtl" class="height-auto">
        <button type="button" class="btn btn-md variant-filled-error">
            <!-- ToDo logic for delete button -->
            Löschen
        </button>
        <button
            type="button"
            class="btn btn-md variant-filled-warning"
            on:click={() => (formEditEnabled = !formEditEnabled)}
        >
            Bearbeiten
            {#if formEditEnabled}
                verlassen
            {/if}
            <img src="/editIcon.svg" alt="edit icon">
        </button>
        {#if formEditEnabled}
            <button type="button" class="btn btn-md variant-filled-success">
                <!-- ToDo logic for update button -->
                Aktualisieren
                <img src="/saveIcon.svg" alt="save icon">
            </button>
        {/if}
    </div>
</div>
