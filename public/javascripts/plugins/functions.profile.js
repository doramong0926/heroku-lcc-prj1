

$(document).ready(function() {	
    getUserInfo( function(err, userInfo) {
		if (err) {
			showNavLogin(true);
		}
		else {
			showNavLogin(false);
			showProfileInfo(userInfo);
		}
	});
});
