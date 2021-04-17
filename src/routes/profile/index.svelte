<script>
   import { onMount } from "svelte";
   import { goto } from "@sapper/app";
   import Post from "../../components/Post.svelte";
   import Profile from "../../components/Profile.svelte";
   import { user, profileFtech } from "../../store/store.js";
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

               if ($profileFtech === false) {
                  $profileFtech = true;
               }
            });

            db.collection("posts")
               .where("username", "==", $user.username)
               .onSnapshot((snapshot) => {
                  snapshot.docs.length >= 1
                     ? (posts = snapshot.docs)
                     : (posts = []);
               });
         });
   });
</script>

<svelte:head>
   <title>My profile</title>
</svelte:head>

{#if userData === undefined && $profileFtech === false}
   <ProfileSkeleton />
{:else if userData === undefined && $profileFtech === true}
   <ProfileSkeleton />
{:else}
   <Profile {userData} />
{/if}

{#if posts === undefined && $profileFtech === false}
   <PostSkeleton />
{/if}

{#if posts !== undefined}
   {#if posts.length >= 1}
      {#each posts as post}
         <Post post={post.data()} postId={post.id} />
      {/each}
   {:else}
      <h1 class="no-post">🙅</h1>
   {/if}
{/if}

<style>
   .no-post {
      margin-top: 90px;
      font-size: 2.3rem;
      text-align: center;
   }
</style>
