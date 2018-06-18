/*
 *
 * login-register modal
 * Autor: Creative Tim
 * Web-autor: creative.tim
 * Web script: http://creative-tim.com
 * 
 */

function showRegisterForm(){
    $('.loginBox').fadeOut('fast',function(){
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast',function(){
            $('.register-footer').fadeIn('fast');
        });
        $('.modal-title').html('Register');
    }); 
    $('.error').removeClass('alert alert-danger').html('');
       
}
function showLoginForm(){
    $('#loginModal .registerBox').fadeOut('fast',function(){
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast',function(){
            $('.login-footer').fadeIn('fast');    
        });
        
        $('.modal-title').html('Login');
    });       
    $('.error').removeClass('alert alert-danger').html(''); 
}

function openLoginModal(){
    showLoginForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}
function openRegisterModal(){
    showRegisterForm();
    setTimeout(function(){
        $('#loginModal').modal('show');    
    }, 230);
    
}

function hideModal() {
    setTimeout(function(){
        $('#loginModal').modal('hide');    
    }, 230);
}

function checkAdminIcoInfo(){
    var checkLogin = false;
    $.post("/userInfo/isAdmin", function(data) {        
        if (data.isAdmin == 'false') {
            $.get("/");
        } else {
            $.get("/admin/icoInfo");
            window.location.replace("/admin/icoInfo");  
        }   
    });
}

function checkAdminUserList(){
    var checkLogin = false;
    $.post("/userInfo/isAdmin", function(data) {        
        if (data.isAdmin == 'false') {
            $.get("/");
        } else {
            $.get("/admin/userList");
            window.location.replace("/admin/userList");  
        }   
    });
}

function checkAdminKycInfo(){
    var checkLogin = false;
    $.post("/userInfo/isAdmin", function(data) {        
        if (data.isAdmin == 'false') {
            $.get("/");
        } else {
            $.get("/admin/kycInfo");
            window.location.replace("/admin/kycInfo");  
        }   
    });
}

function checkLoginStatusTokenSale(){
    var checkLogin = false;
    $.post("/tokenSale", {checkLogin: true}, function(data) {        
        if (data.LoginState == 'false') {
            openLoginModal();
        } else {
            $.get("/tokenSale");
            window.location.replace("/tokenSale");  
        }   
    });
}

function checkLoginStatusProfile(){
    var checkLogin = false;
    $.post("/profile", {checkLogin: true}, function(data) {        
        if (data.LoginState == 'false') {
            openLoginModal();
        } else {
            $.get("/profile");
            window.location.replace("/profile");  
        }   
    });
}

function checkLoginStatusKyc(){
    var checkLogin = false;
    $.post("/kyc", {checkLogin: true}, function(data) {
        if (data.LoginState == 'false') {
            openLoginModal();
        } else {
            $.get("/kyc");
            window.location.replace("/kyc");  
        }
    });
}

function loginAjax(){
    $.post("/login", {email: $('#email').val(), password: $('#password').val()}, function(data) {
        if(data.success == 'true'){
            hideModal();
            window.location.replace("/");  
        } else{
            shakeModal(); 
        }
    });
}

function registeAjax() {
    $.post("/register", {email: $('#email-register').val(), password: $('#password-register').val()
                                , password_confirmation: $('#password-confirmation-register').val()}, function( data ) {
        if(data.success == 'true') {
            $.get("/");            
            showLoginForm();
        }
        else{
            shakeModal(); 
        }
    });
}

function logoutAjax(){
    $.post( "/logout", function( data ) {
        if(data.success == 'true'){
            window.location.replace("/");            
        } else {
                shakeModal(); 
        }
    });
}

function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

   