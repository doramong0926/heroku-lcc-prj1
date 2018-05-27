var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../models/mongoose/user');

// Get tokenSale
router.get('/', ensureAuthenticated, function(req, res, next){
	res.render('tokenSale', {isLogin : "true", navbarType : "tokenSale"});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.render('tokenSale', {isLogin : "false", navbarType : "tokenSale"});
	}
}

module.exports = router;
