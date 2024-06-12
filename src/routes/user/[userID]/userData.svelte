<script>
    // Parent data exports
    export let userKeys;
    export let userInfo;

    // Definitions
    let formEditEnabled = false;
</script>

<div class="p-2">
    <table>
        {#each userKeys as key, i}
            <!-- Only show rows with information available -->
            {#if userInfo[i] != null}
                <!-- Diplays all the information of the specified user in the url params 
                (doesnt sanitize the data its given; means query data has to be clean) -->
                <tr>
                    <th class="text-left">
                        <span class="mr-5">{key.toLowerCase()}</span>
                    </th>
                    <td class="w-full">
                        <form id="form">
                            <label class="label">
                                <input
                                    disabled={!formEditEnabled}
                                    class="input form--disabled variant-form-material"
                                    type="text"
                                    name="inputField"
                                    placeholder={userInfo[i]}
                                    id="input_{key}"
                                />
                            </label>
                        </form>
                    </td>
                </tr>
            {/if}
        {/each}
    </table>
</div>
<!-- Buttons -->
<div dir="rtl">
    <button
        type="button"
        class="btn btn-md variant-filled-warning"
        on:click={() => (formEditEnabled = !formEditEnabled)}
    >
        Bearbeiten
        {#if formEditEnabled}
            verlassen
        {/if}
        <img src="/editIcon.svg" alt="edit icon" />
    </button>
    {#if formEditEnabled}
        <button type="button" class="btn btn-md variant-filled-success">
            <!-- ToDo logic for update button-->
            Aktualisieren
            <img src="/saveIcon.svg" alt="save icon" />
        </button>
    {/if}
</div>
