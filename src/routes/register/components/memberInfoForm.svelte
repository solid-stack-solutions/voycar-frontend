<script>
    // Component imports
    import ContinueButton from "./continueButton.svelte";
    import BackButton from "./backButton.svelte";

    // Indicates how many steps of the register process have been completed
    export let currentStep = 0;

    // Formfield binding references
    export let formData = {
        firstName,
        lastName,
    };

    // Functions
    function validateInput() {
        // ToDo
        currentStep++;
    }
</script>

<div class="space-y-3 sm:w-96">
    <BackButton bind:currentStep />
    <p class="font-semibold">Name</p>
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
    <select class="select" disabled>
        <option value="DE" selected>Deutschland</option>
    </select>

    <p class="font-semibold">Geburtsdaten</p>
    <input class="input" type="date" id="birthdate" />
    <input class="input" type="text" id="birthplace" placeholder="Geburtsort" />
    <p class="font-semibold">Telefonnummer</p>
    <input
        class="input"
        type="tel"
        id="telephonenumber"
        placeholder="+49 421 5905 5425"
    />

    <ContinueButton onClick={validateInput} />
</div>