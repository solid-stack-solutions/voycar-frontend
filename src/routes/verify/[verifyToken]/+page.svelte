<script>
    // Framework imports
    import { onMount } from "svelte";
    import { urls, tryFetchingRestricted, toaster } from "$lib/util.js";
    import { getToastStore, ProgressRadial } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";

    // Definitions
    // Constants
    const toastStore = getToastStore();

    // Toast settings
    const successToast = {
        message: "Verifizierung erfolgreich",
        bg: "primary",
    };

    const errorToast = {
        message: "Verfizierung fehlgeschlagen",
        bg: "error",
    };

    const serverErrorToast = {
        message: "Fehler auf der Serverseite",
        bg: "error",
    };
    // Variables
    export let data;

    // Initialize verfied on default empty promise
    let verified = new Promise(async (resolve, reject) => {});

    // Functions
    async function verifyTheToken() {
        console.log(data.verifyToken);
        verified = new Promise(async (resolve, reject) => {
            try {
                const response = await tryFetchingRestricted(
                    urls.get.verifyUserToken + data.verifyToken,
                );
                if (response.ok) {
                    resolve(await response.json());
                    toastStore.trigger(toaster(successToast));
                    goto("/login");
                } else if (response.status == 400) {
                    toastStore.trigger(toaster(errorToast));
                    throw new Error("Couldnt be verified");
                } else {
                    toastStore.trigger(toaster(serverErrorToast));
                    throw new Error("Server error");
                }
            } catch (err) {
                reject(err); // Rethrow so Svelte can handle it
            }
        });
    }

    onMount(verifyTheToken);
</script>

<div class="flex h-[70vh] flex-col items-center justify-center space-y-4">
    {#await verified}
        <h4 class="h4">Verfizierung läuft</h4>
        <ProgressRadial
            stroke={60}
            meter="stroke-primary-500"
            track="stroke-primary-500/30"
            strokeLinecap="butt"
            width="w-20"
        />
    {:then verified}
        <!-- Content if redirect fails -->
        <h4 class="h4">Verifizierung erfolgreich</h4>
        <button
            class="variant-filled-primary btn"
            on:click={() => (window.location.href = "/login")}>Zum Login</button
        >
    {:catch err}
        <div class="border-md rounded-md bg-surface-700 p-4">
            <h4 class="h4">
                Verifizierung fehlgeschlagen, bitte registriere dich neu
            </h4>
        </div>
        <button
            class="variant-filled-primary btn"
            on:click={() => (window.location.href = "/register")}
            >Zurück zur Registrierung</button
        >
    {/await}
</div>
