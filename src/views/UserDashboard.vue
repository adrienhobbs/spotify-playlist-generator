<template>
  <div class="container">
    Welcome {{ $store.state.auth.user.displayName }} <br />
    <button @click="logout">logout</button>
    <button @click="test">test</button>
    dashboard
    <h1>short term artists</h1>
    <div class="horizontal-wrapper">
      <div
        class="artist"
        v-for="artist in $store.state.listeningData.artists.short_term"
        :key="artist.id"
      >
        <img :src="artist.images[0].url" alt="" />
        <div class="name">
          {{ artist.name }}
        </div>
      </div>
    </div>
    <h1>medium term artists</h1>
    <div class="horizontal-wrapper">
      <div
        class="artist"
        v-for="artist in $store.state.listeningData.artists.medium_term"
        :key="artist.id"
      >
        <img :src="artist.images[0].url" alt="" />
        <div class="name">
          {{ artist.name }}
        </div>
      </div>
    </div>
    <h1>long term artists</h1>
    <div class="horizontal-wrapper">
      <div
        class="artist"
        v-for="artist in $store.state.listeningData.artists.long_term"
        :key="artist.id"
      >
        <img :src="artist.images[0].url" alt="" />
        <div class="name">
          {{ artist.name }}
        </div>
      </div>
    </div>
    <h1>Recently Played</h1>
    <div class="horizontal-wrapper">
      <div
        class="track"
        v-for="track in $store.state.listeningData.recentlyPlayed"
        :key="track.playedAt"
      >
        <img :src="track.album.images[0].url" alt="" />
        <div class="name">
          {{ track.artists[0].name }}
        </div>
        <div class="name">
          {{ track.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserDashboard",
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

<style lang="scss">
.container {
  max-width: 940px;
  margin: auto;
}

.horizontal-wrapper {
  display: flex;
  list-style: none;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  .artist,
  .track {
    margin-right: 15px;
    margin-bottom: 15px;
    display: flex;
    position: relative;
    flex-direction: column;
    scroll-snap-align: start;
    background-color: #2b2b2b;
    padding: 20px 20px 16px;
    border-radius: 8px;

    &:last-of-type {
      margin-right: 30px;
    }

    img {
      width: 161px;
      height: 161px;
      object-fit: cover;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3),
        0 1px 2px 0 rgba(0, 0, 0, 0.2);
    }

    .name {
      color: #b3b3b3;
      text-align: center;
      padding-top: 10px;
      // padding: 10px 5px 10px 5px;
    }
  }

  .track {
    .name:first-of-type {
      font-size: 22px;
      padding-bottom: 0;
    }
    img {
      height: 320px;
      width: 320px;
    }
  }
}
</style>
