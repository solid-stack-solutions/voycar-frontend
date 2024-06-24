<script>
    import Reservation from "./reservation.svelte";
    import { onMount } from "svelte";
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";
    import { urls } from "$lib/util.js";
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

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
        id: "50feffac-4d83-450a-913f-e816be805349",
    };

    function filterDate(dateString) {
        return new Intl.DateTimeFormat("de-DE").format(
            new Date(dateString),
        );
    }

    let error = "";
    let reservationData = new Promise((resolve, reject) => {});
    onMount(async () => {
        reservationData = new Promise(async (resolve, reject) => {
            try {
                // Fetch backend for reservation Data with retry policy
                const response = await retryPolicy.execute(() =>
                    fetch(urls.get.reservationPersonalData),
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
    <Accordion>
        <div>
            {#each { reservations } as reservation}
            <AccordionItem>
                <svelte:fragment slot="summary">Reservierung für den {reservation.begin}</svelte:fragment>
                <svelte:fragment slot="content">
                    <Reservation reservationData={reservation}></Reservation>
                </svelte:fragment>
            </AccordionItem>
            {/each}
        </div>
    </Accordion>
    {:catch error}
        <p>Reservierungen konnten nicht geladen werden</p>
    {/await}
    <Reservation reservationData={test}></Reservation>
    <Accordion>
        <div>
            <AccordionItem>
                <svelte:fragment slot="summary">Reservierung für den {filterDate(test.begin)}</svelte:fragment>
                <svelte:fragment slot="content">
                    <Reservation reservationData={test}></Reservation>
                </svelte:fragment>
            </AccordionItem>
        </div>
    </Accordion>
    <div class="relative">
        <button class="variant-filled-secondary btn absolute right-4"
            >Neue reservierung erstellen</button
        >
    </div>
    {error}
</div>
