<template>
  <button
    @click="$emit('click', $event);"
    :class="cssClass">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: String,
    modifiers: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    cssClass() {
      const basicClass = 'oh-really-button';
      const modifiers = this.modifiers.map((m) => `${basicClass}--${m}`).join(' ');

      return `${basicClass} ${modifiers}`;
    },
  },
};
</script>

<style lang="scss">
.oh-really-button {
  $root: &;

  display: inline-block;
  padding: 15px $px12;

  border-radius: $px4;
  outline: none;
  border: $px1 solid transparent;

  background-color: $blue-5;

  font-family: "Muli", sans-serif;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase !important;
  color: $white;
  font-size: 15px !important;
  line-height: 1.5 !important;
  font-weight: 400 !important;
  letter-spacing: $px1 !important;

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: $blue-6;
    opacity: 1;
  }

  &--fat {
    padding: $px24 $px24;

    font-size: $px16;
  }
}
</style>
