var h1dom = document.getElementsByTagName("h1");
if (h1dom) {
  chrome.extension.sendRequest({title: h1dom.item(0).textContent});
}
