<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    // Import 🐦
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";

    // Util library import for url routes
    import { urls } from "$lib/util.js";

    // Component imports
    import UserPageLoadingPlaceholders from "./userPageLoadingPlaceholders.svelte";
    import LoggedInUser from "./loggedInUser.svelte";

    // Definitions
    // Policy for restarting backend fetched up to 5 times if there's no reply
    const retryPolicy = retry(handleAll, {
        maxAttempts: 5,
        backoff: new ExponentialBackoff(),
    });

    // Get Toaststore
    const toastStore = getToastStore();
    // Set non resolving promise as default
    let personalData = new Promise((resolve, reject) => {});

    // Toast-Settings
    const toast = {
        message: "Ihr Nutzerkonto konnte nicht gefunden werden",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-secondary",
    };

    // Functions
    // Runs as soon as this component is mounted
    onMount(async () => {
        personalData = new Promise(async (resolve, reject) => {
            try {
                // Fetch backend for personal Data with retry policy
                const response = await retryPolicy.execute(() =>
                    fetch(urls.get.memberPersonalData),
                );
                if (response.ok) {
                    personalData = resolve(await response.json());
                } else {
                    throw new Error("Error while fetching data");
                }
            } catch (err) {
                toastStore.trigger(toast);
                goto("/"); // Redirect user to landing page
                reject(err); // Rethrow so Svelte can handle it
            }
        });
    });
</script>

<!-- Page Content -->
<div>
    {#await personalData}
        <!-- Display placeholders while loading data -->
        <UserPageLoadingPlaceholders />
    {:then personalData}
        <!-- Display on success -->
        <LoggedInUser {personalData}></LoggedInUser>
    {:catch error}
        <!-- Display on error -->
        <p class="h3 text-center">
            Ihr Nutzerkonto konnte nicht gefunden werden. Sie werden auf die
            Startseite zurückgeleitet!
        </p>
        <p class="h3 text-center">
            Falls sie nicht automatisch weitergeleitet werden klicken sie
            <a href="/" class="text-primary-500 underline">hier</a>
            um zur Startseite zurückzukehren!
        </p>
        <p class="text-center">Fehler: {error.message}</p>
    {/await}
</div>
