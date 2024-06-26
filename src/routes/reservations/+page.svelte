<script>
    import { onMount } from "svelte";
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";
    import { urls } from "$lib/util.js";
    import { ProgressRadial } from "@skeletonlabs/skeleton";
    import ReservationList from "./reservationList.svelte";
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();
    // Definitions
    // Policy for restarting backend fetched up to 5 times if there's no reply
    const retryPolicy = retry(handleAll, {
        maxAttempts: 5,
        backoff: new ExponentialBackoff(),
    });

    const drawerSettings = {
        id: 'reservation-drawer',
        // Provide your property overrides:
        bgDrawer: 'bg-secondary-500 text-white',
        bgBackdrop: 'bg-gradient-to-tr from-primary-500/50 via-tertiary-500/50 to-secondary-500/50',
        width: 'w-[280px] md:w-[480px]',
        padding: 'p-4',
        rounded: 'rounded-xl',
    };

    function openDrawer(){
        drawerStore.open(drawerSettings);
    }
    let reservationData = new Promise((resolve, reject) => {});
    onMount(async () => {
        reservationData = new Promise(async (resolve, reject) => {
            try {
                // Fetch backend for reservation Data with retry policy
                const response = await retryPolicy.execute(() =>
                    fetch(urls.get.reservationPersonalData, { credentials: "include" }),
                );
                if (response.ok) {
                    resolve(await response.json());
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
<!--  -->
<div class="relative mt-4">
    {#await reservationData}
        <div
            class="flex h-[70vh] flex-col items-center justify-center space-y-4"
        >
            <h4 class="h4">Laden deiner Reservierungen</h4>
            <ProgressRadial
                stroke={60}
                meter="stroke-primary-500"
                track="stroke-primary-500/30"
                strokeLinecap="butt"
                width="w-20"
            />
        </div>
    {:then reservationData}
    <h4 class="h4 mb-2"> Laufende Reservierungen:</h4>
        {#if reservationData.active.length > 0}
            <ReservationList reservationData={reservationData.active} cancellable={false}></ReservationList>
        {:else}
            <p>Keine</p>
        {/if}
    <hr class="my-4 !border-t-4 rounded-full">
    <h4 class="h4 mb-2"> Geplante Reservierungen:</h4>
        {#if reservationData.planned.length > 0}
            <ReservationList reservationData={reservationData.planned} cancellable={false}></ReservationList>
        {:else}
            <p>Keine</p>
        {/if}
        <hr class="my-4 !border-t-4 rounded-full">
    <h4 class="h4 mb-2"> Vergangene Reservierungen:</h4>
        {#if reservationData.expired.length > 0}
            <ReservationList reservationData={reservationData.expired} cancellable={false}></ReservationList>
        {:else}
            <p>Keine</p>
        {/if}
        <!-- ToDo new reservation prompt -->
         <!-- maybe as a modal -->
        <div class="relative mt-2">
            <button class="variant-filled-secondary btn absolute right-0" on:click={openDrawer}
                >Neue reservierung erstellen</button
            >
        </div>
    {:catch error}
        <p>Reservierungen konnten nicht geladen werden</p>
    {/await}
</div>
