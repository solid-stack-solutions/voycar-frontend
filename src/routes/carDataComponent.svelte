<script>
    export let car;
    export let showLicensePlate;
</script>

<table
    id="car_table"
    class="w-full border-separate border-spacing-x-2 text-left"
>
    {#if showLicensePlate}
        <tr>
            <th>Kennzeichen:</th>
            <td>
                {car.licensePlate}
            </td>
        </tr>
    {/if}
    <tr>
        <th>Marke:</th>
        <td>
            {car.brand}
        </td>
    </tr>
    <tr>
        <th>Typ:</th>
        <td>
            {car.type}
        </td>
    </tr>
    <tr>
        <th>Leistung:</th>
        <td>
            {car.ps} PS
        </td>
    </tr>
    <tr>
        <th>Sitzplätze:</th>
        <td>
            {car.seats}
        </td>
    </tr>
</table>
