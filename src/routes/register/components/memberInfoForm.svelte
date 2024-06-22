<script>
    // Indicates how many steps of the register process have been completed
    export let registerStep = 0;
</script>

<form class="p-4 border-2 rounded-md border-secondary-500 space-y-3">
    <button
        type="button"
        class="btn btn-sm variant-soft"
        on:click={() => {
            registerStep--;
        }}
    >
        <img
            src="/chevron-leftIcon.svg"
            class="pr-2"
            alt="Pfeil nach links"
        />Zurück
    </button>
    <p>Name</p>
    <input class="input" type="text" id="first_name" placeholder="Vorname" />
    <input class="input" type="text" id="last_name" placeholder="Nachname" />

    <p>Adresse</p>
    <div class="flex space-x-2">
        <input class="input" type="text" id="street" placeholder="Straße" />
        <input
            class="input w-1/4"
            type="text"
            id="housenumber"
            placeholder="Nr."
        />
    </div>
    <input
        class="input"
        type="text"
        id="postalcode"
        placeholder="Postleitzahl"
    />
    <input class="input" type="text" id="city" placeholder="Stadt" />
    <p>ToDo Dropdown für Land</p>

    <p>Geburtsdaten</p>
    <input class="input" type="date" id="birthdate" />
    <input class="input" type="text" id="birthplace" placeholder="Geburtsort" />
    <p>Telefonnummer</p>
    <input
        class="input"
        type="tel"
        id="telephonenumber"
        placeholder="+49 421 5905 5425"
    />
</form>
