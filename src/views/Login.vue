<template>
  <div class="home">
    <LoginButton />
  </div>
</template>

<script>
import LoginButton from "@/components/TheLoginWithSpotifyButton.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    LoginButton
  },
  mounted() {
    const { code, state } = this.$route.query;
    if (code && state) {
      axios
        .get("https://play-gen.firebaseapp.com/token", {
          params: {
            state,
            code
          },
          withCredentials: true,
          credentials: true,
          mode: "no-cors"
        })
        .then(res => {
          this.$store.dispatch("login", res.data.token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
