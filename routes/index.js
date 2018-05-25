var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var md5 = require('md5');

var User = require('../models/mongoose/user');
var IcoInfo = require('../models/mongoose/icoInfo');

// Get index
router.get('/', ensureAuthenticated, function(req, res, next){
	res.render('index', {isLogin : "true", navbarType : "index"});
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
		//req.query.ref

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
	IcoInfo.getTargetDate("round-0", function (err, icoInfo) {
		if (err || !icoInfo) {			
			var newIcoInfo = new IcoInfo({
				round : "round-0",
				year: 	0, 
				month:	0, 
				day:	0, 
				hour:	0, 
				min:	0, 
				sec:	0, 
				utc:	"UTC"
			});
			IcoInfo.createIcoInfo(newIcoInfo, function (err, newIcoInfo) {
				var Round = "round-0";
				IcoInfo.initIcoInfo(Round, function (err, Round) {
					res.redirect('/');					
				});
			});
		}
		else {			
			res.json({success: 'true', year:icoInfo.year, month:icoInfo.month, 
		day:icoInfo.day, hour:icoInfo.hour, min:icoInfo.min, sec:icoInfo.sec, utc:icoInfo.utc});		
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
	if (req.query.ref != undefined) {
		req.session.ref = req.query.ref;		
	}
	if(req.isAuthenticated()){
		return next();
	} else {
		res.render('index', {isLogin : "false", navbarType : "index"});
	}
}

module.exports = router;
