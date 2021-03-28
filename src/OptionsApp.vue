<template>
  <div class="app">
    <h1>Patterns</h1>

    <div
      v-for="pattern in patterns"
      :key="pattern">
      <TextInput v-model="pattern.value" />
    </div>

    <Button
      @click.prevent="addPattern"
      :label="'Add pattern'">
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
  watch: {
    patterns: function() {
      writeData({
        "patterns": this.patterns.filter(el => !!el.value)
      });
    }
  },
  methods: {
    addPattern() {
      this.patterns.push({
        value: ""
      });
    }
  },
  mounted() {
    readData(["patterns"], results => {
      this.patterns = (results.patterns || []);
    })
  }
};
</script>

<style lang="scss">
.app {
}
</style>
