<template>
  <div class="oh-really-popup-app oh-really-design-system">
    <header class="oh-really-popup-app__header">
      <div class="oh-really-popup-app__logo oh-really-popup-app__logo--animated" />
      <strong>WILLPOWER</strong>
    </header>

    <div class="oh-really-popup-app__popup">
      <div class="oh-really-popup-app__stats">
        <div class="oh-really-popup-app__stat">
          <div class="oh-really-popup-app__stat-copy">
            Shown count
          </div>
          <div class="oh-really-popup-app__stat-value">
            {{ shownCount }}
          </div>
        </div>

        <div class="oh-really-popup-app__stat">
          <div class="oh-really-popup-app__stat-copy">
            Visits count
          </div>
          <div class="oh-really-popup-app__stat-value">
            {{ proceedCount }}
          </div>
        </div>

        <div class="oh-really-popup-app__stat">
          <div class="oh-really-popup-app__stat-copy">
            Skips count
          </div>
          <div class="oh-really-popup-app__stat-value">
            {{ fuckItCount }}
          </div>
        </div>
      </div>

      <div class="oh-really-popup-app__menu">
        <a
          target="_blank"
          class="font-small"
          href="options.html">
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
    </div>
  </div>
</template>

<script>
import { readData } from "./assets/modules/chrome";

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

.oh-really-popup-app {
  padding: $px8;
  width: $px240;

  background-color: $white;

  font-family: "Muli", sans-serif;

  color: $grey-1;

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: $px32;
  }

  &__logo {
    width: $px32;
    height: $px32;
    display: block;
    margin-right: $px16;

    background-image: url("chrome-extension://__MSG_@@extension_id__/images/logo.svg") !important;
    background-repeat: no-repeat;
    background-size: cover;

    &--animated {
      animation: breathing 5s ease-out infinite normal;
    }
  }

  &__stats {
    margin-bottom: $px24;
  }

  &__stat {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: $px16;
    }
  }

  &__menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
