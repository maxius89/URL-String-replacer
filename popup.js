let button = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  button.style.backgroundColor = color;
});

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.storage.sync.set({ url: tab.url });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: replaceUrl
    });

    chrome.storage.sync.get("newUrl", (data) => {
      chrome.tabs.update(undefined, { url: data.newUrl});
    });
  });

// The body of this function will be execuetd as a content script inside the
// current page
function replaceUrl() {
  chrome.storage.sync.get(["toBeReplaced", "toBeReplacedWith", "url"], (data) => {
    let newUrl = data.url.replace(data.toBeReplaced, data.toBeReplacedWith);

    chrome.storage.sync.set({ newUrl });
  });


}
