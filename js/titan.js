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
	});
})();

function GetTitanUI(item, id) {
	var titanUI = $("<div class='row'><div class='col-md-3'>" + item.Level + "</div><div class='col-md-4'>" + item.Element + "</div><div class='col-md-5'>" + item.HP + "</div></div>");
	return titanUI;
}