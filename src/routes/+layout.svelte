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
    initializeStores();

    // Exports data to all children components
    export let data;
</script>

<Toast />
<div>
    <PageHeader loggedIn={data.loggedIn} />
    <div class="h-fit p-4">
        <slot />
    </div>
</div>
