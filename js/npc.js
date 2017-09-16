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

var allEnemies = [
	{ Id : 1, Name : "Peasant", HP : 200, CurrentHP : 200, ATK : 1, DEF : 0, SPD : 10, WIS : 0,	EXP : 10, Gold : 50 },
	{ Id : 2, Name : "Wild Boar", HP : 300, CurrentHP : 300, ATK : 2, DEF : 0, SPD : 20, WIS : 0,	EXP : 20, Gold : 100 },
	{ Id : 3, Name : "Vandegut", HP : 1000, CurrentHP : 1000, ATK : 25, DEF : 0, SPD : 100, WIS : 0,	EXP : 1000, Gold : 1000 }
];