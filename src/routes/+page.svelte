<!-- Landing page -->
<script>
    // Framework imports
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { loggedIn } from "$lib/stores/loggedIn.js";

    import { urls, tryFetchingPublic, translatePlanName } from "$lib/util.js";
    import CheckCircleIcon from "../icons/check-circleIcon.svelte";
    let planData = new Promise((resolve, reject) => {});

    // Functions
    // Runs as soon as the component is mounted
    onMount(async () => {
        planData = new Promise(async (resolve, reject) => {
            try {
                // Fetch backend for plans
                const response = await tryFetchingPublic(urls.get.allPlans);
                if (response.ok) {
                    let plans = await response.json();
                    resolve(
                        plans.sort((planA, planB) => {
                            return planA.monthlyPrice - planB.monthlyPrice;
                        }),
                    );
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
    <title>Voycar - Startseite</title>
</svelte:head>

<section
    class={`flex ${$loggedIn ? "h-[75vh]" : ""} h-full flex-col items-center justify-center`}
>
    <div class="grid max-w-screen-xl lg:grid-cols-12">
        <div class="place-self-center lg:col-span-7">
            <h1 class=" h1 mb-8 xl:text-6xl">
                Minimalistisch unterwegs. Maximal grün.
            </h1>
            <p class=" h4 mb-4">Dein CarSharing für alle Fälle.</p>
            <div>
                {#if !$loggedIn}
                    <div class="flex flex-row space-x-2">
                        <button
                            class="variant-ringed-surface btn"
                            on:click={() => {
                                goto("/register");
                            }}>Registrieren</button
                        >
                        <button
                            class="variant-ringed-primary btn"
                            on:click={() => {
                                goto("/login");
                            }}>Anmelden</button
                        >
                    </div>
                {/if}
            </div>
        </div>
        <div
            class="hidden items-center justify-center lg:col-span-5 lg:mt-0 lg:flex"
        >
            <img
                src="/Range%20Rover.png"
                alt="logo"
                class="h-auto w-[800px] scale-100"
                style="max-width: 100%; height: auto;"
            />
        </div>
    </div>
    {#if !$loggedIn}
        <div class="sm:py-22 mt-20 py-10">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="sm:text-center">
                    <p
                        class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl"
                    >
                        Finde das richtige Abo für dich
                    </p>
                </div>
                <p
                    class="mx-auto mt-6 max-w-2xl text-lg text-tertiary-500 sm:text-center"
                >
                    Entdecke die flexiblen Abos von Voycar und finde das
                    perfekte Carsharing-Paket für dich! Egal ob du nur ab und zu
                    ein Auto brauchst oder täglich unterwegs bist, bei uns
                    findest du das passende Angebot.
                </p>
                <div class="mt-20 flow-root">
                    <div
                        class="isolate -mt-16 grid max-w-sm grid-cols-1 gap-x-5 gap-y-10 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 xl:-mx-4"
                    >
                        {#await planData}
                            <h4 class="h4 col-span-3 text-center">
                                Pläne werden geladen
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
                                        class="text-base font-semibold capitalize"
                                    >
                                        {translatePlanName(plan.name)}
                                    </h3>
                                    <p class="mt-6 flex items-baseline gap-x-1">
                                        <span
                                            class="text-5xl font-bold tracking-tight"
                                            >{plan.monthlyPrice}€</span
                                        >
                                        <span
                                            class="text-sm font-semibold text-tertiary-500"
                                            >/Monat</span
                                        >
                                    </p>
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
                            <div class="col-span-full flex justify-center">
                                <p class="text-center">
                                    Abos konnten nicht geladen werden. Bitte
                                    versuche es später erneut.
                                </p>
                            </div>
                        {/await}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</section>
