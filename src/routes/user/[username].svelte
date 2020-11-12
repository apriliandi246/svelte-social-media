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
   .user-profile-picture {
      padding: 25px;
      margin-top: 40px;
      text-align: center;
      border-radius: 4px;
      background-color: #052530;
      border: 2px solid #858992;
      box-shadow: inset 0px 0px 3px rgba(255, 255, 255, 1);
   }

   img {
      border-radius: 100%;
      box-shadow: inset 0px 0px 150px rgba(255, 255, 255, 0.4);
   }

   .no-post {
      margin-top: 60px;
      font-size: 2.3rem;
      text-align: center;
   }

   @media screen and (max-width: 599px) {
      .user-profile-picture {
         border-right: none;
         border-left: none;
         box-shadow: none;
         border-radius: 0;
      }
   }
</style>

<svelte:head>
   <title>{username}</title>
</svelte:head>

<div class="user-profile-picture">
   <img
      src="https://www.gravatar.com/avatar/{username.length}?s=120&d=robohash"
      loading="lazy"
      alt="16050421304" />
</div>

<Profile {user} />

{#if posts.length > 1}
   {#each posts as post}
      <Card post={username} />
   {/each}
{:else}
   <h1 class="no-post">🙅</h1>
{/if}
