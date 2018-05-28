var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var IcoInfo = require('../models/mongoose/icoInfo');

var tokenString = 'bluecots';

// Get icoInfo
router.get('/', function(req, res) {
	res.redirect('/');
});

router.post('/', function(req, res) {	
	IcoInfo.getIcoInfo(tokenString, function (err, icoInfo) {
		if (err) {
			res.json({success : 'false' , icoInfo : icoInfo});			
		}
		else {
			res.json({success : 'true' , icoInfo : icoInfo});	
		}	
		
	});
});

module.exports = router;
