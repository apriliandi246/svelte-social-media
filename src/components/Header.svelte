<script>
   export let segment;
</script>

<style>
   header {
      display: flex;
      flex-direction: column;
      padding: 0 20px 20px 20px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: 5px solid #858992;
      border-right: 5px solid #858992;
      border-bottom: 5px solid #858992;
      background: rgb(2, 0, 36);
      background: linear-gradient(
         219deg,
         rgba(2, 0, 36, 1) 0%,
         rgba(48, 31, 61, 1) 1%
      );
   }

   div {
      display: flex;
      margin-top: 15px;
      margin-bottom: 32px;
      justify-content: center;
   }

   img {
      width: 150px;
      height: 150px;
      margin-top: 13px;
      border-radius: 4px;
   }

   ul {
      display: flex;
      justify-content: space-between;
   }

   a {
      color: #ffffff;
      font-size: 1rem;
      font-weight: bold;
      letter-spacing: 1px;
      text-decoration: none;
      transition: color 0.1s;
   }

   .current__menu {
      padding-bottom: 19px;
      border-bottom: 5px solid #38444d;
   }

   @media screen and (max-width: 599px) {
      header {
         border-right: none;
         border-left: none;
         border-radius: 0;
      }
   }

   @media screen and (min-width: 600px) {
      header {
         padding-left: 27px;
         padding-right: 27px;
      }

      a {
         font-size: calc(1rem + 1px);
      }
   }

   @media screen and (min-width: 800px) {
      a:hover,
      .current__menu {
         padding-bottom: 20px;
      }

      a {
         font-size: calc(1rem - 1px);
      }
   }

   @media screen and (min-width: 1200px) {
      a:hover,
      .current__menu {
         padding-bottom: 19px;
      }
   }
</style>

<header>
   <div><img src="/images/my-logo.jpg" alt="the-logo" loading="lazy" /></div>

   <ul>
      <li><a href="/" class:current__menu={segment === 'home'}>Home</a></li>
      <li>
         <a href="/profile" class:current__menu={segment === 'profile'}>Your
            profile</a>
      </li>
      <li>
         <a href="/create" class:current__menu={segment === 'create'}>
            Create</a>
      </li>
      <li><a href="/logout">Logout</a></li>
   </ul>
</header>
