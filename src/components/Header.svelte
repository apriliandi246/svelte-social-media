<script>
   export let segment;
</script>

<style>
   header {
      display: flex;
      padding-bottom: 20px;
      flex-direction: column;
      background-color: #062a35;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-left: 5px solid #858992;
      border-right: 5px solid #858992;
      border-bottom: 5px solid #858992;
   }

   div {
      display: flex;
      margin-top: 15px;
      margin-bottom: 32px;
      justify-content: center;
   }

   img {
      border-radius: 100%;
      box-shadow: inset 0px 0px 150px rgba(255, 255, 255, 0.4);
   }

   ul {
      display: flex;
      justify-content: space-around;
   }

   a {
      color: #ffffff;
      font-size: 1rem;
      font-weight: bold;
      letter-spacing: 1px;
      text-decoration: none;
      transition: color 0.1s;
   }

   a:hover,
   .current__menu {
      color: #7f8488;
      padding-bottom: 19px;
      border-bottom: 5px solid #38444d;
   }

   @media screen and (max-width: 599px) {
      header {
         border: none;
         border-radius: 0;
      }
   }

   @media screen and (min-width: 600px) {
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
   <div>
      <img
         src="https://www.gravatar.com/avatar/2012201304?s=150&d=robohash"
         alt="1605042201304"
         loading="lazy" />
   </div>

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
