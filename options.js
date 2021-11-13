function saveToBeReplaced()
{
  const toBeReplaced = document.getElementById("toBeReplaced").value;
  chrome.storage.sync.set({ toBeReplaced });
}

function saveToBeReplacedWith()
{
  const toBeReplacedWith = document.getElementById("toBeReplacedWith").value;
  chrome.storage.sync.set({ toBeReplacedWith });
}

function constructOptions() {

  chrome.storage.sync.get("toBeReplaced", (data) => {
    element = document.getElementById("toBeReplaced");
    element.value = data.toBeReplaced;

    element.addEventListener("input", saveToBeReplaced);
  });

  chrome.storage.sync.get("toBeReplacedWith", (data) => {
    element = document.getElementById("toBeReplacedWith");
    element.value = data.toBeReplacedWith;

    element.addEventListener("input", saveToBeReplacedWith);
  });
}

constructOptions();
