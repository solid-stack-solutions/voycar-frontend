<script>
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";
    import { onMount } from "svelte";
    import { urls } from "$lib/util.js";

    // Definitions
    // Policy for restarting backend fetched up to 5 times if there's no reply
    const retryPolicy = retry(handleAll, {
        maxAttempts: 5,
        backoff: new ExponentialBackoff(),
    });

    export let reservationData;

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
</script>

<div class=" relaitve m-4 p-4 rounded-md border-4 border-secondary-500 space-y-3">
    <div class="flex flex-row space-x-4">
        <div class="basis-1/3 ">
            {#await carData}
                <div class="placeholder min-h-52 !rounded-lg animate-pulse"></div>
            {:then carData} 
                <img src="carpng.png" alt="cool car" class="border rounded-lg"/> 
            {:catch err}
                <div class="flex h-52 flex-col items-center justify-center bg-surface-700 !rounded-lg ">
                    <h2 class="h2">Kein Autobild geladen</h2>
                </div>
            {/await}
        </div>
        <div class="basis-2/3 grid-cols-1 rounded-lg p-4 bg-surface-700">
            <div class="flex row-auto space-x-2">
                <p>Beginn:</p>
                <p>{filterDate(reservationData.begin)}</p>
            </div>
            <div class="flex row-auto space-x-2">
                <p>Ende:</p>
                <p>{filterDate(reservationData.end)}</p>
            </div>
        </div>
    </div>
    <button class="btn variant-filled-error">Reservierung Stornieren</button>
</div>
