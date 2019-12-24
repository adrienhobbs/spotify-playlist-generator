<template>
  <SelectableItem :canSelect="$store.getters['seed/canSelect']" :item="artist">
    <Artist :artist="artist" />
  </SelectableItem>
</template>

<script>
import SelectableItem from "../components/SelectableItem";
import Artist from "../components/Artist";

export default {
  name: "SelectableArtist",
  components: {
    SelectableItem,
    Artist
  },
  props: {
    artist: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
