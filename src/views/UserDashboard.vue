<template>
  <div>
    <button @click="logout">logout</button>
    dashboard
    <h1>short term artists</h1>
    <ul>
      <li
        v-for="artist in $store.state.listeningData.artists.short_term"
        :key="artist.id"
      >
        {{ artist.name }}
      </li>
    </ul>
    <h1>medium term artists</h1>
    <ul>
      <li
        v-for="artist in $store.state.listeningData.artists.medium_term"
        :key="artist.id"
      >
        {{ artist.name }}
      </li>
    </ul>
    <h1>long term artists</h1>
    <ul>
      <li
        v-for="artist in $store.state.listeningData.artists.long_term"
        :key="artist.id"
      >
        {{ artist.name }}
      </li>
    </ul>
    <h1>Recently Played</h1>
    <ul>
      <li
        v-for="recent in $store.state.listeningData.recentlyPlayed"
        :key="recent.playedAt"
      >
        {{ recent.name }} <br />
        {{ recent.artists[0].name }} <br />
        {{ new Date(recent.playedAt) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserDashboard",
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>
