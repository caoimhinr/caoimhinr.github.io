function InitializePlaza() {
	$('#plazaContent').html('<span>PLAZA</span><br />');
	
	var plazaItems = [];
	var item = CreateItem();
	item.Name = "EXP bottle";
	item.Gold = 10;
	item.IsConsumable = true;
	item.ConsumableExp = 10;
	plazaItems.push(item);
	
	item = CreateItem();
	item.Name = "HP bottle";
	item.Gold = 50;
	item.IsConsumable = true;
	item.ConsumableHP = 5;
	plazaItems.push(item);
	
	item = CreateItem();
	item.Name = "Red potion";
	item.Gold = 10;
	item.IsConsumable = true;
	item.ConsumableCurrentHP = 100;
	plazaItems.push(item);
	
	$.each(plazaItems, function(i, e) {
		$('#plazaContent').append(GetItemShopUI(e, 1));
	});	
}