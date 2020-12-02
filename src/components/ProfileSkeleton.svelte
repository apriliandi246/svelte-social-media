<style>
   .card {
      width: 100%;
      padding: 23px;
      margin-top: 40px;
      border-radius: 2px;
      box-sizing: border-box;
      background: linear-gradient(
         360deg,
         rgba(2, 0, 36, 1) 0%,
         rgba(48, 30, 60, 1) 0%
      );
   }

   .card__large-block {
      width: 100%;
      height: 200px;
      border-radius: 4px;
      animation: loading 1s ease-in-out infinite;
   }

   @keyframes loading {
      0% {
         transform: scale(1);
         background-color: rgba(165, 165, 165, 0.1);
      }

      50% {
         transform: scale(1.01);
         background-color: rgba(165, 165, 165, 0.3);
      }

      100% {
         transform: scale(1);
         background-color: rgba(165, 165, 165, 0.1);
      }
   }
</style>

<div class="card">
   <div class="card__large-block" />
</div>
