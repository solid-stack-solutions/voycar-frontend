<script>
    // Framework imports
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    // Util library import for url routes
    import { urls } from "$lib/util.js";
    import UserPageLoadingPlaceholders from "./userPageLoadingPlaceholders.svelte";
    import LoggedInUser from "./loggedInUser.svelte";

    // Definitions
    const toastStore = getToastStore();
    let loading = true;
    let error = null;
    let data = null;

    // Toast settings
    const t = {
      message: 'Ihr Nutzerkonto konnte nicht gefunden werden',
      hideDismiss: true,
      timeout: 3000,
      background: 'variant-filled-secondary'
    };
    
    // Functions
    // ToDo: implement auto refetching if fetch failed

    // Runs as soon as this component is mounted
    onMount(async () => {
    try {
      const response = await fetch(urls.get.memberData);
      if (response.ok) {
        // data = await response.json();
        loading = false;
        // Redirect user when data was fetched
      } else {
        throw new Error('Fehler beim Laden der Daten');
      }
    } catch (err) {
      error = err.message;
      loading = false;
      // question: do we want to redirect the user instantly without letting them know what happend or display a message for 1-2 seconds and then redirect?
      toastStore.trigger(t);
      goto("/");
    }
  });
</script>
<div>
    {#if loading}
    <!-- Placeholders -->
    <UserPageLoadingPlaceholders/>
    {:else if error}
        <p class="text-center h3">Ihr Nutzerkonto konnte nicht gefunden werden. Sie werden auf die Startseite zurückgeleitet!</p>
        <p class="text-center">Fehler: {error}</p>
    {:else}
      <LoggedInUser {data}></LoggedInUser>  
    {/if}
</div>