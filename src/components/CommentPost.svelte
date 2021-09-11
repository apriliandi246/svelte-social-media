<script context="module">
  export async function preload(_, session) {
    return {
      userId: session._userId,
    };
  }
</script>

<script>
  import Time from "$utils/date";
  import { scale } from "svelte/transition";

  export let userId;
  export let comment;
  export let commentId;

  function handleLike() {
    const currentLikes = [...comment.likes];

    if (currentLikes.includes(userId)) {
      const index = currentLikes.indexOf(commentId);
      currentLikes.splice(index, 1);
    } else {
      currentLikes.push(userId);
    }

    fire
      .collection("comments")
      .doc(commentId)
      .update({
        likes: [...currentLikes],
      });
  }
</script>

<div class="card cf" in:scale={{ duration: 400 }}>
  <div class="card__like">
    <div class="card__like_icon" on:click={handleLike}>
      {#if comment.likes.includes(userId)}
        <svg
          width="26px"
          height="26px"
          fill="#f01a1a"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      {:else}
        <svg
          width="26px"
          height="26px"
          fill="#ffffff"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
          />
        </svg>
      {/if}
    </div>

    <span class="card__like_total">
      {Intl.NumberFormat().format(comment.likes.length)}
    </span>
  </div>

  <div class="card__head">
    <img
      width="47px"
      height="47px"
      loading="lazy"
      alt={comment.username}
      class="card__profile-photo"
      src="https://www.gravatar.com/avatar/{comment.username
        .length}?s=47&d=robohash"
    />

    <a href="/{comment.username}" class="card__username">{comment.username}</a>
  </div>

  <div class="card__description">{comment.words}</div>
  <div class="card__footer">{new Time(comment.date).fromNow("normal")}</div>
</div>

<style>
  .card {
    width: 100%;
    padding: 3px;
    margin-top: -20px;
    border-left: none;
    border-right: none;
    border-radius: 4px;
    background: linear-gradient(
      360deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(48, 30, 60, 1) 0%
    );
  }
  .card__head {
    padding: 13px;
    margin: 3px 0 4px 0;
  }

  .card__like {
    float: right;
    display: flex;
    padding: 5px;
    align-items: center;
  }

  .card__like_icon {
    padding: 5px;
    color: #ffffff;
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: bold;
    margin-right: 5px;
    transition: transform 0.1s, color 0.1s;
  }

  .card__like_total {
    color: #ffffff;
    font-size: 1rem;
    margin-top: -5px;
    margin-right: 5px;
    letter-spacing: 1.4px;
    font-family: monospace;
  }

  .card__profile-photo {
    float: left;
    color: #ffffff;
    font-size: 0.8rem;
    border-radius: 100%;
    border: 3px solid #858992;
  }

  .card__username {
    float: left;
    color: #ffffff;
    font-size: 1rem;
    text-align: center;
    letter-spacing: 1.5px;
    text-decoration: none;
    margin: 17px 0 0 18px;
    transition: color 0.1s;
  }

  .card__description {
    padding: 9px;
    color: #ffffff;
    font-size: 1rem;
    margin-top: 55px;
    line-height: 25px;
    word-break: break-all;
    letter-spacing: 0.5px;
    white-space: pre-line;
    box-sizing: border-box;
  }

  .card__footer {
    float: right;
    padding: 11px;
    color: #f5f5f5;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    font-family: monospace;
  }

  .card__like_icon:hover {
    color: #77ae3f;
    transform: scale(1.2);
  }

  .card__username:hover {
    color: #858992;
    text-decoration: underline;
  }

  @media screen and (max-width: 599px) {
    .card {
      border-radius: 0;
      margin-top: 24px;
    }
  }

  @media screen and (min-width: 600px) {
    .card {
      margin-bottom: 54px;
    }
    .card__description {
      padding: 17px;
    }
  }

  @media screen and (min-width: 760px) {
    .card__username {
      font-size: 1rem;
    }
    .card__description {
      font-size: 0.9rem;
    }
    .card__footer {
      font-size: 0.9rem;
    }
    .card__like_total {
      font-size: calc(0.9rem - 2px);
    }
  }

  @media screen and (min-width: 1050px) {
    .card__username {
      margin: 15px 0 0 18px;
    }
  }

  @media screen and (min-width: 1200px) {
    .card__username {
      font-size: 0.9rem;
    }
    .card__description {
      font-size: calc(0.9rem - 1px + 0.5px);
    }
    .card__footer {
      font-size: 0.8rem;
    }
  }
</style>
