<script>
    // Definitions
    export let userID;
    // ToDo logic for backend fetch

    // ToDo maybe show possible plan and option to change current one
</script>

<div class="relative h-full">
    <div class="flex flex-row space-x-2">
        <p>Aktueller Tarif:</p>
        <div>{userID}</div>
    </div>
    <div class="absolute bottom-6 right-2">
        <button class="variant-filled-warning btn btn-md">
            <img src="/modifyPlan.svg" alt="" />
            Tarif ändern
        </button>
    </div>
</div>
