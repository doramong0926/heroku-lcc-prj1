

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

