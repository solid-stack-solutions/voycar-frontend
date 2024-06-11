<script>
    export let userID;
    // geht erst wenn Datanbankverbindung vorhanden
    // let userPlanData = fetchUserPlanData(userId);

    // async function fetchUserPlanData(userId){
    //     myReq = new Request()
    // }
</script>

<div>
    Aktueller Tarif:
    <!-- hier dann noch daten abrufen und tarif einfügen -->
    <!-- {#if userPlanData != null} -->
    {userID}
    <!-- {/if} -->
    <button class="btn text-warning-500">Tarif ändern</button>
</div>
