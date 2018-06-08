

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

$(document).ready(function() {	
    getIcoInfo( function(err, icoInfo) {
		if (err) {	
			;
		}
		else {
			showIcoSchedule(icoInfo);
			showIcoStageString(icoInfo);
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
