<script>
    // Framework imports
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    // Util library import for url routes
    import { urls } from "$lib/util.js";

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
    }
  });
</script>
<div>
{#if loading}
  <p class="text-center h3">Warten auf Weiterleitung zu Ihrer Kontoseite</p>
  <!-- Placeholders -->
   <div>
    <div class="placeholder animate-pulse pb-4 pl-2 w-60 h-6"></div>
    <div class="p-4 space-y-6">
		<div class="grid grid-cols-2 gap-8">
            {#each {length: 10} as _,i }
            <div class="placeholder animate-pulse h-6" />
            {/each}
		</div>
		<div class="grid grid-cols-4 gap-4">
			{#each {length: 4} as _,i }
            <div class="placeholder animate-pulse h-4" />
            {/each}
		</div>
        {#each {length: 2} as _,i }
            <div class="grid grid-cols-4 gap-4">
                <div class="placeholder animate-pulse" />
                <div class="placeholder animate-pulse" />
            </div>
        {/each}
    </div>
   </div>
{:else if error}
  <p>Fehler: {error}</p>
{:else}
  <p>Daten geladen, Sie werden weitergeleitet...</p>
{/if}
</div>