<script>
    // Parent data exports
    export let personalData;

    // Definitions
    let formEditEnabled = false;
</script>

<div class="h-full p-2">
    <table class="table-fixed border-separate border-spacing-x-4 ">
        <!-- Diplays all the information of the specified user in the url params 
        (doesnt sanitize the data its given; means query data has to be clean) -->
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
                        />
                    </label>
                </form>
            </td>
        </tr>
        <tr>
            <th class="text-left">
                Telefonnummer:
            </th>
            <td>
                <form id="form">
                    <label class="label">
                        <input
                            disabled={!formEditEnabled}
                            class="form--disabled input variant-form-material"
                            type="text"
                            name="inputField"
                            placeholder={personalData.phoneNumber}
                        />
                    </label>
                </form>
            </td>
        </tr>
        <tr>
            <th class="text-left">
                Straße:
            </th>
            <td>
                <form id="form">
                    <label class="label">
                        <input
                            disabled={!formEditEnabled}
                            class="form--disabled input variant-form-material"
                            type="text"
                            name="inputField"
                            placeholder={personalData.street}
                        />
                    </label>
                </form>
            </td>
        </tr>
        <tr>
            <th class="text-left">
                Hausnummer:
            </th>
            <td>
                <form id="form">
                    <label class="label">
                        <input
                            disabled={!formEditEnabled}
                            class="form--disabled input variant-form-material"
                            type="text"
                            name="inputField"
                            placeholder={personalData.houseNumber}
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
                        />
                    </label>
                </form>
            </td>
        </tr>
        <tr>
            <th class="text-left">
                Postleitzahl:
            </th>
            <td>
                <form id="form">
                    <label class="label">
                        <input
                            disabled={!formEditEnabled}
                            class="form--disabled input variant-form-material"
                            type="text"
                            name="inputField"
                            placeholder={personalData.postalCode}
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
        <button type="button" class="variant-filled-primary btn btn-md" on:click={() => {if(formEditEnabled){formEditEnabled = false;}}}>
            <!-- ToDo logic for update button-->
            Aktualisieren
            <img src="/saveIcon.svg" alt="save icon" />
        </button>
    {/if}
</div>
