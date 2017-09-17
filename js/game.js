(function() {
	$(document).ready(function() {
		LoadGameState();
		$('#equipment a').click(function() {
			Unequip(JSON.parse($(this).attr('data-item')), $(this));
		});
				
		UpdateVariablesUI();
		UpdateEquipmentUI();
		$('#training').click(function() {
			HideAllContent();
			$('#trainingLog').html('');
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
		
		//temp
			$('#trainingLog').html('');
			InitializeTraining();
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
			var regeneratedHealth = Math.ceil(currentHP * regenRate);
			currentHP += regeneratedHealth;		
			var hBar = $('#trainingPlayerHealth.health-bar');
			SetHealthBarValue(hBar, regeneratedHealth, false);			
			
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