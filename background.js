let toBeReplaced = "hu";
let toBeReplacedWith = "com";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ toBeReplaced });
  chrome.storage.sync.set({ toBeReplacedWith });
});

chrome.action.onClicked.addListener(async () => {
  let tab = await getCurrentTab();

  chrome.storage.sync.set({ url: tab.url });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: createNewUrl
  });

  chrome.storage.sync.get("newUrl", (data) => {
    chrome.tabs.update(undefined, { url: data.newUrl});
  });

});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function createNewUrl() {
  chrome.storage.sync.get(["toBeReplaced", "toBeReplacedWith", "url"], (data) => {
    let newUrl = data.url.replace(data.toBeReplaced, data.toBeReplacedWith);
    
    chrome.storage.sync.set({ newUrl });
  });
}
