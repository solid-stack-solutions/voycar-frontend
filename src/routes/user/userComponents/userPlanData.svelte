<script>
    // Definitions
    export let personalData;

    let formEditEnabled = false;

    // ToDo maybe show possible plan and option to change current one
</script>

<div class="relative h-full">
    <div class="flex flex-row space-x-2">
        <p class="self-center">Aktueller Tarif:</p>
        <select 
            class="select w-2/4" 
            size="1" 
            value="{personalData.planName}"
            disabled = {!formEditEnabled}
            >
            <option value="basic">Basis</option>
            <option value="reduced">Reduziert</option>
            <option value="exclusive">Exklusiv</option>
        </select>
    </div>
    <div class="absolute bottom-6 right-2">
        <button
                type="button"
                class="variant-filled-warning btn btn-md"
                on:click={() => (formEditEnabled = !formEditEnabled)}
                >
                <img src="/editIcon.svg" alt="edit icon" />
                Bearbeiten
                {#if formEditEnabled}
                    verlassen
                {/if}
            </button>
    </div>
</div>
