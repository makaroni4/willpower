<template>
  <div class="app">
    <h1>Patterns</h1>

    <div
      v-for="pattern in patterns"
      :key="pattern">
      <TextInput v-model="pattern.value" />
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
.app {
}
</style>
