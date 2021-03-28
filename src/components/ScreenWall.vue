<template>
  <div class="oh-really-popup">
    <h1>Oh Really?!</h1>

    <div>Nasty websites: {{ proceedCount }}</div>
    <div>You: {{ fuckItCount }}</div>

    <div
      v-if="timerInterval">
      {{ timeLeft }} seconds left. You still have a chance to win this! 💪
    </div>

    <div>
      <Button
        @click.prevent="handleFuckIt"
        :label="'F**k it'" />

      <Button
        @click.prevent="handleProceed"
        :label="'Yes, really'" />
    </div>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "ScreenWall",
  components: {
    Button
  },
  data() {
    return {
      timeLeft: 30,
      timerInterval: null
    }
  },
  props: {
    proceedCount: Number,
    fuckItCount: Number
  },
  methods: {
    handleProceed() {
      const countdown = () => {
        if (this.timeLeft == 0) {
          clearTimeout(this.timerInterval);

          chrome.storage.sync.set({
            "proceedCount": this.proceedCount + 1
          }, () => {
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
          });

        } else {
          this.timeLeft -= 1;
        }
      }

      this.timerInterval = setInterval(countdown, 1000);
    },
    handleFuckIt() {
      chrome.storage.sync.set({
        "fuckItCount": this.fuckItCount + 1
      }, () => {
        window.location = "https://makaroni4.com"
      });
    }
  }
};
</script>

<style lang="scss">
.oh-really-popup {
  position: fixed;
  top: 0;
  left: 0;
  padding: 8px;
  z-index: 100000000;
  width: 100%;
  height: 100%;

  border-radius: 0 0 8px 0;

  background-color: #FFB088;

  font-family: "Muli", sans-serif;

  &__icon {
    width: 32px;
    height: 32px;
    display: block;

    background-image: url("chrome-extension://__MSG_@@extension_id__/images/edit-regular.svg") !important;
    background-repeat: no-repeat;
    background-position: center;

    color: #FFF;

    cursor: pointer;
  }
}
</style>
