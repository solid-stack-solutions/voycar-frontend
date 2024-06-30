<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { TabGroup, TabAnchor } from "@skeletonlabs/skeleton"; // Menu with tabs
    import { AppBar } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores"; // Contains all pages in a store

    import { urls, tryFetchingRestricted } from "$lib/util.js";

    // Definitions
    export let loggedIn;
    // Functions
    async function redirectToLogin() {
        goto("/login");
    }

    async function logout() {
        try {
            // Fetch backend to check if user is signed in
            const response = await tryFetchingRestricted(
                urls.post.logout,
                "POST",
            );
            if (response.ok) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }
</script>

<div>
    <AppBar
        gridColumns="grid-cols-3"
        slotDefault="place-self-center"
        slotTrail="place-content-end"
    >
        <svelte:fragment slot="lead">
            <div />
        </svelte:fragment>
        <svelte:fragment slot="default">
            <a
                href="/"
                on:click|preventDefault={() => {
                    if (window.location.pathname == "/") {
                        location.reload();
                    } else {
                        window.location.href = "/";
                    }
                }}
            >
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
                <button class="variant-ringed-surface btn" on:click={logout}
                    >Abmelden</button
                >
            {:else}
                <button
                    class="variant-ringed-primary btn"
                    on:click={redirectToLogin}>Anmelden</button
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
            <TabAnchor href="/user" selected={$page.url.pathname === "/user"}>
                Konto
            </TabAnchor>
        </TabGroup>
    {/if}
</div>
