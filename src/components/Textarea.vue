<template>
  <textarea
    :type="type"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    class="oh-really-text-textarea" />
</template>

<script>
export default {
  name: "Textarea",
  props: {
    value: String
  }
}
</script>

<style lang="scss">
.oh-really-text-textarea {
  width: 100%;
  padding: $px12;

  border: $px2 solid $grey-7;
  border-radius: $px4;
  outline: none;
  appearance: none;

  font-family: "Muli", sans-serif;

  &::placeholder {
    font-family: "Muli", sans-serif;
    color: $grey-7;
  }

  &--error {
    border-color: $red-5;
  }
}
</style>
