
$(document).ready(function(){
    $("#copy-eth-address").click(function() {
		copyToClipboard("#address-eth");
		alertify.set({ delay: 3000 });
		alertify.success("copied to the clip board");
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



