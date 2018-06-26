
$(document).ready(function() {
	getUserType(function(err, userType) {
		if (err || (userType !="superAdmin" && userType !="admin" && userType !="manager")) {
			movePage("/");
		}
		else {
			showAdminDashBoardInfo();
		}
	});
});