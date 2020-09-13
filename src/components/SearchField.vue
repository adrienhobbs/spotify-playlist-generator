<template>
  <div class="object-selector-container">
    <div class="select-field">
      <div class="selected-item">
        <span v-if="!item.id">Select An Artist</span>
        <Artist selected v-else :item="item" />
      </div>
      <div v-if="!item.id" class="select-button" @click="open = !open">+</div>
      <div v-if="item.id" class="select-button remove" @click="handleRemove">
        x
      </div>
    </div>
    <div class="dropdown" v-if="open">
      <div class="dropdown-item" v-for="artist in artists" :key="artist.id">
        <Artist
          :selected="artist.id == item.id"
          @selected="handleSelect"
          :item="artist"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Artist from "./Artist";
export default {
  name: "SearchField",
  components: { Artist },
  props: {
    artists: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object
    }
  },
  data() {
    return {
      open: false,
      selected: false
    };
  },
  methods: {
    handleRemove() {
      this.$store.dispatch("listeningData/toggleItem", this.item);
    },
    handleSelect(artist) {
      this.$store.dispatch("listeningData/toggleItem", artist);
      this.selected = artist;
      this.open = false;
      this.$emit("selected");
    }
  }
};
</script>

<style lang="scss">
.object-selector-container {
  display: inline-flex;
  flex-direction: column;
  position: relative;
}
.select-field {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  display: inline-flex;
  max-height: 400px;
  flex-direction: column;
  overflow-y: scroll;

  &-item {
    margin-bottom: 5px;
  }
}

.select-field {
  margin-right: 10px;

  .selected-item {
    flex: 1;
  }
  .select-button {
    line-height: 1;
    margin-left: 5px;
    border: 1px solid white;
    padding: 2px;
    width: 1em;
    height: 1em;
    display: flex;
    justify-content: center;
    align-items: start;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    &.remove {
      position: absolute;
      top: -10px;
      right: 0;
      width: 1em;
      height: 1em;
    }
  }
}
</style>
