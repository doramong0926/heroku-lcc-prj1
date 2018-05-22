var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var numeral = require('numeral');

var User = require('../models/mongoose/user');
var web3Control = require('../models/web3/web3Control');

const contractAddr_lcc = '0x7d25311209e3b43e23f87569089bd052e696D7C5';
const icoAddr = '0x5cdD23c850b3447C674dE4f37ce9006D480e4413';

// Get profile
router.get('/', ensureAuthenticated, function(req, res, next){
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user) {
			res.redirect('/');
		} else {			
			web3Control.getUserInvestInfo(icoAddr, contractAddr_lcc, user.walletAddr, function(err, investInfo) {
				if (err) {
					console.log("fail to get UserInvestInfo.");		
				}
				console.log(investInfo);
				res.render('profile', {
					isLogin : "true", 
					navbarType : "profile",
					user : user,
					investInfo : investInfo,
					contractAddr : contractAddr_lcc,
					icoAddr : icoAddr
				});
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
