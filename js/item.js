function Item() {
	return {
		Id : 0,
		Name : "",
		Gold : 0,
		IsConsumable: false,
		IsEquippable: false,
		Equipped: false,
		ConsumableExp: 0,
		ConsumableCurrentHP: 0,
		ConsumableHP: 0,
		ConsumableATK: 0,
		ConsumableDEF: 0,
		ConsumableSPD: 0,
		ConsumableWIS: 0,
		ATK: 0,
		WIS: 0,
		Combo : 0
	};
}

function GetItemInventoryUI(item, id) {
	var itemUI = $("<div><span id='item" + id + "Label'></span><a href='#' class='sell' data-item='" + JSON.stringify(item) + "'>sell</a><a href='#' class='use' data-item='" + JSON.stringify(item) + "'>use</a><a href='#' class='equip' data-item='" + JSON.stringify(item) + "'>equip</a></div>");
	itemUI.find('#item' + id + 'Label').text(item.Name + "  ");
	itemUI.find('a.sell').click(function() {
		Sell(JSON.parse($(this).attr('data-item')));
	});
	itemUI.find('a.use').click(function() {
			Use(JSON.parse($(this).attr('data-item')));
		});
		itemUI.find('a.equip').click(function() {
			Equip(JSON.parse($(this).attr('data-item')));
		});
	if (!item.IsConsumable) {		
		itemUI.find('a.use').remove();
	}
	else if (!item.IsEquippable || !item.Equipped) {
		itemUI.find('a.equip').remove();
	}
	return itemUI;
}

function GetItemShopUI(item, id) {
	var itemUI = $("<div id='item" + id + "'><span id='item" + id + "Label'></span><button type='button' class='btn' data-item='" + JSON.stringify(item) + "'><i class='fa fa-plus' aria-hidden='true'></i> buy</a></div>");
	itemUI.find('#item' + id + 'Label').text(item.Name + " - Price = " + item.Gold + "g  ");
	itemUI.find('button').click(function() {
		Buy(JSON.parse($(this).attr('data-item')), 1);
	});	
	
	if (gold >= item.Gold * 10) {
		itemUI.find('#item' + id + 'Label').append("<button type='button' class='btn buy10' data-item='" + JSON.stringify(item) + "'><i class='fa fa-plus' aria-hidden='true'></i> buy x10</a>&nbsp;&nbsp;");
		itemUI.find('button.buy10').click(function() {
			Buy(JSON.parse($(this).attr('data-item')), 10);
		});
	}	
	
	if (gold >= item.Gold * 100) {
		itemUI.find('#item' + id + 'Label').append("<button type='button' class='btn buy100' data-item='" + JSON.stringify(item) + "'><i class='fa fa-plus' aria-hidden='true'></i> buy x100</a>&nbsp;&nbsp;");
		itemUI.find('button.buy100').click(function() {
			Buy(JSON.parse($(this).attr('data-item')), 100);
		});
	}
	return itemUI;
}

// function GetItemEquipmentUI(item, id) {
	// var itemUI = $("<li id='item" + id + "'><span id='item" + id + "Label'></span><a data-item='" + JSON.stringify(item) + "'>unequip</a></li>");	
	// return itemUI;
// }

function Buy(item, amount) {
	if (gold >= item.Gold * amount) {
		gold = gold - item.Gold * amount;
		for (var i = 1; i<= amount; i++) {
			inventory.push(item);
		}
	}
	
	UpdateVariablesUI();
}

function Sell(item) {
	var value = Math.ceil(item.Gold * 0.10);
	if (value < 1)
		value = 1;
	gold = gold + value;	
	inventory.splice( $.inArray(item, inventory), 1 );	
	
	UpdateVariablesUI();
	InitializeInventory();	
}

function Use(item) {
	exp = exp + item.ConsumableExp;
	hp = hp + item.ConsumableHP;
	currentHP = currentHP + item.ConsumableCurrentHP;
	if (currentHP > hp)
		currentHP = hp;
	atk = atk + item.ConsumableATK;
	def = def + item.ConsumableDEF;
	spd = spd + item.ConsumableSPD;
	wis = wis + item.ConsumableWIS;
	
	inventory.splice( $.inArray(item, inventory), 1 );	
	UpdateVariablesUI();
	InitializeInventory();	
}

function Equip(item) {	
	battleInventory.push(item);	
	item.Equipped = true;
	ChangeItem(item.Name, item);
	UpdateEquipmentUI();
	InitializeInventory();		
}

