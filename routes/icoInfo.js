var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var IcoInfo = require('../models/mongoose/icoInfo');
var web3Control = require('../models/web3/web3Control');

var tokenString = 'bluecots';
const contractAddr_blc = '0x7d25311209e3b43e23f87569089bd052e696D7C5';
const icoAddr = '0x5cdD23c850b3447C674dE4f37ce9006D480e4413';

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

router.post('/investedInfo', function(req, res) {	
	web3Control.getTotalInvestedEth(icoAddr, function(err, totalInvestedEth) {
		if (err) {
			console.log("Fail to getTotalInvestedEth");	
			res.json({success : 'false' , totalInvestedEth : "0", totalDistributedToken : "0"});	
		}
		else {	
			web3Control.getTotalDistributedToken(contractAddr_blc, icoAddr, function(err, totalDistributedToken) {
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


module.exports = router;
