
$(document).ready(function() {	
	isAdmin( function(err, userType) {
		if (err) {
			$.get("/");
		}
		else {
			if (userType == "superAdmin") {
				showOnlySuperAdmin();
			}
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
	$(".datetimepicker").datetimepicker({
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-chevron-up",
			down: "fa fa-chevron-down",
			previous: 'fa fa-chevron-left',
			next: 'fa fa-chevron-right',
			today: 'fa fa-screenshot',
			clear: 'fa fa-trash',
			close: 'fa fa-remove'
		}
	});
});


$(document).ready(function(){
	$("#create-IcoInfo").click(function() {
		var controlType = "create";
		controlIcoInfo(controlType);
	});

	$("#init-IcoInfo").click(function() {
		var controlType = "init";
		controlIcoInfo(controlType);
	});

	$("#unlock-contractAddr").click(function() {
		$("#admin-contractAddr").prop("readonly", false);
		$("#save-contractAddr").show(); 
		$("#unlock-contractAddr").hide();
	});
	$("#save-contractAddr").click(function() {
		var saveData = $("#admin-contractAddr").val();
		var infoItem = "contractAddr";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-icoAddr").click(function() {
		$("#admin-icoAddr").prop("readonly", false);
		$("#save-icoAddr").show(); 
		$("#unlock-icoAddr").hide();
	});
	$("#save-icoAddr").click(function() {
		var saveData = $("#admin-icoAddr").val();
		var infoItem = "icoAddr";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-round").click(function() {
		$("#admin-round").hide();
		$("#admin-round-selectBox").show();
		$("#save-round").show(); 
		$("#unlock-round").hide();
	});
	$("#save-round").click(function() {
		var saveData = $("#admin-round-selectBox option:selected").text();
		var infoItem = "round";		
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-startPreSale").click(function() {
		$("#admin-startPreSale").hide();
		$("#admin-startPreSale-picker").show();
		$("#save-startPreSale").show(); 
		$("#unlock-startPreSale").hide();
	});
	$("#save-startPreSale").click(function() {
		var saveData = new Date($("#admin-startPreSale-picker").val());
		var infoItem = "startPreSale";		
		saveIcoInfo(infoItem, saveData.valueOf());
	});

	$("#unlock-endPreSale").click(function() {
		$("#admin-endPreSale").hide();
		$("#admin-endPreSale-picker").show();
		$("#save-endPreSale").show(); 
		$("#unlock-endPreSale").hide();
	});
	$("#save-endPreSale").click(function() {
		var saveData = new Date($("#admin-endPreSale-picker").val());
		var infoItem = "endPreSale";		
		saveIcoInfo(infoItem, saveData.valueOf());
	});

	$("#unlock-endRoundA").click(function() {
		$("#admin-endRoundA").hide();
		$("#admin-endRoundA-picker").show();
		$("#save-endRoundA").show(); 
		$("#unlock-endRoundA").hide();
	});
	$("#save-endRoundA").click(function() {
		var saveData = new Date($("#admin-endRoundA-picker").val());
		var infoItem = "endRoundA";		
		saveIcoInfo(infoItem, saveData.valueOf());
	});

	$("#unlock-endRoundB").click(function() {
		$("#admin-endRoundB").hide();
		$("#admin-endRoundB-picker").show();
		$("#save-endRoundB").show(); 
		$("#unlock-endRoundB").hide();
	});
	$("#save-endRoundB").click(function() {
		var saveData = new Date($("#admin-endRoundB-picker").val());
		var infoItem = "endRoundB";		
		saveIcoInfo(infoItem, saveData.valueOf());
	});

	$("#unlock-endRoundC").click(function() {
		$("#admin-endRoundC").hide();
		$("#admin-endRoundC-picker").show();
		$("#save-endRoundC").show(); 
		$("#unlock-endRoundC").hide();
	});
	$("#save-endRoundC").click(function() {
		var saveData = new Date($("#admin-endRoundC-picker").val());
		var infoItem = "endRoundC";		
		saveIcoInfo(infoItem, saveData.valueOf());
	});

	$("#unlock-totalSalesVolume").click(function() {
		$("#admin-totalSalesVolume").prop("readonly", false);
		$("#save-totalSalesVolume").show(); 
		$("#unlock-totalSalesVolume").hide();
	});
	$("#save-totalSalesVolume").click(function() {
		var saveData = $("#admin-totalSalesVolume").val();
		var infoItem = "totalSalesVolume";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-preSalesVolume").click(function() {
		$("#admin-preSalesVolume").prop("readonly", false);
		$("#save-preSalesVolume").show(); 
		$("#unlock-preSalesVolume").hide();
	});
	$("#save-preSalesVolume").click(function() {
		var saveData = $("#admin-preSalesVolume").val();
		var infoItem = "preSalesVolume";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-roundAVolume").click(function() {
		$("#admin-roundAVolume").prop("readonly", false);
		$("#save-roundAVolume").show(); 
		$("#unlock-roundAVolume").hide();
	});
	$("#save-roundAVolume").click(function() {
		var saveData = $("#admin-roundAVolume").val();
		var infoItem = "roundAVolume";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-roundBVolume").click(function() {
		$("#admin-roundBVolume").prop("readonly", false);
		$("#save-roundBVolume").show(); 
		$("#unlock-roundBVolume").hide();
	});
	$("#save-roundBVolume").click(function() {
		var saveData = $("#admin-roundBVolume").val();
		var infoItem = "roundBVolume";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-roundCVolume").click(function() {
		$("#admin-roundCVolume").prop("readonly", false);
		$("#save-roundCVolume").show(); 
		$("#unlock-roundCVolume").hide();
	});
	$("#save-roundCVolume").click(function() {
		var saveData = $("#admin-roundCVolume").val();
		var infoItem = "roundCVolume";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-exchangeRate").click(function() {
		$("#admin-exchangeRate").prop("readonly", false);
		$("#save-exchangeRate").show(); 
		$("#unlock-exchangeRate").hide();
	});
	$("#save-exchangeRate").click(function() {
		var saveData = $("#admin-exchangeRate").val();
		var infoItem = "exchangeRate";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-bonusPreSale").click(function() {
		$("#admin-bonusPreSale").prop("readonly", false);
		$("#save-bonusPreSale").show(); 
		$("#unlock-bonusPreSale").hide();
	});
	$("#save-bonusPreSale").click(function() {
		var saveData = $("#admin-bonusPreSale").val();
		var infoItem = "bonusPreSale";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-bonusRoundA").click(function() {
		$("#admin-bonusRoundA").prop("readonly", false);
		$("#save-bonusRoundA").show(); 
		$("#unlock-bonusRoundA").hide();
	});
	$("#save-bonusRoundA").click(function() {
		var saveData = $("#admin-bonusRoundA").val();
		var infoItem = "bonusRoundA";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-bonusRoundB").click(function() {
		$("#admin-bonusRoundB").prop("readonly", false);
		$("#save-bonusRoundB").show(); 
		$("#unlock-bonusRoundB").hide();
	});
	$("#save-bonusRoundB").click(function() {
		var saveData = $("#admin-bonusRoundB").val();
		var infoItem = "bonusRoundB";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-bonusRoundC").click(function() {
		$("#admin-bonusRoundC").prop("readonly", false);
		$("#save-bonusRoundC").show(); 
		$("#unlock-bonusRoundC").hide();
	});
	$("#save-bonusRoundC").click(function() {
		var saveData = $("#admin-bonusRoundC").val();
		var infoItem = "bonusRoundC";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-bonusVolume10Eth").click(function() {
		$("#admin-bonusVolume10Eth").prop("readonly", false);
		$("#save-bonusVolume10Eth").show(); 
		$("#unlock-bonusVolume10Eth").hide();
	});
	$("#save-bonusVolume10Eth").click(function() {
		var saveData = $("#admin-bonusVolume10Eth").val();
		var infoItem = "bonusVolume10Eth";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-bonusVolume30Eth").click(function() {
		$("#admin-bonusVolume30Eth").prop("readonly", false);
		$("#save-bonusVolume30Eth").show(); 
		$("#unlock-bonusVolume30Eth").hide();
	});
	$("#save-bonusVolume30Eth").click(function() {
		var saveData = $("#admin-bonusVolume30Eth").val();
		var infoItem = "bonusVolume30Eth";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-bonusVolume50Eth").click(function() {
		$("#admin-bonusVolume50Eth").prop("readonly", false);
		$("#save-bonusVolume50Eth").show(); 
		$("#unlock-bonusVolume50Eth").hide();
	});
	$("#save-bonusVolume50Eth").click(function() {
		var saveData = $("#admin-bonusVolume50Eth").val();
		var infoItem = "bonusVolume50Eth";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-bonusReferral").click(function() {
		$("#admin-bonusReferral").prop("readonly", false);
		$("#save-bonusReferral").show(); 
		$("#unlock-bonusReferral").hide();
	});
	$("#save-bonusReferral").click(function() {
		var saveData = $("#admin-bonusReferral").val();
		var infoItem = "bonusReferral";
		saveIcoInfo(infoItem, saveData);
	});

	$("#unlock-minimumInvesteEth").click(function() {
		$("#admin-minimumInvesteEth").prop("readonly", false);
		$("#save-minimumInvesteEth").show(); 
		$("#unlock-minimumInvesteEth").hide();
	});
	$("#save-minimumInvesteEth").click(function() {
		var saveData = $("#admin-minimumInvesteEth").val();
		var infoItem = "minimumInvesteEth";
		saveIcoInfo(infoItem, saveData);
	});
});



