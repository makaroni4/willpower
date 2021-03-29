<template>
  <div class="oh-really-popup">
    <div class="oh-really-popup__container">
      <h1>Oh Really?!</h1>

      <h3>
        {{ screenWallQuote }}
      </h3>

      <div
        v-if="timerInterval">
        {{ timeLeft }} seconds left. You still have a chance to win this! 💪
      </div>

      <div class="oh-really-popup__actions">
        <div class="oh-really-popup__fuck-it">
          <Button
            @click.prevent="handleFuckIt"
            :label="fuckItButtonCopy" />
        </div>

        <a
          class="oh-really-popup__proceed"
          href="#"
          @click.prevent="handleProceed">
          {{ proceedButtonCopy }}
        </a>
      </div>
    </div>

    <div class="oh-really-popup__stats">
      <h3>Stats</h3>
      <div>Shown count: {{ shownCount }}</div>
      <div>Nasty websites: {{ proceedCount }}</div>
      <div>You: {{ fuckItCount }}</div>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import { readData, writeData } from "../assets/modules/chrome";

export default {
  name: "ScreenWall",
  components: {
    Button
  },
  data() {
    return {
      timeLeft: 15,
      timerInterval: null
    }
  },
  props: {
    proceedCount: Number,
    fuckItCount: Number,
    shownCount: Number,
    pattern: String,
    proceedTimer: Number,
    proceedButtonCopy: String,
    fuckItButtonCopy: String,
    screenWallQuote: String,
    redirectUrl: String
  },
  methods: {
    handleProceed() {
      const countdown = () => {
        if (this.timeLeft == 0) {
          clearTimeout(this.timerInterval);

          writeData({
            "proceedCount": this.proceedCount + 1
          }, () => {
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);

            readData(["activePatterns"], data => {
              const activePatterns = data.activePatterns || {};
              const now = new Date();
              activePatterns[this.pattern] = now.getTime();

              writeData({
                "activePatterns": activePatterns
              });
            });
          });

        } else {
          this.timeLeft -= 1;
        }
      }

      this.timerInterval = setInterval(countdown, 1000);
    },
    handleFuckIt() {
      writeData({
        "fuckItCount": this.fuckItCount + 1
      }, () => {
        window.location = this.redirectUrl
      });
    }
  },
  mounted() {
    writeData({
      "shownCount": this.shownCount + 1
    });

    this.timeLeft = this.proceedTimer;
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

  &__container {
    max-width: $px960;
    margin: 0 auto;
  }

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

  &__actions {
    display: flex;
    align-items: center;
  }

  &__proceed {
    display: inline-block;
    margin-left: $px8;
  }

  &__stats {
    position: absolute;
    bottom: $px32;
    left: $px16;
    z-index: 100000000;
  }
}
</style>
