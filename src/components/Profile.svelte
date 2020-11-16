<script>
   import { scale } from "svelte/transition";
   export let user;
</script>

<style>
   .user__profile {
      padding: 25px;
      color: #ffffff;
      margin-top: 40px;
      border-radius: 4px;
      border: 2px solid #858992;
      box-shadow: 12px 12px 1px #5a5553;
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

   .user__bio {
      font-size: 1rem;
      margin-top: 25px;
      line-height: 22px;
      margin-bottom: 25px;
      letter-spacing: 0.6px;
   }

   .user__joined {
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
   }

   @media screen and (max-width: 599px) {
      .user__profile,
      .user-profile-picture {
         border-right: none;
         border-left: none;
         box-shadow: none;
         border-radius: 0;
      }
   }

   @media screen and (min-width: 760px) {
      .user__name {
         font-size: 1.1rem;
      }

      .user__bio {
         font-size: calc(0.9rem - 1px);
      }

      .user__joined {
         font-size: 0.8rem;
      }
   }
</style>

<div class="user__profile" in:scale>
   <div class="user-profile-picture">
      <img
         src="https://www.gravatar.com/avatar/{user.username.length}?s=120&d=robohash"
         loading="lazy"
         alt={user.username} />
   </div>

   <p class="user__name">{user.username}</p>
   <p class="user__bio">{user.bio}</p>
   <p class="user__joined">Joined {user.joined}</p>
</div>
