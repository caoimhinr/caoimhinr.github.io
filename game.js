(function() {
	$(document).ready(function() {
		LoadGameState();
		UpdateVariablesUI();
		UpdateEquipmentUI();
		$('#training').click(function() {
			HideAllContent();
			$('#trainingContent').html('<span>TRAINING</span><br /><div id="trainingLog"></div>');
			battleInventoryIndex = 0;
			if (currentHP <= 0) {
				$('#trainingContent').show();
				TrainingLog("You cannot train with 0HP.");
			} else {
				currentEnemy = CreateNPC();
				currentEnemy.Name = "Peasant";
				currentEnemy.HP = 200;
				currentEnemy.CurrentHP = currentEnemy.HP;
				currentEnemy.ATK = 1;
				currentEnemy.EXP = 10;
				currentEnemy.Gold = 50;
				currentEnemy.SPD = 10;
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
			BattleTraining();
		}
		
		goldTimer += 1;
		
		SaveGameState();
	}
	
	function HideAllContent() {
		$('.content').hide();
	}
	
	
})();