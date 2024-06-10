<script>
    import "../app.postcss";
    import { TabGroup, Tab, TabAnchor } from "@skeletonlabs/skeleton"; //Menüleiste mit auswählbaren Tabs
    import { page } from "$app/stores"; // hat automatisch alle Pages als Stores
    import { AppBar } from "@skeletonlabs/skeleton"; // App Bar
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
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
<div class="p-4">
    <slot />
    <!-- bro idk wie man das gecentert bekommt ohne dass die dinger dann untereinander sind was für ein 💩
    <div style="grid grid-cols-3 justify-content: center;">
        <div>Support:</div>
        <div><img src="/telephoneIcon.svg" alt="phone icon" style="margin-right: 4px; margin-left: 4px;"></div>
        <div>+49 123 42018769</div>   
    </div> -->
</div>