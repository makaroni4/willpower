const DEFAULT_CONFIG = {
  proceedTimer: 15,
  proceedCount: 0,
  fuckItCount: 0,
  shownCount: 0,
  proceedButtonCopy: "Yes, really",
  fuckItButtonCopy: "F**k it!",
  screenWallQuote: "You want to spend your time like that?",
  redirectUrl: "https://giphy.com/search/you-did-it",
  patterns: []
};

export const readConfigValue = (config, value) => {
  return config[value] || DEFAULT_CONFIG[value];
}
