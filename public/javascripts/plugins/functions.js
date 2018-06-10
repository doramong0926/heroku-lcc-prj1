
function getUserInfo(callback) {
	var err = false;
    $.post("/userInfo", function(data) {
		if (data.success == 'false') {
			err = true;
		}
		callback(err, data.userInfo)		
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

function getInvestedInfo(callback) {
	var err = false;
    $.post("/icoInfo/investedInfo", function(data) {
		if (data.success == 'false') {
			err = true;
		}
		callback(err, data)		
    });
}

function getIcoAddr(callback) {
	var err = false;
    $.post("/icoInfo/icoAddr", function(data) {
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
		if (userInfo.userType == "superAdmin" || userInfo.userType == "nomalAdmin")	{
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

function showInvestedInfo(icoInfo, investedInfo) {
	var ariaValuenow = investedInfo.totalDistributedToken / icoInfo.totalSalesVolume * 100;
	var styleWidth = "width: " + ariaValuenow + "%";
	$("#progress-info").attr('style', styleWidth);
	$("#progress-info").attr('aria-valuenow', ariaValuenow);
	$("#progress-info").text(ariaValuenow + "%");	
	$("#totalSalesVolume").text(numberWithCommas(icoInfo.totalSalesVolume) + " BLC");	
	$("#currentDistribution").text(numberWithCommas(investedInfo.totalDistributedToken) + " BLC / " + numberWithCommas(investedInfo.totalInvestedEth) + " ETH");	
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
			$("#investeReceviedToken").text(numberWithCommas(data.investInfo.receviedToken) + " BLC");
			$("#investeReceviedToken-sm").text(numberWithCommas(data.investInfo.receviedToken) + " BLC");	
			$("#investeInvestEth").text(numberWithCommas(data.investInfo.investEth) + " ETH");
			$("#investeInvestEth-sm").text(numberWithCommas(data.investInfo.investEth) + " ETH");
			genTransactionHistory(data, function(history) {				
				$("#transactionHistory").html(history);
			});
		}
    });
}

function showAdminIcoInfo(icoInfo) {
	$("#admin-tokenName").text(icoInfo.name);

	$("#admin-totalSalesVolume").text(numberWithCommas(icoInfo.totalSalesVolume) + " BLC");
	$("#admin-preSalesVolume").text(numberWithCommas(icoInfo.preSalesVolume) + " BLC");
	$("#admin-roundAVolume").text(numberWithCommas(icoInfo.roundAVolume) + " BLC");
	$("#admin-roundBVolume").text(numberWithCommas(icoInfo.roundBVolume) + " BLC");
	$("#admin-roundCVolume").text(numberWithCommas(icoInfo.roundCVolume) + " BLC");

	$("#admin-round").text(icoInfo.round);
	$("#admin-startPreSale").text((new Date(icoInfo.startPreSale)).toUTCString() + " / " + (new Date(icoInfo.startPreSale)).toLocaleString());
	$("#admin-endPreSale").text((new Date(icoInfo.endPreSale)).toUTCString() + " / " + (new Date(icoInfo.endPreSale)).toLocaleString());
	$("#admin-endRoundA").text((new Date(icoInfo.endRoundA)).toUTCString() + " / " + (new Date(icoInfo.endRoundA)).toLocaleString());
	$("#admin-endRoundB").text((new Date(icoInfo.endRoundB)).toUTCString() + " / " + (new Date(icoInfo.endRoundB)).toLocaleString());
	$("#admin-endRoundC").text((new Date(icoInfo.endRoundC)).toUTCString() + " / " + (new Date(icoInfo.endRoundC)).toLocaleString());
	
	$("#admin-exchangeRate").text("1ETH = " + parseInt(numberWithCommas(icoInfo.exchangeRate)));
	$("#admin-bonusPreSale").text(parseInt(numberWithCommas(icoInfo.bonusPreSale * 100)) + " %");
	$("#admin-bonusRoundA").text(parseInt(numberWithCommas(icoInfo.bonusRoundA * 100)) + " %");
	$("#admin-bonusRoundB").text(parseInt(numberWithCommas(icoInfo.bonusRoundB * 100)) + " %");
	$("#admin-bonusRoundC").text(parseInt(numberWithCommas(icoInfo.bonusRoundC * 100)) + " %");
	$("#admin-bonusVolume10Eth").text(parseInt(numberWithCommas(icoInfo.bonusVolume10Eth * 100)) + " %");
	$("#admin-bonusVolume30Eth").text(parseInt(numberWithCommas(icoInfo.bonusVolume30Eth * 100)) + " %");
	$("#admin-bonusVolume50Eth").text(parseInt(numberWithCommas(icoInfo.bonusVolume50Eth * 100)) + " %");
	$("#admin-bonusReferral").text(parseInt(numberWithCommas(icoInfo.bonusReferral * 100)) + " %");
	
	getIcoAddr(function(err, data) {
		if (err) {
			;
		}
		else {
			$("#admin-contractAddress").text(data.contractAddr);
			$("#admin-icoAddress").text(data.icoAddr);
		}
	});
	
}

function genTransactionHistory(data, callback) {
	if (data.investInfo.numOfdata != 0) {
		for (var i=0, len = data.investInfo.numOfdata; i < len; i++) { 
			var history;
			if (data.investInfo.result[i].inOut == 'in') {
				history = history + "<tr><td>You received " + numberWithCommas(data.investInfo.result[i].value) + " " + data.investInfo.result[i].tokenSymbol + "(" + data.investInfo.result[i].timeStamp + ")"
							+  " : <a href='https://ropsten.etherscan.io/tx/" + data.investInfo.result[i].txId + "' " + "target='_blank'>check TXID</a></td></tr>"; 
			}
			else {
				history = history + "<tr><td>You sent " + numberWithCommas(data.investInfo.result[i].value) + " " + data.investInfo.result[i].tokenSymbol + "(" + data.investInfo.result[i].timeStamp + ")"
							+  " : <a href='https://ropsten.etherscan.io/tx/" + data.investInfo.result[i].txId + "' " + "target='_blank'>check TXID</a></td></tr>"; 
			}			
		}
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
		roundBonusRate = icoInfo.bonusPreSale * 100;
		roundBonusToken = token * icoInfo.bonusPreSale;

	}
	else if (icoInfo.round == "roundA") {
		roundBonusRate = icoInfo.bonusRoundA * 100;
		roundBonusToken = token * icoInfo.bonusRoundA;
	}
	else if (icoInfo.round == "roundB") {
		roundBonusRate = icoInfo.bonusRoundB * 100;
		roundBonusToken = token * icoInfo.bonusRoundB;
	}
	else if (icoInfo.round == "roundC") {
		roundBonusRate = icoInfo.bonusRoundC * 100;
		roundBonusToken = token * icoInfo.bonusRoundC;
	}
	else {
		roundBonusRate = 0;
		roundBonusToken = 0;
	}

	if (eth.value >= 50) {               
		volumeBonusToken = token * icoInfo.bonusVolume50Eth;
		volumeBonusRate = parseInt(icoInfo.bonusVolume50Eth * 100);
		
	}
	else if (eth.value >= 30) {
		volumeBonusToken = token * icoInfo.bonusVolume30Eth;
		volumeBonusRate = parseInt(icoInfo.bonusVolume30Eth * 100);
	}
	else if (eth.value >= 10) {
		volumeBonusToken = token * icoInfo.bonusVolume10Eth;
		volumeBonusRate = parseInt(icoInfo.bonusVolume10Eth * 100);
	}
	else if (eth.value < 10) {
		volumeBonusToken = 0;
		volumeBonusRate = 0;
	}		

	if (userInfo.referralAddr != "") {
		referralBonusToken = token * icoInfo.bonusReferral;
		referralBonusRate = parseInt(icoInfo.bonusReferral * 100);
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

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  
  