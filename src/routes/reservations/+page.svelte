<script>
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import Reservation from "./reservation.svelte";
    import { onMount } from "svelte";
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";

    // Definitions
    // Policy for restarting backend fetched up to 5 times if there's no reply
    const retryPolicy = retry(handleAll, {
        maxAttempts: 5,
        backoff: new ExponentialBackoff(),
    });

    const test = {
        begin: "2024-06-21T19:11:46.833Z",
      end: "2024-09-21T19:11:46.833Z",
      memberId: "5b3f5a8d-0e6c-4422-8ffa-d3b6f250c8a4",
      carId: "bd980f9e-e049-486a-97d2-783e9158f2a7",
      id: "50feffac-4d83-450a-913f-e816be805349"   
    }

    let error = "";
    let reservationData = new Promise((resolve, reject) => {});
    let reservations = null;
    onMount(async () => {
        reservationData = new Promise(async (resolve, reject) => {
            try {
                // Fetch backend for reservation Data with retry policy
                const response = await retryPolicy.execute(() =>
                    fetch(),
                );
                if (response.ok) {
                    reservations = resolve(await response.json());
                } else {
                    throw new Error("Error while fetching data");
                }
            } catch (err) {
                reject(err); // Rethrow so Svelte can handle it
            }
        });
    });
</script>

<div class="relative">
    {#await reservationData}
        <p class="animate-pulse">Loading</p>
    {:then reservations} 
    <div>
        {#each {reservations} as reservation }
            <Reservation reservationData={reservation}></Reservation>
        {/each}
    </div> 
    {:catch error}
    <p>Reservierungen konnten nicht geladen werden</p>
    {/await } 

    <div class="relative">
        <button class="btn variant-filled-secondary absolute right-4">Neue reservierung erstellen</button>
    </div>
    {error}
    <Reservation reservationData={test}></Reservation>
</div>