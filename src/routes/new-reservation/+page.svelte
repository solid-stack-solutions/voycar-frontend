<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    // Import backend urls
    import { urls, tryFetchingRestricted, toaster } from "$lib/util.js";
    import { loggedIn } from "$lib/stores/loggedIn.js";
    import Loading from "$lib/loading.svelte"
    import CarDataComponent from "../carDataComponent.svelte";
    import NotLoggedInComponent from "../notLoggedInComponent.svelte";

    //Constants
    const toastStore = getToastStore();

    // Toast Settings
    const toastSuccsess = {
        message: "Reservierung wurde erfolgreich erstellt",
        bg: "secondary",
    };

    const toastError = {
        message: "Reservierung konnte nicht angelegt werden",
        bg: "error",
    };

    const backendNotAvailableToast = {
        message:
            "Das Backend ist gerade nicht erreichbar, es konnten keine Daten geladen werden",
        bg: "error",
    };

    const noCarSelectedToast = {
        message: "Du hast kein Auto ausgewählt",
        bg: "warning",
    };

    const indicatorStatus = {
        none: "",
        warning: "!border-warning-400",
        error: "!border-error-600",
    };

    const dateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    };

    // Variables
    let selectedStationIndexReference = 0;

    // Global temporary save variables
    let selectedStation;
    let selectedCar;

    // Indicators
    let beginIndicator = indicatorStatus.none;
    let endIndicator = indicatorStatus.none;
    let periodIndicator = false;
    let emptyIndicator = false;

    // Binding references
    let beginReference;
    let endReference;

    // Formpage index for changing form view according to user reservation progress
    let formPage = 0;

    // Initialize promises as empty on mount
    let cars = new Promise((resolve, reject) => {});
    let stations = new Promise((resolve, reject) => {});

    // Reactive statements
    $: if ($loggedIn) {
        fetchAllStations();
    } else if ($loggedIn === false) {
        goto("/login")
    }

    // Functions
    function resetIndicators() {
        beginIndicator = indicatorStatus.none;
        endIndicator = indicatorStatus.none;
        periodIndicator = false;
        emptyIndicator = false;
    }

    function fetchAvailableAllCars(loadedStations, begin, end, stationIndex) {
        cars = new Promise(async (resolve, reject) => {
            try {
                const searchParams = {
                    stationId: loadedStations[stationIndex].id,
                    begin: new Date(begin).toISOString(),
                    end: new Date(end).toISOString(),
                };
                const response = await tryFetchingRestricted(
                    urls.get.availableCars +
                        "?" +
                        new URLSearchParams(searchParams).toString(),
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
                toastStore.trigger(toaster(backendNotAvailableToast));
                formPage = 0;
                reject(err);
            }
        });
    }

    function selectCar(car, index) {
        selectedCar = car;
        document.getElementsByName("carField").forEach((element) => {
            element.className = "border-2 border-transparent rounded-lg";
        });
        document.getElementById(`carField_${index}`).className =
            "border-2 border-primary-500 rounded-lg";
    }

    function formpage1Validation(stations) {
        if (
            checkPeriodFields() &&
            checkIfDatePeriodIsValid(beginReference, endReference)
        ) {
            formPage = 1;
            (selectedStation = stations[selectedStationIndexReference]),
                fetchAvailableAllCars(
                    stations,
                    beginReference,
                    endReference,
                    selectedStationIndexReference,
                );
        }
    }

    function checkPeriodFields() {
        if (!beginReference || !endReference) {
            emptyIndicator = true;
            return false;
        }
        return true;
    }

    function checkIfDatePeriodIsValid(dateBeginn, dateEnd) {
        let valid = true;
        const dateNow = Date.now();
        if (new Date(dateBeginn) < dateNow) {
            beginIndicator = indicatorStatus.warning;
            periodIndicator = true;
            valid = false;
        }
        if (
            new Date(dateEnd) >
            new Date(dateNow).setMonth(new Date(dateNow).getMonth() + 6)
        ) {
            endIndicator = indicatorStatus.warning;
            periodIndicator = true;
            valid = false;
        }
        if (new Date(dateBeginn) >= new Date(dateEnd)) {
            beginIndicator = indicatorStatus.warning;
            endIndicator = indicatorStatus.warning;
            periodIndicator = true;
            valid = false;
        }
        return valid;
    }

    function filterDate(dateString) {
        return new Intl.DateTimeFormat("de-DE", dateOptions).format(
            new Date(dateString),
        );
    }

    // Saves current values in global variables
    function saveSelectedStation(station) {
        selectedStation = station;
    }

    // Fetches backend to create a new reservation, triggers a toast according to response status
    async function createReservation() {
        try {
            const mybody = {
                carId: selectedCar.id,
                begin: new Date(beginReference).toISOString(),
                end: new Date(endReference).toISOString(),
            };
            const response = await tryFetchingRestricted(
                urls.post.newReservation,
                "POST",
                mybody,
            );
            if (response.ok) {
                toastStore.trigger(toaster(toastSuccsess));
                goto("/reservations");
            } else {
                throw new Error("Create reservation failed");
            }
        } catch (err) {
            toastStore.trigger(toaster(toastError));
            formPage = 0;
        }
    }
</script>

<svelte:head>
    <title>Neue Reservierung erstellen</title>
</svelte:head>
{#if $loggedIn}
    <!-- Login page -->
    <div class="mt-4 flex flex-col items-center justify-center">
        <h1 class="h2 mb-8">Reservierung anlegen</h1>
        <div class="w-1/2 items-center justify-center space-y-4">
            <form
                class="space-y-3 rounded-md border-2 border-secondary-500 p-4"
            >
                {#if formPage == 0}
                    <!-- Formpage 1: Selection of station and date of beginning and end of reservation -->
                    <label class="label" for="input_begin">Beginn</label>
                    <input
                        class="input {beginIndicator}"
                        title="Beginn"
                        id="input_begin"
                        type="datetime-local"
                        bind:value={beginReference}
                    />
                    <label class="label" for="input_end">Ende</label>
                    <input
                        class="input {endIndicator}"
                        title="Ende"
                        id="input_end"
                        type="datetime-local"
                        bind:value={endReference}
                    />
                    {#if emptyIndicator}
                        <p class="text-center text-error-500">
                            Zeitraumfeld(er) dürfen nicht leer sein
                        </p>
                    {:else if periodIndicator}
                        <p class="text-center text-warning-500">
                            Bitte gib einen validen Zeitraum an
                        </p>
                    {/if}
                    {#await stations then stations}
                        <label class="label" for="input_station">Station</label>
                        <select
                            id="input_station"
                            class="input"
                            bind:value={selectedStationIndexReference}
                        >
                            {#each stations as station, i}
                                <option value={i}>{station.name}</option>
                            {/each}
                        </select>
                    {/await}
                    <!-- Navigation -->
                    <button
                        class="variant-filled-primary btn w-full"
                        on:click={() => {
                            resetIndicators();
                            formpage1Validation(stations);
                        }}>Weiter</button
                    >
                {:else if formPage == 1}
                    <!-- Formpage 2: Selection of car -->
                    {#await cars then loadedCars}
                        {#if loadedCars.length > 0}
                            <label class="label" for="car_table"
                                >Verfügbares Auto auswählen</label
                            >
                            <div class="flex flex-col space-y-4 rounded-lg p-2">
                                {#each loadedCars as car, index}
                                    <a
                                        href="/new-reservation"
                                        on:click|preventDefault={() => {
                                            selectCar(car, index);
                                        }}
                                        id="carField_{index}"
                                        name="carField"
                                        class="rounded-lg border-2 border-transparent"
                                    >
                                        <div
                                            class="grid grid-cols-2 rounded-lg bg-surface-600 p-2 hover:bg-surface-500"
                                        >
                                            <div>
                                                <img
                                                    src="carImages/{car.model}.webp"
                                                    alt="car pic"
                                                    class="rounded-lg"
                                                />
                                            </div>
                                            <div
                                                class="flex h-full flex-col items-center justify-center p-2"
                                            >
                                                <CarDataComponent {car} />
                                            </div>
                                        </div>
                                    </a>
                                {/each}
                            </div>

                            <!-- Navigation -->
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
                                        if (!selectedCar) {
                                            toastStore.trigger(
                                                toaster(noCarSelectedToast),
                                            );
                                        } else {
                                            formPage = 2;
                                        }
                                    }}>Weiter</button
                                >
                            </div>
                        {:else}
                            <h4 class="h4 text-center">
                                Es sind leider keine Autos in diesem Zeitraum
                                verfügbar
                            </h4>
                            <button
                                class="variant-filled-primary btn w-full"
                                on:click={() => {
                                    formPage = 0;
                                }}>Zurück</button
                            >
                        {/if}
                    {/await}
                {:else if formPage == 2}
                    <!-- Formpage3: Reservation summary -->
                    <h3 class="h4 text-center">
                        Zusammenfassung der Reservierung
                    </h3>
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
                                    <th>Beginn:</th>
                                    <td>
                                        {filterDate(beginReference)}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Ende:</th>
                                    <td>
                                        {filterDate(endReference)}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Station:</th>
                                    <td>
                                        {selectedStation.name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Auto:</th>
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
                    <!-- Navigation -->
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
{:else if $loggedIn === false}
    <NotLoggedInComponent />
{:else}
    <Loading />
{/if}
