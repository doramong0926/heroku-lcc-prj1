$(document).ready(function(){
    $("#goToKyc").click(function() {
		var checkLogin = false;
		$.post("/kyc", {checkLogin: true}, function(data) {
			if (data.LoginState == 'false') {
				openLoginModal();
			} else {
				$.get("/kyc");
				window.location.replace("/kyc");  
			}
		});
	});

	$("#copy-eth-address").click(function() {
		copyToClipboard("#address-eth");
		alertify.set({ delay: 3000 });
		alertify.success("copied to the clip board");
	});
});

$(document).ready(function() {
	$("#calculator-eth").change(function() {		
        getUserInfo( function(err, userInfo) {
			if (err) {	
			}
			else {
				getIcoInfo( function(err, icoInfo) {
					if (err) {		
					}
					else {
						calculateWillReceiveToken(userInfo, icoInfo);
					}
				});
			}
		});
	});	
});

$(document).ready(function() {		
	getIcoInfo( function(err, icoInfo) {
		if (err) {	
		}
		else {
			showIcoSchedule(icoInfo);
			getInvestedInfo( function(err, investedInfo) {
				if (err) {		
				}
				else {
					showInvestedInfo(icoInfo, investedInfo);
				}
			});
		}
	});
});

function showInvestedInfo(icoInfo, investedInfo) {
	var ariaValuenow = investedInfo.totalDistributedToken / icoInfo.totalSalesVolume * 100;
	var styleWidth = "width: " + ariaValuenow + "%";
	$("#progress-info").attr('style', styleWidth);
	$("#progress-info").attr('aria-valuenow', ariaValuenow);
	$("#progress-info").text(ariaValuenow + "%");	
	$("#totalSalesVolume").text(numberWithCommas(icoInfo.totalSalesVolume) + " BLC");	
	$("#currentDistribution").text(numberWithCommas(investedInfo.totalDistributedToken) + " BLC / " + numberWithCommas(investedInfo.totalInvestedEth) + " ETH");	

}


//<div class="progress-bar progress-line-primary progress-bar-animated" role="progressbar" aria-valuenow="<%=(totalDistributedToken / icoInfo.totalSalesVolume)*100%>" aria-valuemin="0" aria-valuemax="100" style="width: <%=(totalDistributedToken / icoInfo.totalSalesVolume)*100%>%"><%=(totalDistributedToken / icoInfo.totalSalesVolume)*100%> %</div>

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	
    getUserInfo( function(err, userInfo) {
		if (err) {
			showNavLogin(true);
			showIcoMainEthWalletAddr(false);
			getIcoInfo( function(err, icoInfo) {
				if (err) {	
				}
				else {
					showIcoStageString(icoInfo);
				}
			});		
		}
		else {	
			showNavLogin(false);
			showKycInfo(userInfo);
			showTokenSaleInfo(userInfo);		
			showProfileInfo(userInfo);
			getIcoInfo( function(err, icoInfo) {
				if (err) {		
				}
				else {
					calculateWillReceiveToken(userInfo, icoInfo);
					showIcoStageString(icoInfo);
				}
			});
		}
	});
});

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

function showNavLogin(showHide) {	
	if (showHide == true) {
		$("#nav-login").show();
		$("#nav-logout").hide();		
	}
	else {
		$("#nav-login").hide();
		$("#nav-logout").show();		
	}
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
	} else {
		$("#ico-stage").text("dddd");
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
	else if (icoInfo.round == "roundC" || icoInfo.round == "undefined"){
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
  
  