<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";

    // Import backend urls
    import { urls, tryFetchingRestricted } from "$lib/util.js";
    import { onMount } from "svelte";

    // Definitions

    const toastStore = getToastStore();

    // Toast Settings
    const toastSuccsess = {
        message: "Reservierung wurde erfolgreich erstellt",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-secondary",
    };

    const toastError = {
        message: "Reservierung konnte nicht angelegt werden",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-error",
    };

    const dateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    };

    let selectedCarIndex = 0;
    let selectedStationIndex = 0;

    let selectedStation;
    let selectedBeginn;
    let selectedEnd;
    let selectedCar;

    let beginReference;
    let endReference;

    let memberId;
    let loadedStations;
    let formPage = 0;

    let cars = new Promise((resolve, reject) => {});
    let stations = new Promise((resolve, reject) => {});

    function fetchAvailableAllCars(loadedStations) {
        cars = new Promise(async (resolve, reject) => {
            try {
                const response = await tryFetchingRestricted(
                    urls.get.availableCars +
                        "?" +
                        new URLSearchParams({
                            stationId: loadedStations[selectedStationIndex].id,
                            begin: beginReference.value,
                            end: endReference.value,
                        }).toString(),
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
                const response = await tryFetchingRestricted(
                    urls.get.allStations,
                );
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

    function checkAndSaveCarSelected(cars) {
        const buttons = document.getElementsByName("radio-button");
        for (let index = 0; index < buttons.length; index++) {
            if (buttons[index].checked) {
                selectedCar = cars[index];
                return true;
            }
        }
        console.log("false");
        return false;
    }

    function filterDate(dateString) {
        return new Intl.DateTimeFormat("de-DE", dateOptions).format(
            new Date(dateString),
        );
    }

    function saveSelected(begin, end, station) {
        selectedBeginn = begin;
        selectedEnd = end;
        selectedStation = station;
    }

    async function createReservation() {
        try {
            const mybody = {
                carId: selectedCar.id,
                begin: new Date(selectedBeginn).toISOString(),
                end: new Date(selectedEnd).toISOString(),
            };
            console.log(mybody);
            const response = await tryFetchingRestricted(
                urls.post.newReservation,
                "POST",
                mybody,
            );
            if (response.ok) {
                toastStore.trigger(toastSuccsess);
            } else {
                throw new Error("Create reservation failed");
            }
        } catch (err) {
            toastStore.trigger(toastError);
            console.log(err);
        }
    }

    onMount(async () => {
        fetchAllStations();
    });
</script>

<!-- Login page -->
<div class="mt-4 flex flex-col items-center justify-center">
    <h1 class="h2 mb-8">Reservierung anlegen</h1>
    <div class="w-1/2 items-center justify-center space-y-4">
        <form class="space-y-3 rounded-md border-2 border-secondary-500 p-4">
            {#if formPage == 0}
                <label class="label" for="input_begin">Beginn</label>
                <input
                    class="input"
                    title="Beginn"
                    id="input_begin"
                    type="datetime-local"
                    bind:this={beginReference}
                />
                <label class="label" for="input_end">Ende</label>
                <input
                    class="input"
                    title="Ende"
                    id="input_end"
                    type="datetime-local"
                    bind:this={endReference}
                />
                {#await stations then stations}
                    <label class="label" for="input_station">Station</label>
                    <select
                        id="input_station"
                        class="input"
                        bind:value={selectedStationIndex}
                    >
                        {#each stations as station, i}
                            <option value={i}>{station.name}</option>
                        {/each}
                    </select>
                {/await}
                <!-- ToDo nur weiter wenn Datum in der Zukunft -->
                <!-- ToDo format Date -->
                <button
                    class="variant-filled-primary btn w-full"
                    on:click={() => {
                        formPage = 1;
                        saveSelected(
                            beginReference.value,
                            endReference.value,
                            stations[selectedStationIndex],
                        );
                        fetchAvailableAllCars(stations);
                    }}>Weiter</button
                >
            {:else if formPage == 1}
                {#await cars then loadedCars}
                    <label class="label" for="car_table"
                        >Verfügbares Auto auswählen</label
                    >
                    <div class="flex flex-col space-y-4 rounded-lg p-2">
                        {#if loadedCars[selectedCarIndex]}
                            {#each loadedCars as car, index}
                                <a
                                    href="/new-reservation"
                                    on:click|preventDefault={() => {
                                        document.getElementById(
                                            `radio_${index}`,
                                        ).checked = true;
                                    }}
                                >
                                    <div
                                        class="grid grid-cols-6 rounded-lg bg-surface-600 p-2 hover:bg-surface-500"
                                    >
                                        <div class="col-span-2">
                                            <img
                                                src="carImages/{car.model}.webp"
                                                alt="car pic"
                                                class="rounded-lg"
                                            />
                                        </div>
                                        <div
                                            class="col-span-3 flex h-full flex-col items-center justify-center p-2"
                                        >
                                            <table
                                                id="car_table"
                                                class="w-full border-separate border-spacing-x-2 text-left"
                                            >
                                                <tr>
                                                    <th> Marke: </th>
                                                    <td>
                                                        {car.brand}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th> Typ: </th>
                                                    <td>
                                                        {car.type}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th> Leistung: </th>
                                                    <td>
                                                        {car.ps} PS
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th> Sitzplätze: </th>
                                                    <td>
                                                        {car.seats}
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <!-- ToDo immer den ersten ausgewählt haben -->
                                        <div
                                            class="col-span-1 flex h-full flex-col items-center justify-center"
                                        >
                                            <input
                                                class="radio align-middle"
                                                type="radio"
                                                name="radio-button"
                                                value={index}
                                                id="radio_{index}"
                                            />
                                        </div>
                                    </div>
                                </a>
                            {/each}
                        {/if}
                    </div>
                    <div class="grid grid-cols-2 space-x-2">
                        <button
                            class="variant-filled-primary btn"
                            on:click={() => {
                                formPage = 0;
                            }}>Zurück</button
                        >
                        <button
                            class="variant-filled-primary btn"
                            on:click={() => {
                                if (checkAndSaveCarSelected(loadedCars)) {
                                    formPage = 2;
                                }
                            }}>Weiter</button
                        >
                    </div>
                {/await}
            {:else if formPage == 2}
                <!-- Reservation summary -->
                <h3 class="h4 text-center">Zusammenfassung der Reservierung</h3>
                <div class="grid grid-cols-2">
                    <img
                        src="carImages/{selectedCar.model}.webp"
                        alt="car pic"
                        class="rounded-lg"
                    />
                    <div
                        class="flex h-full flex-col items-center justify-center p-2"
                    >
                        <table
                            class="border-separate border-spacing-x-2 text-left"
                        >
                            <tr>
                                <th> Beginn: </th>
                                <td>
                                    {filterDate(selectedBeginn)}
                                </td>
                            </tr>
                            <tr>
                                <th> Ende: </th>
                                <td>
                                    {filterDate(selectedEnd)}
                                </td>
                            </tr>
                            <tr>
                                <th> Station: </th>
                                <td>
                                    {selectedStation.name}
                                </td>
                            </tr>
                            <tr>
                                <th> Auto: </th>
                                <td>
                                    <div class="flex flex-row space-x-2">
                                        <p>
                                            {selectedCar.brand}
                                        </p>
                                        <p>
                                            {selectedCar.model}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="grid grid-cols-2 space-x-2">
                    <button
                        class="variant-filled-primary btn"
                        on:click={() => {
                            formPage = 1;
                        }}>Zurück</button
                    >
                    <button
                        class="variant-filled-primary btn"
                        on:click={() => {
                            createReservation();
                        }}>Reservierung bestätigen</button
                    >
                </div>
            {/if}
        </form>
    </div>
</div>
