import Vue from "vue";
import PopupApp from "./PopupApp.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(PopupApp),
}).$mount("#popup-app");
