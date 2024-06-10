<!-- Account page for loggend in users -->
<script>    
    // Framework imports
    import { Accordion, AccordionItem, Table } from "@skeletonlabs/skeleton";
    import {popup} from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";

    // Component imports
    import  UserData  from "./userData.svelte";
    import UserPaymentData from "./userPaymentData.svelte";
    import UserPlanData from "./userPlanData.svelte";

    // Import Data
    export let data; //using the data export property to get userdata

    // Definitions
    let userKeys = Object.keys(data.user); //convert JSON object to iterable List
    let userInfo = Object.values(data.user); //convert JSON object to iterable List
    
    let userID = data.user.userID;
    let userSubPlanID = data.user.subPlanID;
    let userPaymentInfoID = data.user.paymentInfoID;
    //gerade nur zum testen dass statt IDs was anderes drin steht, später wird die dann aus fetch parameter genommen
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
        <p class="text-xl font-semibold pl-2">Hallo {data.user.firstName} {data.user.lastName}</p>
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
                <svelte:fragment slot="lead">
                    <img src="/personalDetailsIcon.svg" alt="" style="margin-right: 4px; margin-left: 4px;"/>
                </svelte:fragment>
            </AccordionItem>
            <!-- Payment information tab -->
            {#if userPaymentInfoID != null}
            <AccordionItem class="border-2 rounded-md border-secondary-500">
                <svelte:fragment slot="summary">Zahlungsinformation</svelte:fragment>
                <svelte:fragment slot="content">
                    <UserPaymentData userID={userID}></UserPaymentData>
                </svelte:fragment>
                <svelte:fragment slot="lead">
                    <img src="/paymentInfoIcon.svg" alt="payment info icon"  style="margin-right: 4px; margin-left: 4px;"/>
    
                </svelte:fragment>
            </AccordionItem>
            {/if}
            <!-- Subscription plan information -->
            {#if userSubPlanID != null}
            <AccordionItem class="border-2 rounded-md border-tertiary-500">
                <svelte:fragment slot="summary">Tarif</svelte:fragment>
                <svelte:fragment slot="content">
                    <UserPlanData userID={userID}></UserPlanData>
                </svelte:fragment>
                <svelte:fragment slot="lead">
                    <img src="/planIcon.svg" alt="plan icon" style="margin-right: 4px; margin-left: 4px;"/>
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