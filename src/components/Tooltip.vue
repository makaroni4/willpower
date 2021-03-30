<template>
  <div class="oh-really-tooltip">
    {{ copy }}
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    copy: String
  }
}
</script>

<style lang="scss">
.oh-really-tooltip {
  display: none;
  width: 120px;
  top: -$px4;
  left: 105%;
  position: absolute;
  z-index: 1;

  background-color: $grey-3;
  color: $white;
  text-align: center;
  padding: $px4 0;

  border-radius: $px4;

  font-size: $px12;
  line-height: 1;

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
}
</style>
