
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
					$('#tableUserList').DataTable({
						"lengthMenu" : [[ 5, 10, 50, -1 ], [ 5, 10, 50, "All" ]],
						"scrollX": true,
						"data" : userList,
						"columns": [
							{"data" : "email"},
							{"data" : "userType"},		
							{"data" : "kycStatus"},	
							{"data" : "walletAddr"},
							{"data" : "invitation"},
							{"data" : "referralAddr"},
							{"data" : "firstName"},
							{"data" : "lastName"},
						]
					});
				}
			});
		}
	});
});

