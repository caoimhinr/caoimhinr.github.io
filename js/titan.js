function Player() {
	return {
		Name : "",
		Stats : []
	};
}

function Stat(){
	return {
		Level: 0,
		Damage: 0,
		Titan : {}
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
				var damage = parseInt($('#titan' + e.Level).val());
				var current = parseInt($('#titan' + e.Level).attr("data-current"));
				if (damage > 0) {
					var newDamage = damage;
					if (current > 0)
						newDamage = (damage + current) / 2;
					console.log(damage + " + " + current + " / 2 = " + newDamage);
					var stat = new Stat();					
					if (typeof(currentPlayer) !== "undefined")
						stat = GetStat(player, e.Level);
					stat.Level = e.Level;
					stat.Damage = newDamage;
					stat.Titan = e;
					if (typeof(currentPlayer) !== "undefined")
						ChangeStat(player, e.Level, stat);
					else
						player.Stats.push(stat);
					//UPDATE UI
					$('#currentDamage' + e.Level).html("Damage - Current: " + newDamage);
					$('#titan' + e.Level).attr("data-current", newDamage);
					$('#titan' + e.Level).val(0);
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
		var stat = GetStat(player, e.Level);
		if (typeof(stat) == "undefined")
			stat = new Stat();
		$('#titans').append(GetTitanUI(stat, e, 1));
	});
}

function GetTitanUI(stat, titan, id) {
	var titanUI = $("<div class='row'><div class='col-md-1'>" + 
						titan.Level + "</div><div class='col-md-1'>" + 
						titan.Element + "</div><div class='col-md-2'>" + 
						titan.HP + "</div><div class='col-md-5' id='currentDamage" + titan.Level + "'>Damage - Current: " + stat.Damage + "</div><input type='number' id='titan" + titan.Level + "' data-current='" + stat.Damage + "' class='col-md-3' value='0' /></div>");
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

function GetStat(player, level) {
	for (var i in player.Stats) {
     if (player.Stats[i].Level == level) {
		return jQuery.extend(true, {}, player.Stats[i]);
        break; //Stop this loop, we found it!
     }
   }
}

function ChangeStat(player, level, stat ) {
   for (var i in player.Stats) {
     if (player.Stats[i].Level == level) {
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