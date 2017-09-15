function InitializeTraining() {
	battleInventoryIndex = 0;
	comboLevel = 0;
	for (var i in battleInventory) {     
        battleInventory[i].Combo = 0;      
   }
	if (currentHP <= 0) {
		TrainingLog("You cannot train with 0HP.");
	}
	else if (battleInventory.length == 0) {		
		TrainingLog("You need to equip an item first.");	
	} else {
		currentEnemy = GetEnemy(3);
		isTraining = true;
		TrainingLog(currentEnemy.Name + " appears.");
	}
	$('#trainingContent').show();
}

function BattleTraining() {
	var playerSpeedMod = Math.ceil(5 - spd * 0.02);
	if (playerSpeedMod < 1)
		playerSpeedMod = 1;
	var enemySpeedMod = Math.ceil(5 - currentEnemy.SPD * 0.02);
	if (enemySpeedMod < 1)
		enemySpeedMod = 1;
	if (isTraining && battleTimer % playerSpeedMod == 0) {
		PlayerPhase();
	}
	if (isTraining && battleTimer % enemySpeedMod == 0) {
		EnemyPhase();
	}
	battleTimer += 1;
}

function PlayerPhase() {
	var previousItem = GetPreviousBattleInventoryItem();
	var item = GetNextBattleInventoryItem();
	var combo = CheckCombo(previousItem, item);
	var useCombo = typeof(combo) !== "undefined";
	var damage = 0;
	
	if (useCombo) {
		damage = Math.ceil(item.ATK * combo.ModATK);			
		item.Combo = combo.Id;
		ChangeBattleItem(item.Name, item);
		comboLevel += 1;
	} else {
		comboLevel = 0;
		damage = item.ATK;
	}	
	currentEnemy.CurrentHP -= damage;
	
	if (currentEnemy.CurrentHP <= 0) {
		currentEnemy.CurrentHP = 0;
		isTraining = false;
	}
	
	if (useCombo) {
		TrainingLog(item.Name + "'s \"" + combo.Name + "\" deals " + damage + " damage to " + currentEnemy.Name + ". (" + currentEnemy.CurrentHP + "/" + currentEnemy.HP + ")", comboLevel);
	} else {
		TrainingLog("Your " + item.Name + " deals " + damage + " damage to " + currentEnemy.Name + ". (" + currentEnemy.CurrentHP + "/" + currentEnemy.HP + ")", comboLevel);
	}
	
	if (!isTraining && currentEnemy.CurrentHP == 0) {
		exp += currentEnemy.EXP;
		gold += currentEnemy.Gold;
		TrainingLog("You defeated " + currentEnemy.Name + " and gained " + currentEnemy.EXP + " Exp and " + currentEnemy.Gold + " gold.");
	}
}

function EnemyPhase() {
	currentHP -= currentEnemy.ATK;
	if (currentHP <= 0) {
		currentHP = 0;
		isTraining = false;
	}
	TrainingLog("Enemy " + currentEnemy.Name + " attacks you. (" + currentHP + "/" + hp + ")");	
	
	if (!isTraining && currentHP == 0) {					
		var goldLost = gold * 0.5;
		gold -= goldLost;
		exp += 5;
		TrainingLog("You were defeated by " + currentEnemy.Name + " and lost " + goldLost + " gold.");
	}
}
	
function TrainingLog(message, comboLevel) {
	var logItem = "<p>" + message + "</p>";
	if (comboLevel == 1) {
		logItem = "<p style='font-weight:bold;color:#900;'>" + message + "</p>";
	} else if (comboLevel == 2) {
		logItem = "<p style='font-weight:bold;color:#090;font-size:12pt;'>" + message + "</p>";
	} else if (comboLevel == 3) {
		logItem = "<p style='font-weight:bold;color:#009;font-size:13pt;'>" + message + "</p>";
	}
	$('#trainingLog').prepend(logItem);
}