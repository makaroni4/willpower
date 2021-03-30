<template>
  <div class="popup-app oh-really-design-system">
    <div class="popup-app__popup">
      <h1>Oh Really?!</h1>

      <a target="_blank" href="/options.html">Options</a>

      <h3>Stats</h3>
      <div>Shown count: {{ shownCount }}</div>
      <div>Nasty websites: {{ proceedCount }}</div>
      <div>You: {{ fuckItCount }}</div>
    </div>
  </div>
</template>

<script>
import { readData, writeData } from "./assets/modules/chrome";

export default {
  name: 'PopupApp',
  components: {
  },
  data() {
    return {
      proceedCount: Number,
      fuckItCount: Number,
      shownCount: Number
    }
  },
  mounted() {
    readData(["proceedCount", "fuckItCount", "shownCount"], data => {
      this.proceedCount = data.proceedCount || 0;
      this.fuckItCount = data.fuckItCount || 0;
      this.shownCount = data.shownCount || 0;
    });
  }
};
</script>

<style>
.popup-app {
}
</style>
