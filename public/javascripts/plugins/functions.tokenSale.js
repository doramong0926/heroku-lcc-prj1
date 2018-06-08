

$(document).ready(function() {	
    getUserInfo( function(err, userInfo) {
		if (err) {
			showNavLogin(true);
		}
		else {
			showNavLogin(false);
		}
	});
});

$(document).ready(function(){	
    getUserInfo( function(err, userInfo) {
		if (err) {
			showIcoMainEthWalletAddr(false);
		}
		else {	
			showTokenSaleInfo(userInfo);
			getIcoInfo( function(err, icoInfo) {
				if (err) {	
					;	
				}
				else {
					calculateWillReceiveToken(userInfo, icoInfo);					
				}
			});
		}
	});
});

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

	$("#calculator-eth").change(function() {		
        getUserInfo( function(err, userInfo) {
			if (err) {	
				;
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
