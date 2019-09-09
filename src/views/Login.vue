<template>
  <div class="home">
    <LoginButton />
  </div>
</template>

<script>
import LoginButton from "@/components/TheLoginWithSpotifyButton.vue";
import api from "@/api";

export default {
  name: "home",
  components: {
    LoginButton
  },
  mounted() {
    const { code, state } = this.$route.query;
    if (code && state) {
      api
        .getToken(state, code)
        .then(token => {
          this.$store.dispatch("auth/login", token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
