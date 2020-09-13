<template>
  <div
    class="artist pill"
    :class="{
      selected: selected
    }"
    @click="$emit('selected', item)"
  >
    <img :src="item.images[2].url" alt="" />
    <div class="artist-name" :href="item.external_urls.spotify" target="_blank">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Artist",
  props: {
    item: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: false
    }
    // canSelect: {
    //   type: Boolean,
    //   required: true
    // }
  }
};
</script>

<style lang="scss">
.artist {
  img {
    border-radius: 50%;
  }
}
</style>
