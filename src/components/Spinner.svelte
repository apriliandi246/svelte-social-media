<style>
   .spinner::before {
      top: 50%;
      left: 50%;
      width: 55px;
      content: "";
      height: 55px;
      position: absolute;
      border-radius: 100%;
      box-sizing: border-box;
      margin: -10px 0 0 -30px;
      border: 6px solid #ffffff;
      border-top-color: transparent;
      animation: spinner 0.8s linear infinite;
   }

   @keyframes spinner {
      to {
         transform: rotate(360deg);
      }
   }
</style>

<div class="spinner" />
