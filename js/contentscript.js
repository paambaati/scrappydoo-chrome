jQuery.fn.getUniqueSelector = function () {
    if (this.length != 1) throw 'Requires at least one element.';
    var path, node = this;
    if (node[0].id) return "#" + node[0].id;
    while (node.length) {
        var realNode = node[0],
            name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();
        var parent = node.parent();
        var siblings = parent.children(name);
        if (siblings.length > 1) {
            name += ':eq(' + siblings.index(realNode) + ')';
        }
        path = name + (path ? '>' + path : '');
        node = parent;
    }
    return path;
};

var elementClickHandler = function(element) {
    var jElement = $(element);
    var selector = jElement.getUniqueSelector();
    chrome.runtime.sendMessage({
        eventCode: 'elementPicked',
        selector: selector
    });
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
