"use strict"

// TODO: Add UI to adjust duration.
const DURATION = 5000
let lastNotificationId = null
let lastTimerId = null
let senderTabId = null
let senderWindowId = null

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (lastNotificationId) {
    chrome.notifications.clear(lastNotificationId)
  }
  if (lastTimerId !== null) {
    clearTimeout(lastTimerId)
  }
  senderTabId = sender.tab.id
  senderWindowId = sender.tab.windowId

  // TODO: Set imageUrl to thumbnail of video.
  chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL('youtube.png'),
    title: 'Now Playing (YouTube)',
    message: message.currentTitle,
    isClickable: true
  }, notificationId => lastNotificationId = notificationId)

  lastTimerId = setTimeout(function() {
    chrome.notifications.clear(lastNotificationId)
  }, DURATION)
})

chrome.notifications.onClicked.addListener(function(notificationId) {
  chrome.notifications.clear(notificationId)
  chrome.tabs.update(senderTabId, { selected: true })
  chrome.windows.update(senderWindowId, { focused: true })
})
