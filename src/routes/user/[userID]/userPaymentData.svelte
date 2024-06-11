<script>
    //export let userID;

    let formEditEnabled = false;
    // geht erst wenn datanbankverbindung vorhanden
    // let userPaymentData = fetchUserPaymetData(userId);

    // async function fetchUserPaymetData(userId){
    //     return fetch();
    // }
</script>
<div >
    <div style="flex grid-rows-2">
        Zahlungsmittel:
    <!-- hier dann noch daten abrufen und Payment info einfügen einfügen -->
     <!-- {#if userPaymentData != null} -->
      <!-- Fehlt noch die Logik -->
     <div class="space-y-2">
        <label class="flex items-center space-x-2">
            <input disabled={!formEditEnabled} class="radio variant-ghost-primary" type="radio" checked name="radio-direct" value="1" />
            <p>Paypal</p>
        </label>
        <label class="flex items-center space-x-2">
            <input  disabled={!formEditEnabled} class="radio" type="radio" name="radio-direct" value="2" />
            <p>Kreditkarte</p>
        </label>
        <label class="flex items-center space-x-2">
            <input  disabled={!formEditEnabled} class="radio" type="radio" name="radio-direct" value="3" />
            <p>Crypto</p>
        </label>
    </div>
     <!-- {/if} -->
    </div>
     <div dir="rtl" class="height-auto">
        <button type="button" class="btn btn-md variant-filled-error">
            <!-- TODO Delete Button Logik implementieren -->
            Löschen
        </button>
        <button type="button" class="btn btn-md variant-filled-warning " on:click={() => formEditEnabled = !formEditEnabled}>
            Bearbeiten
            <svg class="h-4 w-4"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
        </button>
        {#if formEditEnabled}
        <button type="button" class="btn btn-md variant-filled-success">
            <!-- TODO Update Button Logik implementieren -->
            Aktualisieren
            <svg class="h-4 w-4"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />  <polyline points="17 21 17 13 7 13 7 21" />  <polyline points="7 3 7 8 15 8" /></svg>
        </button>
        {/if}
    </div>
</div>