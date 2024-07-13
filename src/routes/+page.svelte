<!-- Landing page -->
<script>
    import { goto } from "$app/navigation";
    import {loggedIn} from "$lib/stores/loggedIn.js";
</script>

<svelte:head>
    <title>Voycar - Startseite</title>
</svelte:head>


<section class="flex h-[70vh] flex-col items-center justify-center">
    <div class="grid max-w-screen-xl lg:grid-cols-12">
        <div class="place-self-center lg:col-span-7">
            <h1 class=" h1 mb-8 xl:text-6xl ">Haben wir nen tollen Spruch?</h1>
            <p class=" h4 mb-4">
                Hier sollte am besten auch noch irgendwas tolles stehen.</p>
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
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
                    src="/logo-full-white.svg"
                    alt="logo"
                    class="w-500 scale-700"
            />
        </div>
    </div>
</section>

