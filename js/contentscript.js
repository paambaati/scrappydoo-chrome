var elementClickHandler = function(element) {
    var jElement = $(element);
    var selector = jElement.getUniqueSelector();
    // Let popup know about the selected element via runtime message.
    /*chrome.runtime.sendMessage({
        from: 'contentscript',
        subject: 'SelectorInfo',
        selector: selector
    });*/
    // Let popup know about the selected element via extension storage.
    chrome.storage.local.set({
        'latestSelector': selector
    });
    domOut.stop();
}

/*chrome.storage.local.get('listofElements', function(results) {
    if (typeof results.listofElements == 'undefined') {
        chrome.storage.local.set({
            'listofElements': new Array()
        });
    } 
});*/

var domOut = DomOutline({
    onClick: elementClickHandler,
    border: true,
    realtime: true
});

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    domOut.start();
  }
});
