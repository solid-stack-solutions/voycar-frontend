<script>
    import Logo from "$lib/assets/logo-full-white.svg";
    import { LightSwitch } from "@skeletonlabs/skeleton";
</script>

<svelte:head>
    <title>Voycar</title>
</svelte:head>

<div class="flex flex-col justify-center items-center h-screen">
    <LightSwitch />
    <img src={Logo} alt="logo" class="w-500" />
    <h1 class="h1 text-center">Rent a car!</h1>
</div>
