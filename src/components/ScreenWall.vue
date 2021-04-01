<template>
  <div class="oh-really-popup oh-really-design-system">
    <div
      class="oh-really-popup__logo"
      :class="{
        'oh-really-popup__logo--animated': timerInterval
      }" />

    <div class="oh-really-popup__body">
      <div
        class="oh-really-popup__quote"
        v-if="timerInterval">
        <strong>{{ timeLeft }} seconds left</strong>. <span v-html="timerCopy"></span>
      </div>

      <div
        v-else
        class="oh-really-popup__quote"
        v-html="formattedQuote" />

      <div class="oh-really-popup__actions">
        <div class="oh-really-popup__fuck-it">
          <Button
            :modifiers="['fat']"
            @click.prevent="handleFuckIt"
            :label="fuckItButtonCopy" />
        </div>

        <a
          v-if="!timerInterval"
          class="oh-really-popup__proceed"
          href="#"
          @click.prevent="handleProceed">
          {{ proceedButtonCopy }}
        </a>
      </div>
    </div>

    <div class="oh-really-popup__menu">
      <a
        target="_blank"
        class="font-small"
        :href="optionsPageUrl">
        Settings
      </a>

      <a
        class="font-small"
        target="_blank"
        href="https://github.com/makaroni4/willpower/issues">
        Feedback
      </a>

      <a
        class="font-small"
        target="_blank"
        href="https://github.com/makaroni4/willpower">
        Source code
      </a>
    </div>

    <div
      v-if="showStats"
      class="oh-really-popup__stats">
      <div class="oh-really-popup__stat oh-really-popup__stat--blue">
        <Tooltip
          :copy="`Shown count: ${shownCount}`" />
      </div>

      <div
        class="oh-really-popup__stat oh-really-popup__stat--red"
        :style="`width: ${Math.round(100 * proceedCount / shownCount)}%;`">
        <Tooltip
          :copy="`Nasty websites: ${proceedCount}`" />
      </div>

      <div
        class="oh-really-popup__stat oh-really-popup__stat--green"
        :style="`width: ${Math.round(100 * fuckItCount / shownCount)}%;`">
        <Tooltip
          :copy="`You: ${fuckItCount}`" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import Tooltip from './Tooltip.vue';
import { writeData } from '../modules/chrome';
import { readConfig } from '../modules/config';

export default {
  name: 'ScreenWall',
  components: {
    Button,
    Tooltip,
  },
  data() {
    return {
      timeLeft: 15,
      timerInterval: null,
    };
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
    redirectUrl: String,
    timerCopy: String,
  },
  computed: {
    formattedQuote() {
      return this.screenWallQuote
        .replace(/[*_]{2}([^*_]+)[*_]{2}/g, '<strong>$1</strong>')
        .replace(/[*_]{1}([^*_]+)[*_]{1}/g, '<i>$1</i>');
    },
    optionsPageUrl() {
      return chrome.runtime.getURL('options.html');
    },
    showStats() {
      return (this.proceedCount || 0) > 0 && (this.fuckItCount || 0) > 0;
    },
  },
  methods: {
    handleProceed() {
      const countdown = () => {
        if (this.timeLeft === 0) {
          clearTimeout(this.timerInterval);

          writeData({
            proceedCount: this.proceedCount + 1,
          }, () => {
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);

            readConfig((data) => {
              const activePatterns = data.activePatterns || {};
              const now = new Date();
              activePatterns[this.pattern] = now.getTime();

              writeData({
                activePatterns,
              });
            });
          });
        } else {
          this.timeLeft -= 1;
        }
      };

      this.timerInterval = setInterval(countdown, 1000);
    },
    handleFuckIt() {
      writeData({
        fuckItCount: this.fuckItCount + 1,
      }, () => {
        window.location = this.redirectUrl;
      });
    },
  },
  mounted() {
    writeData({
      shownCount: this.shownCount + 1,
    });

    this.timeLeft = this.proceedTimer;
  },
};
</script>

<style lang="scss">
@keyframes breathing {
  0% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }
}

.oh-really-popup {
  $root: &;

  position: fixed;
  top: 0;
  left: 0;
  padding: 8px;
  z-index: 100000000;
  width: 100%;
  height: 100%;

  border-radius: 0 0 8px 0;

  background-color: $grey-9;

  font-family: "Muli", sans-serif;
  color: $grey-1;

  &__body {
    max-width: $px720;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: $px192;
  }

  &__quote {
    display: block;
    margin-bottom: $px24;

    font-size: 44px;
    line-height: 56px;
  }

  &__logo {
    position: absolute;
    top: $px16;
    left: $px16;
    z-index: 100000000;
    width: $px48;
    height: $px48;
    display: block;

    background-image: url("chrome-extension://__MSG_@@extension_id__/images/logo.svg") !important;
    background-repeat: no-repeat;
    background-size: cover;

    &--animated {
      animation: breathing 5s ease-out infinite normal;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  &__proceed {
    display: inline-block;
    margin-left: $px16;
  }

  &__stats {
    position: absolute;
    bottom: $px32;
    left: $px16;
    z-index: 100000000;
  }

  &__stat {
    display: flex;
    align-items: center;
    height: $px12;
    width: $px144;
    position: relative;

    &--blue {
      background-color: $blue-8;

      &:hover {
        background-color: $blue-7;
      }
    }

    &--red {
      background-color: $red-8;

      &:hover {
        background-color: $red-7;
      }
    }

    &--green {
      background-color: $green-8;

      &:hover {
        background-color: $green-7;
      }
    }

    &:hover {
      .oh-really-tooltip {
        display: block;
      }
    }
  }

  &__menu {
    position: absolute;
    bottom: $px32;
    right: $px32;
    z-index: 100000000;
    display: flex;

    a {
      color: $grey-6;

      &:not(:last-child) {
        margin-right: $px16;
      }
    }
  }
}
</style>
