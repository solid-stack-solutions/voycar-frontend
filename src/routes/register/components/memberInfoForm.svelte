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
        street,
        houseNumber,
        postalCode,
        city,
        country,
        birthDate,
        birthPlace,
        phoneNumber,
    };

    // Functions
    function validateInput() {
        console.log(formData);
        // ToDo
        currentStep++;
    }
</script>

<div class="space-y-3 sm:w-96">
    <BackButton bind:currentStep />
    <p class="font-semibold">Name</p>
    <input
        class="input"
        type="text"
        id="first_name"
        placeholder="Vorname"
        bind:value={formData.firstName}
    />
    <input
        class="input"
        type="text"
        id="last_name"
        placeholder="Nachname"
        bind:value={formData.lastName}
    />

    <p>Adresse</p>
    <div class="flex space-x-2">
        <input
            class="input"
            type="text"
            id="street"
            placeholder="Straße"
            bind:value={formData.street}
        />
        <input
            class="input w-1/4"
            type="text"
            id="housenumber"
            placeholder="Nr."
            bind:value={formData.houseNumber}
        />
    </div>
    <input
        class="input"
        type="text"
        id="postalcode"
        placeholder="Postleitzahl"
        bind:value={formData.postalCode}
    />
    <input
        class="input"
        type="text"
        id="city"
        placeholder="Stadt"
        bind:value={formData.city}
    />
    <select class="select" disabled bind:value={formData.country}>
        <option value="Germany" selected>Deutschland</option>
    </select>

    <p class="font-semibold">Geburtsdaten</p>
    <input
        class="input"
        type="date"
        id="birthdate"
        bind:value={formData.birthDate}
    />
    <input
        class="input"
        type="text"
        id="birthplace"
        placeholder="Geburtsort"
        bind:value={formData.birthPlace}
    />
    <p class="font-semibold">Telefonnummer</p>
    <input
        class="input"
        type="tel"
        id="telephonenumber"
        placeholder="+49 421 5905 5425"
        bind:value={formData.phoneNumber}
    />

    <ContinueButton onClick={validateInput} />
</div>
