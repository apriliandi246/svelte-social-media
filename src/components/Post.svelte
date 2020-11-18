<script>
   import { user } from "../store/user.js";
   import { Time } from "../utils/date.js";
   import { scale } from "svelte/transition";
   import Comment from "./CommentPost.svelte";
   import CommentForm from "./CommentFormPost.svelte";

   export let post;
   export let postId;

   let comments;
   let showAllComments = false;

   function showComments() {
      showAllComments = !showAllComments;

      if (showAllComments === true) {
         db.collection("comments")
            .where("post", "==", postId)
            .onSnapshot((snapshot) => {
               let changes = snapshot.docs;

               if (changes.length >= 1) {
                  comments = changes;
               } else {
                  comments = [];
               }
            });
      }
   }

   function handleLike() {
      const currentLikes = [...post.likes];

      if (currentLikes.includes($user.userId) === true) {
         const index = currentLikes.indexOf(postId);
         currentLikes.splice(index, 1);
      } else {
         currentLikes.push($user.userId);
      }

      db.collection("posts")
         .doc(postId)
         .update({
            likes: [...currentLikes],
         })
         .then()
         .catch((ex) => {
            console.log(ex.message);
         });
   }
</script>

<style>
   .card {
      width: 100%;
      padding: 4px;
      margin-top: 40px;
      border-left: none;
      border-right: none;
      border-radius: 4px;
      box-sizing: border-box;
      box-shadow: 13px 13px 1px #5a5553;
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

   .card__like-icon {
      padding: 5px;
      color: #ffffff;
      cursor: pointer;
      font-size: 1.3rem;
      font-weight: bold;
      margin-right: 5px;
      transition: transform 0.1s;
   }

   .card__like-total {
      font-size: 1rem;
      color: #ffffff;
      margin-right: 5px;
      letter-spacing: 1.4px;
      font-family: monospace;
   }

   .card__profile-photo {
      float: left;
      color: #ffffff;
      font-size: 0.8rem;
      border-radius: 100%;
      border: 2px solid #ffffff;
   }

   .card__username {
      float: left;
      color: #ffffff;
      font-size: 1rem;
      text-align: center;
      letter-spacing: 1.5px;
      text-decoration: none;
      margin: 17px 0 0 18px;
   }

   .card__description {
      padding: 9px;
      color: #ffffff;
      font-size: 1rem;
      margin-top: 48px;
      line-height: 25px;
      word-wrap: break-word;
      letter-spacing: 0.5px;
      white-space: pre-line;
      box-sizing: border-box;
   }

   .card__username,
   .card__description {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto,
         "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
         "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
   }

   .card__footer {
      padding: 14px;
      display: flex;
      color: #858992;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
      font-family: monospace;
      justify-content: space-between;
   }

   .card__comments:hover {
      cursor: pointer;
      text-decoration: underline;
   }

   .card__like-icon:hover {
      transform: scale(1.4);
   }

   .message {
      color: #ffffff;
      margin-top: 30px;
      font-size: 1.1rem;
      text-align: center;
      margin-bottom: 30px;
      font-family: monospace;
   }

   hr {
      border: 3px solid #5a5553;
   }

   @media screen and (max-width: 599px) {
      .card {
         box-shadow: none;
         border-radius: 0;
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

      .card__like-total {
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

<!-- the post -->
<div class="card cf" in:scale>
   <div class="card__like">
      <span class="card__like-icon" on:click={handleLike}>
         {post.likes.includes($user.userId) === true ? '💚' : '♡'}
      </span>
      <span
         class="card__like-total">{Intl.NumberFormat().format(post.likes.length)}</span>
   </div>

   <div class="card__head">
      <img
         src="https://www.gravatar.com/avatar/{post.username.length}?s=47&d=robohash"
         class="card__profile-photo"
         alt={post.username}
         loading="lazy" />

      <p class="card__username">{post.username}</p>
   </div>

   <div class="card__description">{post.words}</div>

   <div class="card__footer">
      <p class="card__comments" on:click={showComments}>
         {showAllComments === true ? 'hide comments' : 'show comments'}
      </p>
      <p class="card__date">{new Time(post.date).fromNow()}</p>
   </div>
</div>

<!-- comments and form -->
{#if showAllComments === true}
   {#if comments !== undefined}
      <h1 class="message">
         {Intl.NumberFormat().format(comments.length)}
         comments
      </h1>
   {:else}
      <h1 class="message">Loading....</h1>
   {/if}

   {#if comments !== undefined}
      <CommentForm {postId} />

      {#if comments.length !== 0}
         {#each comments as comment}
            <Comment comment={comment.data()} commentId={comment.id} />
         {/each}
      {/if}
   {/if}

   <hr />
{/if}