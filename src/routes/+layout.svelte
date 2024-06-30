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

    export let data;
    // Runs as soon as the component is mounted
</script>

<Toast />
<div>
    {data.loggedIn}
        <PageHeader loggedIn={data.loggedIn}/>
        <div class="h-fit p-4">
            <slot />
        </div>
</div>
