<script>
    // Framework imports
    import { ProgressRadial } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";

    // Import url routes and fetch method
    import { urls, tryFetchingRestricted } from "$lib/util.js";
    import { loggedIn } from "$lib/stores/loggedIn.js";
    // Import custom reservation list component
    import ReservationList from "./reservationList.svelte";
    import Loading from "$lib/loading.svelte";

    // Definitions
    let reservationData = new Promise((resolve, reject) => {});

    // Reactive statements
    $: if ($loggedIn) {
        reservationData = new Promise(async (resolve, reject) => {
            try {
                // Fetch backend for reservation Data with retry policy
                const response = await tryFetchingRestricted(
                    urls.get.reservationPersonalData,
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
    } else if ($loggedIn === false) {
        goto("/login");
    }
</script>

<svelte:head>
    <title>Voycar - Reservierungen</title>
</svelte:head>
{#if $loggedIn}
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
            <h4 class="h4 mb-2">Laufende Reservierungen:</h4>
            {#if reservationData.active.length > 0}
                <ReservationList
                    reservationData={reservationData.active}
                    cancellable={false}
                ></ReservationList>
            {:else}
                <p>Keine</p>
            {/if}
            <hr class="my-4 rounded-full !border-t-4" />
            <h4 class="h4 mb-2">Geplante Reservierungen:</h4>
            {#if reservationData.planned.length > 0}
                <ReservationList
                    reservationData={reservationData.planned}
                    cancellable={true}
                ></ReservationList>
            {:else}
                <p>Keine</p>
            {/if}
            <hr class="my-4 rounded-full !border-t-4" />
            <h4 class="h4 mb-2">Vergangene Reservierungen:</h4>
            {#if reservationData.expired.length > 0}
                <ReservationList
                    reservationData={reservationData.expired}
                    cancellable={false}
                ></ReservationList>
            {:else}
                <p>Keine</p>
            {/if}
            <div class="relative mt-2">
                <button
                    class="variant-filled-primary btn absolute right-0"
                    on:click={() => (window.location.href = "/new-reservation")}
                    >Neue Reservierung erstellen</button
                >
            </div>
        {:catch}
            <p>Reservierungen konnten nicht geladen werden</p>
        {/await}
    </div>
{:else}
    <Loading />
{/if}
