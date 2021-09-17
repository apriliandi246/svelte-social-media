<script context="module">
  export async function preload(_, session) {
    const { _userId, _username } = session;

    if (!_userId && !_username) this.redirect(302, "/login");
  }
</script>

<script>
  import { onMount } from "svelte";
  import Post from "$components/Post.svelte";
  import Profile from "$components/Profile.svelte";
  import { isUserFetch, sessionUsername } from "$store";
  import PostSkeleton from "$components/PostSkeleton.svelte";
  import ProfileSkeleton from "$components/ProfileSkeleton.svelte";

  let userData;
  let posts = [];

  onMount(async () => {
    fire
      .collection("users")
      .where("username", "==", $sessionUsername)
      .get()
      .then((snapshot) => {
        if (!$isUserFetch) $isUserFetch = true;

        if (snapshot.docs.length === 0) {
          userData = [];
          return;
        }

        snapshot.docs.forEach((doc) => {
          userData = doc.data();
        });

        fire
          .collection("posts")
          .where("username", "==", $sessionUsername)
          .onSnapshot((snapshot) => {
            if (snapshot.docs.length > 0) posts = snapshot.docs;
          });
      });
  });
</script>

<svelte:head>
  <title>Profile • {$sessionUsername}</title>
</svelte:head>

{#if !userData && !$isUserFetch}
  <ProfileSkeleton />
{:else if !userData && $isUserFetch}
  <ProfileSkeleton />
{:else if userData.length === 0}
  <h1 class="no_user">{$sessionUsername} 🙅</h1>
{:else}
  <Profile {userData} />
{/if}

{#if !posts && !$isUserFetch}
  <PostSkeleton />
{/if}

{#if posts}
  {#if posts.length > 0}
    {#each posts as post}
      <Post postId={post.id} post={post.data()} />
    {/each}
  {:else}
    <h1 class="no_post">🙅</h1>
  {/if}
{/if}

<style>
  .no_post {
    margin-top: 110px;
    font-size: 2.3rem;
    text-align: center;
  }

  .no_user {
    color: #fff;
    font-size: 1.7rem;
    margin-top: 140px;
    text-align: center;
    letter-spacing: 2px;
  }
</style>
