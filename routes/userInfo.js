var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fs = require('fs');

var User = require('../models/mongoose/user');
var web3Control = require('../models/web3/web3Control');
let config = require('../config/config.json');

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
				web3Control.getUserInvestInfo(config.data.icoInfo.icoAddr, config.data.icoInfo.contractAddr, config.data.icoInfo.ownerAddr, user.walletAddr, function(err, investInfo) {		
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
				web3Control.getUserInvestInfo(config.data.icoInfo.icoAddr, config.data.icoInfo.contractAddr, config.data.icoInfo.ownerAddr, user.walletAddr, function(err, investInfo) {		
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

router.post('/controlUserInfo', function(req, res,){	
	var controlType = req.body.controlType;
	var targetEmail = req.body.email;
	var item = req.body.item;
	var changeTo = req.body.value;
	console.log("controlType : " + controlType + " targetEmail : " + targetEmail + " item : " + item + " changeTo " + changeTo);
	
	if (!req.isAuthenticated()) {
		res.redirect('/');
	} else if (controlType != "change" || (item != "userType" && item != "kycStatus")) {
		res.redirect('/');
	} else {
		User.getUserByEmail(req.user.email, function (err, user) {
			if (err || !user || (user.userType != "superAdmin" && user.userType != "admin")) {
				res.redirect('/');
			} else {						
				if (controlType == "change") {
					if (item == "userType") {
						if ((changeTo == "superAdmin") || 
							(req.user.userType != "superAdmin" && changeTo == "admin")) {
							res.redirect('/');
						} else {
							User.changeUserType(targetEmail, changeTo, function (err){
								if(err) {									
									res.json({ 'success' : 'false', "err" : err});
								}
								else {
									res.json({ 'success' : 'true', "err" : null});
								}
							})
						}
					} else if (item == "kycStatus") {
						if (req.user.userType != "superAdmin" && changeTo == "reset") {
							res.redirect('/');
						} else {
							if (changeTo == "reset") {
								User.getUserByEmail(targetEmail, function (err, targetUser) {
									if (err || !targetUser) {
										res.json({'success' : 'false', "err" : err});
									} else {
										removeKycPicture(targetUser, function(err) {
											if (err) {
												res.json({'success' : 'false', "err" : err});
											} else {
												User.initKycInfo(targetEmail, function (err){
													if (err) {
														res.json({'success' : 'false', "err" : err});
													} else {
														res.json({'success' : 'true', "err" : null});
													}
												});							
											}
										});
									}
								});
							}
							else {
								User.changeKycStatus(targetEmail, changeTo, function (err){
									if(err) {
										res.json({ 'success' : 'false', "err" : err});
									} else {
										res.json({ 'success' : 'true', "err" : null});
									}
								})
							}
						}	
					}
				}
			}
		});
	}	
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		res.json({ success : 'false'});
	}
}

function removeKycPicture(user, callback) {
	fs.exists("./" + user.kycPicturePath1, function(fileExist){
		if (fileExist) {
			fs.unlink("./" + user.kycPicturePath1, function(err) {
				if (err) {
					callback(err);
				} else {
					fs.exists("./" + user.kycPicturePath2, function(fileExist){
						if (fileExist) {
							fs.unlink("./" + user.kycPicturePath2, function(err) {
								callback(err);
							});
						} else {
							err = true;							
							callback(err);
						}
					});
				}
			});
		} else {
			fs.exists("./" + user.kycPicturePath2, function(fileExist){
				if (fileExist) {
					fs.unlink("./" + user.kycPicturePath2, function(err) {
						callback(err);
					});
				} else {
					err = true;
					callback(err);
				}
			});
		}
	});
}

module.exports = router;
