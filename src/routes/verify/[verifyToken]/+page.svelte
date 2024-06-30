<script>
    import { onMount } from "svelte";
    import { urls, tryFetchingRestricted } from "$lib/util.js";
    import { ProgressRadial } from "@skeletonlabs/skeleton";

    export let data;
    let verified = new Promise(async (resolve, reject) => {});

    async function verifyTheToken(){
        console.log(data.verifyToken);
        verified = new Promise(async (resolve, reject) => {
            try{
            const response = await tryFetchingRestricted(
                    urls.get.verifyUserToken + data.verifyToken,
                );
                if (response.ok) {
                    resolve(await response.json());
                } else {
                    throw new Error("Error while fetching data");
                }
            } catch (err) {
                reject(err); // Rethrow so Svelte can handle it
            }
        });
    }

    onMount(verifyTheToken)
</script>

<div class="flex h-[70vh] flex-col items-center justify-center space-y-4">
{#await verified}
<h4 class="h4">Versuchen dich zu verifizieren</h4>
    <ProgressRadial
    stroke={60}
    meter="stroke-primary-500"
    track="stroke-primary-500/30"
    strokeLinecap="butt"
    width="w-20"
    />
{:then verified} 
    <h4 class="h4">Verfizierung erfolgreich</h4>
    <button class="btn variant-filled-primary" on:click={() => (window.location.href = "/login")}>Zum Login</button>
{:catch err}
    <h4 class="h4">Verifizierung fehlgeschlagen, bitte registriere dich neu</h4>
    <div class="grid grid-cols-2 space-x-2">
        <button class="btn variant-filled-primary" on:click={() => (window.location.href = "/")}>Zur Startseite</button>
        <button class="btn variant-filled-primary " on:click={() => (window.location.href = "/register")}>Zurrück zur Registrierung</button>
    </div>
{/await}
</div>