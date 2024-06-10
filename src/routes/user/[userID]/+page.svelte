<script>
    import LoggedInUser from "./loggedInUser.svelte";
    export let data;
</script>

{#if data != null}
    <LoggedInUser {data}></LoggedInUser>
{/if}
