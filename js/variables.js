var gold = 0;
var goldTimer = 0;
var exp = 0;
var totalExp = 0;

var hp = 10;
var currentHP = 10;
var regenRate = 0.01;
var atk = 5;
var def = 0;
var spd = 1;
var wis = 0;

var stats = [];

function UpdateVariables() {
	gold = Math.ceil(gold + 1);
	UpdateVariablesUI();
}

function UpdateVariablesUI() {
	$('#gold').text("Gold: " + gold);
	$('#exp').text("Exp: " + exp);
	$('#hp').text("HP: " + currentHP + "/" + hp);
	$('#atk').text("ATK: " + atk);
	$('#def').text("DEF: " + def);
	$('#spd').text("SPD: " + spd);
	$('#wis').text("WIS: " + wis);		
}

function UpdateEquipmentUI() {
	// $('#equipment ul').html('');
	// $.each(battleInventory, function(i, e) {
		//$('#equipment ul').append(GetItemEquipmentUI(e, 1));
	// });
	if (battleInventory.length > 0) {
		$("#equip1").text(battleInventory[0].Name);
		$("#equip1").attr('data-item', JSON.stringify(battleInventory[0]));
	}
	if (battleInventory.length > 1) {
		$("#equip2").text(battleInventory[1].Name);
		$("#equip2").attr('data-item', JSON.stringify(battleInventory[1]));
	}
	if (battleInventory.length > 2) {
		$("#equip3").text(battleInventory[2].Name);
		$("#equip3").attr('data-item', JSON.stringify(battleInventory[2]));
	}
	if (battleInventory.length > 3) {
		$("#equip4").text(battleInventory[3].Name);
		$("#equip4").attr('data-item',JSON.stringify( battleInventory[3]));
	}
}

function ResetVariables() {
	gold = 0;
	exp = 0;
	hp = 10;
	currentHP = 10;
	atk = 5;
	def = 0;
	spd = 1;
	wis = 0;
	inventory = [];
	stats = [];
	UpdateVariablesUI();
}
	
function SaveGameState() {
	Cookies.set('variables', { gold: gold, exp: exp, totalExp: totalExp, hp: hp, currentHP : currentHP, atk: atk, def: def, spd: spd, wis: wis });
	Cookies.set('inventory', inventory);
	Cookies.set('battleInventory', battleInventory);
	Cookies.set('stats', stats);
}

function LoadGameState() {	
	var variablesCookie = Cookies.getJSON('variables');
	
	if (isNaN(variablesCookie.gold)) { gold = 0; } else { gold = parseInt(variablesCookie.gold); }
	if (isNaN(variablesCookie.exp)) { exp = 0; } else { exp = parseInt(variablesCookie.exp); }
	if (isNaN(variablesCookie.totalExp)) { totalExp = exp; } else { totalExp = parseInt(variablesCookie.totalExp); }
	if (isNaN(variablesCookie.hp)) { hp = 10; } else { hp = parseInt(variablesCookie.hp); }
	if (isNaN(variablesCookie.currentHP)) { currentHP = 10; } else { currentHP = parseInt(variablesCookie.currentHP); }
	if (isNaN(variablesCookie.atk)) { atk = 5; } else { atk = parseInt(variablesCookie.atk); }
	if (isNaN(variablesCookie.def)) { def = 0; } else { def = parseInt(variablesCookie.def); }
	if (isNaN(variablesCookie.spd)) { spd = 1; } else { spd = parseInt(variablesCookie.spd); }
	if (isNaN(variablesCookie.wis)) { wis = 0; } else { wis = parseInt(variablesCookie.wis); }
	
	var inventoryCookie = Cookies.getJSON('inventory');	
	if (typeof(inventoryCookie) !== 'undefined') {
		inventory = inventoryCookie;
	} else {
		inventory = [];
	}
	
	var battleInventoryCookie = Cookies.getJSON('battleInventory');	
	if (typeof(battleInventoryCookie) !== 'undefined') {
		battleInventory = battleInventoryCookie;
	} else {
		battleInventory = [];
	}
		
	var statHP = CreateStat();
	statHP.Name = "HP";
	statHP.Value = hp;
	statHP.Cost = 10;
	statHP.CostIncrease = 0.1;
	stats.push(statHP);
	
	var statATK = CreateStat();
	statATK.Name = "ATK";
	statATK.Value = atk;
	statATK.Cost = 10;
	statATK.CostIncrease = 0.1;
	stats.push(statATK);
	
	var statDEF = CreateStat();
	statDEF.Name = "DEF";
	statDEF.Value = def;
	statDEF.Cost = 10;
	statDEF.CostIncrease = 0.1;
	stats.push(statDEF);
	
	var statSPD = CreateStat();
	statSPD.Name = "SPD";
	statSPD.Value = spd;
	statSPD.Cost = 10;
	statSPD.CostIncrease = 0.1;
	stats.push(statSPD);
	
	var statWIS = CreateStat();
	statWIS.Name = "WIS";
	statWIS.Value = wis;
	statWIS.Cost = 10;
	statWIS.CostIncrease = 0.1;
	stats.push(statWIS);
		
	var statsCookie = Cookies.getJSON('stats');
	$.each(statsCookie, function(i, e) {
		ChangeStat(e.Name, e);
	});
}

var isTraining = false;
var currentEnemy = {};
var battleTimer = 0;
var comboLevel = 0;

var inventory = [];
var battleInventory = [];
var battleInventoryIndex = 0;

function GetPreviousBattleInventoryItem() {
	var index = battleInventoryIndex - 1;
	if (index < 0) {
		index = battleInventory.length - 1;
	}
	return battleInventory[index];
}

function GetNextBattleInventoryItem() {
	var item = battleInventory[battleInventoryIndex];
	battleInventoryIndex += 1;
	if (battleInventoryIndex + 1 > battleInventory.length) {
		battleInventoryIndex = 0;
	}
	return item;
}