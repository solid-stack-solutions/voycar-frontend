<script>
    import { redirect } from "@sveltejs/kit";
    import LoggedInUser from "./loggedInUser.svelte";
    export let data;
    if (data == null) {
        //doesnt yet work
        redirect(300, "/");
    }
</script>

{#if { data } != null}
    <LoggedInUser {data}></LoggedInUser>
{/if}
