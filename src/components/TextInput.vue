<template>
  <input
    :type="type"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    class="oh-really-text-input">
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: String,
    type: {
      type: String,
      default: "text"
    }
  }
}
</script>

<style lang="scss">
.oh-really-text-input {
  width: 100%;
  padding: $px12;

  border: $px2 solid $grey-7;
  border-radius: $px4;
  outline: none;

  font-family: "Muli", sans-serif;

  appearance: none;

  &::placeholder {
    font-family: "Muli", sans-serif;
    color: $grey-7;
  }

  &--error {
    border-color: $red-5;
  }
}
</style>
