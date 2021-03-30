<template>
  <div class="oh-really-settings oh-really-design-system">
    <h1>Settings</h1>

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
      v-if="tab === 'patterns'">
      <div
        v-for="pattern in patterns"
        :key="pattern"
        class="oh-really-settings__input">

        <Input v-model="pattern.value" />

        <a
          href="#"
          @click.prevent="removePattern(pattern.value)">
          Delete
        </a>
      </div>

      <div>
        <Button
          @click.prevent="addPattern"
          :label="'Add pattern'" />

        <Button
          @click.prevent="saveSettings"
          :label="'Save settings'" />
      </div>
    </section>

    <section
      class="oh-really-settings__section"
      v-if="tab === 'screenwall'">
      <h2>Screen wall settings</h2>

      <label>Timer</label>
      <Input
        :type="'number'"
        v-model="proceedTimer" />

      <label>Proceed button copy</label>
      <Input
        v-model="proceedButtonCopy" />

      <label>Close website button copy</label>
      <Input
        v-model="fuckItButtonCopy" />

      <label>Screen wall quote</label>
      <Input
        v-model="screenWallQuote" />

      <label>Redirect URL</label>
      <Input
        v-model="redirectUrl" />

      <Button
        @click.prevent="saveSettings"
        :label="'Save settings'" />
    </section>

    <Notification
      v-if="showNotification"
      :copy="notificationCopy" />
  </div>
</template>

<script>
import Input from "./components/TextInput";
import Button from "./components/Button";
import Notification from "./components/Notification";
import { readData, writeData } from "./assets/modules/chrome";

export default {
  name: "OptionsApp",
  components: {
    Input,
    Button,
    Notification
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
        this.patterns = results.patterns || [];
        this.proceedTimer = results.proceedTimer || 15; // sec
        this.proceedButtonCopy = results.proceedButtonCopy || "Yes, really";
        this.fuckItButtonCopy = results.fuckItButtonCopy || "F**k it";
        this.screenWallQuote = results.screenWallQuote || "You want to spend your time like that?"
        this.redirectUrl = results.redirectUrl || "https://giphy.com/search/you-did-it"
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
  &__input {
    display: flex;
    max-width: $px496;
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: $px24;
  }

  &__tabs {
    margin-bottom: $px24;
  }

  &__tab {
    cursor: pointer;

    &--active {
      font-weight: 800;
    }
  }
}
</style>
