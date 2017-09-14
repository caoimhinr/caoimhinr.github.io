(function() {
	$(document).ready(function() {
		LoadGameState();
		UpdateVariablesUI();
		$('#training').click(function() {
			HideAllContent();
			$('#trainingContent').html('<span>TRAINING</span><br /><div id="trainingLog"></div>');
			if (currentHP <= 0) {
				$('#trainingContent').show();
				TrainingLog("You cannot train with 0HP.");
			} else {
				currentEnemy = CreateNPC();
				currentEnemy.Name = "Peasant";
				currentEnemy.HP = 100;
				currentEnemy.CurrentHP = currentEnemy.HP;
				currentEnemy.ATK = 1;
				currentEnemy.EXP = 10;
				currentEnemy.Gold = 50;
				isTraining = true;
				$('#trainingContent').show();
				TrainingLog(currentEnemy.Name + " appears.");
			}
		});
		$('#plaza').click(function() {
			HideAllContent();
			InitializePlaza();
			$('#plazaContent').show();
		});
		$('#inventory').click(function() {
			HideAllContent();
			InitializeInventory();
			$('#inventoryContent').show();
		});
		$('#character').click(function() {
			HideAllContent();
			InitializeCharacter();
			$('#characterContent').show();
		});
		$('#reset').click(function() {
			HideAllContent();
			ResetVariables();
		});
	});
	
    setInterval(onTimerTick, 100);
	
	function onTimerTick() {
		// Do stuff.
		if (goldTimer >= 5) {
			goldTimer = 0;
			UpdateVariables();
		}		
		else {
			UpdateVariablesUI();
		}
		
		if (isTraining && 
			typeof(currentEnemy !== "undefined")) {
			var speedMod = 5 - spd;
			if (battleTimer % speedMod == 0) {
				if (spd >= currentEnemy.SPD) {
					currentEnemy.CurrentHP -= atk;
					currentHP -= currentEnemy.ATK;	

					if (currentEnemy.CurrentHP <= 0) {
						currentEnemy.CurrentHP = 0;
						isTraining = false;
					} else if (currentHP <= 0) {
						currentHP = 0;
						isTraining = false;
					}	
					TrainingLog("You attack enemy " + currentEnemy.Name + ". (" + currentEnemy.CurrentHP + "/" + currentEnemy.HP + ")");									
					TrainingLog("Enemy " + currentEnemy.Name + " attacks you. (" + currentHP + "/" + hp + ")");
				} else {
					currentHP -= currentEnemy.ATK;
					currentEnemy.CurrentHP -= atk;
					
					if (currentEnemy.CurrentHP <= 0) {
						currentEnemy.CurrentHP = 0;
						isTraining = false;
					} else if (currentHP <= 0) {
						currentHP = 0;
						isTraining = false;
					}								
					TrainingLog("Enemy " + currentEnemy.Name + " attacks you. (" + currentHP + "/" + hp + ")");	
					TrainingLog("You attack enemy " + currentEnemy.Name + ". (" + currentEnemy.CurrentHP + "/" + currentEnemy.HP + ")");	
				}
								
				if (!isTraining) {
					if (currentEnemy.CurrentHP == 0) {
						exp += currentEnemy.EXP;
						gold += currentEnemy.Gold;
						TrainingLog("You defeated " + currentEnemy.Name + " and gained " + currentEnemy.EXP + " Exp and " + currentEnemy.Gold + " gold.");						
					} else {
						var goldLost = gold * 0.5;
						gold -= goldLost;
						exp += 5;
						TrainingLog("You were defeated by " + currentEnemy.Name + " and lost " + goldLost + " gold.");						
					}
				}
			}
			battleTimer += 1;
		}
		
		goldTimer += 1;
		
		SaveGameState();
	}
	
	function HideAllContent() {
		$('.content').hide();
	}
	
	function TrainingLog(message) {
		$('#trainingLog').prepend("<p>" + message + "</p>");
	}
	
	
})();