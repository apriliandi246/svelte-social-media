<script context="module">
  export async function preload(_, session) {
    const { _userId, _username } = session;

    if (_userId && _username) this.redirect(302, "/home");
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import Alert from "$components/Alert.svelte";
  import { slide, scale } from "svelte/transition";

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
    if (!username.regexPattern.test(username.value) && username.value) {
      username.isValid = false;
      username.isTyping = true;
    } else if (username.value) {
      username.isValid = true;
    } else if (username.value && username.isTyping) {
      username.isValid = false;
    }

    // password
    if (!password.regexPattern.test(password.value) && password.value) {
      password.isValid = false;
      password.isTyping = true;
      confirmPassword.value = "";
    } else if (password.value) {
      password.isValid = true;
    } else if (password.value && password.isTyping) {
      password.isValid = false;
    }

    // confirm-password
    if (confirmPassword.value === password.value) {
      confirmPassword.isSame = true;
    } else {
      confirmPassword.isSame = false;
    }

    if (username.isValid && password.isValid && confirmPassword.isSame) {
      allInvalid = false;
    } else {
      allInvalid = true;
    }
  }

  function signUp() {
    isJoin = true;
    isError = false;

    fire
      .collection("users")
      .where("username", "==", username.value)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          fire
            .collection("users")
            .add({
              joined: `${new Date()}`,
              username: username.value,
              password: password.value,
            })
            .then(async () => await goto("/login"));
        } else {
          isJoin = false;
          isError = true;
          password.value = "";
          username.value = "";
          password.isValid = false;
          password.isTyping = false;
          confirmPassword.value = "";
          confirmPassword.isSame = false;
        }
      });
  }
</script>

<svelte:head>
  <title>Join</title>
</svelte:head>

<div class="container">
  {#if isError && !username.value}
    <Alert message="username already in use" />
  {/if}

  <form
    spellcheck="false"
    autocomplete="off"
    in:scale={{ duration: 400 }}
    on:submit|preventDefault={signUp}
  >
    <div class="input-form">
      <label
        for="username"
        class="input_form__label"
        class:color-invalid={!username.isValid && username.isTyping}
      >
        Username
      </label>

      <input
        required
        type="text"
        id="username"
        disabled={isJoin}
        placeholder="username"
        class="input_form__input"
        bind:value={username.value}
        class:border-invalid={!username.isValid && username.isTyping}
      />
    </div>

    <div class="input-form">
      <label
        for="password"
        class="input_form__label"
        class:color-invalid={!password.isValid && password.isTyping}
      >
        Password
      </label>

      <input
        required
        id="password"
        type="password"
        disabled={isJoin}
        placeholder="password"
        class="input_form__input"
        bind:value={password.value}
        class:border-invalid={!password.isValid && password.isTyping}
      />
    </div>

    {#if password.isValid}
      <div
        class="input-form"
        in:slide|local={{ duration: 210 }}
        out:slide|local={{ duration: 210 }}
      >
        <label
          for="confirm-password"
          class="input_form__label"
          class:color-invalid={!confirmPassword.isSame}
        >
          Password Confirm
        </label>

        <input
          required
          type="password"
          disabled={isJoin}
          id="confirm-password"
          class="input_form__input"
          placeholder="password confirm"
          bind:value={confirmPassword.value}
          class:border-invalid={!confirmPassword.isSame}
        />
      </div>
    {/if}

    <button type="submit" class="button_form" disabled={allInvalid || isJoin}>
      {isJoin ? "Loading...." : "Join"}
    </button>

    <a href="/login" disabled={isJoin} class="redirect_button">
      you have already joined?? Login
    </a>
  </form>
</div>

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

  .input_form__label {
    color: #fff;
    font-size: 1rem;
    letter-spacing: 1px;
    transition: color 0.2s;
  }

  .input_form__input {
    width: 100%;
    outline: none;
    padding: 11px;
    display: block;
    color: #fff;
    font-size: 1rem;
    margin-top: 15px;
    letter-spacing: 1px;
    box-sizing: border-box;
    background-color: #192734;
    border: 1px solid #273742;
    transition: background-color 0.2s, border-color 0.2s;
  }

  .button_form {
    width: 100%;
    color: #fff;
    padding: 10px;
    outline: none;
    cursor: pointer;
    font-size: 1rem;
    letter-spacing: 1.2px;
    margin: 45px 0 10px 0;
    box-sizing: border-box;
    background-color: #192734;
    border: 1px solid #273742;
    transition: color 0.2s, background-color 0.2s;
  }

  .redirect_button {
    width: 100%;
    color: #fff;
    padding: 11px;
    outline: none;
    display: block;
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

  .button_form,
  .redirect_button,
  .input_form__input {
    border-radius: 2px;
  }

  .input_form__input:focus {
    background-color: #15202b;
  }

  .input_form__input::placeholder {
    letter-spacing: 1px;
    font-family: monospace;
  }

  .button_form:hover,
  .redirect_button:hover {
    background-color: #15202b;
  }

  .button_form:focus,
  .redirect_button:focus {
    background-color: #273742;
  }

  .color-invalid {
    color: #ff4500;
  }

  .border-invalid {
    border-color: #ff4500;
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

    .button_form,
    .redirect_button,
    .input_form__label,
    .input_form__input {
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
    .button_form,
    .redirect_button,
    .input_form__label,
    .input_form__input {
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
