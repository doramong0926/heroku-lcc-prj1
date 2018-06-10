

$(document).ready(function() {	
    getUserInfo( function(err, userInfo) {
		if (err) {
			showNavLogin(true, userInfo);
		}
		else {
			showNavLogin(false, userInfo);
			showKycInfo(userInfo);
		}
	});
});

