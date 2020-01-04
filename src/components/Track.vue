<template>
  <div
    class="track pill"
    :data-type="item.type"
    :class="{
      selected: item.selected,
      disabled: !canSelect && !item.selected
    }"
    @click="$emit('changed')"
  >
    <div :href="item.album.external_urls.spotify" target="_blank">
      <img :src="item.album.images[2].url" alt="" />
    </div>
    <div class="track-info">
      <div
        class="track-name"
        :href="item.external_urls.spotify"
        target="_blank"
      >
        {{ item.name }}
      </div>
      <div
        class="artist-name"
        :href="item.artists[0].external_urls.spotify"
        target="_blank"
      >
        {{ item.artists[0].name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Track",
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
