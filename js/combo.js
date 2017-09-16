function Combo() {
	return {
		Id : 0,
		Name : "",
		ItemSequence : [],
		ComboSequence : [],
		AnyCombo : false,
		ModATK : 0,
		ModWIS : 0,
		ProcRate : 1
	};
}

function CheckCombo(previousItem, item) {
	var combo;
	$.each(allCombos, function(i, e) {	
		var allowCombo = false;
		if (e.ItemSequence.length == 2 &&
			e.ItemSequence[0] == previousItem.Id &&
			e.ItemSequence[1] == item.Id) {
			allowCombo = true;
		} else if (e.ComboSequence.length == 1 &&
				   e.ComboSequence[0] == previousItem.Combo &&
				   e.ItemSequence.length == 1 &&
				   e.ItemSequence[0] == item.Id) {
			allowCombo = true;
	    } else if (previousItem.Combo != 0 && e.AnyCombo &&
				   e.ItemSequence.length == 1 && e.ItemSequence[0] == item.Id) {
		    allowCombo = true;			   
		} else if (previousItem.Combo == previousItem.Combo &&
				   e.ItemSequence.length == 1 && e.ItemSequence[0] == item.Id) {
			allowCombo = true;
		}
		if (allowCombo) {
			var chance = Math.random() * 100;			
			if (chance < e.ProcRate) {
				combo = e;
				return false;
			}
		}
	});
	return combo;
}

var allCombos = [
	{ Id : 1, Name : "Tester C-C-Combo!", ItemSequence : [4, 5],	ComboSequence : [], AnyCombo : false,	ModATK : 3,	ModWIS : 0,	ProcRate : 50 },
	{ Id : 2, Name : "DOUBLE Tester C-C-Combo!", ItemSequence : [4],	ComboSequence : [1], AnyCombo : false,	ModATK : 5,	ModWIS : 0,	ProcRate : 75 },
	{ Id : 3, Name : "Titan Blade!", ItemSequence : [6],	ComboSequence : [], AnyCombo : true,	ModATK : 100,	ModWIS : 0,	ProcRate : 25 },
	{ Id : 4, Name : "Splash!", ItemSequence : [7, 8],	ComboSequence : [], AnyCombo : false,	ModATK : 1.5,	ModWIS : 0,	ProcRate : 100 },
	{ Id : 5, Name : "Electrocute!", ItemSequence : [9],	ComboSequence : [4], AnyCombo : false,	ModATK : 3,	ModWIS : 0,	ProcRate : 100 }
];

/*
 *  combinations

	1 item.
	1 item + combo.
	1 item + any combo.
	2 or more items.
	2 or more items + combo. 
	2 or more items + any combo.
 
*/