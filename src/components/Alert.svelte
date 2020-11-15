<script>
   import { scale } from "svelte/transition";

   export let message;
</script>

<style>
   .alert {
      width: 100%;
      display: flex;
      padding: 13px;
      color: #ffffff;
      font-weight: bolder;
      align-items: center;
      box-sizing: border-box;
      margin: 40px auto 0 auto;
      background-color: #ff4500;
      justify-content: space-between;
   }

   .alert__message {
      font-size: 1rem;
      letter-spacing: 0.7px;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto,
         "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
         "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
   }

   @media screen and (max-width: 599px) {
      .alert {
         width: 93%;
      }
   }

   @media screen and (min-width: 760px) {
      .alert__message {
         font-size: 0.9rem;
      }
   }

   @media screen and (min-width: 1200px) {
      .alert__message {
         font-size: calc(0.9rem - 1px);
      }
   }
</style>

<div
   class="alert"
   in:scale|local={{ duration: 350 }}
   out:scale|local={{ duration: 350 }}>
   <p class="alert__message">{message}</p>
</div>
