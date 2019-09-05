<template>
  <div>
    <button @click="logout">logout</button>
    <button @click="refresh">refresh</button>
    dashboard
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserDashboard",
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    refresh() {
      axios
        .get("https://us-central1-play-gen.cloudfunctions.net/api/top")
        .then(
          res =>
            console.log(res) ||
            localStorage.setItem("tracks", JSON.stringify(res.data))
        );
    }
  }
};
</script>
