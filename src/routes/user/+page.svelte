<script>
    // Framework imports
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    // Using 🐓
    import { ExponentialBackoff, handleAll, retry } from 'cockatiel';

    // Util library import for url routes
    import { urls } from "$lib/util.js";
    
    // Component imports
    import UserPageLoadingPlaceholders from "./userPageLoadingPlaceholders.svelte";
    import LoggedInUser from "./loggedInUser.svelte";

    // Definitions
    // Policy for restarting backend fetched up to 5 times if there's no reply
    const retryPolicy = retry(handleAll, {maxAttempts: 5, backoff: new ExponentialBackoff() })
    // Get Toaststore
    const toastStore = getToastStore();

    let loading = true;
    let error = null;
    let personalData = null;
    
    // Toast settings
    const t = {
      message: 'Ihr Nutzerkonto konnte nicht gefunden werden',
      hideDismiss: true,
      timeout: 3000,
      background: 'variant-filled-secondary'
    };
    
    // Functions

    // Runs as soon as this component is mounted
    onMount(async () => {
    try {
      // Fetch backend for personal Data with retry policy 
      const response = await retryPolicy.execute(() => fetch(urls.get.memberPersonalData))
      if (response.ok) {
        personalData = await response.json();
        loading = false;
      } else {
        throw new Error('Error while fetching data');
      }
    } catch (err) {
      error = err.message;
      loading = false;
      toastStore.trigger(t);
      goto("/");  // redirect user to landing page
    }
  });
</script>
<!-- Page Content -->
<div>
    {#if loading}
    <!-- Placeholders -->
    <UserPageLoadingPlaceholders/>
    {:else if error}
        <p class="text-center h3">Ihr Nutzerkonto konnte nicht gefunden werden. Sie werden auf die Startseite zurückgeleitet!</p>
        <p class="text-center h3"> Falls sie nicht automatisch weitergeleitet werden klicken sie <a href="/" class="text-primary-500 underline">hier</a> um zur Startseite zurückzukehren!</p>
        <p class="text-center">Fehler: {error}</p>
    {:else}
      <LoggedInUser personalData={personalData}></LoggedInUser>  
    {/if}
</div>