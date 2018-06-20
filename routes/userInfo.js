var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fs = require('fs');

var User = require('../models/mongoose/user');
var web3Control = require('../models/web3/web3Control');
let config = require('../config/config.json');

const contractAddr_blc = '0x7d25311209e3b43e23f87569089bd052e696D7C5';
const icoAddr = '0x5cdD23c850b3447C674dE4f37ce9006D480e4413';



router.get('/', function(req, res) {
	res.redirect('/');
});

router.post('/', ensureAuthenticated, function(req, res, next) {	
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user) {
			res.json({ success : 'false', userInfo : user });
		} else {
			res.json({ success : 'true', userInfo : user });
		}
	});
});

router.post('/investInfo', ensureAuthenticated, function(req, res, next) {	
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user) {
			res.json({ success : 'false', investInfo : null });
		} else {
			if (user.walletAddr == "") {
				console.log("user.walletAddr is empty");	
				res.json({ success : 'false', investInfo : null });
			}
			else {
				web3Control.getUserInvestInfo(config.data.icoInfo.icoAddr, config.data.icoInfo.contractAddr, user.walletAddr, function(err, investInfo) {		
					if (err) {
						console.log("fail to get UserInvestInfo.");	
						res.json({ success : 'false', investInfo : null });
					}
					else {
						res.json({ success : 'true', investInfo : investInfo });
					}
				});
			}
		}
	});
});

router.post('/getDetailUserInfo', ensureAuthenticated, function(req, res, next) {	
	var requetEmail = req.body.requetEmail;
	User.getUserByEmail(requetEmail, function (err, user) {
		if (err || !user) {
			res.json({ success : 'false', userInfo : null, investInfo : null});
		} else {
			if (user.walletAddr == "") {
				console.log("user.walletAddr is empty");	
				res.json({ success : 'true', userInfo : user, investInfo : null });
			}
			else {
				web3Control.getUserInvestInfo(config.data.icoInfo.icoAddr, config.data.icoInfo.contractAddr, user.walletAddr, function(err, investInfo) {		
					if (err) {
						console.log("fail to get UserInvestInfo.");	
						res.json({ success : 'true', userInfo : user, investInfo : null });
					}
					else {
						res.json({ success : 'true', userInfo : user, investInfo : investInfo });
					}
				});
			}
		}
	});
});

router.post('/isAdmin', function(req, res,){
	if (req.isAuthenticated()) {
		isAdmin(req, function callback(ret, userType) {			
			if(ret == false) {
				res.json({"isAdmin" : "false", "userType" : userType});
			}
			else {
				res.json({"isAdmin" : "true", "userType" : userType});	
			}
		});
	} else {
		res.json({"isAdmin" : "false", "userType" : "nomal"});	
	}
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		res.json({ success : 'false'});
	}
}

function isAdmin(req, callback) {
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user || (user.userType != "superAdmin" && user.userType != "nomalAdmin")) {
			callback(false, user.userType);
		} else {						
			callback(true, user.userType);
		}
	});
}

module.exports = router;
