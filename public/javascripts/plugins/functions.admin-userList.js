
var table = null;

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
					table = $('#tableUserList').DataTable({
						dom: 'Blfrtip',
						buttons: [
							'copyHtml5',
							'excelHtml5',
							'csvHtml5',
							'pdfHtml5',
							{
								text : 'SHOW DETAIL INFO',
								action: function () {
									var data = table.row('.selected').data();
								}
							},
							{
								text : 'PW RESET',
								action: function () {
									var data = table.row('.selected').data();
								}
							}
						],
						fixedColumns:   {
							leftColumns: 2
						},
						columnDefs: [ {
							orderable: false,
							className: 'select-checkbox',
							targets:   0
						} ],
						select: {
							style:    'os',
							selector: 'td:first-child'
						},
						order: [[ 1, 'asc' ]],		
						"lengthMenu" : [[ 5, 10, 30, -1 ], [ 5, 10, 30, "All" ]],
						"scrollX": true,
						"data" : userList,
						"columns": [
							null,
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

