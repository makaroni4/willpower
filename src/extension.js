import Vue from "vue";
import ScreenWall from "./components/ScreenWall.vue";

Vue.config.productionTip = false;

const anchor = document.createElement("div");
anchor.id = "oh-really-mega-app";

document.body.appendChild(anchor);

chrome.storage.sync.get(["proceedCount", "fuckItCount", "shownCount", "patterns"], data => {
  const patterns = (data.patterns || []).map(p => p.value.replaceAll(".", "\\.").replaceAll("*", ".*"));
  const matchedPattern = patterns.find(pattern => {
    const regex = new RegExp(pattern);

    return regex.test(window.location.href);
  });

  if(matchedPattern) {
    new Vue({
      render: (h) => h(ScreenWall, {
        props: {
          proceedCount: data.proceedCount || 0,
          fuckItCount: data.fuckItCount || 0,
          shownCount: data.shownCount || 0
        }
      }),
    }).$mount("#oh-really-mega-app");
  }
});
