<script>
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
    import { goto } from "$app/navigation";
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
    import Logo from "$lib/assets/logo-full-white.svg";
    import { onMount } from "svelte";
    import { ConstantBackoff, handleAll, retry } from "cockatiel";

    let loggedIn = false;

    // Define retry policy
    const retryPolicy = retry(handleAll, {
        maxAttempts: 3, // Try 3 times
        backoff: new ConstantBackoff(10), // Wait 10ms after each try
    });
    
    // Redirect to login
    async function directToLogin(){
        goto('/login');
    } 

    onMount(async () => {
        try {
            // Fetch backend for personal Data with retry policy
            const response = await retryPolicy.execute(() =>
                fetch(urls.get.isLoggedIn),
            );
            if (response.ok) {
                loggedIn = true;
            } else {
                loggedIn = false;
                throw new Error("Error while fetching data");
            }
        } catch (err) {
            error = err.message;
        }
    });
</script>

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
                <img src={Logo} alt="logo" class="scale-50 w-500" />
            </a>
        </svelte:fragment>
        <svelte:fragment slot="trail">
            {#if loggedIn}
            <a href="/user">
                <!-- User icon -->
                <img src="/userIcon.svg" alt="user icon" />
            </a>
            {:else}
                <button class="btn variant-ringed-primary" on:click={() => directToLogin()}>Anmelden</button>
            {/if}
        </svelte:fragment>
    </AppBar>
    {#if loggedIn}
    <!-- ToDo only show tab group if user is logged in -->
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
    <div class="p-4 h-fit">
        <slot />
    </div>
    
</div>
