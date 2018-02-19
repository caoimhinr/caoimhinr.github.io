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
		$('#titans').html('');
		$.each(titans, function(i, e) {
			$('#titans').append(GetTitanUI(null, e, 1));
		});
		
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
			console.log(player);
		});
		
	});
})();

function GetTitanUI(stat, titan, id) {
	var titanUI = $("<div class='row'><div class='col-md-1'>" + 
						titan.Level + "</div><div class='col-md-1'>" + 
						titan.Element + "</div><div class='col-md-2'>" + 
						titan.HP + "</div><div class='col-md-5'>Damage - Current: " + 10000000 + "</div><input type='text' id='titan" + titan.Level + "' class='col-md-3' value='0' /></div>");
	return titanUI;
}

function RefreshPlayerCombo() {
	$.each(players, function(i, e) {
		$('#cboPlayers').html('');
		$('#cboPlayers').append("<option>" + e.Name + "</option>");
	});
}