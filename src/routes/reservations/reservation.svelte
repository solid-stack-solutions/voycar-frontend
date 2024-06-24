<script>
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";
    import { onMount } from "svelte";

    // Definitions
    // Policy for restarting backend fetched up to 5 times if there's no reply
    const retryPolicy = retry(handleAll, {
        maxAttempts: 5,
        backoff: new ExponentialBackoff(),
    });

    export let reservationData;
    
    let carData = new Promise((resolve, reject) => {});

    function filterDate(dateString){
        return new Intl.DateTimeFormat('de-DE').format(new Date(dateString));// ToDo das hier fixen
    }

    async function fetchCarForReservation(){
        carData = new Promise(async (resolve,reject) => {
            try{
                const mybody = {
                    carId: reservationData.carId,
                };
                const response = await retryPolicy.execute( () =>
                    fetch(new Request(urls.get.car, {
                        body: JSON.stringify(mybody),
                    }),
                    ),
                );
                if (response.ok) {
                    carData = resolve(await response.json());
                }else{
                    throw new Error("No car data found");
                }
            } catch (err){
                reject(err);
            }
        });
    }


    onMount(() => {
    filterDate()});
</script>
<div>
    <div class="border-2 p-4 border-primary-500 rounded-md flex flex-row">
        <div class="basis-2/3">
            <img src="carpng.png" alt="dodge challenger">
        </div>
        <div class="basis-1/3 grid-cols-1">
            <span>
                <p>Beginn:</p>
                <p>{filterDate(reservationData.begin)}</p>
            </span>
            <span>
                <p>Ende:</p>
                <p>{filterDate(reservationData.end)}</p>
            </span>
        </div>
    </div>
</div>