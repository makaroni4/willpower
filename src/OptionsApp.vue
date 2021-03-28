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
      chrome.storage.sync.set({
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
    chrome.storage.sync.get(["patterns"], results => {
      this.patterns = (results.patterns || []);
    })
  }
};
</script>

<style lang="scss">
.app {
}
</style>
