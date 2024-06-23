<script>
    import { ExponentialBackoff, handleAll, retry } from "cockatiel";

    // Definitions
    // Policy for restarting backend fetched up to 5 times if there's no reply
    const retryPolicy = retry(handleAll, {
        maxAttempts: 5,
        backoff: new ExponentialBackoff(),
    });

    export let reservationData;
    
    let carData = new Promise((resolve, reject) => {});

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
</script>
<div>
    <div class="border-2 p-4 border-primary-500 rounded-md grid-cols-2">
        <div>
            <img src="carpng.png" alt="dodge challenger" class="w-52 h-52" >
        </div>
        <div class="grid-cols-1">
            <span>
                <p>Beginn:</p>
                <p>{reservationData.begin}</p>
            </span>
            <span>
                <p>Ende:</p>
                <p>{reservationData.end}</p>
            </span>
        </div>
    </div>
</div>