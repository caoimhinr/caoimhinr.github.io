(function() {
	var gold = 0;
	var exp = 0;
	
    setInterval(onTimerTick, 1000);
	
	function onTimerTick() {
		// Do stuff.
		console.log('tick');
		gold = gold + 1;
		$('#gold').text("Gold: " + gold);
	}
})();