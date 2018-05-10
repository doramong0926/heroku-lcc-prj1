var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../models/mongoose/user');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res, next){
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user) {
			res.redirect('/');
		} else {			
			res.render('profile', {isLogin : "true", navbarType : "profile", kycStatus : user.kycStatus, 
			firstName : user.firstName, lastName : user.lastName, referral : user.rafferalAddr,
			walletAddr : user.walletAddr, email : user.email, balance : 10000000, rankOfHolder : 24, sentEth : 100});
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
