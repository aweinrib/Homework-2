(function () {
'use strict';


var toBuyList = [
  {
    itemName: "Milk",
    itemQuantity: "2"
  },
  {
    itemName: "Donuts",
    itemQuantity: "200"
  },
  {
    itemName: "Cookies",
    itemQuantity: "300"
  },
  {
    itemName: "Chocolate",
    itemQuantity: "9"
  },
  {
    itemName: "Chocolate",
    itemQuantity: "8"
  },
  {
    itemName: "Chocolate",
    itemQuantity: "2"
  },
  {
    itemName: "Steak",
    itemQuantity: "5"
  },
  {
    itemName: "Juice",
    itemQuantity: "1"
  },
  {
    itemName: "Pie",
    itemQuantity: "2"
  },
  {
    itemName: "Apple",
    itemQuantity: "3"
  }
];
	
	
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var toBuyItem = this;
	
	toBuyItem.itemName = "";
	toBuyItem.itemQuantity = "";

	
	toBuyItem.addToBuyItem = function() {
		ShoppingListCheckOffService.addToBuyItem(toBuyItem.itemName, toBuyItem.itemQuantity);
		console.log('ToBuyController called');
	};
	
	toBuyItem.items = ShoppingListCheckOffService.getToBuyItems();
	
	// var item;
	// for (item=0; item < toBuyItem.items.length; item++ ) {
		// console.log("toBuyItem to buy is: ",  toBuyItem.items[item]);
	// };
	
	toBuyItem.addToBoughtItem = function(itemIndex) {
		ShoppingListCheckOffService.addToBoughtItem(itemIndex);
	}; // addToBoughtItem
	

}; // ToBuyController


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var boughtItem = this;

	boughtItem.itemName = "";
	boughtItem.itemQuantity = "";

	// boughtItem.addItem = function () {
    //		ShoppingListCheckOffService.addToBuyItem(boughtItem.itemName, boughtItem.itemQuantity);
	// }
	
	boughtItem.items = ShoppingListCheckOffService.getBoughtItems();
	
}; // AlreadyBoughtController


function ShoppingListCheckOffService() {	
	var service = this;
	
	var toBuyItems = toBuyList;
	var boughtItems = [];
	
	var nullEntry = [
		{
			itemName: "",
			itemQuantity: ""
		}
	]	
	
	service.addToBuyItem = function (itemName, quantity) {
		var item = {
		  itemName: itemName,
		  itemQuantity: quantity
		};
		toBuyItems.push(item);
	};

	service.removeToBuyItem = function (itemIdex) {
		toBuyItems.splice(itemIdex, 1);
	};

	service.getToBuyItems = function () {
		return toBuyItems;
	};
	

	service.addToBoughtItem = function (itemIdex) {	
		boughtItems.push(toBuyItems[itemIdex]);
		toBuyItems.splice(itemIdex, 1);
		
		// console.log('Bought item index ', itemIdex);
		// console.log('Bought ', boughtItems.length, ' items.');
	};

	service.getBoughtItems = function () {
		if (boughtItems == null) {
			var tempItem = [];;
			tempItem.push(nullEntry)
			return tempItem;
		} else {
			return boughtItems;
		}	
	};	
	
}; // ShoppingListCheckOffService
	
	
})();