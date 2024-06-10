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
    // Framework imports
    import { Accordion, AccordionItem, Table } from "@skeletonlabs/skeleton";
    import {popup} from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";

    // Component imports
    import  UserData  from "./userData.svelte";

    // Import Data
    export let data; //using the data export property to get userdata

    // Definitions
    let userKeys = Object.keys(data.user); //convert JSON object to iterable List
    let userInfo = Object.values(data.user); //convert JSON object to iterable List
    
    let userSubPlan = data.SubPlan;

    const popupClick = {
	event: 'click',
	target: 'popupClick',
	placement: 'top'
    };

    //Functions
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
                    <UserData {userKeys} {userInfo}></UserData>
                </svelte:fragment>
            </AccordionItem>
            <!-- Payment information tab -->
            {#if data.user.paymentInfo != null}
            <AccordionItem class="border-2 rounded-md border-secondary-500">
                <svelte:fragment slot="summary">Zahlungsinformation</svelte:fragment>
                <svelte:fragment slot="content">

                </svelte:fragment>
            </AccordionItem>
            {/if}
            <!-- Subscription plan information -->
            {#if data.user.SubPlanID != null}
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