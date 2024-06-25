<script>
    // Component imports
    import BackButton from "./backButton.svelte";
    // Image imports
    import CheckCircleIcon from "../../../icons/check-circleIcon.svelte";

    // Indicates how many steps of the register process have been completed
    export let currentStep = 0;

    let temp = [1, 2, 3];
</script>

<BackButton bind:currentStep></BackButton>

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
                class="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y-2 divide-secondary-500 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4"
            >
                {#each temp as _}
                    <div class="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                        <h3 id="plan-basic{_}" class="text-base font-semibold">
                            Basic
                        </h3>
                        <p class="mt-6 flex items-baseline gap-x-1">
                            <span class="text-5xl font-bold tracking-tight"
                                >$10</span
                            >
                            <span
                                class="text-sm font-semibold text-tertiary-500"
                                >/Monat</span
                            >
                        </p>
                        <button
                            type="button"
                            on:click={() => console.log(_ + " clicked")}
                            class="variant-filled-primary btn mt-8 text-center"
                            >Abo wählen</button
                        >
                        <p class="mt-10 text-sm font-semibold">
                            Alles nötige zum Durchstarten.
                        </p>
                        <ul
                            role="list"
                            class="mt-6 space-y-3 text-sm text-tertiary-500"
                        >
                            <li class="flex gap-x-3">
                                <CheckCircleIcon
                                    colorClass="stroke-tertiary-500"
                                ></CheckCircleIcon>
                                Große Auswahl an Autos
                            </li>
                            <li class="flex gap-x-3">
                                <CheckCircleIcon
                                    colorClass="stroke-tertiary-500"
                                ></CheckCircleIcon>
                                15€ / Stunde
                            </li>
                        </ul>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
