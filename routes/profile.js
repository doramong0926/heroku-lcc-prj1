var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var numeral = require('numeral');
var User = require('../models/mongoose/user');
var web3Control = require('../models/web3/web3Control');

// Get profile
router.get('/', ensureAuthenticated, function(req, res, next){	
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user) {
			res.redirect('/');
		} else {						
			res.render('profile', {
				isLogin : "true", 
				navbarType : "profile"
			});
		}
	});
});

router.post('/', function(req, res,){
	if (req.body.checkLogin == 'true') {
		if (req.isAuthenticated()) {
			res.json({"LoginState" : "true"});
		} else {
			res.json({"LoginState" : "false"});	
		}
	}
	else {
		res.redirect('/');
	}
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/');
	}
}

module.exports = router;
