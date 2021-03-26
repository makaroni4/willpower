import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const anchor = document.createElement("div");
anchor.id = "oh-really-mega-app";

document.body.appendChild(anchor);

new Vue({
  render: (h) => h(App),
}).$mount("#oh-really-mega-app");
