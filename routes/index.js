var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var md5 = require('md5');
const fs = require('fs');

var User = require('../models/mongoose/user');
var IcoInfo = require('../models/mongoose/icoInfo');
var web3Control = require('../models/web3/web3Control');
let config = require('../config/config.json');

// Get index
router.get('/', ensureAuthenticated, function(req, res, next){
	IcoInfo.getIcoInfo(config.data.icoInfo.tokenString, function (err, icoInfo) {
		if (err) {						
			res.render('index', {	isLogin : "true", 
									navbarType : "index", 
									success: 'true', 
									icoInfo: null,
									totalInvestedEth: null,
									totalDistributedToken: null});	
		}
		else {
			web3Control.getTotalInvestedEth(icoInfo.icoAddr, function(err, totalInvestedEth) {
				if (err) {
					console.log("Fail to getTotalInvestedEth");	
				}
		
				web3Control.getTotalDistributedToken(icoInfo.contractAddr, icoInfo.icoAddr, icoInfo.ownerAddr, function(err, totalDistributedToken) {
					if (err) {
						console.log("Fail to getTotalDistributedToken");	
					}
					res.render('index', {	isLogin : "true", 
											navbarType : "index", 
											success: 'true', 
											icoInfo: icoInfo,
											totalInvestedEth: totalInvestedEth,
											totalDistributedToken: totalDistributedToken});	
					});
			});
		}
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
							userType : "nomal",
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
	if (req.query.ref != undefined) {
		req.session.ref = req.query.ref;		
	}

	if (req.isAuthenticated()) {
		return next();
	} else {
		IcoInfo.getIcoInfo(config.data.icoInfo.tokenString, function (err, icoInfo) {
			if (err || !icoInfo) {
				console.log("Fail to get Ico info.");		
				res.render('index', {	isLogin : "false", 
										navbarType : "index", 
										success: 'true', 
										icoInfo: null,
										totalInvestedEth: null,
										totalDistributedToken: null});							
			} else {
				web3Control.getTotalInvestedEth(icoInfo.icoAddr, function(err, totalInvestedEth) {
					if (err) {
						console.log("Fail to getTotalDistributedToken");	
					}
					web3Control.getTotalDistributedToken(icoInfo.contractAddr, icoInfo.icoAddr, icoInfo.ownerAddr, function(err, totalDistributedToken) {
						if (err) {
							console.log("Fail to getTotalDistributedToken");	
						}
						res.render('index', {	isLogin : "false", 
												navbarType : "index", 
												success: 'true', 
												icoInfo: icoInfo,
												totalInvestedEth: totalInvestedEth,
												totalDistributedToken: totalDistributedToken});	
					});
				});
			}		
		});
	}
}

module.exports = router;

