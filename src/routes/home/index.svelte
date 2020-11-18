<script>
   import { onMount } from "svelte";
   import { goto } from "@sapper/app";
   import { scale } from "svelte/transition";
   import { user } from "../../store/user.js";
   import Card from "../../components/Post.svelte";
   import Spinner from "../../components/Spinner.svelte";

   let posts;

   onMount(() => {
      if ($user === null) {
         goto("/login");
         return;
      }

      db.collection("posts")
         .orderBy("whenPosted", "desc")
         .onSnapshot((snapshot) => {
            let changes = snapshot.docs;

            if (changes.length >= 1) {
               posts = changes;
            } else {
               posts = [];
            }
         });
   });
</script>

<style>
   h1 {
      margin-top: 80px;
      font-size: 2.3rem;
      text-align: center;
   }
</style>

<svelte:head>
   <title>Home</title>
</svelte:head>

{#if posts === undefined}
   <Spinner />
{:else if posts.length !== 0}
   {#each posts as post}
      <Card post={post.data()} postId={post.id} />
   {/each}
{:else}
   <h1 in:scale>🙅</h1>
{/if}
