<template>
  <div class="container">
    <div class="header">
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
    <div v-show="selected === 'artists'" class="artists">
      <div class="time-range" v-for="(range, key) in artists" :key="key">
        <h1>{{ key }}</h1>
        <div class="horizontal-wrapper">
          <SelectableItem
            @selected="$store.dispatch('seed/addSeedItem', artist)"
            @deselected="$store.dispatch('seed/removeSeedItem', artist)"
            :canSelect="canSelect"
            class="artist"
            v-for="artist in range"
            :key="artist.id"
          >
            <img :src="artist.images[0].url" alt="" />
            <div class="name">
              {{ artist.name }}
              <!-- {{ artist.id }} -->
            </div>
          </SelectableItem>
        </div>
      </div>
    </div>
    <div v-show="selected === 'tracks'" class="tracks">
      <div class="time-range" v-for="(range, key) in tracks" :key="key">
        <h1>{{ key }}</h1>
        <div class="horizontal-wrapper">
          <SelectableItem
            @selected="$store.dispatch('seed/addSeedItem', track)"
            @deselected="$store.dispatch('seed/removeSeedItem', track)"
            :canSelect="canSelect"
            class="track"
            v-for="track in range"
            :key="track.playedAt"
          >
            <img :src="track.album.images[0].url" alt="" />
            <div class="name">
              {{ track.artists[0].name }}
            </div>
            <div class="name">
              {{ track.name }}
              <!-- {{ track.id }} -->
            </div>
          </SelectableItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SelectableItem from "../components/SelectableItem";
export default {
  name: "UserDashboard",
  components: {
    SelectableItem
  },
  data() {
    return {
      selected: "artists"
    };
  },
  computed: {
    ...mapGetters({
      artists: "listeningData/artists",
      tracks: "listeningData/tracks",
      canSelect: "seed/canSelect"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    test() {
      this.$store.dispatch("listeningData/getRecentlyPlayed");
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
.container {
  max-width: 940px;
  margin: auto;
  @media (max-width: 940px) {
    padding-left: 30px;
    padding-right: 30px;
  }
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
    align-items: center;
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
    }
  }

  .track {
    .name:first-of-type {
      font-size: 22px;
      padding-bottom: 0;
    }
    img {
      height: 161px;
      width: 161px;
    }
  }

  .artist {
    img {
      border-radius: 50%;
    }
  }
}

.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2b2b;
  border-radius: 30px;
  border: 1px solid black;
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
    background: green;
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
