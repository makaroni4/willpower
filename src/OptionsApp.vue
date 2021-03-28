<template>
  <div class="app">
    <h1>Patterns</h1>

    <div
      v-for="pattern in patterns"
      :key="pattern">
      <input
        type="text"
        v-model="pattern.value">
    </div>

    <button
      class="btn"
      @click.prevent="addPattern">
      Add pattern
    </button>
  </div>
</template>

<script>
export default {
  name: "OptionsApp",
  components: {
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
