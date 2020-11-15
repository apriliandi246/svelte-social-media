<script>
   export let post;
</script>

<style>
   .card {
      width: 100%;
      padding: 8px;
      margin-top: 40px;
      border-left: none;
      border-right: none;
      border-radius: 4px;
      box-sizing: border-box;
      background-color: #052530;
      border: 3px solid #858992;
      box-shadow: 11px 11px 1px #5a5553;
   }

   .card__head {
      padding: 15px;
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
      margin-right: 2px;
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
   }

   .card__username {
      float: left;
      color: #ffffff;
      font-size: 1rem;
      text-align: center;
      letter-spacing: 1px;
      padding-bottom: 6px;
      text-decoration: none;
      margin: 25px 0 0 18px;
      border-bottom: 2px solid #858992;
      transition: padding-bottom 0.1s, color 0.1s;
   }

   .card__description {
      padding: 17px;
      color: #ffffff;
      font-size: 1rem;
      margin-top: 55px;
      line-height: 25px;
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
      color: #858992;
      font-size: 0.9rem;
      letter-spacing: 1px;
      font-family: monospace;
   }

   .card__username:hover {
      color: #858992;
      padding-bottom: 11px;
   }

   .card__like-icon:hover {
      transform: scale(1.3);
   }

   @media screen and (max-width: 599px) {
      .card {
         border-right: none;
         border-left: none;
         box-shadow: none;
         border-radius: 0;
      }
   }

   @media screen and (min-width: 600px) {
      .card {
         margin-bottom: 54px;
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

<div class="card cf">
   <div class="card__like">
      <span class="card__like-icon">💚</span>
      <span
         class="card__like-total">{Intl.NumberFormat().format(post.likes)}</span>
   </div>

   <div class="card__head">
      <img
         src="https://www.gravatar.com/avatar/1605042202344?s=60&d=robohash"
         class="card__profile-photo"
         alt={post.username}
         loading="lazy" />

      <a href="/user/{post.username}" class="card__username">{post.username}</a>
   </div>

   <div class="card__description">{post.words}</div>

   <div class="card__footer">2 days ago</div>
</div>
