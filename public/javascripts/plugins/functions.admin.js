
$(document).ready(function() {	
	isAdmin( function(err, userType) {
		if (err) {
			$.get("/");
		}
		else {
			getIcoInfo( function(err, icoInfo) {
				if (err) {	
					;
				}
				else {
					showAdminIcoInfo(icoInfo);
				}
			});
		}
	});
});


$(document).ready(function(){
	$("#unlock-totalSalesVolume").click(function() {
		$("#admin-totalSalesVolume").prop("readonly", false);
		$("#save-totalSalesVolume").show(); 
		$("#unlock-totalSalesVolume").hide();
	});
	$("#save-totalSalesVolume").click(function() {
		var saveData = $("#admin-totalSalesVolume").val();
		
		$.post("/icoInfo/saveTotalSalesVolume", {saveData: saveData}, function(data) {
			if (data.success == 'false') {
				;
			} else {
				$("#admin-totalSalesVolume").prop("readonly", true);
				$("#save-totalSalesVolume").hide(); 
				$("#unlock-totalSalesVolume").show();
				$.get("/admin");
				window.location.replace("/admin");  
			}
		});
	});
});

