<template>
  <div class="oh-really-settings">
    <div class="oh-really-settings__container">
      <header class="oh-really-settings__header">
        <div class="oh-really-settings__logo oh-really-settings__logo--animated" />
        <strong>WILLPOWER</strong>
      </header>

      <h1>Settings</h1>

      <div class="oh-really-settings__tabs-wrapper">
        <div
          class="oh-really-settings__tabs"
          :class="`oh-really-settings__tabs--${tab}`">
          <div
            class="oh-really-settings__tab"
            :class="{
              'oh-really-settings__tab--active': tab === 'patterns'
            }"
            @click.prevent="tab = 'patterns'">
            URL patterns
          </div>

          <div
            class="oh-really-settings__tab"
            :class="{
              'oh-really-settings__tab--active': tab === 'screenwall'
            }"
            @click.prevent="tab = 'screenwall'">
            Screen wall settings
          </div>
        </div>
      </div>

      <transition name="component-fade" mode="out-in">
        <section
          class="oh-really-settings__section"
          :key="'patterns'"
          v-if="tab === 'patterns'">

          <div class="oh-really-settings__section-body">
            <div
              v-for="pattern in patterns"
              :key="pattern"
              class="oh-really-settings__input">

              <Input
                v-model="pattern.value" />

              <img
                @click.prevent="removePattern(pattern.value)"
                src="./assets/images/minus-circle-solid.svg"
                class="oh-really-settings__input-minus-icon">
            </div>

            <div class="oh-really-settings__section-menu">
              <Button
                @click.prevent="saveSettings"
                :label="'Save settings'" />

              <button
                class="oh-really-settings__add-pattern"
                @click.prevent="addPattern">
                <img
                  src="./assets/images/plus-circle-solid.svg"
                  class="oh-really-settings__input-plus-icon">

                ADD PATTERN
              </button>
            </div>
          </div>
        </section>

        <section
          class="oh-really-settings__section"
          :key="'screenwall'"
          v-if="tab === 'screenwall'">

          <div class="oh-really-settings__section-body">
            <div class="oh-really-settings__input">
              <label>Timer</label>
              <Input
                :type="'number'"
                v-model="proceedTimer" />
            </div>

            <div class="oh-really-settings__input">
              <label>Proceed button copy</label>
              <Input
                v-model="proceedButtonCopy" />
              </div>

            <div class="oh-really-settings__input">
              <label>Close website button copy</label>
              <Input
                v-model="fuckItButtonCopy" />
            </div>

            <div class="oh-really-settings__input">
              <label>Screen wall quote</label>
              <Textarea
                v-model="screenWallQuote" />
            </div>

            <div class="oh-really-settings__input">
              <label>Redirect URL</label>
              <Input
                v-model="redirectUrl" />
            </div>
          </div>

          <div class="oh-really-settings__section-actions">
            <Button
              @click.prevent="saveSettings"
              :label="'Save settings'" />
          </div>
        </section>
      </transition>
    </div>

    <transition name="slide-fade">
      <Notification
        v-if="showNotification"
        :copy="notificationCopy" />
    </transition>

    <div class="oh-really-settings__menu">
      <a
        class="font-small"
        target="_blank"
        href="https://github.com/makaroni4/willpower/issues">
        <strong>Feedback</strong>
      </a>

      <a
        class="font-small"
        target="_blank"
        href="https://github.com/makaroni4/willpower">
        <strong>Source code</strong>
      </a>
    </div>
  </div>
</template>

<script>
import Input from "./components/TextInput";
import Textarea from "./components/Textarea";
import Button from "./components/Button";
import Notification from "./components/Notification";
import { readData, writeData } from "./modules/chrome";
import { readConfigValue } from "./modules/config";

