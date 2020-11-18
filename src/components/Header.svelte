<script>
   export let segment;
</script>

<style>
   header {
      display: flex;
      padding-bottom: 20px;
      flex-direction: column;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      box-shadow: 13px 13px 1px #5a5553;
      background: linear-gradient(
         4deg,
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
      justify-content: space-around;
   }

   li,
   a {
      color: #ffffff;
      font-size: 1rem;
      cursor: pointer;
      font-weight: bold;
      letter-spacing: 1px;
      text-decoration: none;
      transition: color 0.1s;
   }

   .current__menu {
      color: #858992;
   }

   a:hover {
      color: #858992;
   }

   @media screen and (max-width: 599px) {
      header {
         border-right: none;
         border-left: none;
         box-shadow: none;
         border-radius: 0;
      }
   }

   @media screen and (min-width: 600px) {
      a {
         font-size: calc(1rem + 1px);
      }
   }

   @media screen and (min-width: 800px) {
      a {
         font-size: calc(1rem - 1px);
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
   </ul>
</header>
