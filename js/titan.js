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
			player.Name = $('#playerName').val();
			
			$.each(titans, function(i, e) {
				var damage = $('#titan' + e.Level).val();
				if (damage > 0) {
					var stat = new Stat();
					stat.Level = e.Level;
					stat.Damage = damage;
					stat.Titan = e;
					player.Stats.push(stat);
				}
			});
			
			players.push(player);
			RefreshPlayerCombo();
			$('#cboPlayers').val(player.Name);
			console.log(player);
		});
		//NEW
		$('#btnNew').click(function() {
			Load(new Player());
		});
		//PLAYER LOAD
		$('#cboPlayers').on('change', function() {
			var player = GetPlayer(this.value);
			Load(player);
			console.log("changed");
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
						titan.HP + "</div><div class='col-md-5'>Damage - Current: " + stat.Damage + "</div><input type='text' id='titan" + titan.Level + "' class='col-md-3' value='0' /></div>");
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

function GetStat(player, level) {
	for (var i in player.Stats) {
     if (player.Stats[i].Level == level) {
		return jQuery.extend(true, {}, player.Stats[i]);
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