<script>
   import { onMount } from "svelte";
   import { goto } from "@sapper/app";
   import { scale } from "svelte/transition";
   import Post from "../../components/Post.svelte";
   import Profile from "../../components/Profile.svelte";
   import { user, profileFetch } from "../../store/store.js";
   import PostSkeleton from "../../components/PostSkeleton.svelte";
   import ProfileSkeleton from "../../components/ProfileSkeleton.svelte";

   let posts;
   let userData;

   onMount(() => {
      if ($user === null) {
         goto("/login");
         return;
      }

      db.collection("users")
         .where("username", "==", $user.username)
         .get()
         .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
               userData = doc.data();

               if ($profileFetch === false) {
                  $profileFetch = true;
               }
            });
         });

      const unsubscribe = db
         .collection("posts")
         .where("username", "==", $user.username)
         .onSnapshot((snapshot) => {
            snapshot.docs.length >= 1 ? (posts = snapshot.docs) : (posts = []);
         });

      return () => {
         unsubscribe();
      };
   });
</script>

<svelte:head>
   <title>My profile</title>
</svelte:head>

{#if userData === undefined}
   <ProfileSkeleton />
{:else}
   <Profile {userData} />
{/if}

{#if posts === undefined}
   <PostSkeleton />
{/if}

{#if posts !== undefined}
   {#if posts.length >= 1}
      {#each posts as post}
         <Post post={post.data()} postId={post.id} />
      {/each}
   {:else}
      <h1 in:scale={{ duration: 200 }}>🙅</h1>
   {/if}
{/if}

<style>
   h1 {
      margin-top: 90px;
      font-size: 2.3rem;
      text-align: center;
   }
</style>
