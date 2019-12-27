<template>
  <div
    @click="toggleSelected"
    class="selectable-item"
    :class="{ disabled: !canSelect && !item.selected }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "SelectableItem",
  props: {
    canSelect: {
      type: Boolean,
      default: true
    },
    item: Object
  },
  methods: {
    toggleSelected() {
      if (this.canSelect || this.item.selected) {
        this.$store.dispatch("listeningData/toggleItem", this.item);
      }
    }
  }
};
</script>

<style lang="scss">
.selectable-item {
  position: relative;
  margin-left: 5px;
  margin-right: 5px;

  &.disabled {
    opacity: 0.5;
  }
}
</style>
