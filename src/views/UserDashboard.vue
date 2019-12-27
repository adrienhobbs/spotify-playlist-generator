<template>
  <div class="container">
    <div class="header">
      <button @click="test">test</button>
      <button @click="logout">logout</button>
    </div>
    <div class="toggle">
      <div class="toggle-inner">
        <div
          class="choice"
          @click="selected = 'artists'"
          :class="{ selected: selected === 'artists' }"
        >
          Artists
        </div>
        <div
          class="choice"
          @click="selected = 'tracks'"
          :class="{ selected: selected === 'tracks' }"
        >
          Tracks
        </div>
      </div>
    </div>
    <div v-if="selected === 'artists'" class="artists">
      <div class="vertical-wrapper">
        <SelectableArtist
          v-for="artist in allArtists"
          :artist="artist"
          :key="artist.id"
        />
      </div>
    </div>
    <div v-else-if="selected === 'tracks'" class="tracks">
      <div class="vertical-wrapper">
        <SelectableTrack
          v-for="track in allTracks"
          :track="track"
          :key="track.playedAt"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import uniqBy from "lodash.uniqby";
import SelectableTrack from "../components/SelectableTrack";
import SelectableArtist from "../components/SelectableArtist";

export default {
  name: "UserDashboard",
  components: {
    SelectableArtist,
    SelectableTrack
  },
  data() {
    return {
      selected: "artists",
      allTracks: [],
      allArtists: []
    };
  },
  computed: {
    ...mapGetters({
      artists: "listeningData/artists",
      tracks: "listeningData/tracks"
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

    this.allTracks = allTracks.sort((trackA, trackB) => {
      return trackA.popularity < trackB.popularity;
    });

    this.allArtists = allArtists.sort((artistA, artistB) => {
      return artistA.popularity < artistB.popularity;
    });
  },
  methods: {
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

.container {
  max-width: 940px;
  margin: auto;
  margin-bottom: 60px;
  @media (max-width: 940px) {
    padding-left: 30px;
    padding-right: 30px;
  }
}

.vertical-wrapper {
  background: $black;
  border-radius: 15px;
  border: 1px solid #323232;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex-direction: row;
}

.artist,
.track {
  position: relative;
  cursor: pointer;
  margin-bottom: 15px;
  display: flex;
  position: relative;
  background-color: #121212;
  padding: 10px 15px 10px 15px;
  border-radius: 8px;
  align-items: center;
  border: 1px solid #070707;
  transition: all 0.15s ease-out;

  &.selected {
    background-color: $green;
  }

  &:hover {
    transform: scale(1.2);
    border: 1px solid $white;
    z-index: 10;
  }

  a {
    text-decoration: none;
    color: #f2e5d5;
    display: flex;

    &:hover {
      color: $white;
      text-decoration: underline;
    }
  }

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    object-fit: cover;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  }

  .name {
    text-align: center;
  }
}

.horizontal-wrapper {
  display: flex;
  list-style: none;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}

.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.toggle-inner {
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: $black;
  border-radius: 30px;
  border: 1px solid #323232;
  padding: 10px;

  .choice {
    cursor: pointer;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 15px;
  }

  .choice:first-of-type {
    margin-right: 10px;
  }

  .choice.selected {
    background-color: $green;
  }
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
