import { menu } from './menu.js'

'use strict';

//JAVASCRIPT VANILLA
//OBS att vanilla-lösningen inte funkar med dispatcher,
//men den skriver ut all info på sidan på samma sätt som vue-lösningen
main();

function main() {
  let myMenu = getMenu(menu);
  insertMenu(myMenu);

  let orderButton = document.querySelector('#order-button');
  orderButton.onclick = placeOrder;

  let amountItems = myMenu.length;
}

// =============================================

//Constructor
// (string, string, int, bool, bool, string)
function MenuItem(name, imgURL, kcal, gluten, lactose, description) {
  this.name = name;
  this.imgURL = imgURL;
  this.kcal = kcal;
  this.gluten = gluten;
  this.lactose = lactose;
  this.description = description;
}

// =============================================

//not really necessary but added this since it's in the checklist
//using menu.js instead of writing all the info again
function getMenu(menu) {
  let menuArray = [];
  for (let i=0; i < menu.length; i++) {
    menuArray.push(new MenuItem(menu[i].name, menu[i].imgURL,
                                menu[i].kcal, menu[i].gluten,
                                menu[i].lactose, menu[i].description));
  }
  return menuArray;
}

// =============================================

//I really could have merged getMenu and insertMenu together, since I don't really
//need the menuArray since I already have menu.js, but I get the idea of
//using the constructor to create an array
function insertMenu(menuArray) {
  for (let i=0; i < menuArray.length; i++) {
    let item = document.createElement('div');
    item.setAttribute('class', 'item');
    document.querySelector('.item-wrapper').appendChild(item)
    createInfo(item, menuArray, i);
  }
}

// =============================================

function createInfo(item, menuArray, i) {
  let nameItem = document.createElement('h3');
  nameItem.innerHTML = menuArray[i].name;
  item.appendChild(nameItem);

  let picItem = document.createElement('img');
  picItem.setAttribute('class', 'item-pic');
  picItem.setAttribute('src', menuArray[i].imgURL);
  nameItem.appendChild(picItem);

  createList(item, menuArray, i);

  let checkbox = document.createElement('input');
  let label = document.createElement('label');
  let labelText = document.createTextNode('Choose this item');

  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('class', 'check');
  checkbox.setAttribute('id',`${menuArray[i].name}`);
  label.setAttribute('for','choose');

  item.appendChild(checkbox);
  item.appendChild(label);
  label.appendChild(labelText);
}

// =============================================

function createList(item, menuArray, i) {
  let list = document.createElement('ul');

  let kcal = document.createElement('li');
  kcal.innerHTML = `${menuArray[i].kcal} kCal`;
  list.appendChild(kcal);

  if (menuArray[i].gluten) {
    let gluten = document.createElement('li');
    gluten.setAttribute('class','ingredients');
    gluten.innerHTML = 'Contains gluten';
    list.appendChild(gluten);
  }

  if (menuArray[i].lactose) {
    let lactose = document.createElement('li');
    lactose.setAttribute('class','ingredients');
    lactose.innerHTML = 'Contains lactose';
    list.appendChild(lactose);
  }

  let description = document.createElement('li');
  description.innerHTML = menuArray[i].description;
  list.appendChild(description);

  item.appendChild(list);
}

// =============================================

export function placeOrder() {
  clearPrevious();
  let infoArray = getInputVals();
  printInfo(infoArray);
  let itemArray = getMenuItems();
  printOrder(itemArray,itemArray.length>0);
}

// =============================================

export function clearPrevious() {
  let infoList = document.querySelector('#customer-info');
  while (infoList.firstChild) {
      infoList.removeChild(infoList.lastChild);
    }
  let itemList = document.querySelector('#order-info');
  while (itemList.firstChild) {
      itemList.removeChild(itemList.lastChild);
    }
}

// =============================================

//Saves input values in array
export function getInputVals() {
  let inputVals = [];
  let inputArray = document.querySelectorAll('input[type=text]');
  for (let i=0; i<inputArray.length; i++) {
    inputVals.push(inputArray[i].value);
  }
  inputVals.push(document.querySelector('#payment').value);
  inputVals.push(document.querySelector('input[type=radio]:checked').id);
  return inputVals;
}

// =============================================

//Saves checked menu item names in array
export function getMenuItems() {
  let checkedItems = document.querySelectorAll('input[type=checkbox]:checked');
  let itemNames = [];
  for (let i=0; i<checkedItems.length; i++) {
    itemNames.push(checkedItems[i].id);
  }
  return itemNames;
}

// =============================================

export function printInfo(infoArray) {
  let orderHeadings = document.querySelectorAll('.orderheading');
  orderHeadings[0].innerHTML = "Your info";
  let infoList = document.querySelector('#customer-info');
  for (let i=0; i<infoArray.length; i++) {
    let listItem = document.createElement('li');
    listItem.innerHTML = infoArray[i];
    infoList.appendChild(listItem);
  }
}

// =============================================

export function printOrder(itemArray, isOrder) {
  let orderHeadings = document.querySelectorAll('.orderheading');
  let orderText = document.querySelector('#no-order');
  orderHeadings[1].innerHTML = "Your order";
  if (!isOrder) {
    orderText.innerHTML = "Choose items above to order!";
  }
  else {
    let itemList = document.querySelector('#order-info');
    for (let i=0; i<itemArray.length; i++) {
      let listItem = document.createElement('li');
      listItem.innerHTML = itemArray[i];
      itemList.appendChild(listItem);
    }
    orderText.innerHTML = "Thank you for your order!";
  }

}
