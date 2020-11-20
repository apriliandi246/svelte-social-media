<script>
   import { goto } from "@sapper/app";
   import { scale } from "svelte/transition";
   import Alert from "../../components/Alert.svelte";

   let error;
   let isLogin = false;

   let { username, password, isValid } = {
      username: "",
      password: "",
      isValid: false,
   };

   $: {
      if (username.trim() === "") {
         isValid = false;
      } else {
         isValid = true;
      }

      if (password.trim() === "") {
         isValid = false;
      } else {
         isValid = true;
      }
   }

   function handleLogin() {
      isLogin = true;

      db.collection("users")
         .where("username", "==", username)
         .where("password", "==", password)
         .get()
         .then((snapshot) => {
            if (snapshot.empty === true) {
               error = "Username or password not found";
               username = "";
               password = "";
               isValid = false;
               isLogin = false;
            } else {
               snapshot.docs.forEach((doc) => {
                  localStorage.setItem(
                     "userData",
                     JSON.stringify({
                        userId: doc.id,
                        username: doc.data().username,
                     })
                  );

                  goto("/");
               });
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
   }

   .input-form__input {
      width: 100%;
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
      letter-spacing: 1px;
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

   .input-form__input,
   .button-form,
   .redirect-button-form {
      border-radius: 2px;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto,
         "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
         "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
   }

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
   <title>Login</title>
</svelte:head>

<div class="container" in:scale|local>
   {#if error !== undefined}
      <Alert message={error} />
   {/if}

   <form
      spellcheck="false"
      autocomplete="off"
      on:submit|preventDefault={handleLogin}>
      <div class="input-form">
         <label for="email" class="input-form__label">Username</label>

         <input
            type="text"
            id="email"
            placeholder="username"
            bind:value={username}
            disabled={isLogin === true}
            class="input-form__input" />
      </div>

      <div class="input-form">
         <label for="password" class="input-form__label">Password</label>

         <input
            id="password"
            type="password"
            placeholder="password"
            bind:value={password}
            disabled={isLogin === true}
            class="input-form__input" />
      </div>

      <button
         type="submit"
         class="button-form"
         on:click={handleLogin}
         disabled={isValid === false || isLogin === true}>{isLogin === true ? 'Loading...' : 'Login'}</button>

      <a
         href="/join"
         class="redirect-button-form"
         disabled={isLogin === true}>Join</a>
   </form>
</div>
