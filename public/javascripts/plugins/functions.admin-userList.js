

$(document).ready(function() {		
	isAdmin( function(err, userType) {
		if (err) {
			$.get("/");
			window.location.replace("/");
		}
		else {
			getUserList(function(err, userList){
				if(err) {
					console.log(err);
				} else {
					updateUserList(userList);
				}
			});
		}
	});
});


$(document).ready(function(){
	$('#detailUser-resetPassword').click(function() {	
		;
	});

	$('#detailUser-changeUserTypeToAdmin').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
			}
			else {
				if (userType == "superAdmin") {
					var email = $('#detailUser-email').text();					
					controlUserInfo("change", email, "userType", "admin", function(err, data){
						if(err)
						{
							alertify.set({ delay: 3000 });
            				alertify.error("Error : fail to change UserType to admin");
						}
						else{
							alertify.set({ delay: 3000 });
							alertify.success("Success : success to change UserType to admin");
							getUserList(function(err, userList){
								if(err) {
									console.log(err);
								} else {
									checkAdminUserList();
								}
							});
						}
					});
				}
				else{
					alertify.set({ delay: 3000 });
					alertify.error("Error : fail to change userType");
					$.get("/");
					window.location.replace("/");
				}
			}
		});
	});

	$('#detailUser-changeUserTypeToManager').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
			}
			else {
				if (userType == "superAdmin") {
					var email = $('#detailUser-email').text();					
					controlUserInfo("change", email, "userType", "manager", function(err, data){
						if(err)
						{
							alertify.set({ delay: 3000 });
            				alertify.error("Error : fail to change UserType to manager");
						}
						else{
							alertify.set({ delay: 3000 });
							alertify.success("Success : success to change UserType to manager");
							getUserList(function(err, userList){
								if(err) {
									console.log(err);
								} else {
									checkAdminUserList();
								}
							});
						}
					});
				}
				else{
					alertify.set({ delay: 3000 });
					alertify.error("Error : fail to change userType");
					$.get("/");
					window.location.replace("/");
				}
			}
		});
	});

	$('#detailUser-changeUserTypeToNomal').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
			}
			else {
				if (userType == "superAdmin") {
					var email = $('#detailUser-email').text();					
					controlUserInfo("change", email, "userType", "nomal", function(err, data){
						if(err)
						{
							alertify.set({ delay: 3000 });
            				alertify.error("Error : fail to change UserType to nomal");
						}
						else{
							alertify.set({ delay: 3000 });
							alertify.success("Success : success to change UserType to nomal");
							getUserList(function(err, userList){
								if(err) {
									console.log(err);
								} else {
									checkAdminUserList();
								}
							});
						}
					});
				}
				else{
					alertify.set({ delay: 3000 });
					alertify.error("Error : fail to change userType");
					$.get("/");
					window.location.replace("/");
				}
			}
		});
	});

	$('#detailUser-completeKyc').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
			}
			else {
				if (userType == "superAdmin" || userType == "admin") {
					var email = $('#detailUser-email').text();		
					var kycStatus = $('#detailUser-kycStatus').text();			
					if (kycStatus == "approving") {
						controlUserInfo("change", email, "kycStatus", "completed", function(err, data){
							if(err)
							{
								alertify.set({ delay: 3000 });
								alertify.error("Error : fail to change kycStatus to completed");
							}
							else{
								alertify.set({ delay: 3000 });
								alertify.success("Success : success to change kycStatus to completed");
								getUserList(function(err, userList){
									if(err) {
										console.log(err);
									} else {
										checkAdminUserList();
									}
								});
							}
						});
					}
					else {
						alertify.set({ delay: 3000 });
						alertify.error("Error : fail to change kycStatus to completed");
					}
				}
				else{
					alertify.set({ delay: 3000 });
					alertify.error("Error : fail to change kycStatus");
					$.get("/");
					window.location.replace("/");
				}
			}
		});
	});

	$('#detailUser-rejectKyc').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
			}
			else {
				if (userType == "superAdmin" || userType == "admin") {
					var email = $('#detailUser-email').text();	
					var kycStatus = $('#detailUser-kycStatus').text();			
					if (kycStatus == "approving") {				
						controlUserInfo("change", email, "kycStatus", "rejected", function(err, data){
							if(err)
							{
								alertify.set({ delay: 3000 });
								alertify.error("Error : fail to change kycStatus to rejected");
							}
							else{
								alertify.set({ delay: 3000 });
								alertify.success("Success : success to change kycStatus to rejected");
								getUserList(function(err, userList){
									if(err) {
										console.log(err);
									} else {
										checkAdminUserList();
									}
								});
							}
						});
					} else {
						alertify.set({ delay: 3000 });
						alertify.error("Error : fail to change kycStatus to rejected");
					}
				}
				else{
					alertify.set({ delay: 3000 });
					alertify.error("Error : fail to change kycStatus");
					$.get("/");
					window.location.replace("/");
				}
			}
		});
	});

	$('#detailUser-resetKyc').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
			}
			else {
				if (userType == "superAdmin") {
					var email = $('#detailUser-email').text();					
					controlUserInfo("change", email, "kycStatus", "reset", function(err, data){
						if(err)
						{
							alertify.set({ delay: 3000 });
            				alertify.error("Error : fail to reset kycStatus");
						}
						else{
							alertify.set({ delay: 3000 });
							alertify.success("Success : success to reset kycStatus");
							getUserList(function(err, userList){
								if(err) {
									console.log(err);
								} else {
									checkAdminUserList();
								}
							});
						}
					});
				}
				else{
					alertify.set({ delay: 3000 });
					alertify.error("Error : fail to reset kyc");
					$.get("/");
					window.location.replace("/");
				}
			}
		});
	});

	$('#detailUser-unlockUserType').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
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
					window.location.replace("/");
				}
			}
		});
	});

	$('#detailUser-lockUserType').click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
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
					window.location.replace("/");
				}
			}
		});
	});

	$("#detailUser-unlockControl").click(function() {		
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
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
				else{
					$.get("/");
					window.location.replace("/");
				}
			}
		});
	});

	$("#detailUser-lockControl").click(function() {
		isAdmin( function(err, userType) {
			if (err) {
				$.get("/");
				window.location.replace("/");
			}
			else {
				if (userType == "superAdmin" || userType == "admin") {
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
					window.location.replace("/");
				}
			}
		});
	});
});