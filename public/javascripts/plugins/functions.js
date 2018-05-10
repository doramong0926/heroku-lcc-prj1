
$(document).ready(function(){
    $("#copy-eth-address").click(function() {
		copyToClipboard("#address-eth");
		
		//document.getElementById("copy-eth-address").title = "copyed";
	});
});

function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});



