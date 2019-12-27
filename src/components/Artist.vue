<template>
  <div class="artist" :class="{ selected: artist.selected }">
    <img :src="artist.images[2].url" alt="" />
    <a class="artist-name" :href="artist.external_urls.spotify" target="_blank">
      {{ artist.name }}
    </a>
    <!-- {{ artist.popularity }} -->
    <!-- {{ artist.id }} -->
  </div>
</template>

<script>
export default {
  name: "Artist",
  props: {
    artist: {
      type: Object,
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
