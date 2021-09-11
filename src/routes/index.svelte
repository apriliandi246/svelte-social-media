<script context="module">
  export function preload(_, session) {
    const { _userId, _username } = session;

    if (!_userId && !_username) this.redirect(302, "/login");

    this.redirect(301, "/home");
  }
</script>
