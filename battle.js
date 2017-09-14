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
	var item = GetNextBattleInventoryItem()
	currentEnemy.CurrentHP -= item.ATK;
	if (currentEnemy.CurrentHP <= 0) {
		currentEnemy.CurrentHP = 0;
		isTraining = false;
	}
	TrainingLog("Your " + item.Name + " deals " + item.ATK + " damage to " + currentEnemy.Name + ". (" + currentEnemy.CurrentHP + "/" + currentEnemy.HP + ")");
	
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
	
function TrainingLog(message) {
	$('#trainingLog').prepend("<p>" + message + "</p>");
}