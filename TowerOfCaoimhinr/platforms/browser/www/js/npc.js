function NPC() {
	return {
		Id : 0,
		Name : "",
		HP : 0,
		CurrentHP : 0,
		ATK : 0,
		DEF : 0,
		SPD : 0,
		WIS : 0,
		EXP : 0,
		Gold : 0
	};
}

function GetEnemy(id) {
	for (var i in allEnemies) {
     if (allEnemies[i].Id == id) {
		return jQuery.extend(true, {}, allEnemies[i]);
        break; //Stop this loop, we found it!
     }
   }
}

function GetTowerEnemy(id, level) {
	for (var i in allEnemies) {
     if (allEnemies[i].Id == id) {
		 var enemy = jQuery.extend(true, {}, allEnemies[i]);
		 enemy.HP *= Math.ceil(level.ModHP);
		 enemy.ATK *= Math.ceil(level.ModATK);
		 enemy.SPD *= Math.ceil(level.ModSPD);
		return enemy;
        break; //Stop this loop, we found it!
     }
   }
}

function GetLevel(level) {
	for (var i in allLevels) {
		if (allLevels[i].Level == level) {
			var level = allLevels[i];
			return jQuery.extend(true, {}, level);
			break;
		}
	}
}

var allEnemies = (function() {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "../json/data-npc.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
// var allEnemies = [
	// { Id : 1, Name : "Peasant", HP : 200, CurrentHP : 200, ATK : 1, DEF : 0, SPD : 10, WIS : 0,	EXP : 10, Gold : 50 },
	// { Id : 2, Name : "Wild Boar", HP : 300, CurrentHP : 300, ATK : 2, DEF : 0, SPD : 20, WIS : 0,	EXP : 20, Gold : 100 },
	// { Id : 3, Name : "Vandegut", HP : 1000, CurrentHP : 1000, ATK : 25, DEF : 0, SPD : 100, WIS : 0,	EXP : 1000, Gold : 1000 }
// ];

var allLevels = [
	{ Id : 1, Level: 1, Enemy: 1, EXP: 10, Gold: 50, ModHP: 1, ModATK: 1, ModSPD: 1 },
	{ Id : 2, Level: 2, Enemy: 1, EXP: 10, Gold: 50, ModHP: 2, ModATK: 1, ModSPD: 1 },
	{ Id : 3, Level: 3, Enemy: 1, EXP: 10, Gold: 50, ModHP: 2, ModATK: 1, ModSPD: 1 },
	{ Id : 4, Level: 4, Enemy: 1, EXP: 10, Gold: 50, ModHP: 3, ModATK: 2, ModSPD: 1 },
	{ Id : 5, Level: 5, Enemy: 1, EXP: 10, Gold: 50, ModHP: 3, ModATK: 3, ModSPD: 2 }
]