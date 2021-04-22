<script>
   import Time from "../util/date.js";
   import { scale } from "svelte/transition";

   export let userData;
</script>

<div class="user" in:scale={{ duration: 300 }}>
   <img
      width="100px"
      height="100px"
      loading="lazy"
      alt={userData.username}
      class="user__profile_picture"
      src="https://www.gravatar.com/avatar/{userData.username
         .length}?s=100&d=robohash"
   />

   <p class="user__name">{userData.username}</p>

   <p class="user__joined">
      Joined {new Time(userData.joined).format("hard", "short")}
   </p>
</div>

<style>
   .user {
      display: flex;
      color: #ffffff;
      margin-top: 40px;
      padding-top: 50px;
      text-align: center;
      border-radius: 4px;
      margin-bottom: 70px;
      align-items: center;
      padding-bottom: 40px;
      flex-direction: column;
      justify-content: center;
      border: 3px solid #5a5553;
      box-shadow: 12px 12px 1px 1px #5a5553;
      background: linear-gradient(
         360deg,
         rgba(2, 0, 36, 1) 0%,
         rgba(48, 30, 60, 1) 0%
      );
   }

   .user__name {
      font-weight: bold;
      font-size: 1.2rem;
      letter-spacing: 0.4px;
   }

   .user__joined {
      font-size: 1rem;
      margin-top: 15px;
      letter-spacing: 1.2px;
   }

   .user__profile_picture {
      display: block;
      color: #ffffff;
      font-size: 0.9rem;
      margin-top: -17px;
      border-radius: 4px;
      margin-bottom: 28px;
      border-radius: 100%;
      border: 3px solid #858992;
   }

   @media screen and (max-width: 599px) {
      .user {
         padding-left: 14.8px;
         padding-right: 14.8px;
      }
   }

   @media screen and (min-width: 760px) {
      .user__name {
         font-size: 1.1rem;
      }

      .user__joined {
         font-size: calc(0.9rem - 1px);
      }
   }
</style>
