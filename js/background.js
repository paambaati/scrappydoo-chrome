/**
 * ScrappyDoo
 *
 * @description Background JavaScript.
 * @author GP
 * @version 0.0.2
 */

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setPopup({
    popup: 'popup.html'
  });
});
