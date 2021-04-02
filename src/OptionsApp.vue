<template>
  <div class="oh-really-settings">
    <div class="oh-really-settings__container">
      <header class="oh-really-settings__header">
        <div class="oh-really-settings__logo oh-really-settings__logo--animated" />
        <strong>WILLPOWER</strong>
      </header>

      <div class="oh-really-settings__tabs">
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

      <section
        class="oh-really-settings__section"
        :key="'patterns'"
        v-if="tab === 'patterns'">

        <div class="oh-really-settings__section-body">
          <div class="oh-really-settings__section-desription">
            <p>
              The Willpower extension blocks a page if a URL matches
              one of the patterns you specified.
            </p>

            <p>
              For example, <strong>google.com</strong> will block any page on Google.
            </p>

            <p>
              <strong>instagram.com/nbamemes</strong> will block a specific Instagram profile.
            </p>

            <p>
              You can use a wildcard symbol <strong>*</strong> to match
              any sequence of characters. For example, <strong>google.com*NBA</strong>
              will block any page on Goolge if a URL contains "NBA".
            </p>
          </div>

          <div
            v-for="pattern in patterns"
            :key="pattern"
            class="oh-really-settings__input">

            <Input
              v-model="pattern.value" />

            <MinusIcon
              @click.prevent="removePattern(pattern.value)"
              :class="'oh-really-settings__input-minus-icon'" />
          </div>

          <div class="oh-really-settings__section-actions">
            <Button
              @click.prevent="saveSettings"
              :label="'Save settings'" />

            <button
              class="oh-really-settings__add-pattern"
              @click.prevent="addPattern">
              <PlusIcon
                :class="'oh-really-settings__input-plus-icon'" />

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
            <label>Timer, sec</label>
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

            <div class="oh-really-settings__input-hint">
              You can use basic Markdown syntax for <strong>**bold**</strong>
              or <i>*italic*</i> copy.
            </div>
          </div>

          <div class="oh-really-settings__input">
            <label>Timer copy</label>
            <Textarea
              v-model="timerCopy" />

            <div class="oh-really-settings__input-hint">
              You can use basic Markdown syntax for <strong>**bold**</strong>
              or <i>*italic*</i> copy.
            </div>
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
import Input from './components/TextInput.vue';
import Textarea from './components/Textarea.vue';
import Button from './components/Button.vue';
import Notification from './components/Notification.vue';
import { writeData } from './modules/chrome';
import { readConfig, readConfigValue } from './modules/config';
import MinusIcon from './assets/images/minus-circle-solid.svg';
import PlusIcon from './assets/images/plus-circle-solid.svg';

export default {
  name: 'OptionsApp',
  components: {
    Input,
    Button,
    Notification,
    Textarea,
    MinusIcon,
    PlusIcon,
  },
  data() {
    return {
      tab: 'patterns',
      patterns: [],
      proceedTimer: null,
      proceedButtonCopy: null,
      fuckItButtonCopy: null,
      screenWallQuote: null,
      redirectUrl: null,
      showNotification: false,
      notificationCopy: null,
      timerCopy: null,
    };
  },
  methods: {
    addPattern() {
      this.patterns.push({
        value: '',
      });
    },
    removePattern(value) {
      const index = this.patterns.findIndex((p) => p.value === value);

      this.patterns.splice(index, 1);
    },
    saveSettings() {
      writeData({
        patterns: this.patterns.filter((el) => !!el.value),
        proceedTimer: parseInt(this.proceedTimer, 10),
        proceedButtonCopy: this.proceedButtonCopy,
        fuckItButtonCopy: this.fuckItButtonCopy,
        screenWallQuote: this.screenWallQuote,
        redirectUrl: this.redirectUrl,
        timerCopy: this.timerCopy,
      }, () => {
        this.refreshSettings();

        this.notificationCopy = 'Your settings were saved';
        this.showNotification = true;

        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      });
    },
    refreshSettings() {
      readConfig((results) => {
        this.patterns = readConfigValue(results, 'patterns');
        this.proceedTimer = readConfigValue(results, 'proceedTimer');
        this.proceedButtonCopy = readConfigValue(results, 'proceedButtonCopy');
        this.fuckItButtonCopy = readConfigValue(results, 'fuckItButtonCopy');
        this.screenWallQuote = readConfigValue(results, 'screenWallQuote');
        this.timerCopy = readConfigValue(results, 'timerCopy');
        this.redirectUrl = readConfigValue(results, 'redirectUrl');
      });
    },
  },
  mounted() {
    this.refreshSettings();
  },
};
</script>

<style lang="scss">
.oh-really-settings {
  $root: &;

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
    padding: $px12 0;
  }

  &__logo {
    width: $px32;
    height: $px32;
    display: block;
    margin-right: $px8;

    background-image: url("chrome-extension://__MSG_@@extension_id__/images/logo.svg") !important;
    background-repeat: no-repeat;
    background-size: cover;

    &--animated {
      animation: breathing 5s ease-out infinite normal;
    }
  }

  &__input {
    position: relative;

    label {
      font-weight: 800;
    }

    &:not(:last-child) {
      margin-bottom: $px16;
    }
  }

  &__input-hint {
    font-size: 12px;
    line-height: 1.3;
    color: $grey-7;
  }

  &__input-plus-icon {
    width: $px16;
    height: $px16;
    margin-right: $px8;

    color: $grey-1;
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

    &:hover {
      color: $grey-5;
    }
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: $px24;
  }

  &__section {
    padding: $px16;
    max-width: $px640;

    background-color: $grey-10;
  }

  &__tabs {
    display: flex;
    align-items: center;
    max-width: $px640;
  }

  &__tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45%;
    padding: $px16 0;
    position: relative;
    top: $px12;

    border-radius: $px4 0 0 0;

    background-color: $grey-9;

    font-weight: 800;

    cursor: pointer;

    transition: all 0.3s ease-in-out;

    &:hover {
      top: $px8;
    }

    &--active {
      width: 55%;
      padding: $px24 0;
      top: 0;

      border-radius: $px4 $px4 0 0;

      background-color: $grey-10;

      &:hover {
        top: 0;
      }

      & + #{$root}__tab {
        border-radius: 0 $px4 0 0;
      }
    }
  }

  &__section-body {
    margin-bottom: $px24;
  }

  &__add-pattern {
    display: flex;
    align-items: center;
    padding: $px4 $px12;

    border-radius: $px16;
    border: 0;
    outline: none;
    appearance: none;

    background-color: $grey-10;

    font-size: $px12 !important;
    line-height: 1;

    cursor: pointer;

    &:hover {
      background-color: $grey-9;
    }
  }

  &__section-desription {
    margin-bottom: $px24;

    font-size: $px12;
    color: $grey-7;

    &:hover {
      color: $grey-1;
    }
  }

  &__section-actions {
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
