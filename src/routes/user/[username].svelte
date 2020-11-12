<script context="module">
   export async function preload(page, session) {
      const USER_LOGIN = "farhan_apriliandi";
      const { username } = page.params;

      if (USER_LOGIN === username) {
         this.redirect(301, "/profile");
      } else {
         return { username };
      }
   }
</script>

<script>
   import Card from "../../components/Card.svelte";
   import Profile from "../../components/Profile.svelte";

   export let username;

   let posts = [1, 2, 3, 4, 5];

   const user = {
      username,
      bio: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam recusandae
      perspiciatis, qui quas sed explicabo iure. Laborum, quidem maxime quos
      accusamus labore dolores a voluptatibus solut`,
      joined: "October 2020",
   };
</script>

<style>
   .no-post {
      margin-top: 60px;
      font-size: 2.3rem;
      text-align: center;
   }
</style>

<svelte:head>
   <title>{username}</title>
</svelte:head>

<Profile {user} />

{#if posts.length > 1}
   {#each posts as post}
      <Card post={username} />
   {/each}
{:else}
   <h1 class="no-post">🙅</h1>
{/if}
