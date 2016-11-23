/**
 * ScrappyDoo
 *
 * @description ContentScript for Extention.
 * @author GP
 * @version 0.0.2
 */

/**
 * Helper functions.
 */

var elementClickHandler = function(element) {
    var jElement = $(element);
    var selector = jElement.getUniqueSelector();
    // Let popup know about the selected element via extension storage.
    chrome.storage.local.set({
        'latestSelector': selector
    });
    domOut.stop();
}

/**
 * Common variables.
 */

var domOut = DomOutline({
    onClick: elementClickHandler,
    border: true,
    realtime: true
});

/**
 * Event listeners.
 */

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        // Extension popup asked to start picking.
        domOut.start();
        }
});
