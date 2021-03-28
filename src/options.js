import Vue from "vue";
import OptionsApp from "./OptionsApp.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(OptionsApp),
}).$mount("#options-app");
