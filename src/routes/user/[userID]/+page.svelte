<!--TODO    Gestaltung:
            aktuelle Zahlungsinformationen als Feld 
            Button neben der Zahlungsinformation zum bearbeiten \[FA049] (Bitte mit Bestätigungsabfrage)
            Button neben der Zahlungsinformation zum löschen \[FA048] (Bitte mit Bestätigungsabfrage)
            Zahlungsinformationen hinzufügen Menü \[FA047]
            Maybe Ausklappbar und dann dort Felder
            Kontolöschung beantragen Button \[FA014] (Bitte mit Bestätigungsabfrage) 
    -->


<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	export let data;    //nutzen der data export property
    let userKeys = Object.keys(data.user);
    let userInfo = Object.values(data.user)
</script>
<svelte:head>
    <title>Voycar-Konto</title>
</svelte:head>
<div>
    <div>
        <p>Hallo {data.user.firstName} {data.user.lastName}</p>
    </div>
    <div>
        <Accordion>
            <AccordionItem open>
                <svelte:fragment slot="summary">Persönliche Informationen</svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="table-container">
                        <table class="table table-hover">
                            {#each userKeys as key,i}
                                <tr>
                                    <th>{key}</th>
                                    <td>{userInfo[i]}</td>
                                </tr>
                            {/each}
                        </table>
                    </div>  
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary">Zahlungsinformation</svelte:fragment>
                <svelte:fragment slot="content">
                    
                </svelte:fragment>
            </AccordionItem>
        </Accordion>
    </div>
</div>