<!-- Account page for logged in users -->
<script>
    // Framework imports
    import { Accordion, AccordionItem, Table } from "@skeletonlabs/skeleton";
    import { popup } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";

    // Component imports
    import UserData from "./userComponents/userData.svelte";
    import UserPaymentData from "./userComponents/userPaymentData.svelte";
    import UserPlanData from "./userComponents/userPlanData.svelte";

    // Export data from parent
    export let personalData;

    // Definitions
    // Convert JSON object to iterable array
    const userKeys = Object.keys(personalData);
    const userInfo = Object.values(personalData);
    const userID = personalData.userID;
    const userSubPlanID = personalData.subPlanID;
    const userPaymentInfoID = personalData.paymentInfoID;
    const popupClick = {
        // Popup settings
        event: "click",
        target: "popupClick",
        placement: "top",
    };

    // Functions
    function confirmDeletion() {
        // ToDo account deletion logic
        // Request to backend
        goto("/"); // Redirect to landing page
    }
</script>

<svelte:head>
    <title>Ihr Voycar-Konto</title>
</svelte:head>
<div>
    <div class="pb-4">
        <p class="pl-2 text-xl font-semibold">
            <!-- Greeting -->
            Hallo {personalData.firstName}
            {personalData.lastName}
        </p>
    </div>
    <div>
        <!-- Accordion for user data-->
        <Accordion>
            <!-- Personal details tab -->
            <AccordionItem class="rounded-md border-2 border-primary-500">
                <svelte:fragment slot="summary"
                    >Persönliche Informationen</svelte:fragment
                >
                <svelte:fragment slot="content">
                    <!-- Inject user data svelte component -->
                    <UserData {userKeys} {userInfo}></UserData>
                </svelte:fragment>
                <svelte:fragment slot="lead">
                    <img
                        src="/personalDetailsIcon.svg"
                        alt=""
                        style="margin-right: 4px; margin-left: 4px;"
                    />
                </svelte:fragment>
            </AccordionItem>
            <!-- Payment information tab -->
            {#if userPaymentInfoID != null}
                <AccordionItem class="rounded-md border-2 border-secondary-500">
                    <svelte:fragment slot="summary"
                        >Zahlungsinformation</svelte:fragment
                    >
                    <svelte:fragment slot="content">
                        <!-- Inject user payment data svelte component -->
                        <UserPaymentData {userID}></UserPaymentData>
                    </svelte:fragment>
                    <svelte:fragment slot="lead">
                        <img
                            src="/paymentInfoIcon.svg"
                            alt="payment info icon"
                            style="margin-right: 4px; margin-left: 4px;"
                        />
                    </svelte:fragment>
                </AccordionItem>
            {/if}
            <!-- Subscription plan information -->
            {#if userSubPlanID != null}
                <AccordionItem class="rounded-md border-2 border-tertiary-500">
                    <svelte:fragment slot="summary">Tarif</svelte:fragment>
                    <svelte:fragment slot="content">
                        <!-- Inject user plan data svelte component -->
                        <UserPlanData {userID}></UserPlanData>
                    </svelte:fragment>
                    <svelte:fragment slot="lead">
                        <img
                            src="/planIcon.svg"
                            alt="plan icon"
                            style="margin-right: 4px; margin-left: 4px;"
                        />
                    </svelte:fragment>
                </AccordionItem>
            {/if}
        </Accordion>
    </div>
    <!-- Account delete button -->
    <div class="relative pt-4">
        <button
            type="button"
            class="variant-filled-error btn absolute right-0 bg-gradient-to-br"
            use:popup={popupClick}
        >
            Kontolöschung beantragen
        </button>
        <!-- Floating ui popup to confirm account deletion -->
        <div class="card bg-secondary-500 p-2" data-popup="popupClick">
            <aside class="alert variant-filled-warning">
                <div class="alert-message">
                    <h3 class="h3">Kontolöschung bestätigen</h3>
                    <p>Wollen Sie ihr Voyccar-Konto wirklich löschen?</p>
                </div>
                <!-- Confirmation button -->
                <div class="alert-actions">
                    <button
                        type="button"
                        class="variant-filled-surface btn"
                        on:click={confirmDeletion}>Bestätigen</button
                    >
                </div>
            </aside>
        </div>
    </div>
</div>
