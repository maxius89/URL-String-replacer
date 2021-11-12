let color = '#3aa757';
let toBeReplaced = "hu";
let toBeReplacedWith = "com";


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  chrome.storage.sync.set({ toBeReplaced });
  chrome.storage.sync.set({ toBeReplacedWith });
});
