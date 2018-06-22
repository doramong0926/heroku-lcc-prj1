
function getUserInfo(callback) {
	var err = false;
    $.post("/userInfo", function(data) {
		if (data.success == 'false') {
			err = true;
		}
		callback(err, data.userInfo)		
    });
}

function getDetailUserInfo(user, callback) {
	var err = false;
    $.post("/userInfo/getDetailUserInfo", {requetEmail : user.email}, function(data) {
		if (data.success == 'false') {
			err = true;
		}		
		callback(err, data.userInfo, data.investInfo)		
    });
}

function getIcoInfo(callback) {
	var err = false;
    $.post("/icoInfo", function(data) {
		if (data.success == 'false') {
			err = true;
		}
		callback(err, data.icoInfo)		
    });
}

function saveIcoInfo(infoItem, saveData) {
	$.post("/icoInfo/saveIcoInfo", {infoItem: infoItem, saveData: saveData}, function(data) {
		if (data.success == 'false') {
			console.log(data.err);
		}
		else
		{
			$.get("/admin/icoInfo");
			window.location.replace("/admin/icoInfo"); 
		}
	});
}

function controlIcoInfo(controlType) {
	$.post("/icoInfo/controlIcoInfo", {controlType: controlType}, function(data) {
		if (data.success == 'false') {
			console.log(data.err);
		}
		else
		{
			$.get("/admin/icoInfo");
			window.location.replace("/admin/icoInfo"); 
		}
	});
}

function controlUserInfo(controlType, email, item, value, callback) {	
	$.post("/userInfo/controlUserInfo", {controlType: controlType, email : email, item : item, value : value }, function(data) {
		var err = false;
		if (data.success == 'false') {
			err = true;
			console.log(data.err);
		}
		callback(err, data);
	});
}

function getInvestedInfo(callback) {
	var err = false;
    $.post("/icoInfo/investedInfo", function(data) {
		if (data.success == 'false') {
			err = true;
		}
		callback(err, data)		
    });
}

function isAdmin(callback) {
	var err = false;
    $.post("/userInfo/isAdmin", function(data) {
		if (data.isAdmin == 'false') {
			err = true;
		}
		callback(err, data.userType)		
    });
}

function showNavLogin(showHide, userInfo) {	
	if (showHide == true) {
		$("#nav-login").show();
		$("#nav-logout").hide();
		showNavAdmin(false);		
	}
	else {
		$("#nav-login").hide();
		$("#nav-logout").show();
		if (userInfo.userType == "superAdmin" || userInfo.userType == "admin")	{
			showNavAdmin(true);
		} else {
			showNavAdmin(false);
		}
	}
}

function showNavAdmin(showHide) {	
	if (showHide == true) {
		$("#nav-admin").show();
	}
	else {
		$("#nav-admin").hide();		
	}
}

function showOnlySuperAdmin() {
	$("#create-IcoInfo").show();
	$("#init-IcoInfo").show();
	$("#icoDbControl").show();
	$("#unlock-contractAddr").show();
	$("#unlock-icoAddr").show();
}

function getUserList(callback) {
	var err = false;
    $.post("/admin/getUserList", function(data) {
		if (data.success == 'false') {
			err = true;
		}
		callback(err, data.userList)		
    });
}

function showInvestedInfo(icoInfo, investedInfo) {
	var ariaValuenow = parseFloat(investedInfo.totalDistributedToken / icoInfo.totalSalesVolume * 100).toFixed(2);
	var styleWidth = "width: " + ariaValuenow + "%";
	$("#progress-info").attr('style', styleWidth);
	$("#progress-info").attr('aria-valuenow', ariaValuenow);
	$("#progress-info").text(ariaValuenow + "%");	
	$("#totalSalesVolume").text(numberWithCommas(icoInfo.totalSalesVolume) + " BLC");	
	$("#currentDistribution").text(numberWithCommas(parseFloat(investedInfo.totalDistributedToken).toFixed(2)) + " BLC / " + numberWithCommas(investedInfo.totalInvestedEth) + " ETH");	
}

function showIcoMainEthWalletAddr(showHide) {
	if (showHide == true) {
		$("#address-eth").show();
		$("#copy-eth-address").show();
		$("#address-eth-description").hide();
		$("#goToKyc").hide();
	}
	else {
		$("#address-eth").hide();
		$("#copy-eth-address").hide();
		$("#address-eth-description").show();	
		$("#goToKyc").show();	
	}
}

