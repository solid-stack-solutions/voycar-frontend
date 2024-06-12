<script>
    // Component imports
    import LoggedInUser from "./loggedInUser.svelte";

    // Export data from parent
    export let data;
</script>

<!-- Show user page only when user is logged in -->
{#if data != null}
    <!-- Inject logged in user svelte component -->
    <LoggedInUser {data}></LoggedInUser>
{/if}
