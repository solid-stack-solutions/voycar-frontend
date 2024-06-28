<script>
    // Framework imports
    import { onMount } from "svelte";
    // Component imports
    import BackButton from "./backButton.svelte";
    // Image imports
    import CheckCircleIcon from "../../../icons/check-circleIcon.svelte";
    // Import utilities
    import { urls, tryFetchingPublic } from "$lib/util.js";

    let planData = new Promise((resolve, reject) => {});

    // Indicates how many steps of the register process have been completed
    export let currentStep = 0;

    // Formfield binding references
    export let formData = {
        planID,
    };

    // Functions
    // Runs as soon as the component is mounted
    onMount(async () => {
        planData = new Promise(async (resolve, reject) => {
            try {
                // Fetch backend for plans
                const response = await tryFetchingPublic(urls.get.allPlans);
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

<BackButton bind:currentStep />

<div class="sm:py-22 py-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="sm:text-center">
            <p class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                Wähle das richtige Abo für dich
            </p>
        </div>
        <p
            class="mx-auto mt-6 max-w-2xl text-lg text-tertiary-500 sm:text-center"
        >
            Entdecke die flexiblen Abos von Voycar und finde das perfekte
            Carsharing-Paket für dich! Egal ob du nur ab und zu ein Auto
            brauchst oder täglich unterwegs bist, bei uns findest du das
            passende Angebot.
        </p>
        <div class="mt-20 flow-root">
            <div
                class="isolate -mt-16 grid max-w-sm grid-cols-1 gap-x-5 gap-y-10 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 xl:-mx-4"
            >
                {#await planData}
                    <h4 class="h4 col-span-3 text-center">
                        Pläne werden geladen...
                    </h4>
                    {#each [1, 2, 3] as _}
                        <div class="card h-80 p-4">
                            <div
                                class="h-full animate-pulse rounded-md bg-surface-600"
                            />
                        </div>
                    {/each}
                {:then planData}
                    {#each planData as plan, index}
                        <div
                            class="p-6 lg:p-8 xl:px-10
                                {index === 1 // Highlight middle card
                                ? 'rounded-lg bg-secondary-900 lg:scale-110 '
                                : 'lg:scale-80 card variant-soft'}"
                        >
                            <h3
                                id="plan-{plan.name}"
                                class="text-base font-semibold"
                            >
                                Basic
                            </h3>
                            <p class="mt-6 flex items-baseline gap-x-1">
                                <span class="text-5xl font-bold tracking-tight"
                                    >{plan.monthlyPrice}€</span
                                >
                                <span
                                    class="text-sm font-semibold text-tertiary-500"
                                    >/Monat</span
                                >
                            </p>
                            <button
                                type="submit"
                                on:click={() => (formData.planID = plan.id)}
                                class="variant-filled-primary btn mt-8 text-center"
                                >Abo wählen</button
                            >
                            <p class="mt-10 text-sm font-semibold">
                                Alles Nötige zum Durchstarten.
                            </p>
                            <ul
                                role="list"
                                class="mt-6 space-y-3 text-sm text-tertiary-500"
                            >
                                <li class="flex gap-x-3">
                                    <CheckCircleIcon
                                        colorClass="stroke-tertiary-500"
                                    />
                                    Große Auswahl an Autos
                                </li>
                                <li class="flex gap-x-3">
                                    <CheckCircleIcon
                                        colorClass="stroke-tertiary-500"
                                    />
                                    {plan.hourlyPrice}€ / Stunde
                                </li>
                            </ul>
                        </div>
                    {/each}
                {:catch err}
                    <p>
                        Abos konnten nicht geladen werden. Bitt versuche es
                        später erneut.
                    </p>
                {/await}
            </div>
        </div>
    </div>
</div>
