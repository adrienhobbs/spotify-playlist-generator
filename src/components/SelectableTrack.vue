<template>
  <SelectableItem :canSelect="$store.getters['seed/canSelect']" :item="track">
    <Track :track="track" />
  </SelectableItem>
</template>

<script>
import SelectableItem from "../components/SelectableItem";
import Track from "../components/Track";

export default {
  name: "SelectableTrack",
  components: {
    SelectableItem,
    Track
  },
  props: {
    track: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
