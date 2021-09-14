<script context="module">
  export async function preload(_, session) {
    const { _userId, _username } = session;

    if (_userId && _username) this.redirect(302, "/home");
  }
</script>

<script>
  import cookieCutter from "cookie-cutter";
  import Alert from "$components/Alert.svelte";

  let isError;
  let isLogin = false;

  let { username, password, isValid } = {
    username: "",
    password: "",
    isValid: false,
  };

  $: {
    if (!username.trim()) {
      isValid = false;
    } else {
      isValid = true;
      isError = false;
    }

    if (!password.trim()) {
      isValid = false;
    } else {
      isValid = true;
      isError = false;
    }
  }

  function signIn() {
    isLogin = true;

    fire
      .collection("users")
      .where("username", "==", username)
      .where("password", "==", password)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          username = "";
          password = "";
          isError = true;
          isValid = false;
          isLogin = false;
        } else {
          snapshot.docs.forEach((doc) => {
            cookieCutter.set("_userId", doc.id);
            cookieCutter.set("_username", doc.data().username);
          });

          window.location.href = "/";
        }
      });
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="container">
  {#if isError}
    <Alert message="Username or password not found" />
  {/if}

  <form spellcheck="false" autocomplete="off" on:submit|preventDefault={signIn}>
    <div class="input_form">
      <label for="email" class="input_form__label">Username</label>

      <input
        id="email"
        type="text"
        disabled={isLogin}
        bind:value={username}
        placeholder="username"
        class="input_form__input"
      />
    </div>

    <div class="input_form">
      <label for="password" class="input_form__label">Password</label>

      <input
        id="password"
        type="password"
        disabled={isLogin}
        bind:value={password}
        placeholder="password"
        class="input_form__input"
      />
    </div>

    <button
      type="submit"
      class="button_form"
      on:click={signIn}
      disabled={!isValid || isLogin}
    >
      {isLogin ? "Loading...." : "Login"}
    </button>

    <a href="/join" disabled={isLogin} class="redirect_button">
      You haven't joined yet?? Join
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

  .input_form {
    margin-top: 32px;
  }

  .input_form__label {
    color: #fff;
    font-size: 1rem;
    letter-spacing: 1px;
  }

  .input_form__input {
    width: 100%;
    outline: none;
    padding: 11px;
    display: block;
    color: #fff;
    font-size: 1rem;
    margin-top: 15px;
    letter-spacing: 1.2px;
    box-sizing: border-box;
    background-color: #192734;
    border: 1px solid #273742;
    transition: background-color 0.2s;
  }

  .button_form {
    width: 100%;
    color: #fff;
    padding: 10px;
    outline: none;
    cursor: pointer;
    font-size: 1rem;
    letter-spacing: 1px;
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

  .button_form,
  .redirect_button,
  .input_form__input {
    border-radius: 2px;
  }

  a:disabled,
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
