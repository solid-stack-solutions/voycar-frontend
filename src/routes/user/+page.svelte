<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    // Util library import for url routes and fetches
    import { urls, tryFetchingRestricted } from "$lib/util.js";

    // Component imports
    import UserPageLoadingPlaceholders from "./userPageLoadingPlaceholders.svelte";
    import LoggedInUser from "./loggedInUser.svelte";
    import NotLoggedInComponent from "../notLoggedInComponent.svelte";

    // Definitions
    // Get Toaststore
    const toastStore = getToastStore();

    export let data;

    // Set non resolving promise as default
    let personalData = new Promise((resolve, reject) => {});

    // Toast-Settings
    const toast = {
        message: "Dein Nutzerkonto konnte nicht gefunden werden",
        hideDismiss: true, // Hide the dismiss button on toast
        timeout: 3000, // Auto dismiss toast after 3 seconds
        background: "variant-filled-error",
    };

    // Functions
    // Runs as soon as this component is mounted
    onMount(() => {
        if (data.loggedIn) {
            personalData = new Promise(async (resolve, reject) => {
                try {
                    // Fetch backend for personal Data with retry policy
                    const response = await tryFetchingRestricted(
                        urls.get.memberPersonalData,
                    );
                    if (response.ok) {
                        resolve(await response.json());
                    } else {
                        throw new Error("Error while fetching data");
                    }
                } catch (err) {
                    toastStore.trigger(toast);
                    goto("/"); // Redirect user to landing page
                    reject(err); // Reject the promise so Svelte can handle it
                }
            });
        }
    });
</script>

<svelte:head>
    <title>Dein Voycar Konto</title>
</svelte:head>
<!-- Page Content -->
{#if data.loggedIn}
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
                Dein Nutzerkonto konnte nicht gefunden werden. Du wirst auf die
                Startseite zurückgeleitet!
            </p>
            <p class="h3 text-center">
                Falls du nicht automatisch weitergeleitet wirst, klick
                <a href="/" class="text-primary-500 underline">hier</a>
                um zur Startseite zurückzukehren!
            </p>
            <p class="text-center">Fehler: {error.message}</p>
        {/await}
    </div>
{:else}
    <NotLoggedInComponent />
{/if}
