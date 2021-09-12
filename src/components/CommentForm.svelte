<script context="module">
  export async function preload(_, session) {
    return {
      username: session._username,
    };
  }
</script>

<script>
  import Alert from "./Alert.svelte";
  import { scale } from "svelte/transition";

  export let postId;
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

  function submitComment() {
    isCreate = true;

    fire
      .collection("comments")
      .add({
        username,
        likes: [],
        post: postId,
        words: value,
        date: `${new Date()}`,
        whenCommented: `${Date.now()}`,
      })
      .then(() => {
        value = "";
        isValid = false;
        isCreate = false;
      });
  }
</script>

{#if isLimit}
  <Alert message="Words must be less than 280 characters" />
{/if}

<form
  spellcheck="false"
  in:scale={{ duration: 400 }}
  on:submit|preventDefault={submitComment}
>
  <textarea
    rows="10"
    required
    bind:value
    disabled={isCreate}
    placeholder="your comment...."
  />

  <button type="submit" disabled={!isValid || isLimit}>
    {isCreate ? "Loading...." : "Comment"}
  </button>
</form>

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
    color: #fff;
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
