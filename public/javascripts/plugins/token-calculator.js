
var icoInfo;
var roundBonusRate;
var volumeBonusRate; 

$(document).ready(function() {
    $("#calculator-eth").change(function(){
        calculateToken(this);
        document.getElementById("bonusToken").innerHTML = "round bonus : " + roundBonusRate + "% / volume bonus : " + volumeBonusRate +"%";            
    });
    $("#calculator-blc").change(function(){
        calculateToken(this);
    });
});

(function ($) {
	$.post( "/icoInfo", function( data ) {
		if(data.success == 'true') {                    
            icoInfo = data.icoInfo;
            if (icoInfo.round == "commingSoon" || icoInfo.round == "preSale" ) {
                roundBonusRate = parseInt(icoInfo.bonusPreSale * 100);
            }
            else if (icoInfo.round == "roundA") {
                roundBonusRate = parseInt(icoInfo.bonusRoundA * 100);
            }
            else if (icoInfo.round == "roundB") {
                roundBonusRate = parseInt(icoInfo.bonusRoundB * 100);
            }
            else if (icoInfo.round == "roundC" || icoInfo.round == "undefined"){
                roundBonusRate = 0;
            }
            var eth = document.getElementById("calculator-eth");
            if (eth.value >= 50) {
                volumeBonusRate = parseInt(icoInfo.bonusVolume50Eth * 100);                
            }
            else if (eth.value >= 30) {
                volumeBonusRate = parseInt(icoInfo.bonusVolume30Eth * 100);
            }
            else if (eth.value >= 10) {
                volumeBonusRate = parseInt(icoInfo.bonusVolume10Eth * 100);
            }
            else if (eth.value < 10) {
                volumeBonusRate = 0;
            }
            document.getElementById("tokenExchangeRate").innerHTML = "1 ETH = " + icoInfo.exchangeRate  + " BLC";
            document.getElementById("bonusToken").innerHTML = "round bonus : " + roundBonusRate + "% / volume bonus : " + volumeBonusRate + "%";            
		}
	});	
})(jQuery);

function calculateToken() {
    var roundBonusToken = 0;
    var volumeBonusToken = 0;    
    var eth = document.getElementById("calculator-eth");

    token = (eth.value * icoInfo.exchangeRate);

    if (icoInfo.round == "commingSoon" || icoInfo.round == "preSale" ) {
        roundBonusToken = token * icoInfo.bonusPreSale;
    }
    else if (icoInfo.round == "roundA") {
        roundBonusToken = token * icoInfo.bonusRoundA;
    }
    else if (icoInfo.round == "roundB") {
        roundBonusToken = token * icoInfo.bonusRoundB;
    }
    else if (data.icoInfo.round == "roundC" || data.icoInfo.round == "undefined"){
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
    
    document.getElementById("calculator-blc").value = token + roundBonusToken + volumeBonusToken;
}