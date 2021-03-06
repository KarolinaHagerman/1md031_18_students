import { menu } from './menu.js'

'use strict';

let socket = io();

new Vue({
  el: "#menu-app",
  data: {
  	items: menu
  },
})

new Vue({
 el: '#orderSection',
 data: {
   orders: {},
   newOrder: {},
   clicked: false,
   customerInfo: [],
   orderedItems: []
 },
 created: function () {
   socket.on('initialize', function (data) {
     this.orders = data.orders;
   }.bind(this));

   socket.on('currentQueue', function (data) {
     this.orders = data.orders;
   }.bind(this));
 },
 methods: {
   buttonClicked: function() {
     this.clicked = true;
     this.clearInfo();
     this.placeOrder();
     this.addOrder();
   },
   placeOrder: function() {     //ALLA UTSKRIFTER SKER GENOM HTML v-if="clicked"
     this.getCustomerInfo();
     this.getOrderedItems();
   },
   clearInfo: function () {
     this.customerInfo = [];
     this.orderedItems = [];
   },
   getCustomerInfo: function () {
     let inputArray = document.querySelectorAll('input[type=text]');
     for (let i=0; i<inputArray.length; i++) {
       this.customerInfo.push(inputArray[i].value);
     }
     this.customerInfo.push(document.querySelector('#payment').value);
     this.customerInfo.push(document.querySelector('input[type=radio]:checked').id);
   },
   getOrderedItems: function () {
     let checkedItems = document.querySelectorAll('input[type=checkbox]:checked');
     for (let i=0; i<checkedItems.length; i++) {
       this.orderedItems.push(checkedItems[i].id);
     }
   },
   getNext: function () {
     var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
       return Math.max(last, next);
     }, 0);
     return lastOrder + 1;
   },
   addOrder: function (event) {
     socket.emit("addOrder", { orderId: this.getNext(),
                               details: this.newOrder,
                               custInfo: this.customerInfo,
                               orderItems: this.orderedItems
                             });
   },
   displayOrder: function (event){
     var offsets = {x: event.currentTarget.getBoundingClientRect().left,
                   y: event.currentTarget.getBoundingClientRect().top};

     this.newOrder = ( { x: event.clientX - 10 - offsets.x,
                y: event.clientY - 10 - offsets.y });
   }
 }
});