function showIcoStageString(icoInfo) {	
	if (icoInfo.round == "commingSoon") {
		$("#ico-stage").text("COMMING SOON");
	} else if (icoInfo.round == "preSale") {
		$("#ico-stage").text("PRESALE STAGE");
	} else if (icoInfo.round == "roundA") {
		$("#ico-stage").text("ROUND-A STAGE");
	} else if (icoInfo.round == "roundB") {
		$("#ico-stage").text("ROUND-B STAGE");
	} else if (icoInfo.round == "roundC") {
		$("#ico-stage").text("ROUND-C STAGE");
	}
}

function showIcoSchedule(icoInfo) {	
	if (icoInfo.round == "commingSoon")
	{
		$("#dash-icoInfo").text("PRESALE WILL BE START IN : ");
	}
	else if (icoInfo.round == "preSale")
	{
		$("#dash-icoInfo").text("PRESALE WILL BE END IN : ");
	}
	else if (icoInfo.round == "roundA")
	{
		$("#dash-icoInfo").text("ROUND-A WILL BE END IN : ");
	}
	else if (icoInfo.round == "roundB")
	{
		$("#dash-icoInfo").text("ROUND-B WILL BE END IN : ");
	}
	else if (icoInfo.round == "roundC")
	{
		$("#dash-icoInfo").text("ROUND-C WILL BE END IN : ");
	}
	else
	{
		$("#dash-icoInfo").text("ICO SALE IS END IN :");
	}
	$("#dash-icoDate").text((new Date(icoInfo.startPreSale)).toUTCString());		
}

function showKycInfo(userInfo) {	 
	if (userInfo.kycStatus == "ready") {
		$("#kycStatus").text("READY");
		$("#kycStatusDescription").text("Please upload your KYC info.");
	}
	else if(userInfo.kycStatus == "approving") {
		$("#kycStatus").text("APPROVING");
		$("#kycStatusDescription").text("Please wait until completed your KYC info.");
	}
	else if(userInfo.kycStatus == "completed") {
		$("#kycStatus").text("COMPLETED");
		$("#kycStatusDescription").text("All your KYC progress is completed.");
	}
	else if(userInfo.kycStatus == "rejected") {
		$("#kycStatus").text("REJECTED");
		$("#kycStatusDescription").text("Your KYC progress is rejected. Please contact to admin.");
	}

	if (userInfo.kycStatus != "ready") {
		$("#checkBoxTerm1").prop("checked", true).prop("disabled", true);
		$("#checkBoxTerm2").prop("checked", true).prop("disabled", true);
		
		$("#first-name").val(userInfo.firstName);
		$("#last-name").val(userInfo.lastName);
		$("#first-name").prop("disabled", true);
		$("#last-name").prop("disabled", true);

		$("#eth-address").val(userInfo.walletAddr);
		$("#eth-address").prop("disabled", true);		
	}
	else {
		$("#uploadKycBtn").show();
	}
}

function showTokenSaleInfo(userInfo) {
	if (userInfo.kycStatus == "completed") {				
		showIcoMainEthWalletAddr(true);
	}
	else {
		showIcoMainEthWalletAddr(false);
	}
}

function showProfileInfo(userInfo) {
	$("#userEmail").text(userInfo.email);
	$("#userEmail-sm").text(userInfo.email);
	$("#userReferralAddr").text("https://lccprj.herokuapp.com/?ref=" + userInfo.referralAddr);
	$("#userReferralAddr-sm").text("https://lccprj.herokuapp.com/?ref=" + userInfo.referralAddr);
	$("#userWalletAddr").text(userInfo.walletAddr);	
	$("#userWalletAddr-sm").text(userInfo.walletAddr);	
    $.post("/userInfo/investInfo", function(data) {
		var err = false;
		if (data.success == 'false') {
			err = true;
		}
		else {
			$("#investeReceviedToken").text(numberWithCommas(parseFloat(data.investInfo.receviedToken).toFixed(2)) + " BLC");
			$("#investeReceviedToken-sm").text(numberWithCommas(parseFloat(data.investInfo.receviedToken).toFixed(2)) + " BLC");	
			$("#investeInvestEth").text(numberWithCommas(parseFloat(data.investInfo.investEth).toFixed(2)) + " ETH");
			$("#investeInvestEth-sm").text(numberWithCommas(parseFloat(data.investInfo.investEth).toFixed(2)) + " ETH");
			genTransactionHistory(data, function(history) {				
				$("#transactionHistory").html(history);
			});
		}
    });
}

