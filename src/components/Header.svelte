<script>
  export let segment;
</script>

<div class="head">
  <img
    width="150px"
    height="150px"
    alt="the-logo"
    class="head__img"
    src="/my-logo.jpg"
  />

  <ul class="head__lists">
    <li class="head__list">
      <a href="/" class="head__link" class:current_menu={segment === "home"}>
        Home
      </a>
    </li>

    <li class="head__list">
      <a
        href="/profile"
        class="head__link"
        class:current_menu={segment === "profile"}
      >
        Your profile
      </a>
    </li>

    <li class="head__list">
      <a
        href="/create"
        class="head__link"
        class:current_menu={segment === "create"}
      >
        Create
      </a>
    </li>
  </ul>
</div>

<style>
  .head {
    display: flex;
    margin-bottom: 60px;
    padding-bottom: 20px;
    flex-direction: column;
    border: 3px solid #5a5553;
    border-top: none;
    border-end-end-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 12px 12px 1px 1px #5a5553;
    background: linear-gradient(
      4deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(48, 31, 61, 1) 1%
    );
  }

  .head__img {
    display: block;
    margin: 35px auto;
    border-radius: 100%;
  }

  .head__lists {
    display: flex;
    justify-content: space-around;
  }

  .head__link {
    color: #858992;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 1px;
    text-decoration: none;
    transition: color 0.1s;
  }

  .current_menu,
  .head__link:hover {
    color: #fff;
  }

  @media screen and (min-width: 600px) {
    .head__link {
      font-size: calc(1rem + 1px);
    }
  }

  @media screen and (min-width: 800px) {
    .head__link {
      font-size: calc(1rem - 1px);
    }
  }
</style>
