<script>
    export let userKeys;
    export let userInfo;
    let formEditEnabled = false;
</script>

<div class="table-container rounded-md p-2">
    <table class="table table-fixed border-4 rounded-md w-full">
        <!--tbh idk why the hover effect doesnt work -->
        {#each userKeys as key, i}
            {#if userInfo[i] != null}
                <!-- only show rows with information available -->
                <!--diplays all the information of the specified user in the url params (doesnt sanitize the data its give; means query data has to be clean )  -->
                <tr class="hover:bg-tertiary-900 bg-transparent">
                    <th>{key.toLowerCase()}</th>
                    <td>
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
        <svg
            class="h-4 w-4"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg
        >
    </button>
    {#if formEditEnabled}
        <button type="button" class="btn btn-md variant-filled-success">
            <!-- TODO Update Button Logik implementieren -->
            Aktualisieren
            <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path
                    d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                /> <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" /></svg
            >
        </button>
    {/if}
</div>