function showAdminIcoInfo(icoInfo) {
	console.log(icoInfo);
	
	document.getElementById("admin-tokenName").value = icoInfo.name;
	document.getElementById("admin-contractAddr").value = icoInfo.contractAddr;
	document.getElementById("admin-icoAddr").value = icoInfo.icoAddr;
	document.getElementById("admin-totalSalesVolume").value = numberWithCommas(icoInfo.totalSalesVolume);
	document.getElementById("admin-preSalesVolume").value = numberWithCommas(icoInfo.preSalesVolume);
	document.getElementById("admin-roundAVolume").value = numberWithCommas(icoInfo.roundAVolume);
	document.getElementById("admin-roundBVolume").value = numberWithCommas(icoInfo.roundBVolume);
	document.getElementById("admin-roundCVolume").value = numberWithCommas(icoInfo.roundCVolume);
	document.getElementById("admin-startPreSale").value = (new Date(icoInfo.startPreSale)).toLocaleString() + " / " + (new Date(icoInfo.startPreSale)).toUTCString();
	document.getElementById("admin-startPreSale-picker").value = (new Date(icoInfo.startPreSale)).toLocaleString();
	document.getElementById("admin-endPreSale").value = (new Date(icoInfo.endPreSale)).toLocaleString() + " / " + (new Date(icoInfo.endPreSale)).toUTCString();
	document.getElementById("admin-endPreSale-picker").value = (new Date(icoInfo.startPreSale)).toLocaleString();
	document.getElementById("admin-endRoundA").value = (new Date(icoInfo.endRoundA)).toLocaleString() + " / " + (new Date(icoInfo.endRoundA)).toUTCString();
	document.getElementById("admin-endRoundA-picker").value = (new Date(icoInfo.startPreSale)).toLocaleString();
	document.getElementById("admin-endRoundB").value = (new Date(icoInfo.endRoundB)).toLocaleString() + " / " + (new Date(icoInfo.endRoundB)).toUTCString();
	document.getElementById("admin-endRoundB-picker").value = (new Date(icoInfo.startPreSale)).toLocaleString();
	document.getElementById("admin-endRoundC").value = (new Date(icoInfo.endRoundC)).toLocaleString() + " / " + (new Date(icoInfo.endRoundC)).toUTCString();
	document.getElementById("admin-endRoundC-picker").value = (new Date(icoInfo.startPreSale)).toLocaleString();

	document.getElementById("admin-exchangeRate").value = numberWithCommas(parseInt(icoInfo.exchangeRate));
	document.getElementById("admin-bonusPreSale").value = numberWithCommas(parseInt(icoInfo.bonusPreSale));
	document.getElementById("admin-bonusRoundA").value = numberWithCommas(parseInt(icoInfo.bonusRoundA));
	document.getElementById("admin-bonusRoundB").value = numberWithCommas(parseInt(icoInfo.bonusRoundB));
	document.getElementById("admin-bonusRoundC").value = numberWithCommas(parseInt(icoInfo.bonusRoundC));
	document.getElementById("admin-bonusVolume10Eth").value = numberWithCommas(parseInt(icoInfo.bonusVolume10Eth));
	document.getElementById("admin-bonusVolume30Eth").value = numberWithCommas(parseInt(icoInfo.bonusVolume30Eth));
	document.getElementById("admin-bonusVolume50Eth").value = numberWithCommas(parseInt(icoInfo.bonusVolume50Eth));
	document.getElementById("admin-bonusReferral").value = numberWithCommas(parseInt(icoInfo.bonusReferral));
	document.getElementById("admin-minimumInvesteEth").value = numberWithCommas(parseFloat(icoInfo.minimumInvesteEth));

	document.getElementById("admin-round").value = icoInfo.round;	
	if (icoInfo.round == "commingSoon")	{
		$("#admin-round-selectBox").val("1").attr("selected", "selected");
	} else if (icoInfo.round == "preSale") {
		$("#admin-round-selectBox").val("2").attr("selected", "selected");
	} else if (icoInfo.round == "roundA") {
		$("#admin-round-selectBox").val("3").attr("selected", "selected");
	} else if (icoInfo.round == "roundB") {
		$("#admin-round-selectBox").val("4").attr("selected", "selected");
	} else if (icoInfo.round == "roundC") {
		$("#admin-round-selectBox").val("5").attr("selected", "selected");
	}
}

