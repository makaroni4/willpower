import Vue from 'vue';
import ScreenWall from './components/ScreenWall.vue';
import { readConfig, readConfigValue } from './modules/config';

Vue.config.productionTip = false;

const showScreenWall = (data, matchedPattern) => {
  const anchor = document.createElement('div');
  anchor.id = 'oh-really-mega-app';

  document.body.appendChild(anchor);

  new Vue({
    render: (h) => h(ScreenWall, {
      props: {
        proceedCount: readConfigValue(data, 'proceedCount'),
        fuckItCount: readConfigValue(data, 'fuckItCount'),
        shownCount: readConfigValue(data, 'shownCount'),
        proceedTimer: readConfigValue(data, 'proceedTimer'),
        proceedButtonCopy: readConfigValue(data, 'proceedButtonCopy'),
        fuckItButtonCopy: readConfigValue(data, 'fuckItButtonCopy'),
        screenWallQuote: readConfigValue(data, 'screenWallQuote'),
        redirectUrl: readConfigValue(data, 'redirectUrl'),
        timerCopy: readConfigValue(data, 'timerCopy'),
        pattern: matchedPattern,
      },
    }),
  }).$mount('#oh-really-mega-app');
};

const MAX_BROWSING_TIME = 15; // min

readConfig(data => {
  const patterns = (data.patterns || []).map((p) => p.value.replaceAll('.', '\\.').replaceAll('*', '.*'));

  const matchedPattern = patterns.find((pattern) => {
    const regex = new RegExp(pattern);

    return regex.test(window.location.href);
  });

  if (matchedPattern) {
    const activePatterns = data.activePatterns || {};
    let activeAt = activePatterns[matchedPattern];

    if (activeAt) {
      try {
        activeAt = new Date(activeAt);
      } catch (error) {
        showScreenWall(data, matchedPattern);
      }
      const now = (new Date()).getTime();
      const lastShownInMinutes = (now - activeAt) / 1000 / 60;

      if (lastShownInMinutes > MAX_BROWSING_TIME) {
        showScreenWall(data, matchedPattern);
      }
    } else {
      showScreenWall(data, matchedPattern);
    }
  }
});
