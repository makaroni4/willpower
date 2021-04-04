<template>
  <div
    :class="cssClass">
    {{ copy }}
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    copy: String,
    modifiers: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    cssClass() {
      const basicClass = 'oh-really-tooltip';
      const modifiers = this.modifiers.map((m) => `${basicClass}--${m}`).join(' ');

      return `${basicClass} ${modifiers}`;
    },
  },
};
</script>

<style lang="scss">
.oh-really-tooltip {
  display: none;
  max-width: $px240;
  top: 50%;
  transform: translateX(100%) translateY(-50%);
  right: -$px12;
  position: absolute;
  z-index: 1;

  background-color: $grey-3;
  color: $white;
  text-align: center;
  padding: $px4;

  border-radius: $px4;

  font-size: $px12;
  line-height: 1.15;

  &:after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent $grey-3 transparent transparent;
  }

  &--nowrap {
    white-space: nowrap;
  }

  &--long {
    padding: 8px;

    line-height: 1.3;
    text-align: left;
  }
}
</style>
