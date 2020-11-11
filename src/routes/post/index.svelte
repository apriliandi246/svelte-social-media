<script>
</script>

<style>
   textarea {
      width: 100%;
      resize: none;
      outline: none;
      padding: 11px;
      display: block;
      color: #ffffff;
      font-size: 1rem;
      line-height: 22px;
      letter-spacing: 1px;
      white-space: pre-line;
      box-sizing: border-box;
      background-color: #192734;
      border: 1px solid #273742;
      transition: background-color 0.2s;
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
      letter-spacing: 1.2px;
      margin: 0px 0 10px 0;
      box-sizing: border-box;
      background-color: #192734;
      border: 1px solid #273742;
      transition: color 0.2s, background-color 0.2s;
   }

   button,
   textarea {
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

<form spellcheck="false">
   <textarea rows="18" placeholder="type some bulshit...." />
   <button>Post</button>
</form>
