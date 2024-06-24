<script>
    import Reservation from "./reservation.svelte";
    import { onMount } from "svelte";
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";
    import { urls } from "$lib/util.js";
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import { ProgressRadial } from "@skeletonlabs/skeleton";
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
        return new Intl.DateTimeFormat("de-DE").format(new Date(dateString));
    }

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
<svelte:head>
    <title>Reservierungen</title>
</svelte:head>

<div class="relative">
    <div class="flex flex-col ">
        <div class="border-md rounded-md bg-surface-700 p-4">
            <h3 class="h3"> Ihre Reservierungen</h3>
        </div>
    </div>
    <hr class="my-4 !border-t-4 rounded-full">
    {#await reservationData}
        <div
            class="flex h-[70vh] flex-col items-center justify-center space-y-4"
        >
            <h2 class="h2">Laden deiner Reservierungen</h2>
            <ProgressRadial
                stroke={60}
                meter="stroke-primary-500"
                track="stroke-primary-500/30"
                strokeLinecap="butt"
            />
        </div>
    {:then reservations}
        <Accordion>
            <div>
                {#each { reservations } as reservation}
                    <AccordionItem class="rounded-lg  bg-surface-600">
                        <svelte:fragment slot="summary"
                            >Reservierung für den {filterDate(
                                reservation.begin,
                            )}</svelte:fragment
                        >
                        <svelte:fragment slot="content">
                            <Reservation reservationData={reservation}
                            ></Reservation>
                        </svelte:fragment>
                    </AccordionItem>
                {/each}
            </div>
        </Accordion>
        <div class="relative mt-2">
            <button class="variant-filled-secondary btn absolute right-0"
                >Neue reservierung erstellen</button
            >
        </div>
    {:catch error}
        <p>Reservierungen konnten nicht geladen werden</p>
    {/await}
    <!-- Testing -->
    <Accordion>
        <div>
            <AccordionItem class="rounded-lg  bg-surface-600">
                <svelte:fragment slot="summary"
                    >Reservierung für den {filterDate(
                        test.begin,
                    )}</svelte:fragment
                >
                <svelte:fragment slot="content">
                    <Reservation reservationData={test}></Reservation>
                </svelte:fragment>
            </AccordionItem>
        </div>
    </Accordion>
</div>
