<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    function fetchUserID() {
        return 3;
    }

    function redirectToUserpage(id) {
        goto(`/user/${id}`);
    }

    onMount(() => {
        console.log("the component has mounted");
        redirectToUserpage(fetchUserID());
    });
</script>
