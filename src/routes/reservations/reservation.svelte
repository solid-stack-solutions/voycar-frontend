<script>
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";
    import { onMount } from "svelte";
    import { urls } from "$lib/util.js";
    import { popup } from "@skeletonlabs/skeleton";
    import { getToastStore } from "@skeletonlabs/skeleton";
    // Definitions

    export let reservationData;
    export let cancellable;
    const toastStore = getToastStore();

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

    // Policy for restarting backend fetched up to 5 times if there's no reply
    const retryPolicy = retry(handleAll, {
        maxAttempts: 5,
        backoff: new ExponentialBackoff(),
    });

    const popupClick = {
        // Popup settings
        event: "click",
        target: "popupClick",
        placement: "top",
    };

    let carData = new Promise((resolve, reject) => {});

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
    };

    function filterDate(dateString) {
        return new Intl.DateTimeFormat("de-DE", options).format(
            new Date(dateString),
        );
    }

    async function fetchCarForReservation() {
        carData = new Promise(async (resolve, reject) => {
            try {
                const response = await retryPolicy.execute(() =>
                    fetch(urls.get.singleCar + reservationData.carId, { credentials: "include" }),
                );
                if (response.ok) {
                    resolve(await response.json());
                } else {
                    throw new Error("No car data found");
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    onMount(() => {
        fetchCarForReservation();
    });

    async function confirmDeletion() {
        try {
            const response = await retryPolicy.execute(() =>
                fetch(new Request(urls.delete.singleReservation + "/" + reservationData.id, {
                        method: "DELETE",
                        credentials: "include",
                    }),
                ),
            );
            if (response.ok) {
                location.reload()
                toastStore.trigger(toastSuccsess);
            } else {
                throw new Error("Reservierung konnte nicht gelöscht werden");
            }
        } catch (err) {
            toastStore.trigger(toastError);
            throw err;
        }
    }
</script>

<div class=" relaitve space-y-3 rounded-md  p-4 bg-surface-500">
    <div class="flex flex-row space-x-4">
        <div class="basis-1/3">
            {#await carData}
                <div
                    class="placeholder min-h-52 animate-pulse cursor-progress !rounded-lg"
                ></div>
            {:then carData}
            <!-- ToDo replace with image according to ID -->
                <img
                    src="carpng.png"
                    alt="cool car"
                    class="rounded-lg border"
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
            <div>
                <div class="row-auto flex space-x-2">
                    <p>Beginn:</p>
                    <p>{filterDate(reservationData.begin)}</p>
                </div>
                <div class="row-auto flex space-x-2">
                    <p>Ende:</p>
                    <p>{filterDate(reservationData.end)}</p>
                </div>
            </div>
            {#await carData}
                <p class="animate-pulse cursor-progress">
                    Laden der Daten für ihr reserviertes Auto
                </p>
            {:then carData}
                <div class="flex-col">
                    <div class="row-auto flex space-x-2">
                        <p>Kennzeichen:</p>
                        <p>{carData.licensePlate}</p>
                    </div>
                    <div class="row-auto flex space-x-2">
                        <p>Modell:</p>
                        <p>{carData.model}</p>
                    </div>
                    <div class="row-auto flex space-x-2">
                        <p>Art:</p>
                        <p>{carData.type}</p>
                    </div>
                    <div class="row-auto flex space-x-2">
                        <p>Sitzplätze:</p>
                        <p>{carData.seats}</p>
                    </div>
                </div>
            {:catch}
                <p>Es wurden keine Daten zu ihrem Auto gefunden</p>
            {/await}
        </div>
    </div>
    {#if cancellable}
        <div class="relative h-9">
            <button
                class="variant-filled-error btn absolute right-0"
                use:popup={popupClick}>Reservierung Stornieren</button
            >
        </div>
    {/if}
    <!-- Floating ui popup to confirm account deletion -->
    <div class="card bg-secondary-500" data-popup="popupClick">
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
</div>
