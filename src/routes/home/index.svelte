<script>
   import { onMount } from "svelte";
   import { goto } from "@sapper/app";
   import { user } from "../../store/user.js";
   import { scale } from "svelte/transition";
   import Card from "../../components/Card.svelte";

   let posts;

   onMount(() => {
      if ($user === null) {
         goto("/login");
         return;
      }

      db.collection("posts")
         .orderBy("date", "desc")
         .onSnapshot((snapshot) => {
            let changes = snapshot.docs;

            if (changes.length === 0) {
               posts = [];
            } else {
               posts = changes;
            }
         });
   });
</script>

<style>
   h1 {
      margin-top: 60px;
      font-size: 2.3rem;
      text-align: center;
   }

   .spinner-1::before {
      top: 50%;
      left: 50%;
      width: 55px;
      content: "";
      height: 55px;
      position: absolute;
      border-radius: 100%;
      box-sizing: border-box;
      margin: -10px 0 0 -30px;
      border: 6px solid #ffffff;
      border-top-color: transparent;
      animation: spinner 0.8s linear infinite;
   }

   @keyframes spinner {
      to {
         transform: rotate(360deg);
      }
   }
</style>

<svelte:head>
   <title>Home</title>
</svelte:head>

{#if posts === undefined}
   <div class="spinner-1" />
{:else if posts.length !== 0}
   {#each posts as post}
      <Card post={post.data()} postId={post.id} />
   {/each}
{:else}
   <h1 in:scale>🙅</h1>
{/if}
