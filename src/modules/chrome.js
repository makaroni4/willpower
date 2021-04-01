export const readData = (keys, callback) => {
  chrome.storage.sync.get(keys, callback);
}

export const writeData = (data, callback) => {
  chrome.storage.sync.set(data, callback);
}
