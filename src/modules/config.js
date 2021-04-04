import { readData } from './chrome';

const DEFAULT_CONFIG = {
  proceedTimer: 15, // sec
  browsingPeriod: 15, // min
  proceedCount: 0,
  fuckItCount: 0,
  shownCount: 0,
  proceedButtonCopy: 'Yes, really',
  fuckItButtonCopy: 'F**k it!',
  screenWallQuote: 'You want to spend your time like that?',
  redirectUrl: 'https://giphy.com/search/you-did-it',
  timerCopy: 'You still have a chance to win this!',
  patterns: [],
  activePatterns: {},
};

export const readConfigValue = (config, value) => config[value] || DEFAULT_CONFIG[value];

export const readConfig = (callback) => {
  const keys = Object.keys(DEFAULT_CONFIG);

  readData(keys, callback);
};