function genTransactionHistory(data, callback) {
	if (data.investInfo.numOfdata != 0) {
		var history = "";
		for (var i=0, len = data.investInfo.numOfdata; i < len; i++) { 
			if (data.investInfo.result[i].inOut == 'in') {
				history = history + "<tr><td>You received " + numberWithCommas(data.investInfo.result[i].value) + " " + data.investInfo.result[i].tokenSymbol + "(" + data.investInfo.result[i].timeStamp + ")"
							+  " : <a href='https://ropsten.etherscan.io/tx/" + data.investInfo.result[i].txId + "' " + "target='_blank'>check TXID</a></td></tr>"; 
			}
			else {
				history = history + "<tr><td>You sent " + numberWithCommas(data.investInfo.result[i].value) + " " + data.investInfo.result[i].tokenSymbol + "(" + data.investInfo.result[i].timeStamp + ")"
							+  " : <a href='https://ropsten.etherscan.io/tx/" + data.investInfo.result[i].txId + "' " + "target='_blank'>check TXID</a></td></tr>"; 
			}			
		}
		console.log(history);
		
		callback(history);
	}
}

function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).text()).select();
	document.execCommand("copy");
	$temp.remove();
}

function checkLoginStatusTokenSale(){
    var checkLogin = false;
    $.post("/tokenSale", {checkLogin: true}, function(data) {        
        if (data.LoginState == 'false') {
            openLoginModal();
        } else {
            $.get("/tokenSale");
            window.location.replace("/tokenSale");  
        }   
    });
}

function calculateWillReceiveToken(userInfo, icoInfo) {
	var eth = document.getElementById("calculator-eth");				
	token = (eth.value * icoInfo.exchangeRate);

	if (icoInfo.round == "commingSoon" || icoInfo.round == "preSale" ) {
		roundBonusRate = icoInfo.bonusPreSale;
		roundBonusToken = token * icoInfo.bonusPreSale / 100;

	}
	else if (icoInfo.round == "roundA") {
		roundBonusRate = icoInfo.bonusRoundA;
		roundBonusToken = token * icoInfo.bonusRoundA / 100;
	}
	else if (icoInfo.round == "roundB") {
		roundBonusRate = icoInfo.bonusRoundB;
		roundBonusToken = token * icoInfo.bonusRoundB / 100;
	}
	else if (icoInfo.round == "roundC") {
		roundBonusRate = icoInfo.bonusRoundC;
		roundBonusToken = token * icoInfo.bonusRoundC / 100;
	}
	else {
		roundBonusRate = 0;
		roundBonusToken = 0;
	}

	if (eth.value >= 50) {               		
		volumeBonusRate = parseInt(icoInfo.bonusVolume50Eth);
		volumeBonusToken = token * icoInfo.bonusVolume50Eth / 100;		
	}
	else if (eth.value >= 30) {		
		volumeBonusRate = parseInt(icoInfo.bonusVolume30Eth);
		volumeBonusToken = token * icoInfo.bonusVolume30Eth / 100;
	}
	else if (eth.value >= 10) {		
		volumeBonusRate = parseInt(icoInfo.bonusVolume10Eth);
		volumeBonusToken = token * icoInfo.bonusVolume10Eth / 100;
	}
	else if (eth.value < 10) {
		volumeBonusToken = 0;
		volumeBonusRate = 0;
	}		

	if (userInfo.referralAddr != "") {		
		referralBonusRate = parseInt(icoInfo.bonusReferral);
		referralBonusToken = token * icoInfo.bonusReferral / 100;
	}
	else {
		referralBonusToken = 0;
		referralBonusRate = 0;
	}
	totalValue = token + roundBonusToken + volumeBonusToken + referralBonusToken;
	if (totalValue != 0)
	{
		document.getElementById("calculator-blc").insertAdjacentElement
		document.getElementById("calculator-blc").value = numberWithCommas(totalValue);
	}					
	document.getElementById("tokenExchangeRate").innerHTML = "1 ETH = " + numberWithCommas(icoInfo.exchangeRate) + " BLC";
	document.getElementById("bonusToken-round").innerHTML = "round bonus : " + roundBonusRate + "%";            
	document.getElementById("bonusToken-volume").innerHTML = "volume bonus : " + volumeBonusRate + "%";
	document.getElementById("bonusToken-referral").innerHTML = "referral bonus : " + referralBonusRate + "%";
}