function Unequip(item, element) {	
	battleInventory.splice( $.inArray(item, battleInventory), 1 );		
	item.Equipped = false;
	ChangeItem(item.Name, item);
	element.removeAttr("data-item");
	element.text("");
	InitializeInventory();	
}

function ChangeItem( name, item ) {
   for (var i in inventory) {
     if (inventory[i].Name == name) {
        inventory[i] = item;
        break; //Stop this loop, we found it!
     }
   }
}

function ChangeBattleItem( name, item ) {
   for (var i in battleInventory) {
     if (battleInventory[i].Name == name) {
        battleInventory[i] = item;
        break; //Stop this loop, we found it!
     }
   }
}
	
function InitializeInventory() {
	$('#inventoryContainer').html('');
	$.each(inventory, function(i, e) {
		$('#inventoryContainer').append(GetItemInventoryUI(e, 1));
	});
}

var allItems = [
	{ Id : 1, Name : "EXP Bottle", Gold : 10, IsConsumable: true,	IsEquippable: false, Equipped: false, 
	  ConsumableExp: 10, ConsumableCurrentHP: 0,	ConsumableHP: 0, ConsumableATK: 0, ConsumableDEF: 0, ConsumableSPD: 0, ConsumableWIS: 0,
	  ATK: 0, WIS: 0, Combo : 0
	},
	{ Id : 2, Name : "HP Bottle", Gold : 50, IsConsumable: true,	IsEquippable: false, Equipped: false, 
	  ConsumableExp: 0, ConsumableCurrentHP: 0,	ConsumableHP: 5, ConsumableATK: 0, ConsumableDEF: 0, ConsumableSPD: 0, ConsumableWIS: 0,
	  ATK: 0, WIS: 0, Combo : 0
	},
	{ Id : 3, Name : "Red Potion", Gold : 10, IsConsumable: true,	IsEquippable: false, Equipped: false, 
	  ConsumableExp: 0, ConsumableCurrentHP: 100,	ConsumableHP: 0, ConsumableATK: 0, ConsumableDEF: 0, ConsumableSPD: 0, ConsumableWIS: 0,
	  ATK: 0, WIS: 0, Combo : 0
	},
	{ Id : 4, Name : "Wooden Stick", Gold : 10, IsConsumable: false,	IsEquippable: true, Equipped: false, 
	  ConsumableExp: 0, ConsumableCurrentHP: 0,	ConsumableHP: 0, ConsumableATK: 0, ConsumableDEF: 0, ConsumableSPD: 0, ConsumableWIS: 0,
	  ATK: 25, WIS: 0, Combo : 0
	},
	{ Id : 5, Name : "Pointy Rock", Gold : 50, IsConsumable: false,	IsEquippable: true, Equipped: false, 
	  ConsumableExp: 0, ConsumableCurrentHP: 0,	ConsumableHP: 0, ConsumableATK: 0, ConsumableDEF: 0, ConsumableSPD: 0, ConsumableWIS: 0,
	  ATK: 30, WIS: 0, Combo : 0
	},
	{ Id : 6, Name : "Gaia Blade", Gold : 1000, IsConsumable: false,	IsEquippable: true, Equipped: false, 
	  ConsumableExp: 0, ConsumableCurrentHP: 0,	ConsumableHP: 0, ConsumableATK: 0, ConsumableDEF: 0, ConsumableSPD: 0, ConsumableWIS: 0,
	  ATK: 50, WIS: 0, Combo : 0
	},
	{ Id : 7, Name : "Spikes", Gold : 10, IsConsumable: false,	IsEquippable: true, Equipped: false, 
	  ConsumableExp: 0, ConsumableCurrentHP: 0,	ConsumableHP: 0, ConsumableATK: 0, ConsumableDEF: 0, ConsumableSPD: 0, ConsumableWIS: 0,
	  ATK: 5, WIS: 0, Combo : 0
	},
	{ Id : 8, Name : "Water Balloon", Gold : 100, IsConsumable: false,	IsEquippable: true, Equipped: false, 
	  ConsumableExp: 0, ConsumableCurrentHP: 0,	ConsumableHP: 0, ConsumableATK: 0, ConsumableDEF: 0, ConsumableSPD: 0, ConsumableWIS: 0,
	  ATK: 1, WIS: 0, Combo : 0
	},
	{ Id : 9, Name : "Zap Cannon", Gold : 1000, IsConsumable: false,	IsEquippable: true, Equipped: false, 
	  ConsumableExp: 0, ConsumableCurrentHP: 0,	ConsumableHP: 0, ConsumableATK: 0, ConsumableDEF: 0, ConsumableSPD: 0, ConsumableWIS: 0,
	  ATK: 50, WIS: 0, Combo : 0
	}
];