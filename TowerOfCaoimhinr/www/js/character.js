function CreateStat() {
	return {
		Name : "",
		Value : 0,
		Cost : 0,
		CostIncrease : 0.1
	};
}

function GetStatUI(stat, id) {
	var statUI = $("<div id='stat" + id + "'><span id='stat" + id + "Label'></span><a href='#' data-item='" + JSON.stringify(stat) + "'>upgrade for " + stat.Cost + " Exp</a></div>");
	statUI.find('#stat' + id + 'Label').text(stat.Name + " - Value = " + stat.Value + "  ");
	statUI.find('a').click(function() {
		Upgrade(JSON.parse($(this).attr('data-item')));
	});
	return statUI;
}

function Upgrade(stat) {
	if (exp >= stat.Cost) {
		exp = exp - stat.Cost;
		stat.Cost = Math.ceil(stat.Cost + stat.Cost * stat.CostIncrease);	
		stat.Value = stat.Value + 1;
				
		ChangeStat(stat.Name, stat);
	
		if (stat.Name == "HP") {
			hp = hp + 1;
		} else if (stat.Name == "ATK") {
			atk = atk + 1;
		} else if (stat.Name == "DEF") {
			def = def + 1;
		} else if (stat.Name == "SPD") {
			spd = spd + 1;
		} else if (stat.Name == "WIS") {
			wis = wis + 1;
		}
		
		UpdateVariablesUI();
		InitializeCharacter();
	}
}

function ChangeStat( name, stat ) {
   for (var i in stats) {
     if (stats[i].Name == name) {
        stats[i] = stat;
        break; //Stop this loop, we found it!
     }
   }
}
	
function InitializeCharacter() {
	$('#characterContainer').html('');
	$.each(stats, function(i, e) {
		$('#characterContainer').append(GetStatUI(e, 1));
	});
}
