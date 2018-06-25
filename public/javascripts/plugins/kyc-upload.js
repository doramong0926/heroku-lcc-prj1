
$(document).ready(function(){
/*
    // Code for the Validator
    var $validator = $('.wizard-card form').validate({
		  rules: {
		    firstName: {
		      required: true,
		      minlength: 3
		    },
		    lastName: {
		      required: true,
		      minlength: 3
		    },
		    email: {
		      required: true,
		      minlength: 3,
		    }
        },

        errorPlacement: function(error, element) {
            $(element).parent('div').addClass('has-error');
         }
	});
*/
    // Prepare the preview for profile picture
    $("#kycPicture-1").change(function(){
        readURL1(this);
    });
    $("#kycPicture-2").change(function(){
        readURL2(this);
    });
});

 //Function to show image before upload
function readURL1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#kycPicturePreview-1').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

 //Function to show image before upload
 function readURL2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#kycPicturePreview-2').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function uploadKyc() {    
    if ($('#checkBoxTerm1').is(":unchecked") || $('#checkBoxTerm2').is(":unchecked") || $('#first-name').val() == ""
    || $('#last-name').val() == "" || $('#eth-address').val() == "") {
        if ($('#checkBoxTerm1').is(":unchecked") || $('#checkBoxTerm2').is(":unchecked"))
        {
            alertify.set({ delay: 3000 });
            alertify.error("Error : terms & condition is unchecked");
        }
        if ($('#first-name').val() == "")
        {
            alertify.set({ delay: 3000 });
            alertify.error("Error : first-name is empty");
        } 
        if ($('#last-name').val() == "")
        {
            alertify.set({ delay: 3000 });
            alertify.error("Error : last-name is empty");
        } 
        if ($('#eth-address').val() == "")
        {
            
            alertify.set({ delay: 3000 });
            alertify.error("Error : etherium-address is empty");
        } 
    } else {
        checkWalletAddress($('#eth-address').val(), function(err, errMsg){
            if (err) {
                alertify.set({ delay: 3000 });
                alertify.error("Error : " + errMsg);
            } else {
                var upf1 = document.getElementById("kycPicture-1");
                var upf2 = document.getElementById("kycPicture-2");
                var file1 = upf1.files[0];
                var file2 = upf2.files[0];
                var formData1 = new FormData();
                var formData2 = new FormData();
                formData1.append("photo",file1);
                formData2.append("photo",file2);  

                $.ajax({
                    url: '/kyc/kycPicture1',
                    processData: false,
                    contentType: false,
                    data: formData1,
                    type: 'POST',
                    success: function(result) {
                        if (result.success == "true") {
                            $.ajax({
                                url: '/kyc/kycPicture2',
                                processData: false,
                                contentType: false,
                                data: formData2,
                                type: 'POST',
                                success: function(result){
                                    if (result.success == "true")
                                    {
                                        $.post("/kyc/saveKyc", {firstName: $('#first-name').val(), lastName: $('#last-name').val()
                                            , wallet: $('#eth-address').val()}, function( data ) {
                                            if(data.success == 'true') {
                                                $.get("/kyc");
                                                window.location.replace("/kyc"); 
                                                alertify.set({ delay: 3000 });
                                                alertify.success("Success : kyc info uploading is completed.");
                                            }
                                            else{
                                                alertify.set({ delay: 3000 });
                                                alertify.error("Error : " + data.errMsg);
                                            }
                                        });
                                    }else {
                                        alertify.set({ delay: 3000 });
                                        alertify.error("Error : fail to upload utility bill picture");
                                    }
                                },
                                error: function(result) {
                                    alertify.set({ delay: 3000 });
                                    alertify.error("Error : fail to upload utility bill picture");
                                }
                            }); 
                        } else {
                            alertify.set({ delay: 3000 });
                            alertify.error("Error : fail to upload passport picture");
                        }
                    },
                    error: function(result) {
                        alertify.set({ delay: 3000 });
                        alertify.error("Error : fail to upload passport picture");
                    }
                });
                delete formData1;
                delete formData2;
            }
        });
    }
}
