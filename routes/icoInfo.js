var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const md5 = require('md5');
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
			res.json({success : 'false' , icoInfo : null});			
		}
		else {
			checkIcoAddress(icoInfo.icoAddr, function(err) {
				if (err) {
					res.json({success : 'false' , icoInfo : null});
				} else {
					res.json({success : 'true' , icoInfo : icoInfo});
				}

			})
				
		}	
		
	});
});

router.post('/icoTransactionInfo', function(req, res) {
	IcoInfo.getIcoInfo(config.data.icoInfo.tokenString, function (err, icoInfo) {
		if (err) {
			res.json({'success' : 'false' , 'icoTransactionInfo' : null});			
		}
		else {
			web3Control.getIcoTransactionInfo(icoInfo.icoAddr, icoInfo.contractAddr, icoInfo.ownerAddr, function(err, icoTransactionInfo) {		
				if (err) {
					console.log("fail to get icoTransactionInfo.");	
					res.json({ 'success' : 'false', 'icoTransactionInfo' : null });
				}
				else {
					res.json({ 'success' : 'true', 'icoTransactionInfo' : icoTransactionInfo.result });
				}
			});
		}
	});
});

router.post('/investedInfo', function(req, res) {
	IcoInfo.getIcoInfo(config.data.icoInfo.tokenString, function (err, icoInfo) {
		if (err) {
			res.json({success : 'false' , totalInvestedEth : "0", totalDistributedToken : "0"});			
		}
		else {
			web3Control.getTotalInvestedEth(icoInfo.icoAddr, function(err, totalInvestedEth) {
				if (err) {
					console.log("Fail to getTotalInvestedEth");	
					res.json({success : 'false' , totalInvestedEth : "0", totalDistributedToken : "0"});	
				}
				else {	
					web3Control.getTotalDistributedToken(icoInfo.contractAddr, icoInfo.icoAddr, icoInfo.ownerAddr, function(err, totalDistributedToken) {
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
		if (err || !icoInfo) {
			console.log("warning!!! Fail to get Ico info.");				
			res.json({ success: 'false', icoInfo: icoInfo});		
		} else {
			res.json({ success: 'true', icoInfo: icoInfo});
		}		
	});	
});

// post saveTotalSalesVolume
router.post('/saveIcoInfo', function(req, res,) {	
	var infoItem = req.body.infoItem;
	var saveData = req.body.saveData;	
	console.log("infoItem : " + infoItem + " saveData : " + saveData);
	req.checkBody('infoItem', 'infoItem is required').notEmpty();
	req.checkBody('saveData', 'saveData is required').notEmpty();

	if (infoItem == "contractAddr" || infoItem == "icoAddr" || infoItem == "ownerAddr") {
		saveData = saveData.toLowerCase();
	}
	
	IcoInfo.saveIcoInfo(infoItem, saveData, function (err) {				
		if (err) {
			console.log("Fail to save " + infoItem);	
			res.json({ success: 'false', err: err});
		}
		else{
			res.json({ success: 'true'});
		}				
	});
});

// post createIcoInfo
router.post('/controlIcoInfo', function(req, res,) {	
	var controlType = req.body.controlType;
	console.log("controlType : " + controlType);
	req.checkBody('controlType', 'controlType is required').notEmpty();	
	if (controlType == "create") {
		IcoInfo.createIcoInfo(config.data.icoInfo.tokenString, function (err, icoInfo) {				
			if (err) {
				console.log("Fail to create Ico info : " + err);
				res.json({ success: 'false', err: err});	
			} else {
				res.json({ success: 'true'});
			}
		});
	} else if (controlType == "init"){
		IcoInfo.initIcoInfo(config.data.icoInfo.tokenString, function (err) {				
			if (err) {
				console.log("Fail to init IcoInfo :  " + err);	
				res.json({ success: 'false', err: err});
			}
			else{
				res.json({ success: 'true'});
			}				
		});
	}
});

function checkIcoAddress(icoAddr, callback) {
	if (!icoAddr) {
		var err = true;
		callback(err)
	} else {
		var icoAddrHash = md5(icoAddr);		
		//console.log("icoAddrHash :" + icoAddrHash)		
		if (icoAddrHash == config.data.icoInfo.icoAddrHash) {
			var err = false;
			callback(err)
		} else {
			var err = true;
			callback(err)
		}
	}	
}

module.exports = router;
