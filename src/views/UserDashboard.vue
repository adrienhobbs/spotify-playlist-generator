<template>
  <div>
    Welcome {{ $store.state.auth.user.displayName }} <br />
    <button @click="logout">logout</button>
    <button @click="test">test</button>
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
import { mapGetters } from "vuex";
export default {
  name: "UserDashboard",
  mounted() {},
  computed: {
    ...mapGetters({
      longTermArtists: "listeningData/longTermArtists",
      longTermTracks: "listeningData/longTermTracks"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    test() {
      this.$store.dispatch("listeningData/getRecentlyPlayed");
    }
  }
};
</script>
