<script context="module">
   export async function preload(page, session) {
      const { username } = page.params;
      return { username };
   }
</script>

<script>
   import { onMount } from "svelte";
   import { goto } from "@sapper/app";
   import { scale } from "svelte/transition";
   import { user } from "../store/user.js";
   import Post from "../components/Post.svelte";
   import Profile from "../components/Profile.svelte";
   import Spinner from "../components/Spinner.svelte";

   export let username;

   let posts;
   let userData;

   onMount(() => {
      if (username === $user.username) {
         goto("/profile");
         return;
      }

      db.collection("users")
         .where("username", "==", username)
         .get()
         .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
               userData = doc.data();
            });

            db.collection("posts")
               .where("username", "==", username)
               .onSnapshot((snapshot) => {
                  if (snapshot.docs.length >= 1) {
                     posts = snapshot.docs;
                  } else {
                     posts = [];
                  }
               });
         });
   });
</script>

<style>
   .no-post {
      margin-top: 110px;
      font-size: 2.3rem;
      text-align: center;
   }
</style>

<svelte:head>
   <title>{username}</title>
</svelte:head>

{#if userData === undefined}
   <Spinner />
{:else}
   <Profile {userData} />
{/if}

{#if posts !== undefined}
   {#if posts.length >= 1}
      {#each posts as post}
         <Post postId={post.id} post={post.data()} />
      {/each}
   {:else if posts.length === 0}
      <h1 class="no-post" in:scale>🙅</h1>
   {/if}
{/if}
