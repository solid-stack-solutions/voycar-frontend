<!-- Account page for logged in users -->
<script>
    // Framework imports
    import { getToastStore, popup } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    
    // Component imports
    import UserData from "./userComponents/userData.svelte";
    import UserPaymentData from "./userComponents/userPaymentData.svelte";
    import UserPlanData from "./userComponents/userPlanData.svelte";

    // Export data from parent
    export let personalData;
    const toastStore = getToastStore();

    const infoToast = {
        message: "Dieses Feature ist zur Zeit noch nicht verfügbar",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-primary",
    };
    const popupClick = {
        // Popup settings
        event: "click",
        target: "popupClick",
        placement: "top",
    };

    // Functions
    function confirmDeletion() {
        toastStore.trigger(infoToast);
    }
</script>

<div>
    <div class="pb-4">
        <p class="pl-2 text-xl font-semibold">
            <!-- Greeting -->
            Hallo {personalData.firstName}
            {personalData.lastName}
        </p>
    </div>
    <div class="grid grid-cols-2 gap-4">
        <!-- Personal details tab -->
        <div class="rounded-md border-2 border-secondary-500 p-2">
            <div class="flex flex-row">
                <img
                    src="/personalDetailsIcon.svg"
                    alt="personal details icon"
                />
                <p>Persönliche Informationen</p>
            </div>
            <div>
                <!-- Inject user data svelte component -->
                <UserData {personalData}></UserData>
            </div>
        </div>
        <div class="flex flex-col space-y-2">
            <!-- Payment information tab -->
            <div class="basis-2/3 rounded-md border-2 border-secondary-500 p-2">
                <div class="flex flex-row">
                    <img src="/paymentInfoIcon.svg" alt="payment info icon" />
                    <p>Zahlungsinformation</p>
                </div>
                <!-- Inject user payment data svelte component -->
                <UserPaymentData {personalData}></UserPaymentData>
            </div>
            <!-- Subscription plan information -->
            <div class="basis-1/3 rounded-md border-2 border-secondary-500 p-2">
                <div class="flex flex-row">
                    <img src="/planIcon.svg" alt="plan icon" />
                    <p>Tarif</p>
                </div>
                <!-- Inject user plan data svelte component -->
                <UserPlanData {personalData}></UserPlanData>
            </div>
        </div>
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
