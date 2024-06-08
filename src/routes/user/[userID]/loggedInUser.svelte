<!--TODO    Gestaltung:
            aktuelle Zahlungsinformationen als Feld 
            Button neben der Zahlungsinformation zum bearbeiten \[FA049] (Bitte mit Bestätigungsabfrage)
            Button neben der Zahlungsinformation zum löschen \[FA048] (Bitte mit Bestätigungsabfrage)
            Zahlungsinformationen hinzufügen Menü \[FA047]
            Maybe Ausklappbar und dann dort Felder
            Kontolöschung beantragen Button \[FA014] (Bitte mit Bestätigungsabfrage) 
    -->
<!-- TODO vieles kann wahrscheinlich noch ausgelagert werden -->

<script>
    import { goto } from "$app/navigation";

    // Imports
    import { Accordion, AccordionItem, Table } from "@skeletonlabs/skeleton";
    import {popup} from "@skeletonlabs/skeleton";
    import { SlideToggle } from '@skeletonlabs/skeleton';
    import { redirect } from "@sveltejs/kit";

    // Import Data
    export let data; //using the data export property to get userdata

    // Definitions
    let tarifToggle = false;
    let changeTarif = false;
    let userKeys = Object.keys(data.user); //convert JSON object to iterable List
    let userInfo = Object.values(data.user); //convert JSON object to iterable List
    
    let userSubPlan = data.SubPlan;
    let formEditEnabled = false;
    
    const popupClick = {
	event: 'click',
	target: 'popupClick',
	placement: 'top'
    };

    //Functions
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
        //hier logik damit der acc gelöscht wird 
        // request an das backend
        goto('/'); //redirect zur Startseite
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
        <!-- Accordion -->
        <Accordion>
            <!-- Personal details tab -->
            <AccordionItem class="border-2 rounded-md border-primary-500">
                <svelte:fragment slot="summary"
                    >Persönliche Informationen</svelte:fragment
                >
                <svelte:fragment slot="content">
                    <div class="table-container border-4 rounded-md border-primary-500">
                        <table class="table table-fixed border-4 rounded-md w-full"> <!--tbh idk why the hover effect doesnt work -->

                            {#each userKeys as key, i}
                                {#if userInfo[i] != null}  <!-- only show rows with information available -->
                                <!--diplays all the information of the specified user in the url params (doesnt sanitize the data its give; means query data has to be clean )  -->
                                <tr class="hover:bg-tertiary-900" >
                                    <th>{key.toLowerCase()}</th>
                                    <td>
                                        <label class="label">
                                            <input disabled={!formEditEnabled} class="input form--disabled" type="text" placeholder="{userInfo[i]}" id="input_{key}" />
                                        </label>
                                    </td> 
                                </tr>
                                {/if}
                            {/each}
                        </table>
                    </div>
                    <div dir="rtl">
                        <button type="button" class="btn btn-md variant-filled-warning " on:click={() => formEditEnabled = !formEditEnabled}>
                            Edit
                            <svg class="h-4 w-4"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
                        </button>
                        {#if formEditEnabled}
                        <button type="button" class="btn btn-md variant-filled-success ">
                            <!-- TODO Update Button Logik implementieren -->
                            Update
                            <svg class="h-4 w-4"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />  <polyline points="17 21 17 13 7 13 7 21" />  <polyline points="7 3 7 8 15 8" /></svg>
                        </button>
                        {/if}
                    </div>
                </svelte:fragment>
            </AccordionItem>
            <!-- Payment information tab -->
            <AccordionItem class="border-2 rounded-md border-secondary-500">
                <svelte:fragment slot="summary">Zahlungsinformation</svelte:fragment>
                <svelte:fragment slot="content">

                </svelte:fragment>
            </AccordionItem>
            <!-- Subscription plan information -->
            {#if data.user.tarifID != null}
            <AccordionItem class="border-2 rounded-md border-tertiary-500">
                <svelte:fragment slot="summary">Tarif</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="static h-8">
                        Aktueller Tarif:
                        <!-- hier dann noch daten abrufen und tarif einfügen -->
                         {data.user.SubPlan}
                        <span>
                    </div>
                </svelte:fragment>
            </AccordionItem>
            {/if}
        </Accordion>
    </div>
    <!-- Account delete button -->
    <div class="relative">
        <button type="button" class="btn bg-gradient-to-br variant-filled-error absolute right-0" use:popup={popupClick}>
            Kontolöschung beantragen
        </button>
        <!-- Floating ui popup to confirm account deletion -->
        <div class="card p-2 bg-secondary-500" data-popup="popupClick">
            <aside class="alert variant-filled-warning">
                <div class="alert-message">
                    <h3 class="h3">Kontolöschung bestätigen</h3>
                    <p>Wollen Sie ihr Voyccar-Konto wirklich löschen?</p>
                </div>
                <div class="alert-actions">
                    <button type="button" class="btn variant-filled" on:click={confirmDeletion}>Bestätigen</button>
                </div>
            </aside>
            <div class="arrow variant-filled-primary" />
        </div>
    </div>
</div>