<script>
    /** @type {import('./$types').PageData} */
	export let data;    //idk warum aber man muss das anscheinend "data" nennen, sonst bekommt man komische Fehler
                        // wird dann später durch Daten aus der Datenbank realisiert

</script>
<div>
    <p>Hallo {data.post.username}</p>
</div>
