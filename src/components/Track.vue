<template>
  <div class="track">
    <img :src="track.album.images[0].url" alt="" />
    <div class="name">
      {{ track.artists[0].name }}
    </div>
    <div class="name">
      {{ track.name }}
      <!-- {{ track.id }} -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Track",
  props: {
    track: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
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
</style>
