var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var md5 = require('md5');

var User = require('../models/mongoose/user');
var IcoInfo = require('../models/mongoose/icoInfo');
var web3Control = require('../models/web3/web3Control');

var tokenString = 'bluecots';
const contractAddr_blc = '0x7d25311209e3b43e23f87569089bd052e696D7C5';
const icoAddr = '0x5cdD23c850b3447C674dE4f37ce9006D480e4413';

// Get index
router.get('/', ensureAuthenticated, function(req, res, next){
	web3Control.getTotalInvestedEth(icoAddr, function(err, totalInvestedEth) {
		if (err) {
			console.log("Fail to getTotalInvestedEth");	
		}

		web3Control.getTotalDistributedToken(contractAddr_blc, icoAddr, function(err, totalDistributedToken) {
			if (err) {
				console.log("Fail to getTotalDistributedToken");	
			}
			IcoInfo.getIcoInfo(tokenString, function (err, icoInfo) {
				if (err) {
					console.log("Fail to get Ico info.");			
				}
				if (!icoInfo) {
					IcoInfo.createIcoInfo(tokenString, function (err, icoInfo) {				
						if (err) {
							console.log("Fail to create Ico info.");	
						}
						res.redirect('/');
					});
				}
				else {
					res.render('index', {	isLogin : "true", 
											navbarType : "index", 
											success: 'true', 
											icoInfo: icoInfo,
											totalInvestedEth: totalInvestedEth,
											totalDistributedToken: totalDistributedToken});	
				}
			});	
		});
	});
});

// Post index
router.post('/', function(req, res, next){
	res.redirect('/');
});

router.get('/login', function(req, res, next){
	res.redirect('/');
});

// Post login
router.post('/login', passport.authenticate('local', {failureRedirect: '/', failureFlash: true}),
	function (req, res) {
		res.json({success : 'true'});
});  

// get logout
router.get('/logout', function (req, res) {
	res.redirect('/');
});  

// Post logout
router.post('/logout', function (req, res) {
		req.logout()
		res.json({success : 'true'});
});  

// get Register
router.get('/register', function (req, res) {
	res.redirect('/');
});

// post Register
router.post('/register', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var password_confirmation = req.body.password_confirmation;

	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password_confirmation', 'Passwords do not match').equals(req.body.password);
	var errors = req.validationErrors();
	if (errors) {
		res.json({success: 'false'});
	}
	else {
		//checking for email and is already taken
		User.findOne({ email: {"$regex": "^" + email + "\\b", "$options": "i"}}, function (err, mail) {
				if (mail) {
					res.json({success: 'false'});
				}
				else {
					User.findInvitation(req.session.ref, function (err, invitation) {
						var invitationEmail = '';						
						if ((req.session.ref != undefined) && invitation) {
							invitationEmail = invitation.email;
						}
						var newUser = new User({
							email : email,
							password : password,
							referralAddr : md5(email),
							invitation : invitationEmail
						});
						User.createUser(newUser, function (err, user) {
							if (err) {
								res.json({success: 'false'});
							} else {
								User.initKycInfo(email, function (err) {
									if (err) {
										res.json({success: 'false'});
									}
									else {
										res.json({success: 'true'});
									}
								});
							}
						});
					});					
				}
		});
	}
});

// get icoTargetTime
router.get('/icoTargetTime', function (req, res) {
	res.redirect('/');
});

// post icoTargetTime
router.post('/icoTargetTime', function(req, res,) {	
	IcoInfo.getIcoInfo(tokenString, function (err, icoInfo) {
		if (err) {
			console.log("Fail to get Ico info.");			
		}
		if (!icoInfo) {
			IcoInfo.createIcoInfo(tokenString, function (err, icoInfo) {				
				if (err) {
					console.log("Fail to create Ico info.");	
				}
				res.redirect('/');
			});
		}
		else {
			res.json({ success: 'true', icoInfo: icoInfo });
		}		
	});	
});

passport.use('local', new LocalStrategy({
		usernameField : 'email', 
		passwordField : 'password', 
		passReqToCallback : true
	}, 
	function (req, email, password, done) {
		var email = req.body.email;
		var password = req.body.password;
		User.getUserByEmail(email, function (err, user) {
			if (err) {
				return done(null, false, {message: 'Unknown User'});
			}
			if (!user) {
				return done(null, false, {message: 'Unknown User'});
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err){
					return done(null, false, {message: 'Invalid password'});
				}
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password'});
				}
			});
		});
	})
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

function ensureAuthenticated(req, res, next){	
	/*
	var tmpDate = new Date("2018-8-16");
	var tmpDate2 = new Date(1534345200000);
	console.log(tmpDate.valueOf() );
	console.log(tmpDate2);
	*/	
	if (req.query.ref != undefined) {
		req.session.ref = req.query.ref;		
	}

	if (req.isAuthenticated()) {
		return next();
	} else {
		//res.render('index', {isLogin : "false", navbarType : "index"});
		web3Control.getTotalInvestedEth(icoAddr, function(err, totalInvestedEth) {
			if (err) {
				console.log("Fail to getTotalDistributedToken");	
			}
			web3Control.getTotalDistributedToken(contractAddr_blc, icoAddr, function(err, totalDistributedToken) {
				if (err) {
					console.log("Fail to getTotalDistributedToken");	
				}
				IcoInfo.getIcoInfo(tokenString, function (err, icoInfo) {
					if (err) {
						console.log("Fail to get Ico info.");			
					}
					if (!icoInfo) {
						IcoInfo.createIcoInfo(tokenString, function (err, icoInfo) {				
							if (err) {
								console.log("Fail to create Ico info.");	
							}
							res.redirect('/');
						});
					}
					else {
						res.render('index', {	isLogin : "false", 
												navbarType : "index", 
												success: 'true', 
												icoInfo: icoInfo,
												totalInvestedEth: totalInvestedEth,
												totalDistributedToken: totalDistributedToken});	
					}
				});	
			});
		});
	}
}

module.exports = router;

