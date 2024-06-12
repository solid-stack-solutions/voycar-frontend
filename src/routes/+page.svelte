<script>
    import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
    let selectedValue = "option1";
</script>

<svelte:head>
    <title>Voycar</title>
</svelte:head>

<div class="flex flex-col justify-center items-center h-screen">
    <h1 class="h1 text-center">Rent a car!</h1>
    <button
        type="button"
        class="btn bg-gradient-to-br variant-gradient-primary-secondary"
    >
        Pre-styled buttons!
    </button>
    <div class="bg-primary-500 rounded p-1">
        <ListBox>
            <ListBoxItem
                bind:group={selectedValue}
                name="medium"
                value="option1">Select me!</ListBoxItem
            >
            <ListBoxItem
                bind:group={selectedValue}
                name="medium"
                value="option2">Or me...?</ListBoxItem
            >
            <ListBoxItem
                bind:group={selectedValue}
                name="medium"
                value="option3">Maybe even me :)</ListBoxItem
            >
        </ListBox>
    </div>
</div>
