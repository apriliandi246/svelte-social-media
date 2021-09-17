<script context="module">
  import { sessionUserId, sessionUsername } from "$store";

  export async function preload(_, session) {
    const { _userId, _username } = session;

    if (_userId && _username) {
      sessionUserId.set(_userId);
      sessionUsername.set(_username);
    }
  }
</script>

<script>
  import Logo from "$components/Logo.svelte";
  import Header from "$components/Header.svelte";

  export let segment;

  $: isAuthPage = segment === "join" || segment === "login";
</script>

{#if isAuthPage}
  <Logo />
  <slot />
{:else}
  <div class="container">
    <Header {segment} />
    <slot />
  </div>
{/if}

<style>
  .container {
    width: 90%;
    margin: 0 auto 80px auto;
  }

  @media screen and (min-width: 600px) {
    .container {
      width: 90%;
      border-top: none;
      border-bottom: none;
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
