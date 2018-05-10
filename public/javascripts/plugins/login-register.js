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

function checkLoginStatusProfile(){
    var checkLogin = false;
    $.post("/profile", {checkLogin: true}, function(data) {        
        if (data.LoginState == 'false') {
            openLoginModal();
            console.log('11 data.LoginState : ' + data.LoginState);
        } else {
            $.get("/profile");
            window.location.replace("/profile");  
            console.log('22 data.LoginState : ' + data.LoginState);
        }   
    });
}

function checkLoginStatusKyc(){
    var checkLogin = false;
    $.post("/kyc", {checkLogin: true}, function(data) {
        console.log('00 data.LoginState : ' + data.LoginState);
        if (data.LoginState == 'false') {
            openLoginModal();
            console.log('11 data.LoginState : ' + data.LoginState);
        } else {
            $.get("/kyc");
            window.location.replace("/kyc");  
            console.log('22 data.LoginState : ' + data.LoginState);
        }
    });
}

function loginAjax(){
    $.post("/login", {email: $('#email').val(), password: $('#password').val()}, function(data) {
        console.log('loginAjax checkLogin email: ' + $('#email').val() + $('#password').val()); 
        if(data.success == 'true'){
            console.log('data.success : ' + data.success);
            hideModal();
            window.location.replace("/");  
        } else{
            shakeModal(); 
            console.log('data.success : ' + data.success);
        }
    });
}

function registeAjax() {
    $.post("/register", {email: $('#email-register').val(), password: $('#password-register').val()
                                , password_confirmation: $('#password-confirmation-register').val()}, function( data ) {
        if(data.success == 'true') {
            console.log('data.success : ' + data.success);
            $.get("/");            
            showLoginForm();
        }
        else{
            console.log('data.success : ' + data.success);
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

   