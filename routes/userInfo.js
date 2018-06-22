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

router.post('/controlUserInfo', function(req, res,){	
	var controlType = req.body.controlType;
	var email = req.body.email;
	var item = req.body.item;
	var value = req.body.value;
	console.log("controlType : " + controlType + " email : " + email + " item : " + item + " value" + value);
	
	if (req.isAuthenticated()) {
		isAdmin(req, function callback(ret, userType) {	
			if (controlType == "change") {
				if (item == "userType") {
					if (ret == false) {
						res.redirect('/');
						return;
					}
					if (value != "nomal" && value != "admin" && value != "manager")
					{
						res.redirect('/');
						return;
					}

					if(userType != "superAdmin") {
						res.redirect('/');
						return;
					} 
					User.changeUserType(email, value, function (err){
						if(err) {
							res.json({ 'success' : 'false', "err" : err});
						}
						else {
							res.json({ 'success' : 'true', "err" : ""});
						}
		
					})
				} else if (item == "kycStatus") {
					if(ret == false) {
						res.redirect('/');
						return;
					} 
					if (value != "reset" && value != "rejected" && value != "completed") {
						res.redirect('/');
						return;
					}					
					if (value == "reset") {
						if(userType != "superAdmin") {
							res.redirect('/');
							return;
						}
					}
					if (value == "completed" || value == "rejected") {
						if(userType != "superAdmin" && userType != "admin") {
							res.redirect('/');
							return;
						}
					}

					if (value == "reset") {
						User.getUserByEmail(email, function (err, user) {
							if (err || !user) {
								res.json({ 'success' : 'false', "err" : err});
							} else {
								fs.exists("./" + user.kycPicturePath1, function(ret){
									if (ret == false) {
										fs.exists("./" + user.kycPicturePath2, function(ret){
											if (ret == false) {
												User.initKycInfo(email, function (err){							
													if (err) {
														res.json({ 'success' : 'false', "err" : err});
													} else {
														res.json({ 'success' : 'true', "err" : ""});
													}
												});
											} else {
												fs.unlink("./" + user.kycPicturePath2, function(err) {
													if (err) {
														console.log("fail to delete file : " + user.kycPicturePath2);
														res.json({ 'success' : 'false', "err" : err});
													} else {
														User.initKycInfo(email, function (err){							
															if (err) {
																res.json({ 'success' : 'false', "err" : err});
															} else {
																res.json({ 'success' : 'true', "err" : ""});
															}
														});
													}
												});
											}
										})
									} else {
										fs.unlink("./" + user.kycPicturePath1, function(err) {
											if (err) {
												console.log("fail to delete file : " + user.kycPicturePath1);
												res.json({ 'success' : 'false', "err" : err});
											} else {
												fs.exists("./" + user.kycPicturePath2, function(ret){
													if (ret == false) {
														User.initKycInfo(email, function (err){							
															if (err) {
																res.json({ 'success' : 'false', "err" : err});
															} else {
																res.json({ 'success' : 'true', "err" : ""});
															}
														});
													} else {
														fs.unlink("./" + user.kycPicturePath2, function(err) {
															if (err) {
																console.log("fail to delete file : " + user.kycPicturePath2);
																res.json({ 'success' : 'false', "err" : err});
															} else {
																User.initKycInfo(email, function (err){							
																	if (err) {
																		res.json({ 'success' : 'false', "err" : err});
																	} else {
																		res.json({ 'success' : 'true', "err" : ""});
																	}
																});
															}
														});
													}
												})
											}
										});
									}
								})
							}
						});
					}
					else {
						User.changeKycStatus(email, value, function (err){
							if(err) {
								res.json({ 'success' : 'false', "err" : err});
							} else {
								res.json({ 'success' : 'true', "err" : ""});
							}
						})
					}	
				} else{
					res.json({ 'success' : 'false', "err" : ""});
				}	
			} else {
				res.json({ 'success' : 'false', "err" : ""});
			}
		});
	} else {
		res.redirect('/');
	}
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
		res.redirect('/');	
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
		if (err || !user || (user.userType != "superAdmin" && user.userType != "admin")) {
			callback(false, user.userType);
		} else {						
			callback(true, user.userType);
		}
	});
}

module.exports = router;