function updateUserList(userList)
{
	$('#tableUserList').show();
	var table = $('#tableUserList').DataTable({
		"dom" : "Blfrtip",
		"buttons" : [		
			{
				"text" : "Detail",
				"action" : function () {					
					var user = table.row('.selected').data();	
					showUserListModal(user);
				}
			},
			"excelHtml5",
			//"csvHtml5",
			"pdfHtml5",
		],
		"fixedColumns" :   {
			leftColumns: 2
		},
		"columnDefs" : [ {
			"orderable" : false,
			"className" : "select-checkbox",
			"targets" :   0,
			"render" : function (data, type, full, meta){
				return '<p name="id[]" value="' + $('<div/>').text(data).html() + '">';
			}
		} ],
		"select" : {
			"style" :    "os",
			"selector" : "td:first-child"
		},
		"order": [[ 1, 'asc' ]],		
		"lengthMenu" : [[ 5, 10, 30, -1 ], [ 5, 10, 30, "All" ]],
		"scrollX": true,
		"data" : userList,
		"columns": [
			null,
			{"data" : "email"},
			{"data" : "userType"},		
			{"data" : "kycStatus"},	
			{"data" : "walletAddr"},	
			{"data" : "invitation"},
			{"data" : "referralAddr"},
			{"data" : "firstName"},
			{"data" : "lastName"},
		]		
	});
}

function showUserListModal(user) {	
	$('#detailUser-err').hide();
	$('#detailUser-unlockUserType').hide();
	$('#detailUser-lockUserType').hide();
	$('#detailUser-changeUserTypeToAdmin').hide();
	$('#detailUser-changeUserTypeToManager').hide();
	$('#detailUser-changeUserTypeToNomal').hide();
	$('#detailUser-lockControl').hide();
	$('#detailUser-unlockControl').hide();
	$('#detailUser-changeUserType').hide();
	$('#detailUser-resetPassword').hide();
	$('#detailUser-completeKyc').hide();
	$('#detailUser-resetKyc').hide();
	$('#detailUser-rejectKyc').hide();
	$('#detailUser-kycPassport').attr('src', null);
	$('#detailUser-kycBill').attr('src', null);
	$('#detailUser-kycStatus').text(null);
	$('#detailUser-email').text(null);
	$('#detailUser-kycName').text(null);
	$('#detailUser-kycWallet').text(null);
	$('#detailUser-userType').text(null);
	$('#detailUser-investEth').text(null);
	$('#detailUser-receviedToken').text(null);
	$('#detailUser-kycWallet').text(null);
	$('#detailUser-referralAddr').text(null);	
	
	if (user == null)
	{
		$('#detailUser-err').show();
	}
	else 
	{
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
			}
			else {
				getDetailUserInfo(user, function(err, userInfo, investInfo) {			
					if (err)
					{
						;
					}
					else {		
						if (userType == "superAdmin")	
						{
							;
						}
		
						if (userType == "superAdmin" || userType== "admin")	
						{
							$('#detailUser-unlockControl').show();
							if (userInfo.kycStatus != "ready") 
							{
								$('#detailUser-kycPassport').attr('src', './../' + userInfo.kycPicturePath1);
								$('#detailUser-kycPassport').attr('width', 400);
								$('#detailUser-kycBill').attr('src', './../' + userInfo.kycPicturePath2);
								$('#detailUser-kycBill').attr('width', 400);
								$('#detailUser-kycName').text(userInfo.firstName + " " + userInfo.lastName);
								$('#detailUser-kycWallet').text(userInfo.walletAddr);	
							}
							if(userInfo.walletAddr && investInfo != null)
							{
								$('#detailUser-investEth').text(numberWithCommas(parseFloat(investInfo.investEth).toFixed(2)));
								$('#detailUser-receviedToken').text(numberWithCommas(parseFloat(investInfo.receviedToken).toFixed(2)));
							}
							
							$('#detailUser-email').text(userInfo.email);	
							$('#detailUser-userType').text(userInfo.userType);							
							$('#detailUser-kycStatus').text(userInfo.kycStatus);
							$('#detailUser-referralAddr').text( userInfo.referralAddr);
						} 
					}
				});
			}
		});
	}

	setTimeout(function(){		
		$('#userListModal').modal('show');    
	}, 230);
    
}

function hideUserListModal() {
    setTimeout(function(){
        $('#userListModal').modal('hide');    
    }, 230);
}


function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  
  