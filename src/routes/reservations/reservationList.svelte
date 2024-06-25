<script>
    import {Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import Reservation from "./reservation.svelte";
    
    export let reservationData;
    console.log(reservationData);
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
                <Reservation reservationData={reservation}
                ></Reservation>
            </svelte:fragment>
        </AccordionItem>
    {/each}
</Accordion>
</div>