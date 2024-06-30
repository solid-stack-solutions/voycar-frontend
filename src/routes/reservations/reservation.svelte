<script>
    // Framework imports
    import { onMount } from "svelte";
    import { urls, tryFetchingRestricted } from "$lib/util.js";
    import { popup } from "@skeletonlabs/skeleton";
    import { getToastStore } from "@skeletonlabs/skeleton";
    import CarDataComponent from "../carDataComponent.svelte";
    // Definitions

    // Export data from parent component
    export let reservationData;
    export let cancellable;

    // Constants
    const toastStore = getToastStore();

    const dateFormattingOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    };

    // Toast Settings
    const toastSuccsess = {
        message: "Reservierung wurde erfolgreich gelöscht",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-secondary",
    };

    const toastError = {
        message: "Reservierung konnte nicht gelöscht werden",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-error",
    };

    // Popup settings
    const reservationPopupClick = {
        event: "click",
        target: "reservationPopupClick",
        placement: "top",
    };

    let carData = new Promise((resolve, reject) => {});

    // Functions
    function filterDate(dateString) {
        return (
            new Intl.DateTimeFormat("de-DE", dateFormattingOptions).format(
                new Date(dateString),
            ) + " Uhr"
        );
    }

    async function fetchCarForReservation() {
        carData = new Promise(async (resolve, reject) => {
            try {
                const response = await tryFetchingRestricted(
                    urls.get.singleCar + reservationData.carId,
                );
                if (response.ok) {
                    resolve(await response.json());
                } else {
                    throw new Error("No car data found");
                }
            } catch (err) {
                console.log("no car");
                reject(err);
            }
        });
    }

    async function confirmDeletion() {
        try {
            const response = await tryFetchingRestricted(
                urls.delete.singleReservation + reservationData.id,
                "DELETE",
            );
            if (response.ok) {
                location.reload();
                toastStore.trigger(toastSuccsess);
            } else {
                throw new Error("Reservierung konnte nicht gelöscht werden");
            }
        } catch (err) {
            toastStore.trigger(toastError);
            throw err;
        }
    }

    onMount(fetchCarForReservation);
</script>

<!-- Floating UI popup to confirm account deletion -->
<div class="card bg-secondary-500" data-popup="reservationPopupClick">
    <aside class="alert variant-filled-warning">
        <div class="alert-message">
            <h3 class="h3">Stornierung bestätigen</h3>
            <p>Willst du deine Reservierung wirklich löschen?</p>
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
<div class=" relaitve space-y-3 rounded-md bg-surface-500 p-4">
    <div class="flex flex-row space-x-4">
        <div class="basis-1/3">
            {#await carData}
                <div
                    class="placeholder min-h-52 cursor-progress !rounded-lg"
                ></div>
            {:then carData}
                <img
                    src="carImages/{carData.model}.webp"
                    alt="cool car"
                    class="rounded-lg"
                />
            {:catch err}
                <div
                    class="flex h-52 flex-col items-center justify-center !rounded-lg bg-surface-700"
                >
                    <h2 class="h2">Kein Autobild geladen</h2>
                </div>
            {/await}
        </div>
        <div
            class="basis-2/3 grid-cols-1 space-y-6 rounded-lg bg-surface-700 p-4"
        >
            <table class="table-auto border-separate border-spacing-x-2">
                <tr>
                    <td class="font-bold">Beginn:</td>
                    <td>{filterDate(reservationData.begin)}</td>
                </tr>
                <tr>
                    <td class="font-bold">Ende:</td>
                    <td>{filterDate(reservationData.end)}</td>
                </tr>
            </table>
            {#await carData}
                <p class="animate-pulse cursor-progress">
                    Laden der Daten für dein reserviertes Auto
                </p>
            {:then carData}
                <CarDataComponent car={carData} showLicensePlate={true} />
            {:catch}
                <p>Es wurden keine Daten zu deinem Auto gefunden</p>
            {/await}
        </div>
    </div>
    {#if cancellable}
        <div class="relative h-9">
            <button
                class="variant-filled-error btn absolute right-0"
                use:popup={reservationPopupClick}
                >Reservierung stornieren</button
            >
        </div>
    {/if}
</div>
