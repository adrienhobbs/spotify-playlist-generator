<template>
  <div
    class="artist pill"
    :class="{
      selected: item.selected,
      disabled: !canSelect && !item.selected
    }"
    @click="$emit('changed')"
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
    canSelect: {
      type: Boolean,
      required: true
    }
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
