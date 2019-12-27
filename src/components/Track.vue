<template>
  <div class="track" :class="{ selected: track.selected }">
    <a :href="track.album.external_urls.spotify" target="_blank">
      <img :src="track.album.images[2].url" alt="" />
    </a>
    <div class="track-info">
      <a class="track-name" :href="track.external_urls.spotify" target="_blank">
        {{ track.name }}
      </a>
      <a
        class="artist-name"
        :href="track.artists[0].external_urls.spotify"
        target="_blank"
      >
        {{ track.artists[0].name }}
      </a>
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
  display: flex;
  justify-content: space-between;

  &-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .track-name {
    margin-bottom: 5px;
    color: white;
    font-size: 16px;
  }

  .artist-name {
    font-size: 14px;
  }
}
</style>
