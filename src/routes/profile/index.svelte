<script>
   import { scale } from "svelte/transition";
   import Card from "../../components/Card.svelte";
   import Profile from "../../components/Profile.svelte";

   let isEdit = false;
   let posts = [];

   let user = {
      username: "farhan",
      bio: "this is the bio",
      joined: "20 Nov 2020",
   };

   function showEditForm() {
      isEdit = !isEdit;
   }

   function handleSubmit() {}
</script>

<style>
   .no-post {
      margin-top: 80px;
      font-size: 2.3rem;
      text-align: center;
   }

   .show-form button {
      border-radius: 4px;
      box-shadow: inset 0px 0px 2px rgba(255, 255, 255, 1);
   }

   .no-hover {
      pointer-events: none;
   }

   .update__profile-form {
      width: 100%;
      margin: 40px auto;
   }

   .input-form {
      margin-top: 32px;
   }

   .input-form__label {
      color: #ffffff;
      font-size: 1rem;
      letter-spacing: 1px;
   }

   .input-form__input {
      width: 100%;
      resize: none;
      outline: none;
      padding: 11px;
      display: block;
      color: #ffffff;
      font-size: 1rem;
      margin-top: 15px;
      letter-spacing: 1.2px;
      box-sizing: border-box;
      background-color: #192734;
      border: 2px solid #858992;
      transition: background-color 0.2s;
   }

   .button-form {
      width: 100%;
      padding: 10px;
      outline: none;
      color: #ffffff;
      cursor: pointer;
      font-size: 1rem;
      letter-spacing: 1.2px;
      margin: 45px 0 10px 0;
      box-sizing: border-box;
      background-color: #192734;
      border: 2px solid #858992;
      transition: color 0.2s, background-color 0.2s;
   }

   .input-form__input,
   .button-form {
      border-radius: 4px;
      box-shadow: inset 0px 0px 2px rgba(255, 255, 255, 1);
      font-family: system-ui, -apple-system, "Segoe UI", Roboto,
         "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
         "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
   }

   .input-form__input:focus {
      background-color: #15202b;
   }

   .input-form__input::placeholder {
      letter-spacing: 1px;
   }

   .button-form:hover {
      background-color: #15202b;
   }

   .button-form:focus {
      background-color: #273742;
   }

   .spinner-1::before {
      top: 50%;
      left: 50%;
      width: 60px;
      content: "";
      height: 60px;
      position: absolute;
      border-radius: 100%;
      box-sizing: border-box;
      margin: -10px 0 0 -30px;
      border: 6px solid #ffffff;
      border-top-color: transparent;
      animation: spinner 0.8s linear infinite;
   }

   @media screen and (max-width: 599px) {
      .show-form {
         width: 92%;
         margin: 0px auto;
      }

      .update__profile-form {
         width: 95%;
         margin: 0px auto;
      }
   }

   @media screen and (min-width: 760px) {
      .input-form__label,
      .input-form__input,
      .button-form {
         font-size: 0.9rem;
      }
   }

   @media screen and (min-width: 1200px) {
      .input-form__label,
      .input-form__input,
      .button-form {
         font-size: calc(0.8rem + 1px);
      }
   }
</style>

<svelte:head>
   <title>My Profile</title>
</svelte:head>

<div class="show-form" in:scale>
   <button class="button-form" on:click={showEditForm}>
      {isEdit === false ? 'Edit Profile' : 'Cancel'}
   </button>
</div>

{#if isEdit === true}
   <div class="update__profile-form">
      <form
         spellcheck="false"
         autocomplete="off"
         on:submit|preventDefault={handleSubmit}>
         <div class="input-form">
            <label for="username" class="input-form__label">Username</label>
            <input
               required
               type="text"
               id="username"
               bind:value={user.username}
               class="input-form__input"
               placeholder="username" />
         </div>

         <div class="input-form">
            <label for="bio" class="input-form__label">Bio</label>
            <textarea
               id="bio"
               rows="10"
               required
               bind:value={user.bio}
               placeholder="bio"
               class="input-form__input" />
         </div>

         <button
            type="submit"
            class="button-form"
            disabled={user.username === '' || user.bio === ''}
            class:no-hover={user.username === '' || user.bio === ''}>Save</button>
      </form>
   </div>
{/if}

{#if user === undefined}
   <div class="spinner-1" />
{:else}
   <Profile {user} />
{/if}

{#if posts.length > 1}
   {#each posts as post}
      <Card post="farhan_apriliandi" />
   {/each}
{:else}
   <h1 class="no-post" in:scale>🙅</h1>
{/if}
