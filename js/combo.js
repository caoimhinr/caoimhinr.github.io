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

var comboItems = [];

function CheckCombo(previousItem, item) {
	var combo;
	var comboItemPush = false;
	$.each(allCombos, function(i, e) {	
		var allowCombo = false;
		// DOUBLE ITEM SEQUENCE
		if (e.ItemSequence.length == 2 &&
			e.ItemSequence[0] == previousItem.Id &&
			e.ItemSequence[1] == item.Id) {
				console.log('cond1');
			allowCombo = true;
		} 
		// SINGLE ITEM SEQUENCE
		else if (e.ItemSequence.length == 1 &&
				 e.ComboSequence.length == 0 &&
				 e.AnyCombo == false &&
				 e.ItemSequence[0] == item.Id) {
					   console.log('cond1a');
			allowCombo = true;
	    } 
		// ITEM + COMBO SEQUENCE
		else if (previousItem.Combo != 0 && 
				   e.ComboSequence.length == 1 &&
				   e.ComboSequence[0] == previousItem.Combo &&
				   e.ItemSequence.length == 1 &&
				   e.ItemSequence[0] == item.Id) {
					   console.log('cond2');
			allowCombo = true;
	    } 
		// ITEM + ANY COMBO SEQUENCE
		else if (previousItem.Combo != 0 && e.AnyCombo &&
				   e.ItemSequence.length == 1 && e.ItemSequence[0] == item.Id) {
					   console.log('cond3');
		    allowCombo = true;			   
		} // TRIPLE ITEM COMBO SEQUENCE
		else if (e.ItemSequence.length == 3 &&
				   comboItems.length == 0 &&
				   e.ItemSequence[0] == item.Id) {
				console.log('cond4');
				comboItems.push(item.Id);
				comboItemPush = true;
		} else if (e.ItemSequence.length == 3 &&
				   comboItems.length == 1 &&
				   e.ItemSequence[0] == previousItem.Id &&
				   e.ItemSequence[1] == item.Id) {
				console.log('cond5');
				comboItems.push(item.Id);
				comboItemPush = true;
		} else if (e.ItemSequence.length == 3 &&
				   comboItems.length == 2 &&
				   comboItems[0] == e.ItemSequence[0] &&
				   comboItems[1] == e.ItemSequence[1] &&
				   e.ItemSequence[2] == item.Id) {
				console.log('cond6');				
			allowCombo = true;
		} // QUADRUPLE ITEM COMBO SEQUENCE
		else if (e.ItemSequence.length == 4 &&
				   comboItems.length == 0 &&
				   e.ItemSequence[0] == item.Id) {
				console.log('cond7');
				comboItems.push(item.Id);
				comboItemPush = true;
		} else if (e.ItemSequence.length == 4 &&
				   comboItems.length == 1 &&
				   e.ItemSequence[0] == previousItem.Id &&
				   e.ItemSequence[1] == item.Id) {
				console.log('cond8');
				comboItems.push(item.Id);
				comboItemPush = true;
		} else if (e.ItemSequence.length == 4 &&
				   comboItems.length == 2 &&
				   comboItems[0] == e.ItemSequence[0] &&
				   comboItems[1] == e.ItemSequence[1] &&
				   e.ItemSequence[2] == item.Id) {
				console.log('cond9');	
				comboItems.push(item.Id);
				comboItemPush = true;
		} else if (e.ItemSequence.length == 4 &&
				   comboItems.length == 3 &&
				   comboItems[0] == e.ItemSequence[0] &&
				   comboItems[1] == e.ItemSequence[1] &&
				   comboItems[2] == e.ItemSequence[2] &&
				   e.ItemSequence[3] == item.Id) {
				console.log('cond10');				
			allowCombo = true;
		}
		
		if (allowCombo) {
			comboItems = [];
			var chance = Math.random() * 100;			
			if (chance < e.ProcRate) {
				combo = e;
				return false;
			}
		}
	});
	if (comboItems.length >= 4 ||
		!comboItemPush) {
		comboItems = [];
	}
	return combo;
}

var allCombos = (function() {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "../json/data-combo.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();

// var allCombos = [
	// { Id : 1, Name : "Tester C-C-Combo!", ItemSequence : [4, 5],	ComboSequence : [], AnyCombo : false,	ModATK : 3,	ModWIS : 0,	ProcRate : 50 },
	// { Id : 2, Name : "DOUBLE Tester C-C-Combo!", ItemSequence : [4],	ComboSequence : [1], AnyCombo : false,	ModATK : 5,	ModWIS : 0,	ProcRate : 75 },
	// { Id : 3, Name : "Titan Blade!", ItemSequence : [6],	ComboSequence : [], AnyCombo : true,	ModATK : 100,	ModWIS : 0,	ProcRate : 25 },
	// { Id : 4, Name : "Splash!", ItemSequence : [7, 8],	ComboSequence : [], AnyCombo : false,	ModATK : 1.5,	ModWIS : 0,	ProcRate : 100 },
	// { Id : 5, Name : "Electrocute!", ItemSequence : [9],	ComboSequence : [4], AnyCombo : false,	ModATK : 3,	ModWIS : 0,	ProcRate : 100 },
	// { Id : 6, Name : "QQQQ Stick!", ItemSequence : [4, 4, 4, 4],	ComboSequence : [], AnyCombo : false,	ModATK : 10,	ModWIS : 0,	ProcRate : 100 }
// ];

/*
 *  combinations

	1 item.
	1 item + combo.
	1 item + any combo.
	2 or more items.
	2 or more items + combo. 
	2 or more items + any combo.
 
*/