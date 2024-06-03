<script>
	export let data;    //idk warum aber man muss das anscheinend "data" nennen, sonst bekommt man komische Fehler
                        // wird dann später durch Daten aus der Datenbank realisiert

</script>
<div>
    <p>Hallo {data.user.firstName} {data.user.lastName}</p>
</div>
