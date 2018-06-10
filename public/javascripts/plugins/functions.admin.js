

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

