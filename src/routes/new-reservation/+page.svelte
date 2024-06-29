<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";

    // Import backend urls
    import { urls, tryFetchingRestricted } from "$lib/util.js";
    import { onMount } from "svelte";

    let selectedCarIndex = 0;
    let selectedStationIndex = 0;
    let beginReference;
    let endReference;
    let loadedStations;
    let formPage = 0;

    let cars = new Promise((resolve, reject) => {});
    let stations = new Promise((resolve, reject) => {});

    function fetchAvailableAllCars(loadedStations) {
        cars = new Promise(async (resolve, reject) => {
            try {
                const response = await tryFetchingRestricted(
                    urls.get.availableCars + "?" +
                    new URLSearchParams({
                        stationId: loadedStations[selectedStationIndex].id,
                        begin: beginReference.value,
                        end: endReference.value,
                    }).toString()
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

    async function fetchAllStations() {
        stations = new Promise(async (resolve, reject) => {
            try {
                const response = await tryFetchingRestricted(urls.get.allStations);
                if (response.ok) {
                    stations = await response.json();
                } else {
                    throw new Error("No stations found");
                }
            } catch (err) {
                reject(err);
            }
        });
    }


    onMount(async () => {
        fetchAllStations();
    })
</script>

<!-- Login page -->
<div class="mt-4 flex flex-col items-center justify-center">
    <h1 class="h2 mb-8">Reservierung anlegen</h1>
    <div class="w-96 items-center justify-center space-y-4">
        <form class="space-y-3 rounded-md border-2 border-secondary-500 p-4">
            {#if formPage == 0}
            <label class="label" for="input_begin">Beginn</label>
            <input class="input" title="Beginn" id="input_begin" type="datetime-local" bind:this={beginReference}/>
            <label class="label" for="input_end">Ende</label>
            <input class="input" title="Ende" id="input_end" type="datetime-local" bind:this={endReference}/>
            {#await stations then stations}
            <label class="label" for="input_station">Station</label>
            <select id="input_station" class="input" bind:value={selectedStationIndex}>
                {#each stations as station, i }
                    <option value="{i}">{station.name}</option>
                {/each}
            </select>
            {/await}
            <button class="btn variant-filled-primary w-full" on:click={() => {formPage = 1; fetchAvailableAllCars(stations);}}>Weiter</button>
            {:else if formPage == 1}
            {#await cars then loadedCars}
            <label class="label" for="input_car">Auto</label>
            <select id="input_car" class="input" bind:value={selectedCarIndex}>
                {#each loadedCars as car, i }
                    <option value="{i}">{car.model}</option>
                {/each}
            </select>
            <div class="bg-surface-700 rounded-lg flex flex-col">
                {#if loadedCars[selectedCarIndex]}
                    <table>
                        <tr>
                            <th>
                                Marke:
                            </th>
                            <td>
                                {loadedCars[selectedCarIndex].brand}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Type:
                            </th>
                            <td>
                                {loadedCars[selectedCarIndex].type}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Leistung:
                            </th>
                            <td>
                                {loadedCars[selectedCarIndex].ps} PS
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Sitzplätze:
                            </th>
                            <td>
                                {loadedCars[selectedCarIndex].seats}
                            </td>
                        </tr>
                    </table>
                {/if}
            </div>
            {/await}
            {/if}
        </form>
    </div>
</div>
