<script>
    // Component imports
    import ContinueButton from "./continueButton.svelte";
    import BackButton from "./backButton.svelte";

    let invalidInputs = false;

    const indicatorStatus = {
        none: "",
        error: "!border-error-600",
    };

    // Will get value according to status of validator
    let birthDateIndicator = indicatorStatus.none;

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
    function isAtLeast18YearsOld(birthDateString) {
        const birthDate = new Date(birthDateString);
        const today = new Date();

        // Calculate age
        let age = today.getFullYear() - birthDate.getFullYear();

        // Adjust age if the birthdate hasn't occured yet this year
        const birthDateThisYear = new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate(),
        );
        if (today < birthDateThisYear) {
            age--;
        }

        return age >= 18;
    }

    function validateInput() {
        invalidInputs = false;

        if (!isAtLeast18YearsOld(formData.birthDate)) {
            invalidInputs = true;
            birthDateIndicator = indicatorStatus.error;
            return;
        } else {
            birthDateIndicator = indicatorStatus.none;
        }

        // Check for all inputs if they are empty strings
        for (let key in formData) {
            if (formData[key] == null || formData[key].trim() === "") {
                invalidInputs = true;
            }
        }

        if (invalidInputs) return;
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
        class="input {birthDateIndicator}"
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

    {#if invalidInputs}
        <div
            class="flex flex-col items-center justify-center transition-opacity"
        >
            <p class="text-sm text-error-600">
                {#if birthDateIndicator == indicatorStatus.error}
                    Du musst min. 18 Jahre alt sein, um dich zu registrieren.
                {:else}
                    Alle Felder müssen ausgefüllt werden
                {/if}
            </p>
        </div>
    {/if}

    <ContinueButton onClick={validateInput} />
</div>
