<script context="module">
  export async function preload(_, session) {
    const { _userId, _username } = session;

    if (!_userId && !_username) this.redirect(302, "/login");

    return {
      username: _username,
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { homeFetch } from "$store";
  import { scale } from "svelte/transition";
  import Post from "$components/Post.svelte";
  import PostSkeleton from "$components/PostSkeleton.svelte";

  export let username;

  let posts;

  onMount(async () => {
    const unsubscribe = fire
      .collection("posts")
      .orderBy("whenPosted", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docs.length > 0 ? (posts = snapshot.docs) : (posts = []);

        if (!$homeFetch) $homeFetch = true;
      });

    return () => {
      unsubscribe();
    };
  });
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

{#if !posts}
  <PostSkeleton />
{:else if posts.length > 0}
  {#each posts as post}
    <Post {username} postId={post.id} post={post.data()} />
  {/each}
{:else}
  <h1 in:scale>🙅</h1>
{/if}

<style>
  h1 {
    margin-top: 80px;
    font-size: 2.3rem;
    text-align: center;
  }
</style>
