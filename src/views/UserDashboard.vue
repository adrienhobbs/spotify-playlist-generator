<template>
  <div>
    <button @click="logout">logout</button>
    dashboard
  </div>
</template>

<script>
export default {
  name: "UserDashboard",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
