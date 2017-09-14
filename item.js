function CreateItem() {
	return {
		Name : "",
		Gold : 0,
		IsConsumable: false,
		IsEquippable: false,
		ConsumableExp: 0,
		ConsumableCurrentHP: 0,
		ConsumableHP: 0,
		ConsumableATK: 0,
		ConsumableDEF: 0,
		ConsumableSPD: 0,
		ConsumableWIS: 0
	};
}

function GetItemInventoryUI(item, id) {
	var itemUI = $("<div id='item" + id + "'><span id='item" + id + "Label'></span><a href='#' class='sell' data-item='" + JSON.stringify(item) + "'>sell</a></div>");
	itemUI.find('#item' + id + 'Label').text(item.Name + "  ");
	itemUI.find('a.sell').click(function() {
		Sell(JSON.parse($(this).attr('data-item')));
	});
	
	if (item.IsConsumable) {
		itemUI.find('#item' + id + 'Label').append("<a href='#' class='use' data-item='" + JSON.stringify(item) + "'>use</a>&nbsp;&nbsp;");
		itemUI.find('a.use').click(function() {
			Use(JSON.parse($(this).attr('data-item')));
		});
	}
	return itemUI;
}

function GetItemShopUI(item, id) {
	var itemUI = $("<div id='item" + id + "'><span id='item" + id + "Label'></span><a href='#' data-item='" + JSON.stringify(item) + "'>buy</a></div>");
	itemUI.find('#item' + id + 'Label').text(item.Name + " - Price = " + item.Gold + "g  ");
	itemUI.find('a').click(function() {
		Buy(JSON.parse($(this).attr('data-item')), 1);
	});	
	
	if (gold >= item.Gold * 10) {
		itemUI.find('#item' + id + 'Label').append("<a href='#' class='buy10' data-item='" + JSON.stringify(item) + "'>buy x10</a>&nbsp;&nbsp;");
		itemUI.find('a.buy10').click(function() {
			Buy(JSON.parse($(this).attr('data-item')), 10);
		});
	}	
	
	if (gold >= item.Gold * 100) {
		itemUI.find('#item' + id + 'Label').append("<a href='#' class='buy100' data-item='" + JSON.stringify(item) + "'>buy x100</a>&nbsp;&nbsp;");
		itemUI.find('a.buy100').click(function() {
			Buy(JSON.parse($(this).attr('data-item')), 100);
		});
	}
	return itemUI;
}

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
	
function InitializeInventory() {
	$('#inventoryContent').html('<span>INVENTORY</span><br />');
	$.each(inventory, function(i, e) {
		$('#inventoryContent').append(GetItemInventoryUI(e, 1));
	});
}