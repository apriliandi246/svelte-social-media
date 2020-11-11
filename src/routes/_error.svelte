<script>
   export let status;
   export let error;
</script>

<style>
   h1 {
      color: #ffffff;
      margin-top: 130px;
      text-align: center;
      letter-spacing: 4px;
      font-family: monospace;
   }

   h2 {
      color: #ffffff;
      margin-top: 14px;
      text-align: center;
      letter-spacing: 2px;
   }

   @media (min-width: 480px) {
      h1 {
         font-size: 3em;
      }

      h1 {
         font-size: 2em;
      }
   }
</style>

<svelte:head>
   <title>Page Not Found</title>
</svelte:head>

<h1>{status}</h1>
<h2>{error.message}</h2>
