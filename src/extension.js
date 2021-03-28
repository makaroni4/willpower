import Vue from "vue";
import ScreenWall from "./components/ScreenWall.vue";

Vue.config.productionTip = false;

const anchor = document.createElement("div");
anchor.id = "oh-really-mega-app";

document.body.appendChild(anchor);

chrome.storage.sync.get(["proceedCount", "fuckItCount", "patterns"], data => {
  const patterns = (data.patterns || []).map(p => p.value);
  const matchedPattern = patterns.find(pattern => location.host.includes(pattern));

  if(matchedPattern) {
    new Vue({
      render: (h) => h(ScreenWall, {
        props: {
          proceedCount: data.proceedCount || 0,
          fuckItCount: data.fuckItCount || 0
        }
      }),
    }).$mount("#oh-really-mega-app");
  }
});
