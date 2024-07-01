<script>
    // Framework imports
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";

    // Util library import for url routes and fetches
    import { urls, tryFetchingRestricted, toaster } from "$lib/util.js";
    import { loggedIn } from "$lib/stores/loggedIn.js";

    // Component imports
    import UserPageLoadingPlaceholders from "./userPageLoadingPlaceholders.svelte";
    import LoggedInUser from "./loggedInUser.svelte";

    // Definitions
    // Get Toaststore
    const toastStore = getToastStore();

    // Set non resolving promise as default
    let personalData = new Promise((resolve, reject) => {});

    // Toast-Settings
    const toastError = {
        message: "Dein Nutzerkonto konnte nicht gefunden werden",
        bg: "error",
    };

    // Reactive statements
    $: if ($loggedIn) {
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
                toastStore.trigger(toaster(toastError));
                goto("/"); // Redirect user to landing page
                reject(err); // Reject the promise so Svelte can handle it
            }
        });
    } else if ($loggedIn === false) {
        goto("/login")
    }
</script>

<svelte:head>
    <title>Dein Voycar Konto</title>
</svelte:head>
<!-- Page Content -->
{#if $loggedIn}
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
    <UserPageLoadingPlaceholders />
{/if}
