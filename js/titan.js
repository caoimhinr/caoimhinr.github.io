function Player() {
	return {
		Name : "",
		Stats : []
	};
}

function Stat(){
	return {
		Level: 0,
		Team: 0,
		Damage: 0
		//Titan : 0
	};
}

var currentPlayer = new Player();
var players = [];
var titans = (function() {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "../json/data-titan.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
	
(function() {
	$(document).ready(function() {
		//SAVE
		$('#btnSave').click(function() {			
			var player = new Player();
			var playerName = $('#playerName').val();
			var currentPlayer = GetPlayer(playerName);
			if (typeof(currentPlayer) !== "undefined")
					player = currentPlayer;
			else
				player.Name = playerName;
			
			$.each(titans, function(i, e) {
				for (var i = 1; i <= 5; i++) {
					var damage = parseInt($('#titan' + e.Level + i).val());
					var current = parseInt($('#titan' + e.Level + i).attr("data-current"));
					if (damage > 0) {
						var newDamage = damage;
						if (current > 0)
							newDamage = (damage + current) / 2;
						//console.log(damage + " + " + current + " / 2 = " + newDamage);
						var stat = new Stat();					
						if (typeof(currentPlayer) !== "undefined")
							stat = GetStat(player, e.Level, i);
						stat.Level = e.Level;
						stat.Team = i;
						stat.Damage = newDamage;
						//stat.Titan = e;
						if (typeof(currentPlayer) !== "undefined")
							ChangeStat(player, e.Level, i, stat);
						else
							player.Stats.push(stat);
						//UPDATE UI
						$('#currentDamage' + e.Level + i).html("Current damage (avg): " + newDamage);
						$('#titan' + e.Level + i).attr("data-current", newDamage);
						$('#titan' + e.Level + i).val(0);
					}
				}
			});
			
			if (typeof(currentPlayer) == "undefined")
				players.push(player);
			else
				ChangePlayer(player.Name, player);
			RefreshPlayerCombo();
			$('#cboPlayers').val(player.Name);
		});
		//NEW
		$('#btnNew').click(function() {
			Load(new Player());
		});
		//PLAYER LOAD
		$('#cboPlayers').on('change', function() {
			var player = GetPlayer(this.value);
			Load(player);
		});
		//EXPORT-IMPORT
		$('#btnExport').click(function() {
			Export();
		});
		$('#btnImport').click(function() {
			Import();
			Load(players[0]);
		});
	});
})();

function Load(player) {
	$('#titans').html('');
	$('#playerName').val(player.Name);
	$.each(titans, function(i, e) {
		var stat1 = GetStat(player, e.Level, 1);
		var stat2 = GetStat(player, e.Level, 2);
		var stat3 = GetStat(player, e.Level, 3);
		var stat4 = GetStat(player, e.Level, 4);
		var stat5 = GetStat(player, e.Level, 5);
		if (typeof(stat1) == "undefined")
			stat1 = new Stat();
		if (typeof(stat2) == "undefined")
			stat2 = new Stat();
		if (typeof(stat3) == "undefined")
			stat3 = new Stat();
		if (typeof(stat4) == "undefined")
			stat4 = new Stat();
		if (typeof(stat5) == "undefined")
			stat5 = new Stat();
		$('#titans').append(GetTitanUI(stat1, stat2, stat3, stat4, stat5, e, 1));
	});
}

function GetTitanUI(stat1, stat2, stat3, stat4, stat5, titan, id) {
	var titanUI = $("<div class='row' style='border-bottom: 1px solid #fff;'><div class='col-md-1'>" + 
						titan.Level + "</div><div class='col-md-1'>" + 
						titan.Element + "</div><div class='col-md-2'>" + 
						titan.HP + "</div><div class='col-md-3'>" + 
						"<p id='currentDamage" + titan.Level + "1'>Current damage (avg): " + stat1.Damage + "</p>" +
						"<p id='currentDamage" + titan.Level + "2'>Current damage (avg): " + stat2.Damage + "</p>" +
						"<p id='currentDamage" + titan.Level + "3'>Current damage (avg): " + stat3.Damage + "</p>" +
						"<p id='currentDamage" + titan.Level + "4'>Current damage (avg): " + stat4.Damage + "</p>" +
						"<p id='currentDamage" + titan.Level + "5'>Current damage (avg): " + stat5.Damage + "</p>" +
						"</div><div class='col-md-3'>" +
						"<span>Team 1</span><input type='number' id='titan" + titan.Level + "1' data-current='" + stat1.Damage + "' value='0' />" + 
						"<span>Team 2</span><input type='number' id='titan" + titan.Level + "2' data-current='" + stat2.Damage + "' value='0' />" +
						"<span>Team 3</span><input type='number' id='titan" + titan.Level + "3' data-current='" + stat3.Damage + "' value='0' />" + 
						"<span>Team 4</span><input type='number' id='titan" + titan.Level + "4' data-current='" + stat4.Damage + "' value='0' />" +
						"<span>Team 5</span><input type='number' id='titan" + titan.Level + "5' data-current='" + stat5.Damage + "' value='0' />" +
						"</div></div>");
	return titanUI;
}

function RefreshPlayerCombo() {
	$('#cboPlayers').html('');
	$.each(players, function(i, e) {
		$('#cboPlayers').append("<option>" + e.Name + "</option>");
	});
}

function GetPlayer(name) {
	for (var i in players) {
     if (players[i].Name == name) {
		return jQuery.extend(true, {}, players[i]);
        break; //Stop this loop, we found it!
     }
   }
}

function ChangePlayer(name, player ) {
   for (var i in players) {
     if (players[i].Name == name) {
        players[i] = player;
        break; //Stop this loop, we found it!
     }
   }
}

function GetStat(player, level, team) {
	for (var i in player.Stats) {
     if (player.Stats[i].Level == level &&
		 player.Stats[i].Team == team) {
		return jQuery.extend(true, {}, player.Stats[i]);
        break; //Stop this loop, we found it!
     }
   }
}

function ChangeStat(player, level, team, stat ) {
   for (var i in player.Stats) {
     if (player.Stats[i].Level == level &&
		 player.Stats[i].Team == team) {
        player.Stats[i] = stat;
        break; //Stop this loop, we found it!
     }
   }
}

function Export() {
	$('#json').val(JSON.stringify(players));
}

function Import() {
	players = JSON.parse($('#json').val());
	RefreshPlayerCombo();
}