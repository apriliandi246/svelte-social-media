<script>
   import { user } from "../store/user.js";
   import { scale } from "svelte/transition";
   import Alert from "./Alert.svelte";

   export let postId;

   let isCreate = false;
   let { value, isLimit, isValid } = {
      value: "",
      isLimit: false,
      isValid: false,
   };

   $: if (value.trim() === "") {
      isValid = false;
      isLimit = false;
   } else if (value.trim() !== "" && value.trim().length >= 280) {
      isLimit = true;
      isValid = false;
   } else {
      isValid = true;
      isLimit = false;
   }

   function onSubmit() {
      isCreate = true;

      db.collection("comments")
         .add({
            likes: [],
            post: postId,
            words: value,
            date: `${new Date()}`,
            username: $user.username,
            whenCommented: `${Date.now()}`,
         })
         .then(() => {
            isCreate = false;
            isValid = false;
            value = "";
         });
   }
</script>

<style>
   form {
      width: 100%;
      margin: 30px auto 70px auto;
   }

   textarea {
      width: 100%;
      resize: none;
      outline: none;
      padding: 18px;
      display: block;
      color: #ffffff;
      font-size: 1rem;
      line-height: 22px;
      letter-spacing: 1px;
      white-space: pre-line;
      box-sizing: border-box;
      background-color: #192734;
      border: 2px solid #858992;
      transition: background-color 0.2s;
   }

   button {
      width: 100%;
      padding: 10px;
      outline: none;
      color: #ffffff;
      cursor: pointer;
      font-size: 1rem;
      margin: 28px 0 10px 0;
      letter-spacing: 1.2px;
      box-sizing: border-box;
      background-color: #192734;
      border: 2px solid #858992;
      transition: color 0.2s, background-color 0.2s;
   }

   button:hover {
      background-color: #15202b;
   }

   button:focus {
      background-color: #273742;
   }

   button:disabled {
      pointer-events: none;
   }

   textarea:invalid {
      box-shadow: none;
   }

   textarea:focus {
      background-color: #15202b;
   }

   textarea::placeholder {
      letter-spacing: 1px;
   }

   button,
   textarea {
      border-radius: 4px;
      box-shadow: inset 0px 0px 2px rgba(255, 255, 255, 1);
      font-family: system-ui, -apple-system, "Segoe UI", Roboto,
         "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
         "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
   }

   @media screen and (max-width: 599px) {
      form {
         width: 92%;
      }
   }

   @media screen and (min-width: 760px) {
      button,
      textarea {
         font-size: 0.9rem;
      }
   }
</style>

<svelte:head>
   <title>Post</title>
</svelte:head>

{#if isLimit === true}
   <Alert message="Words must be less than 280 characters" />
{/if}

<form spellcheck="false" on:submit|preventDefault={onSubmit} in:scale>
   <textarea
      rows="10"
      required
      bind:value
      placeholder="your comment...."
      disabled={isCreate === true} />

   <button type="submit" disabled={isValid === false || isLimit === true}>
      {isCreate === true ? 'Loading....' : 'Comment'}
   </button>
</form>
