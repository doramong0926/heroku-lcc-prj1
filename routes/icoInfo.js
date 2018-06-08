var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fs = require('fs');

var IcoInfo = require('../models/mongoose/icoInfo');
var web3Control = require('../models/web3/web3Control');
let config = require('../config/config.json');

// Get icoInfo
router.get('/', function(req, res) {
	res.redirect('/');
});

router.post('/', function(req, res) {	
	IcoInfo.getIcoInfo(config.data.icoInfo.tokenString, function (err, icoInfo) {
		if (err) {
			res.json({success : 'false' , icoInfo : icoInfo});			
		}
		else {
			res.json({success : 'true' , icoInfo : icoInfo});	
		}	
		
	});
});

router.post('/investedInfo', function(req, res) {	
	web3Control.getTotalInvestedEth(config.data.icoInfo.icoAddr, function(err, totalInvestedEth) {
		if (err) {
			console.log("Fail to getTotalInvestedEth");	
			res.json({success : 'false' , totalInvestedEth : "0", totalDistributedToken : "0"});	
		}
		else {	
			web3Control.getTotalDistributedToken(config.data.icoInfo.contractAddr, config.data.icoInfo.icoAddr, function(err, totalDistributedToken) {
				if (err) {
					console.log("Fail to getTotalDistributedToken");	
					res.json({success : 'false' , totalInvestedEth : "0", totalDistributedToken : "0"});	
				}
				else {
					res.json({success : 'true' , totalInvestedEth : totalInvestedEth, totalDistributedToken : totalDistributedToken});	
				}
			});
		}
	});
});

// get icoSchedule
router.get('/icoSchedule', function (req, res) {
	res.redirect('/');
});

// post icoSchedule
router.post('/icoSchedule', function(req, res,) {	
	IcoInfo.getIcoInfo(config.data.icoInfo.tokenString, function (err, icoInfo) {
		if (err) {
			console.log("Fail to get Ico info.");			
		}
		if (!icoInfo) {
			IcoInfo.createIcoInfo(config.data.icoInfo.tokenString, function (err, icoInfo) {				
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


module.exports = router;
