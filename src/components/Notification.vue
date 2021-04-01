<template>
  <div class="oh-really-notification">
    <div class="oh-really-notification__copy">
      {{ copy }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    copy: String,
  },
};
</script>

<style lang="scss">
.oh-really-notification {
  position: fixed;
  z-index: 100000001;
  top: $px24;
  right: $px24;
  padding: $px16;
  max-width: $px320;

  border-radius: $px4;

  background-color: $green-6;

  font-family: "Muli", sans-serif;
  color: $white;

  &__copy {
  }
}
</style>
