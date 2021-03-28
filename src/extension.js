import Vue from "vue";
import Popup from "./components/Popup.vue";

Vue.config.productionTip = false;

const anchor = document.createElement("div");
anchor.id = "oh-really-mega-app";

document.body.appendChild(anchor);

chrome.storage.sync.get(["proceedCount", "fuckItCount", "patterns"], data => {
  console.log(data)
  const patterns = (data.patterns || []).map(p => p.value);
  console.log(patterns)

  const matchedPattern = patterns.find(pattern => location.host.includes(pattern));

  if(matchedPattern) {
    console.log("MOUNTING");

    new Vue({
      render: (h) => h(Popup, {
        props: {
          proceedCount: data.proceedCount || 0,
          fuckItCount: data.fuckItCount || 0
        }
      }),
    }).$mount("#oh-really-mega-app");
  }
});
