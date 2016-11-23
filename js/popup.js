/**
 * ScrappyDoo
 *
 * @description Popup JavaScript.
 * @author GP
 * @version 0.0.2
 */

/**
 * Common variables.
 */

var emptyData = {
    'name': '',
    'selector': '',
    'attribute': ''
};

/**
 * Vue app.
 */

var app = new Vue({
    el: '#scrappy-doo',
    data: {
        productData: [],
        newData: emptyData
    },
    methods: {
        addSelector: function () {
            // Add selector.
            this.productData.push(Vue.util.extend({}, this.newData));
            chrome.storage.local.set({
                productData: this.productData
            });
            // Reset input fields after adding.
            this.newData.name = '';
            this.newData.selector = '';
            this.newData.attribute = '';
        },
        removeSelector: function(index) {
            // Remove selector.
            this.productData.splice(index, 1);
            chrome.storage.local.set({
                productData: this.productData
            });
        },
        onStartPicking: function() {
          // Start picking.
          chrome.tabs.query({
            active: true,
            currentWindow: true
          }, function (tabs) {
              // Ask content script to start the picker.
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
      // Set latest selector via extension storage.
      chrome.storage.local.get('latestSelector', function(result) {
          if (result && result.latestSelector) {
            vm.newData.selector = result.latestSelector;
          }
      });
    }
});
