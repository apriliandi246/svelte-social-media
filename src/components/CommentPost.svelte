<script>
   import { user } from "../store/user.js";
   import { Time } from "../utils/date.js";
   import { scale } from "svelte/transition";

   export let comment;
   export let commentId;

   function handleLike() {
      const currentLikes = [...comment.likes];

      if (currentLikes.includes($user.userId) === true) {
         const index = currentLikes.indexOf(commentId);
         currentLikes.splice(index, 1);
      } else {
         currentLikes.push($user.userId);
      }

      db.collection("comments")
         .doc(commentId)
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
      padding: 3px;
      margin-top: -20px;
      border-left: none;
      border-right: none;
      border-radius: 4px;
      background: #212e3b;
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
      transition: transform 0.2s, color 0.2s;
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
      margin-top: 55px;
      line-height: 25px;
      word-break: break-all;
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
      float: right;
      padding: 11px;
      color: #f5f5f5;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
      font-family: monospace;
   }

   .card__like-icon:hover {
      color: #77ae3f;
      transform: scale(1.3);
   }

   .card__username:hover {
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

<div class="card cf" in:scale>
   <div class="card__like">
      <span class="card__like-icon" on:click={handleLike}>
         {comment.likes.includes($user.userId) === true ? '💚' : '♡'}
      </span>
      <span
         class="card__like-total">{Intl.NumberFormat().format(comment.likes.length)}
      </span>
   </div>

   <div class="card__head">
      <img
         loading="lazy"
         class="card__profile-photo"
         alt={comment.username.length}
         src="https://www.gravatar.com/avatar/0?s=47&d=robohash" />

      <a
         href="/{comment.username}"
         class="card__username">{comment.username}</a>
   </div>

   <div class="card__description">{comment.words}</div>
   <div class="card__footer">{new Time(comment.date).fromNow()}</div>
</div>
