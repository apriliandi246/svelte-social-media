<script>
   import Card from "../../components/Card.svelte";
   import Profile from "../../components/Profile.svelte";

   let bio = "";
   let isEdit = true;
   let username = "";
   let posts = [1, 2, 3, 4, 5];

   const user = {
      username: "farhan_apriliandi",
      bio: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam recusandae
      perspiciatis, qui quas sed explicabo iure. Laborum, quidem maxime quos
      accusamus labore dolores a voluptatibus solut`,
      joined: "October 2020",
   };

   function handleSubmit() {}
</script>

<style>
   .no-post {
      margin-top: 60px;
      font-size: 2.3rem;
      text-align: center;
   }

   .show-form button {
      border-radius: 4px;
      box-shadow: inset 0px 0px 3px rgba(255, 255, 255, 1);
   }

   .hide {
      display: none;
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
      border: 1px solid #273742;
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
      border: 1px solid #273742;
      transition: color 0.2s, background-color 0.2s;
   }

   .input-form__input,
   .button-form {
      border-radius: 4px;
      box-shadow: inset 0px 0px 3px rgba(255, 255, 255, 1);
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

   @media screen and (max-width: 599px) {
      .show-form {
         width: 90%;
         margin: 0px auto;
      }

      .update__profile-form {
         width: 90%;
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

<div class="show-form">
   <button class="button-form" on:click={() => (isEdit = !isEdit)}>
      {isEdit === true ? 'Edit Profile' : 'Cancel'}
   </button>
</div>

<div class="update__profile-form" class:hide={isEdit === true}>
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
            bind:value={username}
            class="input-form__input"
            placeholder="username" />
      </div>

      <div class="input-form">
         <label for="bio" class="input-form__label">Bio</label>
         <textarea
            id="bio"
            rows="10"
            required
            bind:value={bio}
            placeholder="bio"
            class="input-form__input" />
      </div>

      <button
         type="submit"
         class="button-form"
         disabled={username === '' || bio === ''}
         class:no-hover={username === '' || bio === ''}>Save</button>
   </form>
</div>

<Profile {user} />

{#if posts.length > 1}
   {#each posts as post}
      <Card post="farhan_apriliandi" />
   {/each}
{:else}
   <h1 class="no-post">🙅</h1>
{/if}
