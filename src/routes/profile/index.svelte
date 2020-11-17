<script>
   import { onMount } from "svelte";
   import { scale } from "svelte/transition";
   import Card from "../../components/Card.svelte";
   import Profile from "../../components/Profile.svelte";

   let posts;
   let userData;

   onMount(() => {
      const { username } = JSON.parse(window.localStorage.getItem("userData"));

      db.collection("users")
         .where("username", "==", username)
         .get()
         .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
               userData = doc.data();
            });

            db.collection("posts")
               .where("username", "==", username)
               .get()
               .then((snapshot) => {
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
   <title>My Profile</title>
</svelte:head>

{#if userData === undefined}
   <div class="spinner-1" />
{:else}
   <Profile {userData} />
{/if}

{#if posts === undefined}
   <!-- Nothing -->
{:else if posts.length >= 1}
   {#each posts as post}
      <Card post={post.data()} postId={post.id} />
   {/each}
{:else if posts.length === 0}
   <h1 class="no-post" in:scale>🙅</h1>
{/if}
