<script>
    import "../app.postcss";
    import { TabGroup, Tab, TabAnchor } from "@skeletonlabs/skeleton"; //Menüleiste mit auswählbaren Tabs
    import { page } from "$app/stores"; // hat automatisch alle Pages als Stores
    import { AppBar } from "@skeletonlabs/skeleton"; // App Bar

    import Logo from "$lib/assets/logo-full-white.svg";
    // these are skeleton svelte components!
    import { LightSwitch } from "@skeletonlabs/skeleton";
</script>

<!-- TODO: Icon Farbe an Light/Dark Mode anpassen -->
<AppBar
    gridColumns="grid-cols-3"
    slotDefault="place-self-center"
    slotTrail="place-content-end"
>
    <svelte:fragment slot="lead">
        <svg
            class="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    </svelte:fragment>
    <svelte:fragment slot="default">
        <a href="/">
            <!--Voycar Logo-->
            <img src={Logo} alt="logo" class="w-500" style="scale: 0.5;" />
        </a>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <a href="/user">
            <!--UserIcon-->
            <svg
                class="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        </a>
        <LightSwitch />
    </svelte:fragment>
</AppBar>
<TabGroup>
    <TabAnchor href="/" selected={$page.url.pathname === "/"}>Home</TabAnchor>
    <TabAnchor
        href="/reservations"
        selected={$page.url.pathname === "/reservations"}
        >Reservierungen</TabAnchor
    >
    <!-- hier noch um die anderen Seiten erweitern -->
</TabGroup>

<slot />

<footer style="text-align: center;">
    <svg 
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
    </svg>
    Support: telefonnummer
</footer>
