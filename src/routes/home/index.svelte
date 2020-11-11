<script>
   import Card from "../../components/Card.svelte";
   let posts = [1, 2, 3, 4, 5];
</script>

<style>
   h1 {
      margin-top: 60px;
      font-size: 2.3rem;
      text-align: center;
   }
</style>

<svelte:head>
   <title>Home</title>
</svelte:head>

{#if posts.length > 1}
   {#each posts as post}
      <Card />
   {/each}
{:else}
   <h1>🙅</h1>
{/if}
