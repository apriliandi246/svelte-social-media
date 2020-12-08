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
   import { user, isUserFetch } from "../store/store.js";
   import Post from "../components/Post.svelte";
   import Profile from "../components/Profile.svelte";
   import Spinner from "../components/Spinner.svelte";
   import PostSkeleton from "../components/PostSkeleton.svelte";
   import ProfileSkeleton from "../components/ProfileSkeleton.svelte";

   export let username;

   let posts;
   let userData;

   onMount(() => {
      if (username === $user.username) return goto("/profile");

      db.collection("users")
         .where("username", "==", username)
         .get()
         .then((snapshot) => {
            if ($isUserFetch === false) {
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
                  snapshot.docs.length >= 1
                     ? (posts = snapshot.docs)
                     : (posts = []);
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

   .no-user {
      color: #ffffff;
      font-size: 1.7rem;
      margin-top: 140px;
      text-align: center;
      letter-spacing: 2px;
   }
</style>

<svelte:head>
   <title>{username}</title>
</svelte:head>

{#if userData === undefined && $isUserFetch === false}
   <ProfileSkeleton />
{:else if userData === undefined && $isUserFetch === true}
   <Spinner />
{:else if userData.length === 0}
   <h1 class="no-user" in:scale>{username} 🙅</h1>
{:else}
   <Profile {userData} />
{/if}

{#if posts === undefined && $isUserFetch === false}
   <PostSkeleton />
   <PostSkeleton />
   <PostSkeleton />
   <PostSkeleton />
{/if}

{#if posts !== undefined}
   {#if posts.length >= 1}
      {#each posts as post}
         <Post postId={post.id} post={post.data()} />
      {/each}
   {:else}
      <h1 class="no-post" in:scale>🙅</h1>
   {/if}
{/if}
