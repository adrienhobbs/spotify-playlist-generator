<template>
  <div class="artist">
    <img :src="artist.images[0].url" alt="" />
    <div class="name">
      {{ artist.name }}
      {{ artist.selected }}
    </div>
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
