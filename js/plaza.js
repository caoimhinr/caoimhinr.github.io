function InitializePlaza() {
	$('#plazaContent').html('<span>PLAZA</span><br />');
	
	var plazaItems = [];
	// var item = CreateItem();
	// item.Name = "EXP bottle";
	// item.Gold = 10;
	// item.IsConsumable = true;
	// item.ConsumableExp = 10;
	// plazaItems.push(item);
	
	// item = CreateItem();
	// item.Name = "HP bottle";
	// item.Gold = 50;
	// item.IsConsumable = true;
	// item.ConsumableHP = 5;
	// plazaItems.push(item);
	
	// item = CreateItem();
	// item.Name = "Red potion";
	// item.Gold = 10;
	// item.IsConsumable = true;
	// item.ConsumableCurrentHP = 100;
	// plazaItems.push(item);
	
	// item = CreateItem();
	// item.Name = "Wooden Stick";
	// item.Gold = 10;
	// item.IsEquippable = true;
	// item.Equipped = false;
	// item.ATK = 25;
	// plazaItems.push(item);
	
	// item = CreateItem();
	// item.Name = "Pointy Rock";
	// item.Gold = 5;
	// item.IsEquippable = true;
	// item.Equipped = false;
	// item.ATK = 30;
	// plazaItems.push(item);
	
	$.each(allItems, function(i, e) {
		$('#plazaContent').append(GetItemShopUI(e, 1));
	});	
}