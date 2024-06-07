<!--TODO    Gestaltung:
            aktuelle Zahlungsinformationen als Feld 
            Button neben der Zahlungsinformation zum bearbeiten \[FA049] (Bitte mit Bestätigungsabfrage)
            Button neben der Zahlungsinformation zum löschen \[FA048] (Bitte mit Bestätigungsabfrage)
            Zahlungsinformationen hinzufügen Menü \[FA047]
            Maybe Ausklappbar und dann dort Felder
            Kontolöschung beantragen Button \[FA014] (Bitte mit Bestätigungsabfrage) 
    -->

<script>
    import { Accordion, AccordionItem, Table } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    export let data; //using the data export property to get userdata
    let userKeys = Object.keys(data.user); //convert JSON object to iterable List
    let userInfo = Object.values(data.user); //convert JSON object to iterable List
    /**
     * Toggle input fields visability
     * @param id    ElementID of form input field 
     */
    function changeInputDisplayStyle(id){
        var inputField = document.getElementById(id);
        if(inputField == null) return;
        if(inputField.style.display === "none"){
            inputField.style.display = "block";
        }else{
            inputField.style.display = "none";
        }
    }
</script>

<svelte:head>
    <title>Ihr Voycar-Konto</title>
</svelte:head>
<div>
    <div>
        <p>Hallo {data.user.firstName} {data.user.lastName}</p>
    </div>
    <div>
        <Accordion>
            <AccordionItem open>
                <svelte:fragment slot="summary"
                    >Persönliche Informationen</svelte:fragment
                >
                <svelte:fragment slot="content">
                    <div class="table-container border-4 rounded-md border-primary-500">
                        <table class="table table-hover"> <!--tbh idk why the hover effect doesnt work -->

                            {#each userKeys as key, i}
                                <!--diplays all the information of the specified user in the url params (doesnt sanitize the data its give; means query data has to be clean )  -->
                                <tr>
                                    <th>{key.toLowerCase()}</th>
                                    <td>{userInfo[i]}</td>
                                        <td>
                                            <label class="label">
                                                <input class="input" type="text" placeholder="{key.toLocaleLowerCase()}" id="input_{key}" style="display: none;" />
                                            </label>
                                        </td> 
                                    <td>
                                        <button type="button" class="btn variant-filled-warning" on:click={() => changeInputDisplayStyle(`input_${key}`)}>
                                            <svg class="h-4 w-4 "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                    <div>
                        <button type="button" class="btn variant-filled-warning">
                            <svg class="h-4 w-4 "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                        </button>
                    </div>
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary">Zahlungsinformation</svelte:fragment>
                <svelte:fragment slot="content">

                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary">Tarif</svelte:fragment>
                <svelte:fragment slot="content">

                </svelte:fragment>
            </AccordionItem>
        </Accordion>
    </div>
    <button type="button" class="btn bg-gradient-to-br variant-filled-error">
        Kontolöschung beantragen
    </button>
</div>
