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
    import { urls, tryFetchingRestricted} from "$lib/util.js";
    initializeStores();

    let loggedIn = new Promise((resolve, reject) => {});
    // Runs as soon as the component is mounted
    onMount(async () => {
        loggedIn = new Promise(async (resolve, reject) => {
            try {
                console.log("logged");
                // Fetch backend to check if user is signed in
                const response = await tryFetchingRestricted(urls.get.isLoggedIn);
                if (response.ok) {
                    resolve(await response.json());
                } else {
                    throw new Error("User isnt logged in");
                }
            } catch (err) {
                reject(err);
            }
        });
    });
</script>

<Toast />
<div>
    {#await loggedIn}
        <div/>
    {:then loggedIn} 
        <PageHeader loggedIn={true}/>
        <div class="h-fit p-4">
            <slot loggedIn={true}/>
        </div>
    {:catch err}
    <PageHeader loggedIn={false}/>
    <div class="h-fit p-4">
        <slot loggedIn={false}/>
    </div>
    {/await}
</div>
