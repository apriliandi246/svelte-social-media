<script>
   import Card from "../../components/Card.svelte";
   let posts = [];
</script>

<style>
   .user__profile {
      padding: 25px;
      color: #ffffff;
      margin-bottom: 27px;
      background-color: #052530;
   }

   .user__name {
      font-weight: bold;
      letter-spacing: 0.4px;
      font-size: 1.2rem;
   }

   .user__bio {
      font-size: 1rem;
      margin-top: 25px;
      line-height: 22px;
      margin-bottom: 25px;
      letter-spacing: 0.6px;
   }

   .user__joined {
      letter-spacing: 1.2px;
   }

   .no-post {
      margin-top: 60px;
      font-size: 2.3rem;
      text-align: center;
   }

   @media screen and (min-width: 760px) {
      .user__name {
         font-size: 1.1rem;
      }

      .user__bio {
         font-size: calc(0.9rem - 1px);
      }

      .user__joined {
         font-size: 0.8rem;
      }
   }
</style>

<svelte:head>
   <title>Profile</title>
</svelte:head>

<div class="user__profile">
   <p class="user__name">Farhan Apriliandi</p>
   <p class="user__bio">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam recusandae
      perspiciatis, qui quas sed explicabo iure. Laborum, quidem maxime quos
      accusamus labore dolores a voluptatibus solut
   </p>
   <p class="user__joined">Joined October 20</p>
</div>

{#if posts.length > 1}
   {#each posts as post}
      <Card />
   {/each}
{:else}
   <h1 class="no-post">🙅</h1>
{/if}
