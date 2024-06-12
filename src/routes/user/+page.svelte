<script>
    //Framework imports
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    //Functions
    function fetchUserID() {
        //ToDo fetch user id from backend
        return 1;
    }

    function redirectToUserpage(id) {
        goto(`/user/${id}`);
    }

    onMount(() => {
        redirectToUserpage(fetchUserID());
    });
</script>
