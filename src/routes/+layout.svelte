<script>
    // Framework imports
    import "../app.postcss";
    import { TabGroup, Tab, TabAnchor } from "@skeletonlabs/skeleton"; // Menu with tabs
    import { page } from "$app/stores"; // Contains all pages in a store
    import { AppBar } from "@skeletonlabs/skeleton";
    import {
        computePosition,
        autoUpdate,
        offset,
        shift,
        flip,
        arrow,
    } from "@floating-ui/dom";
    import { storePopup } from "@skeletonlabs/skeleton";
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    // Transient fault handling library import
    import { ConstantBackoff, handleAll, retry } from "cockatiel";

    import { initializeStores, Toast } from "@skeletonlabs/skeleton";
    initializeStores();

    // Definitions
    let loggedIn = false;

    // Define retry policy
    const retryPolicy = retry(handleAll, {
        maxAttempts: 3, // Try 3 times
        backoff: new ConstantBackoff(50), // Wait 10ms after each try
    });

    // Functions
    async function redirectToLogin() {
        goto("/login");
    }

    // Runs as soon as the component is mounted
    onMount(async () => {
        try {
            // Fetch backend to check if user is signed in
            const response = await retryPolicy.execute(() =>
                fetch(urls.get.isLoggedIn),
            );
            if (response.ok) {
                loggedIn = true;
            } else {
                loggedIn = false;
            }
        } catch (err) {
            console.log(err);
        }
    });
</script>

<Toast />
<div>
    <AppBar
        gridColumns="grid-cols-3"
        slotDefault="place-self-center"
        slotTrail="place-content-end"
    >
        <svelte:fragment slot="lead">
            <img src="/menuIcon.svg" alt="menu icon" />
        </svelte:fragment>
        <svelte:fragment slot="default">
            <a href="/">
                <!-- Voycar Logo -->
                <img
                    src="/logo-full-white.svg"
                    alt="logo"
                    class="w-500 scale-50"
                />
            </a>
        </svelte:fragment>
        <svelte:fragment slot="trail">
            {#if loggedIn}
                <a href="/user">
                    <!-- User icon -->
                    <img src="/userIcon.svg" alt="user icon" />
                </a>
            {:else}
                <button
                    class="variant-ringed-primary btn"
                    on:click={() => redirectToLogin()}>Anmelden</button
                >
            {/if}
        </svelte:fragment>
    </AppBar>
    {#if loggedIn}
        <TabGroup class="text-lg">
            <TabAnchor href="/" selected={$page.url.pathname === "/"}>
                Home
            </TabAnchor>
            <TabAnchor href="/cars" selected={$page.url.pathname === "/cars"}>
                Autos
            </TabAnchor>
            <TabAnchor
                href="/reservations"
                selected={$page.url.pathname === "/reservations"}
            >
                Reservierungen
            </TabAnchor>
        </TabGroup>
    {/if}
    <div class="h-fit p-4">
        <slot />
    </div>
</div>
