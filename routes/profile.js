var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var numeral = require('numeral');

var User = require('../models/mongoose/user');
var web3Control = require('../models/web3/web3Control');

const contractAddr_lcc = '0x7d25311209e3b43e23f87569089bd052e696D7C5';

// Get profile
router.get('/', ensureAuthenticated, function(req, res, next){
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user) {
			res.redirect('/');
		} else {			
				web3Control.getTokenbalance(contractAddr_lcc, user.walletAddr, function(err, balance) {
				if (err) {
					console.log("err");		
				}
				res.render('profile', {
					isLogin : "true", 
					navbarType : "profile", 
					kycStatus : user.kycStatus, 
					firstName : user.firstName, 
					lastName : user.lastName, 
					referral : user.rafferalAddr,
					walletAddr : user.walletAddr, 
					email : user.email, 
					balance : numeral(balance).format('0,0'), 
					rankOfHolder : 24, 
					sentEth : 100});
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
