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
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
    import { initializeStores, Toast } from "@skeletonlabs/skeleton";
    initializeStores();
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
                <img src="/logo-full-white.svg" alt="logo" class="scale-50 w-500" />
            </a>
        </svelte:fragment>
        <svelte:fragment slot="trail">
            <a href="/user">
                <!-- User icon -->
                <img src="/userIcon.svg" alt="user icon" />
            </a>
        </svelte:fragment>
    </AppBar>
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
    <div class="p-4 h-fit">
        <slot />
    </div>
</div>
