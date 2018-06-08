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
			res.json({ success : 'false', investInfo : investInfo });
		} else {
			if (user.walletAddr == "") {
				console.log("user.walletAddr is empty");	
			}
			else {
				web3Control.getUserInvestInfo(config.data.icoInfo.icoAddr, config.data.icoInfo.contractAddr, user.walletAddr, function(err, investInfo) {		
					if (err) {
						console.log("fail to get UserInvestInfo.");	
						res.json({ success : 'false', investInfo : investInfo });
					}
					else {
						res.json({ success : 'true', investInfo : investInfo });
					}
				});
			}
		}
	});
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		res.json({ success : 'false'});
	}
}

module.exports = router;
