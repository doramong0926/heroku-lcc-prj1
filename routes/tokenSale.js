var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../models/mongoose/user');

// Get tokenSale
router.get('/', ensureAuthenticated, function(req, res, next){	
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user) {
			res.redirect('/');
		} else {
			res.render('tokenSale', {
				isLogin : "true", 
				navbarType : "tokenSale"
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
