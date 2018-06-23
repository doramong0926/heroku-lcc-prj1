$(document).ready(function() {		
	getUserType(function(err, userType) {
		if (err || (userType !="superAdmin" && userType !="admin" && userType !="manager")) {
			movePage("/");
		}
		else {
			getUserList(function(err, userList){
				if(err) {
					;
				} else {
					updateUserList(userList);
				}
			});
		}
	});
});

$(document).ready(function(){
	$('#detailUser-changeUserTypeToAdmin').click(function() {	
		chageUserType("admin");
	});

	$('#detailUser-changeUserTypeToManager').click(function() {
		chageUserType("manager");
	});

	$('#detailUser-changeUserTypeToNomal').click(function() {	
		chageUserType("nomal");
	});

	$('#detailUser-completeKyc').click(function() {		
		chageKycStatus("completed");
	});

	$('#detailUser-rejectKyc').click(function() {
		chageKycStatus("rejected");
	});

	$('#detailUser-resetKyc').click(function() {
		chageKycStatus("reset");
	});

	$('#detailUser-unlockUserType').click(function() {		
		getUserType(function(err, userType) {
			if (err || userType !="superAdmin") {
				movePage("/");
			}
			else {
				$('#detailUser-lockUserType').show();
				$('#detailUser-unlockUserType').hide();
				$('#detailUser-changeUserTypeToAdmin').show();
				$('#detailUser-changeUserTypeToManager').show();
				$('#detailUser-changeUserTypeToNomal').show();
			}
		});
	});

	$('#detailUser-lockUserType').click(function() {		
		getUserType(function(err, userType) {
			if (err || userType !="superAdmin") {
				movePage("/");
			}
			else {	
				$('#detailUser-lockUserType').hide();		
				$('#detailUser-unlockUserType').show();
				$('#detailUser-changeUserTypeToAdmin').hide();
				$('#detailUser-changeUserTypeToManager').hide();
				$('#detailUser-changeUserTypeToNomal').hide();
			}
		});
	});

	$("#detailUser-unlockControl").click(function() {		
		getUserType(function(err, userType) {
			if (err || (userType !="superAdmin" && userType !="admin")) {
				movePage("/");
			}
			else {
				if (userType == "superAdmin") {
					$('#detailUser-lockUserType').hide();
					$('#detailUser-unlockUserType').show();
					$('#detailUser-resetKyc').show();
				}
				if (userType == "superAdmin" || userType == "admin") {
					$('#detailUser-resetPassword').show();
					$('#detailUser-completeKyc').show();
					$('#detailUser-rejectKyc').show();
					$('#detailUser-unlockControl').hide();
					$('#detailUser-lockControl').show();
				}
			}
		});
	});

	$("#detailUser-lockControl").click(function() {
		getUserType(function(err, userType) {
			if (err || (userType !="superAdmin" && userType !="admin")) {
				movePage("/");
			}
			else {
				$('#detailUser-unlockUserType').hide();
				$('#detailUser-lockUserType').hide();
				$('#detailUser-changeUserTypeToAdmin').hide();
				$('#detailUser-changeUserTypeToManager').hide();
				$('#detailUser-changeUserTypeToNomal').hide();
				$('#detailUser-lockControl').hide();
				$('#detailUser-unlockControl').show();
				$('#detailUser-resetPassword').hide();
				$('#detailUser-resetKyc').hide();
				$('#detailUser-completeKyc').hide();
				$('#detailUser-rejectKyc').hide();
			}
		});
	});
});