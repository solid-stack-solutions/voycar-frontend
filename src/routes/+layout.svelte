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
</script>

<Toast />
<div>
    <PageHeader></PageHeader>
    <div class="h-fit p-4">
        <slot />
    </div>
</div>
