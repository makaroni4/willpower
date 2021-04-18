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
            <label class="oh-really-settings__label">
              <div class="oh-really-settings__label-container">
                Breathing timer, sec

                <InfoIcon
                  :class="'oh-really-settings__input-info-icon'" />

                <Tooltip
                  :modifiers="['long']"
                  :copy="'How much time do you want to have to change \
                  your mind before skipping the screenwall and entering the website?'" />
              </div>
            </label>

            <Input
              :type="'number'"
              v-model="proceedTimer" />
          </div>

          <div class="oh-really-settings__input">
            <label class="oh-really-settings__label">
              <div class="oh-really-settings__label-container">
                Screenwall quote
              </div>
            </label>

            <Textarea
              v-model="screenWallQuote" />

            <div class="oh-really-settings__input-hint">
              You can use basic Markdown syntax for <strong>**bold**</strong>
              or <i>*italic*</i> copy.
            </div>
          </div>

          <div class="oh-really-settings__input">
            <label class="oh-really-settings__label">
              <div class="oh-really-settings__label-container">
                Skip screenwall link copy
              </div>
            </label>

            <Input
              v-model="proceedButtonCopy" />
          </div>

          <div class="oh-really-settings__input">
            <label class="oh-really-settings__label">
              <div class="oh-really-settings__label-container">
                Close website button copy
              </div>
            </label>

            <Input
              v-model="fuckItButtonCopy" />
          </div>

          <div class="oh-really-settings__input">
            <label class="oh-really-settings__label">
              <div class="oh-really-settings__label-container">
                Breating timer copy

                <InfoIcon
                  :class="'oh-really-settings__input-info-icon'" />

                <Tooltip
                  :modifiers="['long']"
                  :copy="'Customize a copy that is shown after breating timer is on.'" />
              </div>
            </label>

            <Textarea
              v-model="timerCopy" />

            <div class="oh-really-settings__input-hint">
              You can use basic Markdown syntax for <strong>**bold**</strong>
              or <i>*italic*</i> copy.
            </div>
          </div>

          <div class="oh-really-settings__input">
            <label class="oh-really-settings__label">
              <div class="oh-really-settings__label-container">
                Redirect URL

                <InfoIcon
                  :class="'oh-really-settings__input-info-icon'" />

                <Tooltip
                  :modifiers="['long']"
                  :copy="'For security reasons Willpower extension can\'t close the tab.\
                    Provide a URL you\'ll be redireted to after you close the website.'" />
              </div>
            </label>

            <Input
              v-model="redirectUrl" />
          </div>

          <div class="oh-really-settings__input">
            <label class="oh-really-settings__label">
              <div class="oh-really-settings__label-container">
                Allowed browsing period, min

                <InfoIcon
                  :class="'oh-really-settings__input-info-icon'" />

                <Tooltip
                  :modifiers="['long']"
                  :copy="'When you skip the screenwall, Willpower won\'t show it \
                    again for a default period of 15 minutes. Feel free to customize it.'" />
              </div>
            </label>

            <Input
              :type="'number'"
              v-model="browsingPeriod" />
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
        href="https://chrome.google.com/webstore/detail/willpower/codkcdmdmljjhncjfkfgjbmiglcfpdgc">
        <strong>Rate it</strong>
      </a>

      <a
        class="font-small"
        target="_blank"
        href="https://twitter.com/makaroni4">
        <strong>Say hi</strong>
      </a>

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
import Tooltip from './components/Tooltip.vue';
import Button from './components/Button.vue';
import Notification from './components/Notification.vue';
import { writeData } from './modules/chrome';
import { readConfig, readConfigValue } from './modules/config';
import MinusIcon from './assets/images/minus-circle-solid.svg';
import PlusIcon from './assets/images/plus-circle-solid.svg';
import InfoIcon from './assets/images/info-circle-solid.svg';

export default {
  name: 'OptionsApp',
  components: {
    Input,
    Button,
    Notification,
    Textarea,
    MinusIcon,
    PlusIcon,
    InfoIcon,
    Tooltip,
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
      browsingPeriod: null,
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
        browsingPeriod: this.browsingPeriod,
      }, () => {
        this.refreshSettings();

        this.notificationCopy = 'Your settings were saved';
        this.showNotification = true;

        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      });
    },
    refreshSettings(callback) {
      readConfig((results) => {
        this.patterns = readConfigValue(results, 'patterns');
        this.proceedTimer = readConfigValue(results, 'proceedTimer');
        this.proceedButtonCopy = readConfigValue(results, 'proceedButtonCopy');
        this.fuckItButtonCopy = readConfigValue(results, 'fuckItButtonCopy');
        this.screenWallQuote = readConfigValue(results, 'screenWallQuote');
        this.timerCopy = readConfigValue(results, 'timerCopy');
        this.redirectUrl = readConfigValue(results, 'redirectUrl');
        this.browsingPeriod = readConfigValue(results, 'browsingPeriod');

        if (callback) {
          callback();
        }
      });
    },
  },
  mounted() {
    this.refreshSettings(() => {
      if (this.patterns.length === 0) {
        this.addPattern();
      }
    });
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

    &:not(:last-child) {
      margin-bottom: $px24;
    }
  }

  &__label {
    display: flex;
  }

  &__label-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: $px2;

    font-weight: 800;
    color: $grey-5;

    &:hover {
      & .oh-really-tooltip {
        display: block;
      }
    }
  }

  &__input-info-icon {
    width: $px16;
    height: $px16;
    margin-left: $px8;
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

    border-radius: 0 0 $px8 $px8;

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

    border-radius: $px8 0 0 0;

    background-color: $grey-9;

    font-weight: 800;
    color: $grey-5;

    cursor: pointer;

    transition: all 0.3s ease-in-out;

    &:hover {
      top: $px8;
    }

    &--active {
      width: 55%;
      padding: $px24 0;
      top: 0;

      border-radius: $px8 $px8 0 0;

      background-color: $grey-10;

      color: $grey-3;

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
    padding: $px4 $px8;

    border-radius: $px16;
    border: 0;
    outline: none;
    appearance: none;

    background-color: $grey-9;

    font-size: $px12 !important;
    line-height: 1;

    cursor: pointer;

    &:hover {
      background-color: $grey-8;

      transform: scale(1.02);
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
