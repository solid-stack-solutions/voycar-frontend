<script>
    // Parent data exports
    export let userData;

    // Definitions
    let formEditEnabled = false;
</script>

<div class="p-2">
    <table>
        <!-- Diplays all the information of the specified user in the url params 
        (doesnt sanitize the data its given; means query data has to be clean) -->
        <tr>
            <th class="text-left">
                <span class="mr-5">Vorname:</span>
            </th>
            <td class="w-full">
                <form id="form">
                    <label class="label">
                        <input
                            disabled={!formEditEnabled}
                            class="form--disabled input variant-form-material"
                            type="text"
                            name="inputField"
                            placeholder={userData.firstName}
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
                            placeholder={userData.lastName}
                        />
                    </label>
                </form>
            </td>
        </tr>
        <tr>
            <th class="text-left">
                <span class="mr-5">Anschrift:</span>
            </th>
            <td>
                <form id="form">
                    <label class="label">
                        <input
                            disabled={!formEditEnabled}
                            class="form--disabled input variant-form-material"
                            type="text"
                            name="inputField"
                            placeholder={userData.street}
                        />
                    </label>
                </form>
            </td>
            <td>
                <form id="form">
                    <label class="label">
                        <input
                            disabled={!formEditEnabled}
                            class="form--disabled input variant-form-material"
                            type="text"
                            name="inputField"
                            placeholder={userData.housenumber}
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
                            placeholder={userData.city}
                        />
                    </label>
                </form>
            </td>
            <td>
                <form id="form">
                    <label class="label">
                        <input
                            disabled={!formEditEnabled}
                            class="form--disabled input variant-form-material"
                            type="text"
                            name="inputField"
                            placeholder={userData.postalCode}
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
        <button type="button" class="variant-filled-primary btn btn-md">
            <!-- ToDo logic for update button-->
            Aktualisieren
            <img src="/saveIcon.svg" alt="save icon" />
        </button>
    {/if}
</div>
