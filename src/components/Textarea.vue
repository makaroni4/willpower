<template>
  <textarea
    :type="type"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    class="oh-really-text-textarea" />
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    value: String,
  },
};
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
  line-height: 1.5 !important;
  transition: all .4s ease;

  &::placeholder {
    font-family: "Muli", sans-serif;
    color: $grey-7;
  }

  &:focus {
    box-shadow: 0 0 6px $grey-8;

    transform: scale(1.01);
  }

  &--error {
    border-color: $red-5;
  }
}
</style>
