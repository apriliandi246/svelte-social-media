<script context="module">
  export async function preload(_, session) {
    const { _userId, _username } = session;

    if (!_userId && !_username) this.redirect(302, "/login");

    return {
      username: session._username,
    };
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import { scale } from "svelte/transition";
  import Alert from "$components/Alert.svelte";

  export let username;

  let isCreate = false;

  let { value, isLimit, isValid } = {
    value: "",
    isLimit: false,
    isValid: false,
  };

  $: if (!value.trim()) {
    isValid = false;
    isLimit = false;
  } else if (value.trim() && value.trim().length >= 280) {
    isLimit = true;
    isValid = false;
  } else {
    isValid = true;
    isLimit = false;
  }

  function createPost() {
    isCreate = true;

    fire
      .collection("posts")
      .add({
        username,
        likes: [],
        words: value,
        date: `${new Date()}`,
        whenPosted: `${Date.now()}`,
      })
      .then(async () => await goto("/home"));
  }
</script>

<svelte:head>
  <title>Post</title>
</svelte:head>

{#if isLimit}
  <Alert message="Words must be less than 280 characters" />
{/if}

<form
  spellcheck="false"
  in:scale={{ duration: 400 }}
  on:submit|preventDefault={createPost}
>
  <textarea
    required
    rows="18"
    bind:value
    disabled={isCreate}
    placeholder="What do you think ?"
  />

  <button type="submit" disabled={!isValid}>
    {isCreate ? "Loading...." : "Post"}
  </button>
</form>

<style>
  form {
    width: 100%;
    margin: 40px auto 0 auto;
  }

  textarea {
    width: 100%;
    resize: none;
    outline: none;
    padding: 18px;
    display: block;
    color: #fff;
    font-size: 1rem;
    line-height: 22px;
    letter-spacing: 1px;
    box-sizing: border-box;
    background-color: #192734;
    border: 2px solid #858992;
    transition: background-color 0.2s;
  }

  button {
    width: 100%;
    padding: 10px;
    outline: none;
    color: #fff;
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
    box-shadow: inset 0px 0px 2px #fff;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
      Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", "Noto Color Emoji";
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
