
$(document).ready(function() {
	isAdmin( function(err, userType) {
		if (err) {
			$.get("/");
		}
		else {
		}
	});
});
