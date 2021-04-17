<script>
   export let segment;
</script>

<header>
   <img src="/images/my-logo.jpg" alt="the-logo" loading="lazy" />

   <ul>
      <li><a href="/" class:current_menu={segment === "home"}>Home</a></li>
      <li>
         <a href="/profile" class:current_menu={segment === "profile"}
            >Your profile</a
         >
      </li>
      <li>
         <a href="/create" class:current_menu={segment === "create"}> Create</a>
      </li>
   </ul>
</header>

<style>
   header {
      display: flex;
      border-radius: 2px;
      padding-bottom: 20px;
      flex-direction: column;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      box-shadow: 14px 14px 1px 1px #5a5553;
      background: linear-gradient(
         4deg,
         rgba(2, 0, 36, 1) 0%,
         rgba(48, 31, 61, 1) 1%
      );
   }

   img {
      width: 150px;
      height: 150px;
      display: block;
      margin: 35px auto;
      border-radius: 100%;
   }

   ul {
      display: flex;
      justify-content: space-around;
   }

   li,
   a {
      color: #858992;
      font-size: 1rem;
      cursor: pointer;
      font-weight: bold;
      letter-spacing: 1px;
      text-decoration: none;
      transition: color 0.1s;
   }

   .current_menu {
      color: #ffffff;
   }

   a:hover {
      color: #ffffff;
   }

   @media screen and (max-width: 599px) {
      header {
         box-shadow: none;
         border-radius: 0;
         border-left: none;
         border-right: none;
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
