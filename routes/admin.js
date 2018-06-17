var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var numeral = require('numeral');
var User = require('../models/mongoose/user');
var web3Control = require('../models/web3/web3Control');

// Get /admin/icoInfo
router.get('/icoInfo', ensureAuthenticated, function(req, res, next){	
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user || (user.userType != "superAdmin" && user.userType != "nomalAdmin")) {
			res.redirect('/');
		} else {						
			res.render('admin-icoInfo', {
				isLogin : "true", 
				navbarType : "admin"
			});
		}
	});
});

// Get /admin/userList
router.get('/userList', ensureAuthenticated, function(req, res, next){	
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user || (user.userType != "superAdmin" && user.userType != "nomalAdmin")) {
			res.redirect('/');
		} else {						
			res.render('admin-userList', {
				isLogin : "true", 
				navbarType : "admin"
			});
		}
	});
});

// Get /admin/kycInfo
router.get('/kycInfo', ensureAuthenticated, function(req, res, next){	
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user || (user.userType != "superAdmin" && user.userType != "nomalAdmin")) {
			res.redirect('/');
		} else {						
			res.render('admin-kycInfo', {
				isLogin : "true", 
				navbarType : "admin"
			});
		}
	});
});

// post getUserList
router.post('/getUserList', function(req, res,) {	
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user || (user.userType != "superAdmin" && user.userType != "nomalAdmin")) {
			res.redirect('/');
		} else {
			User.getUserList(function(err, userList) {				
				if (err | !userList) {
					res.json({ success: 'false', userList: userList});
				}
				else {
					res.json({ success: 'true', userList: userList});
				}
			});			
		}
	});
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/');
	}
}

module.exports = router;
