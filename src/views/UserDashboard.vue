<template>
  <div class="container">
    <div class="header">
      <button @click="test">test</button>
      <button @click="logout">logout</button>
    </div>
    <SelectedItems
      @changed="item => toggleItemSelected(item)"
      :items="selectedItems"
    />
    <div class="content-container">
      <div class="vertical-wrapper">
        <div v-for="item in [...allTracks, ...allArtists]" :key="item.id">
          <component
            @changed="toggleItemSelected(item)"
            :is="item.type + '-pill'"
            :item="item"
            :canSelect="canSelect"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import uniqBy from "lodash.uniqby";
import Track from "../components/Track";
import Artist from "../components/Artist";
import SelectedItems from "../components/SelectedItems";

export default {
  name: "UserDashboard",
  components: {
    "artist-pill": Artist,
    "track-pill": Track,
    SelectedItems
  },
  data() {
    return {
      allTracks: [],
      allArtists: []
    };
  },
  computed: {
    ...mapGetters({
      artists: "listeningData/artists",
      tracks: "listeningData/tracks",
      selectedItems: "seed/selectedItems",
      canSelect: "seed/canSelect"
    })
  },
  mounted() {
    // lets move this into the store
    const allTracks = uniqBy(
      [
        ...this.tracks.recent,
        ...this.tracks.short_term,
        ...this.tracks.medium_term,
        ...this.tracks.long_term
      ],
      "id"
    );

    const allArtists = uniqBy(
      [
        ...this.artists.short_term,
        ...this.artists.medium_term,
        ...this.artists.long_term
      ],
      "id"
    );

    let genreCounts = {};

    allArtists.forEach(artist => {
      artist.genres.forEach(genre => {
        genreCounts[genre] = genreCounts[genre] ? genreCounts[genre] + 1 : 1;
      });
    });

    const counts = Object.values(genreCounts);
    const names = Object.keys(genreCounts);
    const topGenres = counts
      .map((count, i) => ({ count, name: names[i] }))
      .sort((a, b) => a.count < b.count)
      .splice(0, 25);
    console.log(topGenres);

    // this.allTracks = allTracks.sort((trackA, trackB) => {
    //   return trackA.popularity < trackB.popularity;
    // });

    this.allTracks = allTracks;

    this.allArtists = allArtists.sort((artistA, artistB) => {
      return artistA.name.charAt(0) > artistB.name.charAt(0);
    });
  },
  methods: {
    toggleItemSelected(item) {
      if (this.canSelect || item.selected) {
        this.$store.dispatch("listeningData/toggleItem", item);
      }
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
    test() {
      this.$store.dispatch("seed/getRecommendations");
    },
    isSelected(id) {
      return this.$store.state.listeningData.artists.find(
        artist => artist.id === id
      );
    }
  }
};
</script>

<style lang="scss">
$green: #2f7353;
$white: #dadada;
$black: #1d1d1d;

.header {
  margin-bottom: 30px;
  padding-top: 30px;
  display: flex;
  justify-content: flex-end;

  button {
    padding: 5px;
    border-radius: 5px;
  }
}
</style>
