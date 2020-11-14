<script>
   import { scale } from "svelte/transition";

   let post = {
      value: "",
      isLimit: false,
      isValid: false,
   };

   $: if (post.value.trim() === "") {
      post.isValid = false;
      post.isLimit = false;
   } else if (post.value.trim() !== "" && post.value.trim().length >= 280) {
      post.isLimit = true;
      post.isValid = false;
   } else {
      post.isValid = true;
      post.isLimit = false;
   }

   function onSubmit() {}
</script>

<style>
   form {
      width: 100%;
      margin-top: 40px;
      margin: 40px auto 0 auto;
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

   textarea:invalid {
      box-shadow: none;
   }

   textarea:focus {
      background-color: #15202b;
   }

   textarea::placeholder {
      letter-spacing: 1px;
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

   .alert {
      width: 100%;
      display: flex;
      padding: 13px;
      color: #ffffff;
      font-weight: bolder;
      align-items: center;
      box-sizing: border-box;
      margin: 40px auto 0 auto;
      background-color: #ff4500;
      justify-content: space-between;
   }

   .alert__message {
      font-size: 1rem;
      letter-spacing: 0.7px;
   }

   button,
   textarea,
   .alert__message {
      border-radius: 4px;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto,
         "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
         "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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

   @media screen and (max-width: 599px) {
      form {
         width: 93%;
      }

      .alert {
         width: 93%;
      }
   }

   @media screen and (min-width: 760px) {
      button,
      textarea {
         font-size: 0.9rem;
      }

      .alert__message {
         font-size: 0.9rem;
      }
   }

   @media screen and (min-width: 1200px) {
      .alert__message {
         font-size: calc(0.9rem - 1px);
      }
   }
</style>

<svelte:head>
   <title>Post</title>
</svelte:head>

{#if post.isLimit === true}
   <div
      class="alert"
      in:scale|local={{ duration: 350 }}
      out:scale|local={{ duration: 350 }}>
      <p class="alert__message">Words must be less than 280 characters</p>
   </div>
{:else}
   <!-- Nothing -->
{/if}

<form spellcheck="false" on:submit|preventDefault={onSubmit}>
   <textarea
      rows="18"
      required
      bind:value={post.value}
      placeholder="What do you think ?" />
   <button type="submit" disabled={post.isValid === false}>Post</button>
</form>
