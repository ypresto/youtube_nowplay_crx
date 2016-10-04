"use strict"

// TODO: Add UI to adjust duration.
const DURATION = 5000
let lastNotificationId = null
let lastTimerId = null

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (lastNotificationId) {
    chrome.notifications.clear(lastNotificationId)
  }
  if (lastTimerId !== null) {
    clearTimeout(lastTimerId)
  }

  // TODO: Set imageUrl to thumbnail of video.
  chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL('youtube.png'),
    title: 'Now Playing (YouTube)',
    message: request.currentTitle
  }, notificationId => lastNotificationId = notificationId)

  lastTimerId = setTimeout(function() {
    chrome.notifications.clear(lastNotificationId)
  }, DURATION)
})
