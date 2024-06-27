<script>
    // Definitions
    export let userID;
    // ToDo logic for backend fetch

    // ToDo maybe show possible plan and option to change current one
</script>

<div class="h-full relative">
    <div class="flex flex-row space-x-2">
        <p>Aktueller Tarif:</p>
        <div>{userID}</div>
    </div>
    <div class="absolute right-2 bottom-6">
        <button class="btn btn-md variant-filled-warning">
            <img src="/modifyPlan.svg" alt="">
            Tarif ändern  
        </button>
    </div>
</div>
