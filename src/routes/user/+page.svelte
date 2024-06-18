<script>
    // Framework imports
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    // Util library import for url routes
    import { urls } from "$lib/util.js";
    import UserPageLoadingPlaceholders from "./userPageLoadingPlaceholders.svelte";
    import loggedInUser from "./loggedInUser.svelte"
     
    // Definitions
    let loading = true;
    let data = null;
    let error = null;

    // Functions
    function redirectToUserpage(id) {
    goto(`/user/${id}`);
    }

    // ToDo: implement auto refetching if fetch failed

    // Runs as soon as this component is mounted
    onMount(async () => {
    try {
      const response = await fetch(urls.get.UserID);
      if (response.ok) {
        userID = await response.json();
        loading = false;
        // Redirect user when data was fetched
        redirectToUserpage(data.UserID)
      } else {
        throw new Error('Fehler beim Laden der Daten');
      }
    } catch (err) {
      error = err.message;
      loading = false;
      // question: do we want to redirect the user instantly without letting them know what happend or display a message for 1-2 seconds and then redirect?
      setTimeout(() => {
        goto("/");
      }, 1000);
      
    }
  });
</script>
<div>
    {#if loading}
        <p class="text-center h3">Warten auf Weiterleitung zu Ihrer Kontoseite</p>
    <!-- Placeholders -->
    <UserPageLoadingPlaceholders/>
    {:else if error}
        <p class="text-center h3">Ihr User konnte nicht gefunden werden. Sie werden auf die Startseite zurückgeleitet!</p>
        <p class="text-center">Fehler: {error}</p>
    {:else}
        
    {/if}
</div>