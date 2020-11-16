import { placeOrder, getInputVals } from './js_script.js'
import { menu } from './menu.js'

new Vue({
  el: "#menu-app",
  data: {
  	items: menu
  },
})

new Vue({
    el: '#orders',
    methods: {
        markDone: function () {
            console.log('Button clicked!');
        }
    }
});

//DON'T NEED FUNCTIONS FOR THESE, ALL IS WRITTEN IN MY index.html
//A function that loops through the array and inserts the information to the burger selection section of the index.html file
//A function that loads the information from the menu.js json object and inserts the information to the burger selection section of the index.html file
