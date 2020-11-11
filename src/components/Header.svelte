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

   span {
      font-weight: bold;
      margin-right: 1px;
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
         loading="lazy"
         alt="1605042201304" />
   </div>

   <ul>
      <li>
         <a
            href="/"
            class:current__menu={segment === 'home'}><span>&#8725;</span>
            home</a>
      </li>
      <li>
         <a
            href="/profile"
            class:current__menu={segment === 'profile'}><span>&#8725;</span>
            profile</a>
      </li>
      <li>
         <a
            href="/create"
            class:current__menu={segment === 'create'}><span>&#8725;</span>
            create</a>
      </li>
      <li><a href="/logout"><span>&#8725;</span> logout</a></li>
   </ul>
</header>
