

$(document).ready(function() {		
	isAdmin( function(err, userType) {
		if (err) {
			$.get("/");
		}
		else {
			getUserList(function(err, userList){
				if(err) {
					console.log(userList);
				} else {
					updateUserList(userList);
				}
			});
		}
	});
});


$(document).ready(function(){
	$('#detailUser-unlockUserType').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
			}
			else {
				if (userType == "superAdmin") {
					$('#detailUser-lockUserType').show();
					$('#detailUser-unlockUserType').hide();
					$('#detailUser-changeUserTypeToAdmin').show();
					$('#detailUser-changeUserTypeToManager').show();
					$('#detailUser-changeUserTypeToNomal').show();
				}
				else{
					$.get("/");
				}
			}
		});
	});

	$('#detailUser-lockUserType').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
			}
			else {
				if (userType == "superAdmin") {					
					$('#detailUser-unlockUserType').show();
					$('#detailUser-lockUserType').hide();
					$('#detailUser-changeUserTypeToAdmin').hide();
					$('#detailUser-changeUserTypeToManager').hide();
					$('#detailUser-changeUserTypeToNomal').hide();
				}
				else{
					$.get("/");
				}
			}
		});
	});

	$("#detailUser-unlockControl").click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
			}
			else {
				if (userType == "superAdmin") {
					$('#detailUser-lockUserType').hide();
					$('#detailUser-unlockUserType').show();
				}
				if (userType == "superAdmin" || userType == "Admin") {
					$('#detailUser-resetPassword').show();
					$('#detailUser-resetKyc').show();
					$('#detailUser-completeKyc').show();
					$('#detailUser-rejectKyc').show();
					$('#detailUser-unlockControl').hide();
					$('#detailUser-lockControl').show();
				}
				else{
					$.get("/");
				}
			}
		});
	});

	$("#detailUser-lockControl").click(function() {
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
			}
			else {
				if (userType == "superAdmin" || userType == "Admin") {
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
				else{
					$.get("/");
				}
			}
		});
	});
});