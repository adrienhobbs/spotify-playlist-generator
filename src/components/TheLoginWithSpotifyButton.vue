<template>
  <button @click="handleLogin">Login</button>
</template>

<script>
export default {
  name: "TheLoginWithSpotifyButton",
  methods: {
    handleLogin() {
      window.location.href =
        "https://play-gen.firebaseapp.com/redirect?callback=http://localhost:8080/callback";
    }
  }
};
</script>
