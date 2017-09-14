(function() {
	$(document).ready(function() {
		LoadGameState();
		UpdateVariablesUI();
		$('#training').click(function() {
			HideAllContent();
			$('#trainingContent').html('<span>TRAINING</span><br /><div id="trainingLog"></div>');
			currentEnemy = CreateNPC();
			currentEnemy.Name = "Peasant";
			currentEnemy.HP = 100;
			currentEnemy.CurrentHP = currentEnemy.HP;
			currentEnemy.ATK = 1;
			isTraining = true;
			$('#trainingContent').show();
			$('#trainingLog').append("<p>" + currentEnemy.Name + " appears.</p>");
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
	
    setInterval(onTimerTick, 500);
	
	function onTimerTick() {
		// Do stuff.
		UpdateVariables();
		
		if (isTraining && typeof(currentEnemy !== "undefined")) {
			
			
			if (currentEnemy.HP <= 0) {
				isTraining = false;
			}
			battleTimer = battleTimer + 1;
		}
		
		SaveGameState();
	}
	
	function HideAllContent() {
		$('.content').hide();
	}
	
	
})();