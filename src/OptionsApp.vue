<template>
  <div class="oh-really-settings">
    <h1>Patterns</h1>

    <div
      v-for="pattern in patterns"
      :key="pattern"
      class="oh-really-settings__input">

      <TextInput v-model="pattern.value" />

      <a
        href="#"
        @click.prevent="removePattern(pattern.value)">
        Delete
      </a>
    </div>

    <div>
      <Button
        @click.prevent="addPattern"
        :label="'Add pattern'">
    </div>

    <div>
      <Button
        @click.prevent="saveSettings"
        :label="'Save settings'">
    </div>
  </div>
</template>

<script>
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import { readData, writeData } from "./assets/modules/chrome";

export default {
  name: "OptionsApp",
  components: {
    TextInput,
    Button
  },
  data() {
    return {
      patterns: []
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
        "patterns": this.patterns.filter(el => !!el.value)
      }, () => {
        this.refreshSettings()
      });
    },
    refreshSettings() {
      readData(["patterns"], results => {
        this.patterns = (results.patterns || []);
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

  &__pattern {
  }
}
</style>
