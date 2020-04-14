<template>
  <div class="selected-container">
    <div class="selected-items">
      <div v-if="!items.length">
        Select up to 5 artists or tracks to get started.
      </div>
      <div
        class="selected-item"
        :class="{ [`${item.type + '-selected'}`]: true }"
        v-for="item in items"
        :key="item.id"
      >
        <img
          @click="$emit('changed', item)"
          :src="item.images ? item.images[0].url : item.album.images[0].url"
          alt=""
        />
      </div>
      <div class="img-placeholder" v-for="n in 5 - items.length" :key="n"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedItems",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
$green: #2f7353;
$white: #dadada;
$black: #1d1d1d;

.selected-container {
  text-align: center;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 11;
  background: $black;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-radius: 15px;
  border-bottom: 1px solid #070707;
}

.selected-items {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-evenly;
  padding-left: 10px;
  padding-right: 10px;

  .selected-item,
  .img-placeholder {
    display: flex;
    cursor: pointer;
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
    max-width: 15%;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }

  img,
  .img-placeholder {
    display: flex;
    border-radius: 10%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
