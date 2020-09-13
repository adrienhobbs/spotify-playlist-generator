<template>
  <div class="container">
    <div class="header">
      <button @click="test">test</button>
      <button @click="logout">logout</button>
    </div>
    <h2>
      Add Music Like:
    </h2>
    <div class="fields">
      <SearchField
        v-for="(item, n) in selectedItems"
        :key="n"
        :item="item"
        :artists="artists"
      />
    </div>
    <!-- <SearchField @selected="handleSelected" :artists="artists" /> -->
    <!-- <SelectedItems
      @changed="item => toggleItemSelected(item)"
      :items="selectedItems"
    />
    <div class="content-container">
      <select v-model="selectedGenre" name="" id="">
        <option v-for="(genre, i) in topGenres" :value="genre.name" :key="i">{{
          genre.name
        }}</option>
      </select>
      <div class="vertical-wrapper">
        <div v-for="item in selectedArtists" :key="item.id">
          <component
            @changed="toggleItemSelected(item)"
            :is="item.type + '-pill'"
            :item="item"
            :canSelect="canSelect"
          />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import uniqBy from "lodash.uniqby";
import Track from "../components/Track";
import Artist from "../components/Artist";
import SelectedItems from "../components/SelectedItems";
import SearchField from "@/components/SearchField";
import API from "../testapi";

export default {
  name: "UserDashboard",
  components: {
    // "artist-pill": Artist,
    // "track-pill": Track,
    // SelectedItems
    SearchField
  },
  data() {
    return {
      allTracks: [],
      allArtists: [],
      topGenres: false,
      selectedGenre: ""
    };
  },
  computed: {
    ...mapGetters({
      artists: "listeningData/artists",
      tracks: "listeningData/tracks",
      genres: "listeningData/genres",
      selectedItems: "seed/selectedItems",
      canSelect: "seed/canSelect"
    }),
    selectedArtists() {
      if (this.selectedGenre) {
        return this.allArtists.filter((artist) =>
          artist.genres.includes(this.selectedGenre)
        );
      } else {
        return this.allTracks;
      }
    }
  },
  mounted() {
    console.log(API);
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
        (artist) => artist.id === id
      );
    }
  }
};
</script>

<style lang="scss">
$green: #2f7353;
$white: #dadada;
$black: #1d1d1d;

.fields {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
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
