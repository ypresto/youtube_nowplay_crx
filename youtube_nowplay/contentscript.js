"use strict"
const MutationObserver = window.MutationObserver

let lastTitle = null
const sendPopupRequest = function() {
  const titleNode = document.getElementById("eow-title")
  if (!titleNode) {
    console.warn("Now Playing Pop-up could not find '#eow-title' tag in YouTube DOM.")
    return
  }
  const title = titleNode.getAttribute("title")
  if (!title) {
    console.warn("Now Playing Pop-up: '#eow-title' does not have title attr.")
    return
  }
  if (title === lastTitle) return
  chrome.runtime.sendMessage({ currentTitle: title });
  lastTitle = title
}

const observer = new MutationObserver(sendPopupRequest)
const pageNode = document.getElementById("page")
if (pageNode) {
  observer.observe(pageNode, { attributes: true })
  sendPopupRequest()
} else {
  console.warn("Now Playing Pop-up could not find '#page' tag in YouTube DOM.")
}
