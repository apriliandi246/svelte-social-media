<script>
   import { goto } from "@sapper/app";
   import { slide, scale } from "svelte/transition";
   import Alert from "../../components/Alert.svelte";

   let isJoin = false;
   let isError = false;
   let allInvalid = true;

   const { username, password, confirmPassword } = {
      username: {
         value: "",
         isValid: false,
         isTyping: false,
         regexPattern: /^[\S*]{6,12}$/i,
      },

      password: {
         value: "",
         isValid: false,
         isTyping: false,
         regexPattern: /^[\w@-]{6,}$/,
      },

      confirmPassword: {
         value: "",
         isSame: false,
      },
   };

   $: {
      // username
      if (
         username.regexPattern.test(username.value) === false &&
         username.value !== ""
      ) {
         username.isValid = false;
         username.isTyping = true;
      } else if (username.value !== "") {
         username.isValid = true;
      } else if (username.value === "" && username.isTyping === true) {
         username.isValid = false;
      }

      // password
      if (
         password.regexPattern.test(password.value) === false &&
         password.value !== ""
      ) {
         password.isValid = false;
         password.isTyping = true;
         confirmPassword.value = "";
      } else if (password.value !== "") {
         password.isValid = true;
      } else if (password.value === "" && password.isTyping === true) {
         password.isValid = false;
      }

      // confirm-password
      if (confirmPassword.value === password.value) {
         confirmPassword.isSame = true;
      } else {
         confirmPassword.isSame = false;
      }

      if (
         username.isValid === true &&
         password.isValid === true &&
         confirmPassword.isSame === true
      ) {
         allInvalid = false;
      } else {
         allInvalid = true;
      }
   }

   function handleJoin() {
      isError = false;
      isJoin = true;

      db.collection("users")
         .where("username", "==", username.value)
         .get()
         .then((snapshot) => {
            if (snapshot.empty === true) {
               db.collection("users")
                  .add({
                     username: username.value,
                     password: password.value,
                     joined: `${new Date()}`,
                  })
                  .then(() => {
                     goto("/login");
                  });
            } else {
               confirmPassword.isSame = false;
               confirmPassword.value = "";
               password.isTyping = false;
               password.isValid = false;
               password.value = "";
               username.value = "";
               isJoin = false;
               isError = true;
            }
         });
   }
</script>

<style>
   .container {
      width: 88%;
      margin: 10px auto;
   }

   form {
      width: 100%;
   }

   .input-form {
      margin-top: 32px;
   }

   .input-form__label {
      color: #ffffff;
      font-size: 1rem;
      letter-spacing: 1px;
      transition: color 0.2s;
   }

   .input-form__input {
      width: 100%;
      outline: none;
      padding: 11px;
      display: block;
      color: #ffffff;
      font-size: 1rem;
      margin-top: 15px;
      letter-spacing: 1px;
      box-sizing: border-box;
      background-color: #192734;
      border: 1px solid #273742;
      transition: background-color 0.2s, border-color 0.2s;
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

   .redirect-button-form {
      width: 100%;
      padding: 11px;
      outline: none;
      display: block;
      color: #ffffff;
      font-size: 1rem;
      margin-top: 16px;
      text-align: center;
      letter-spacing: 1.2px;
      text-decoration: none;
      box-sizing: border-box;
      background-color: #192734;
      border: 1px solid #273742;
      transition: color 0.2s, background-color 0.2s;
   }

   .input-form__input,
   .button-form,
   .redirect-button-form {
      border-radius: 2px;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto,
         "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
         "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
   }

   .input-form__input:focus {
      background-color: #15202b;
   }

   .input-form__input::placeholder {
      letter-spacing: 1px;
      font-family: monospace;
   }

   .button-form:hover,
   .redirect-button-form:hover {
      background-color: #15202b;
   }

   .button-form:focus,
   .redirect-button-form:focus {
      background-color: #273742;
   }

   .color-invalid {
      color: orangered;
   }

   .border-invalid {
      border-color: orangered;
   }

   a::disabled,
   button:disabled {
      pointer-events: none;
   }

   @media screen and (min-width: 600px) {
      .container {
         width: 67%;
      }
   }

   @media screen and (min-width: 760px) {
      .container {
         width: 52%;
      }

      .input-form__label,
      .input-form__input,
      .button-form,
      .redirect-button-form {
         font-size: 0.9rem;
      }
   }

   @media screen and (min-width: 910px) {
      .container {
         width: 41%;
      }
   }

   @media screen and (min-width: 1080px) {
      .container {
         width: 37%;
      }
   }

   @media screen and (min-width: 1200px) {
      .input-form__label,
      .input-form__input,
      .button-form,
      .redirect-button-form {
         font-size: calc(0.8rem + 1px);
      }
   }

   @media screen and (min-width: 1240px) {
      .container {
         width: 33%;
      }
   }

   @media screen and (min-width: 1390px) {
      .container {
         width: 28%;
      }
   }

   @media screen and (min-width: 1601px) {
      .container {
         width: 25%;
      }
   }

   @media screen and (min-width: 1751px) {
      .container {
         width: 23%;
      }
   }

   @media screen and (min-width: 1860px) {
      .container {
         width: 20%;
      }
   }
</style>

<svelte:head>
   <title>Join</title>
</svelte:head>

<div class="container" in:scale|local>
   {#if isError === true && username.value === ''}
      <Alert message="username already in use" />
   {/if}

   <form
      spellcheck="false"
      autocomplete="off"
      on:submit|preventDefault={handleJoin}>
      <div class="input-form">
         <label
            for="username"
            class="input-form__label"
            class:color-invalid={username.isValid === false && username.isTyping === true}>Username</label>

         <input
            required
            type="text"
            id="username"
            placeholder="username"
            class="input-form__input"
            disabled={isJoin === true}
            bind:value={username.value}
            class:border-invalid={username.isValid === false && username.isTyping === true} />
      </div>

      <div class="input-form">
         <label
            for="password"
            class="input-form__label"
            class:color-invalid={password.isValid === false && password.isTyping === true}>Password</label>

         <input
            required
            id="password"
            type="password"
            placeholder="password"
            class="input-form__input"
            disabled={isJoin === true}
            bind:value={password.value}
            class:border-invalid={password.isValid === false && password.isTyping === true} />
      </div>

      {#if password.isValid === true}
         <div
            class="input-form"
            in:slide|local={{ duration: 210 }}
            out:slide|local={{ duration: 210 }}>
            <label
               for="confirm-password"
               class="input-form__label"
               class:color-invalid={confirmPassword.isSame === false}>Password
               Confirm</label>

            <input
               required
               type="password"
               id="confirm-password"
               class="input-form__input"
               disabled={isJoin === true}
               placeholder="password confirm"
               bind:value={confirmPassword.value}
               class:border-invalid={confirmPassword.isSame === false} />
         </div>
      {/if}

      <button
         type="submit"
         class="button-form"
         disabled={allInvalid === true || isJoin === true}>{isJoin === true ? 'Loading....' : 'Join'}</button>

      <a
         href="/login"
         class="redirect-button-form"
         disabled={isJoin === true}>Login</a>
   </form>
</div>