export default {
  name: "OptionsApp",
  components: {
    Input,
    Button,
    Notification,
    Textarea
  },
  data() {
    return {
      tab: "patterns",
      patterns: [],
      proceedTimer: null,
      proceedButtonCopy: null,
      fuckItButtonCopy: null,
      screenWallQuote: null,
      redirectUrl: null,
      showNotification: false,
      notificationCopy: null
    }
  },
  methods: {
    addPattern() {
      this.patterns.push({
        value: ""
      });
    },
    removePattern(value) {
      const index = this.patterns.findIndex(p => p.value === value);

      this.patterns.splice(index, 1);
    },
    saveSettings() {
      writeData({
        "patterns": this.patterns.filter(el => !!el.value),
        "proceedTimer": parseInt(this.proceedTimer, 10),
        "proceedButtonCopy": this.proceedButtonCopy,
        "fuckItButtonCopy": this.fuckItButtonCopy,
        "screenWallQuote": this.screenWallQuote,
        "redirectUrl": this.redirectUrl
      }, () => {
        this.refreshSettings();

        this.notificationCopy = "Your settings were saved";
        this.showNotification = true;

        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      });
    },
    refreshSettings() {
      readData(["patterns", "proceedTimer", "proceedButtonCopy", "fuckItButtonCopy", "screenWallQuote", "redirectUrl"], results => {
        this.patterns = readConfigValue(results, "patterns"),
        this.proceedTimer = readConfigValue(results, "proceedTimer"),
        this.proceedButtonCopy = readConfigValue(results, "proceedButtonCopy"),
        this.fuckItButtonCopy = readConfigValue(results, "fuckItButtonCopy"),
        this.screenWallQuote = readConfigValue(results, "screenWallQuote"),
        this.redirectUrl = readConfigValue(results, "redirectUrl")
      })
    }
  },
  mounted() {
    this.refreshSettings()
  }
};
</script>

<style lang="scss">
.oh-really-settings {
  &__container {
    max-width: $px960;
    margin: 0 auto;
    padding-bottom: $px72;
  }

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: $px32;
    padding: $px8 0;
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

  &__input {
    max-width: $px496;
    position: relative;

    &:not(:last-child) {
      margin-bottom: $px16;
    }
  }

  &__input-plus-icon {
    width: $px16;
    height: $px16;
    margin-right: $px8;

    color: $grey-7;
  }

  &__input-minus-icon {
    width: $px16;
    height: $px16;
    position: absolute;
    right: $px16;
    top: 50%;
    transform: translateY(-50%);

    color: $grey-7;

    cursor: pointer;
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: $px24;
  }

  &__tabs-wrapper {
    border-radius: $px32;
    width: 100%;
    max-width: $px496;
    margin-bottom: $px24;
  }

  &__tabs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    position: relative;
    width: $px496;
    padding: $px4;

    border-radius: $px32;

    background-color: $grey-10;

    &--patterns {
      &:after {
        left: 0;
      }
    }

    &--screenwall {
      &:after {
        left: 50%;
      }
    }

    &:after {
      content: "";
      position: absolute;
      width: 50%;
      top: 0;
      transition: left cubic-bezier(.88, -.35, .565, 1.35) .3s;
      border-radius: 27.5px;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, .1);
      background-color: $blue-6;
      height: 100%;
      z-index: 0;
    }
  }

  &__tab {
    display: inline-block;
    width: 50%;
    padding: $px12 0;
    z-index: 1;
    position: relative;
    transition: color 0.3s;

    color: $blue-6;
    text-align: center;

    cursor: pointer;

    &--active {
      color: $white;
      font-weight: 800;
    }
  }

  &__section-body {
    width: $px496;
    margin-bottom: $px24;
  }

  &__add-pattern {
    display: flex;
    align-items: center;
    padding: $px8 $px12;

    border-radius: $px16;
    border: 0;
    outline: none;
    appearance: none;

    background-color: $grey-10;

    font-size: $px12;
    line-height: 1;

    cursor: pointer;

    &:hover {
      background-color: $grey-9;
    }
  }

  &__section-menu {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__menu {
    position: fixed;
    right: $px16;
    bottom: $px16;

    a {
      &:not(:last-child) {
        margin-right: $px16;
      }
    }
  }
}
</style>
