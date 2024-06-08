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
    import {popup} from "@skeletonlabs/skeleton";
    export let data; //using the data export property to get userdata
    let userKeys = Object.keys(data.user); //convert JSON object to iterable List
    let userInfo = Object.values(data.user); //convert JSON object to iterable List
    /**
     * @type import("@skeletonlabs/skeleton").PopupSettings
     */
    const popupClick = {
	event: 'click',
	target: 'popupClick',
	placement: 'top'
    };


    let alertVisible = false;
    /**
     * Toggle input fields visability
     * @param {string} id ElementID of form input field
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

    function confirmDeletion() {

    }
</script>

<svelte:head>
    <title>Ihr Voycar-Konto</title>
</svelte:head>
<div>
    <div>
        <p class="text-xl font-semibold">Hallo {data.user.firstName} {data.user.lastName}</p>
    </div>
    <div>
        <Accordion>
            <AccordionItem open>
                <svelte:fragment slot="summary"
                    >Persönliche Informationen</svelte:fragment
                >
                <svelte:fragment slot="content">
                    <div class="table-container border-4 rounded-md border-primary-500">
                        <table class="table table-fixed border-4 rounded-md w-full"> <!--tbh idk why the hover effect doesnt work -->

                            {#each userKeys as key, i}
                                <!--diplays all the information of the specified user in the url params (doesnt sanitize the data its give; means query data has to be clean )  -->
                                <tr class="hover:bg-tertiary-900" >
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
    <div >
        <button type="button" class="btn bg-gradient-to-br variant-filled-error" use:popup={popupClick}>
            Kontolöschung beantragen
        </button>
        <div class="card p-2 bg-secondary-500" data-popup="popupClick">
            <aside class="alert variant-filled-warning">
                <div class="alert-message">
                    <h3 class="h3">Kontolöschung bestätigen</h3>
                    <p>Wollen Sie ihr Voyccar-Konto wirklich löschen?</p>
                </div>
                <div class="alert-actions">
                    <button type="button" class="btn variant-filled">Confirm</button>
                </div>
            </aside>
            <div class="arrow variant-filled-primary" />
        </div>
    </div>
</div>
