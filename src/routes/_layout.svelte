<script>
   import Header from "../components/Header.svelte";
   export let segment;
</script>

<style>
   .container {
      width: 100%;
      height: 100vh;
      margin: 0px auto 0 auto;
   }

   @media screen and (min-width: 600px) {
      .container {
         border: 1px solid #38444d;
         border-bottom: none;
         border-top: none;
         width: 90%;
      }
   }

   @media screen and (min-width: 700px) {
      .container {
         width: 85%;
      }
   }

   @media screen and (min-width: 850px) {
      .container {
         width: 80%;
      }
   }

   @media screen and (min-width: 950px) {
      .container {
         width: 75%;
      }
   }

   @media screen and (min-width: 1050px) {
      .container {
         width: 60%;
      }
   }

   @media screen and (min-width: 1160px) {
      .container {
         width: 58%;
      }
   }

   @media screen and (min-width: 1300px) {
      .container {
         width: 54%;
      }
   }

   @media screen and (min-width: 1360px) {
      .container {
         width: 50%;
      }
   }

   @media screen and (min-width: 1470px) {
      .container {
         width: 46%;
      }
   }

   @media screen and (min-width: 1556px) {
      .container {
         width: 42%;
      }
   }

   @media screen and (min-width: 1740px) {
      .container {
         width: 38%;
      }
   }

   @media screen and (min-width: 1865px) {
      .container {
         width: 35.4%;
      }
   }
</style>

<div class="container">
   <Header {segment} />
   <slot />
</div>
