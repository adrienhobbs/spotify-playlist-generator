<template>
  <div class="home">
    <LoginButton />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginButton from "@/components/TheLoginWithSpotifyButton.vue";

export default {
  name: "home",
  components: {
    LoginButton
  },
  methods: {
    test(res) {
      console.log(res, this);
    }
  },
  mounted() {
    const { code, state } = this.$route.query;
    if (code && state) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      window.testMe = this.test;
      script.src = `https://play-gen.firebaseapp.com/token?code=${encodeURIComponent(
        code
      )}&state=${encodeURIComponent(state)}&callback=testMe`;
      document.head.appendChild(script);
    }
  }
};
</script>
