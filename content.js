chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageDetails") {
    const title = document.title;
    const descriptionMeta = document.querySelector("meta[name='description']");
    const description = descriptionMeta ? descriptionMeta.getAttribute("content") : "No description available";
    const renderedText = document.body.innerText;
    sendResponse({ title: title, description: description, renderedText: renderedText });
  }
});
