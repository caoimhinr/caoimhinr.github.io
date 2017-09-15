(function() {
	$(document).ready(function() {
		LoadGameState();
		UpdateVariablesUI();
		UpdateEquipmentUI();
		$('#training').click(function() {
			HideAllContent();
			$('#trainingContent').html('<span>TRAINING</span><br /><div id="trainingLog"></div>');
			InitializeTraining();
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
		} else if (currentHP < hp) {
			currentHP += Math.ceil(currentHP * regenRate);
			if (currentHP >= hp) {
				currentHP = hp;
			}
		}
		
		goldTimer += 1;
		
		SaveGameState();
	}
	
	function HideAllContent() {
		$('.content').hide();
	}
	
	
})();