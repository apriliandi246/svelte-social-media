<script>
   import { onMount } from "svelte";
   import { goto } from "@sapper/app";
   import { scale } from "svelte/transition";
   import { user, homeFetch } from "../../store/store.js";
   import Post from "../../components/Post.svelte";
   import Spinner from "../../components/Spinner.svelte";
   import PostSkeleton from "../../components/PostSkeleton.svelte";

   let posts;

   onMount(() => {
      if ($user === null) return goto("/login");

      db.collection("posts")
         .orderBy("whenPosted", "desc")
         .onSnapshot((snapshot) => {
            snapshot.docs.length >= 1 ? (posts = snapshot.docs) : (posts = []);

            if ($homeFetch === false) {
               $homeFetch = true;
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

{#if posts === undefined && $homeFetch === false}
   <PostSkeleton />
   <PostSkeleton />
   <PostSkeleton />
{:else if posts === undefined && $homeFetch === true}
   <Spinner />
{:else if posts.length !== 0}
   {#each posts as post}
      <Post postId={post.id} post={post.data()} />
   {/each}
{:else}
   <h1 in:scale>🙅</h1>
{/if}
