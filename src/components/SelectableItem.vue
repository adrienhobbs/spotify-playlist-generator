<template>
  <div class="selectable-item">
    <input
      @input="toggleSelected"
      type="checkbox"
      class="checkbox"
      :disabled="!canSelect && !item.selected"
      v-model="item.selected"
    />
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
    selected: Boolean
  },
  methods: {
    toggleSelected() {
      this.$store.dispatch("listeningData/toggleItem", this.item);
    }
  }
};
</script>

<style></style>
