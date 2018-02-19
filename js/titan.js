function Player() {
	return {
		Name : "",
		Stats : []
	};
}

function Stat(){
	return {
		Element: "",
		Values: []
	};
}

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
			$('#titans').append(GetTitanUI(e, 1));
		});
		
		var player = new Player();
		player.Name = "Caoimhinr";
		
		var stat = new Stat();
		stat.Element = "Water";
		stat.Values = [
		
		];
	});
})();

function GetTitanUI(item, id) {
	var titanUI = $("<div class='row'><div class='col-md-1'>" + 
						item.Level + "</div><div class='col-md-2'>" + 
						item.Element + "</div><div class='col-md-3'>" + 
						item.HP + "</div><div class='col-md-2'>Damage:</div><input type='text' id='playerDamage' class='col-md-4' /></div>");
	return titanUI;
}