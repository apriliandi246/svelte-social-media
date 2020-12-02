<script>
   import { onMount } from "svelte";
   import { goto } from "@sapper/app";
   import { scale } from "svelte/transition";
   import { user } from "../../store/user.js";
   import Card from "../../components/Post.svelte";
   import Profile from "../../components/Profile.svelte";
   import PostSkeleton from "../../components/PostSkeleton.svelte";
   import ProfileSkeleton from "../../components/ProfileSkeleton.svelte";

   let posts;
   let userData;

   onMount(() => {
      if ($user === null) return goto("/login");

      db.collection("users")
         .where("username", "==", $user.username)
         .get()
         .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
               userData = doc.data();
            });

            db.collection("posts")
               .where("username", "==", $user.username)
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
   <title>My Profile</title>
</svelte:head>

{#if userData === undefined}
   <ProfileSkeleton />
   <PostSkeleton />
   <PostSkeleton />
   <PostSkeleton />
{:else}
   <Profile {userData} />
{/if}

{#if posts !== undefined}
   {#if posts.length >= 1}
      {#each posts as post}
         <Card post={post.data()} postId={post.id} />
      {/each}
   {:else if posts.length === 0}
      <h1 class="no-post" in:scale>🙅</h1>
   {/if}
{/if}
