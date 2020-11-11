<script>
   import Card from "../components/Card.svelte";
   let posts = [1, 2, 3, 4, 5];
</script>

<svelte:head>
   <title>Home</title>
</svelte:head>

{#each posts as post}
   <Card />
{/each}
