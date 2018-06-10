var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var numeral = require('numeral');
var User = require('../models/mongoose/user');
var web3Control = require('../models/web3/web3Control');

// Get admin
router.get('/', ensureAuthenticated, function(req, res, next){	
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

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/');
	}
}

module.exports = router;
