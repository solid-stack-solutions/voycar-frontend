<script>
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";
    import { onMount } from "svelte";
    import { urls } from "$lib/util.js";
    import { popup } from "@skeletonlabs/skeleton";

    // Definitions

    export let reservationData;

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
                    fetch(urls.get.singleCar + reservationData.carId),
                );
                if (response.ok) {
                    carData = resolve(await response.json());
                } else {
                    throw new Error("No car data found");
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    onMount(() => {
        // just for test
        fetchCarForReservation();
    });

    function confirmDeletion(){
        // ToDo hier logik und indikatoren 
    }
</script>

<div class=" relaitve p-4 rounded-md border-4 border-secondary-500 space-y-3">
    <div class="flex flex-row space-x-4">
        <div class="basis-1/3 ">
            {#await carData}
                <div class="placeholder min-h-52 !rounded-lg animate-pulse cursor-progress"></div>
            {:then carData} 
                <img src="carpng.png" alt="cool car" class="border rounded-lg"/> 
            {:catch err}
                <div class="flex h-52 flex-col items-center justify-center bg-surface-700 !rounded-lg ">
                    <h2 class="h2">Kein Autobild geladen</h2>
                </div>
            {/await}
        </div>
        <div class="basis-2/3 grid-cols-1 rounded-lg p-4 bg-surface-700 space-y-6">
            <div>
                <div class="flex row-auto space-x-2">
                    <p>Beginn:</p>
                    <p>{filterDate(reservationData.begin)}</p>
                </div>
                <div class="flex row-auto space-x-2">
                    <p>Ende:</p>
                    <p>{filterDate(reservationData.end)}</p>
                </div>
            </div>
            {#await carData}
                <p class="animate-pulse cursor-progress">Laden der Daten für ihr reserviertes Auto</p>
            {:then carData} 
            <div class="flex-col">
                <div class="flex row-auto space-x-2">
                    <p>Kennzeichen:</p>
                    <p>{carData.licensePlate}</p>
                </div>
                <div class="flex row-auto space-x-2">
                    <p>Modell:</p>
                    <p>{carData.model}</p>
                </div>
                <div class="flex row-auto space-x-2">
                    <p>Art:</p>
                    <p>{carData.type}</p>
                </div>
                <div class="flex row-auto space-x-2">
                    <p>Sitzplätze:</p>
                    <p>{carData.seats}</p>
                </div>
            </div>
            {:catch err}
                <p>Es wurden keine Daten zu ihrem Auto gefunden</p>
            {/await}
            
        </div>
    </div>
    <!-- ToDo confirm popup -->
    <div class="relative h-9">
        <button class="btn absolute right-0 variant-filled-error"
        use:popup={popupClick}
        >Reservierung Stornieren</button>
    </div>
    <!-- Floating ui popup to confirm account deletion -->
    <div class="card bg-secondary-500 p-2" data-popup="popupClick">
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
        <div class="variant-filled-primary arrow" />
    </div>
</div>
