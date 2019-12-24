<template>
  <div class="selectable-item">
    <input
      @input="toggleSelected"
      type="checkbox"
      class="checkbox"
      :disabled="!canSelect && !selected"
      v-model="selected"
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
    }
  },
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    toggleSelected() {
      const emitType = this.selected ? "deselected" : "selected";
      this.selected =
        this.canSelect || (this.selected && !this.canSelect)
          ? ""
          : this.selected;

      this.$emit(emitType);
    }
  }
};
</script>

<style></style>
