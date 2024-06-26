<script>
    // Framework imports
    import {Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    // Import custom reservation component
    import Reservation from "./reservation.svelte";
    
    // Definitions
    // Export data from parent component
    export let reservationData;
    export let cancellable;

    // Functions
    function filterDate(dateString) {
        return new Intl.DateTimeFormat("de-DE").format(new Date(dateString));
    }
    
</script>
<div>
    <Accordion>
    {#each reservationData  as reservation}
        <AccordionItem class="rounded-lg  bg-surface-600">
            <svelte:fragment slot="summary"
                >Reservierung für den {filterDate(
                    reservation.begin,
                )}</svelte:fragment
            >
            <svelte:fragment slot="content">
                <Reservation reservationData={reservation} cancellable={cancellable}
                ></Reservation>
            </svelte:fragment>
        </AccordionItem>
    {/each}
</Accordion>
</div>