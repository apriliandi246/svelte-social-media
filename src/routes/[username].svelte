<script context="module">
  export async function preload({ username }, _) {
    return { username };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import Post from "../components/Post.svelte";
  import Profile from "../components/Profile.svelte";
  import { user, isUserFetch } from "../store/store";
  import PostSkeleton from "../components/PostSkeleton.svelte";
  import ProfileSkeleton from "../components/ProfileSkeleton.svelte";

  let posts;
  let userData;
  export let username;

  onMount(async () => {
    if (username === $user.username) await goto("/profile");

    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((snapshot) => {
        if (!$isUserFetch) {
          $isUserFetch = true;
        }

        if (snapshot.docs.length === 0) {
          userData = [];
          return;
        }

        snapshot.docs.forEach((doc) => {
          userData = doc.data();
        });

        db.collection("posts")
          .where("username", "==", username)
          .onSnapshot((snapshot) => {
            snapshot.docs.length >= 1 ? (posts = snapshot.docs) : (posts = []);
          });
      });
  });
</script>

<svelte:head>
  <title>{username}</title>
</svelte:head>

{#if !userData && !$isUserFetch}
  <ProfileSkeleton />
{:else if !userData && $isUserFetch}
  <ProfileSkeleton />
{:else if userData.length === 0}
  <h1 class="no_user">{username} 🙅</h1>
{:else}
  <Profile {userData} />
{/if}

{#if !posts && !$isUserFetch}
  <PostSkeleton />
{/if}

{#if posts}
  {#if posts.length >= 1}
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
    color: #ffffff;
    font-size: 1.7rem;
    margin-top: 140px;
    text-align: center;
    letter-spacing: 2px;
  }
</style>
