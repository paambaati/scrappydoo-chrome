var emptyData = {
    'name': '',
    'selector': '',
    'attribute': ''
};

var app = new Vue({
    el: '#scrappy-doo',
    data: {
        productData: [],
        newData: emptyData
    },
    methods: {
        addSelector: function () {
            this.productData.push(Vue.util.extend({}, this.newData));
            chrome.storage.local.set({
                'productData': this.productData
            });
            //console.log(this.productData);
            this.newData.name = '';
            this.newData.selector = '';
            this.newData.attribute = '';
        },
        removeSelector: function(index) {
            //console.log('remove item at index ', index);
            this.productData.splice(index, 1);
            chrome.storage.local.set({
                'productData': this.productData
            });
        },
        onStartPicking: function() {
          // Start picking.
          chrome.tabs.query({
            active: true,
            currentWindow: true
          }, function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                from: 'popup',
                subject: 'DOMInfo'
              });
          });
        }
    },
    mounted: function() {
      var vm = this;
      chrome.storage.local.get('productData', function(result) {
          if (result && result.productData) {
            vm.productData = result.productData;
          }
      });
      // Set latest selector via runtime message.
      /*chrome.runtime.onMessage.addListener(function (msg, sender, response) {
        if ((msg.from === 'contentscript') && (msg.subject === 'SelectorInfo')) {
            vm.newData.selector = result.latestSelector;
        }
      });*/
      // Set latest selector via extension storage.
      chrome.storage.local.get('latestSelector', function(result) {
          if (result && result.latestSelector) {
            vm.newData.selector = result.latestSelector;
          }
      });
    }
});
