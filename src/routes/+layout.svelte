<script>
    // Framework imports
    import "../app.postcss";
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
    import PageHeader from "./pageHeader.svelte";
    import { onMount } from "svelte";

    // Import utilities
    import { urls, tryFetchingRestricted } from "$lib/util.js";
    import { loggedIn } from "../lib/stores/loggedIn";
    import Footer from "./footer.svelte";
    initializeStores();

    onMount(async () => {
        try {
            const response = await tryFetchingRestricted(urls.get.isLoggedIn);
            loggedIn.set(response.ok);
        } catch {
            loggedIn.set(false);
        }
    });
</script>

<Toast />
<div>
    <PageHeader />
    <div class="h-fit p-4 mb-16">
        <slot />
    </div>
    <Footer />
</div>
