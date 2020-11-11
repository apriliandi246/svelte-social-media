<script>
   export let segment;
</script>

<style>
   header {
      display: flex;
      padding-bottom: 20px;
      flex-direction: column;
      background-color: #062a35;
      border-bottom: 5px solid #38444d;
   }

   div {
      display: flex;
      margin-top: 15px;
      margin-bottom: 32px;
      justify-content: center;
   }

   img {
      border-radius: 100%;
      border: 4px solid #38444d;
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
      color: #4c70e7;
      padding-bottom: 19px;
      border-bottom: 5px solid #4c70e7;
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
         src="https://www.gravatar.com/avatar/1605042201304?s=150&d=robohash"
         loading="lazy"
         alt="1605042201304" />
   </div>

   <ul>
      <li>
         <a
            href="/"
            class:current__menu={segment === undefined}><span>&#8725;</span>
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
            href="/post"
            class:current__menu={segment === 'post'}><span>&#8725;</span>
            post</a>
      </li>
      <li><a href="/logout"><span>&#8725;</span> logout</a></li>
   </ul>
</header>
