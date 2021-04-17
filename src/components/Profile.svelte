<script>
   import { Time } from "../utils/date.js";
   import { scale } from "svelte/transition";

   export let userData;
</script>

<div class="user__profile" in:scale={{ duration: 300 }}>
   <div class="user-profile-picture">
      <img
         width="100px"
         height="100px"
         loading="lazy"
         alt={userData.username}
         src="https://www.gravatar.com/avatar/{userData.username
            .length}?s=100&d=robohash"
      />
   </div>

   <p class="user__name">{userData.username}</p>

   <p class="user__joined">
      Joined
      {new Time(userData.joined).format("medium")}
   </p>
</div>

<style>
   .user__profile {
      padding: 25px;
      color: #ffffff;
      margin-top: 40px;
      text-align: center;
      border-radius: 2px;
      box-shadow: 14px 14px 1px 1px #5a5553;
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

   .user-profile-picture {
      font-size: 0.9rem;
      border-radius: 4px;
      margin-top: -17px;
      margin-bottom: 28px;
   }

   .user-profile-picture img {
      color: #ffffff;
      border-radius: 100%;
      border: 3px solid #858992;
   }

   @media screen and (max-width: 599px) {
      .user__profile,
      .user-profile-picture {
         box-shadow: none;
         border-radius: 0;
         border-left: none;
         border-right: none;
      }

      .user__profile {
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
