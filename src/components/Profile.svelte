<script>
   export let user;
</script>

<style>
   .user__profile {
      padding: 25px;
      color: #ffffff;
      margin-top: 40px;
      border-radius: 4px;
      background-color: #052530;
      border: 2px solid #858992;
      box-shadow: inset 0px 0px 3px rgba(255, 255, 255, 1);
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

   @media screen and (max-width: 599px) {
      .user__profile {
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

<div class="user__profile">
   <p class="user__name">{user.username}</p>
   <p class="user__bio">{user.bio}</p>
   <p class="user__joined">Joined {user.joined}</p>
</div>
