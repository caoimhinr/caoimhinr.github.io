(function() {
	$(document).ready(function() {
		LoadGameState();
		UpdateVariablesUI();
		UpdateEquipmentUI();
		$('#training').click(function() {
			HideAllContent();
			$('#trainingContent').html('<span>TRAINING</span><br /><div id="trainingLog"></div>');
			InitializeTraining();
			$('#toggle').prop("checked", false);
		});
		$('#plaza').click(function() {
			HideAllContent();
			InitializePlaza();
			$('#plazaContent').show();
			$('#toggle').prop("checked", false);
		});
		$('#inventory').click(function() {
			HideAllContent();
			InitializeInventory();
			$('#inventoryContent').show();
			$('#toggle').prop("checked", false);
		});
		$('#character').click(function() {
			HideAllContent();
			InitializeCharacter();
			$('#characterContent').show();
			$('#toggle').prop("checked", false);
		});
		$('#reset').click(function() {
			HideAllContent();
			ResetVariables();
			$('#toggle').prop("checked", false);
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
			if (currentHP == 0) {
				currentHP = 1;
			}
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