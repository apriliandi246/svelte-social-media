<script context="module">
  export async function preload(_, session) {
    const { _userId, _username } = session;

    if (!_userId && !_username) this.redirect(302, "/login");
  }
</script>

<script>
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import Post from "$components/Post.svelte";
  import Profile from "$components/Profile.svelte";
  import { profileFetch, sessionUsername } from "$store";
  import PostSkeleton from "$components/PostSkeleton.svelte";
  import ProfileSkeleton from "$components/ProfileSkeleton.svelte";

  let posts;
  let userData;

  onMount(async () => {
    fire
      .collection("users")
      .where("username", "==", $sessionUsername)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          userData = doc.data();

          if (!$profileFetch) $profileFetch = true;
        });
      });

    const unsubscribe = fire
      .collection("posts")
      .where("username", "==", $sessionUsername)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) posts = snapshot.docs;
      });

    return () => {
      unsubscribe();
    };
  });
</script>

<svelte:head>
  <title>My profile • {$sessionUsername}</title>
</svelte:head>

{#if !userData}
  <ProfileSkeleton />
{:else}
  <Profile {userData} />
{/if}

{#if !posts}
  <PostSkeleton />
{/if}

{#if userData}
  {#if posts}
    {#if posts.length > 0}
      {#each posts as post}
        <Post post={post.data()} postId={post.id} />
      {/each}
    {:else}
      <h1 in:scale={{ duration: 200 }}>🙅</h1>
    {/if}
  {/if}
{/if}

<style>
  h1 {
    margin-top: 90px;
    font-size: 2.3rem;
    text-align: center;
  }
</style>
