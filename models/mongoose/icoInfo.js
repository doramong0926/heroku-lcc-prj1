var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const fs = require('fs');
let config = require('../../config/config.json');

// IcoInfo Schema
var icoInfoSchema = mongoose.Schema({
	name: {
		type: String,
		index: true,
	},
	contractAddr: {
		type: String,
	},
	icoAddr: {
		type: String,
	},
	ownerAddr: {
		type: String,
	},
	totalSalesVolume: {
		type: Number,
	},
	preSalesVolume: {
		type: Number,
	},
	roundAVolume: {
		type: Number,
	},
	roundBVolume: {
		type: Number,
	},
	roundCVolume: {
		type: Number,
	},
	round: {
		type: String
		/*
		commingSoon
		preSale
		completePreSale
		roundA
		completeRoundA
		roundB
		completeRoundB
		roundC
		completeRoundC
		*/
	},
	startPreSale: {
		type: Number
	},
	endPreSale: {
		type: Number
	},
	endRoundA: {
		type: Number
	},
	endRoundB: {
		type: Number
	},
	endRoundC: {
		type: Number
	},
	exchangeRate: {
		type: Number
	},
	bonusPreSale: {
		type: Number
	},
	bonusRoundA: {
		type: Number
	},
	bonusRoundB: {
		type: Number
	},
	bonusRoundC: {
		type: Number
	},
	bonusVolumeA : {
		type: Number
	},
	bonusVolumeB : {
		type: Number
	},
	bonusVolumeC : {
		type: Number
	},
	bonusVolumeNumOfEthA : {
		type: Number
	},
	bonusVolumeNumOfEthB : {
		type: Number
	},
	bonusVolumeNumOfEthC : {
		type: Number
	},
	bonusReferral : {
		type: Number
	},
	minimumInvesteEth : {
		type: Number
	}
});

var IcoInfo = module.exports = mongoose.model('IcoInfo', icoInfoSchema);

module.exports.getIcoInfo = function(Name, callback){
	var query = {name: Name};
	IcoInfo.findOne(query, function(err, res){
		if (res) {			
			var currentDate = new Date();
			if (res.round == "completePreSale" && (currentDate < res.endPreSale)) {
				res.round = "completePreSale";
			} else if (res.round == "completeRoundA" && ((res.endPreSale < currentDate) && (currentDate < res.endRoundA))) {
				res.round = "completeRoundA";
			} else if (res.round == "completeRoundB" && ((res.endRoundA < currentDate) && (currentDate < res.endRoundB))) {
				res.round = "completeRoundB";	
			} else if (res.round == "completeRoundC" && ((res.endRoundB < currentDate) && (currentDate < res.endRoundC))) {
				res.round = "completeRoundC";
			} else {
				if (currentDate < res.startPreSale) {
					res.round = "commingSoon";
				} else if (currentDate < res.endPreSale) {
					res.round = "preSale";
				} else if(currentDate < res.endRoundA) {
					res.round = "roundA";
				} else if(currentDate < res.endRoundB) {
					res.round = "roundB";
				} else if(currentDate < res.endRoundC) {
					res.round = "roundC";
				} else {
					res.round = "completeRoundC";
				}
			}
			IcoInfo.saveIcoInfo("round", res.round, function(err) {
				if (err) {
					;
				}
				callback(err, res);
			});
		} else {
			callback(err, res);
		}
	});
}

module.exports.createIcoInfo = function(tokenString, callback) {	
	var newIcoInfo = new IcoInfo({
		name : tokenString,
		contractAddr : "0x",
		icoAddr : "0x",
		ownerAddr : "0x",
		totalSalesVolume : 0,
		preSalesVolume : 0,
		roundAVolume : 0,
		roundBVolume : 0,
		roundCVolume : 0,
		
		round : "",		
		startPreSale : 0,
		endPreSale : 0,
		endRoundA : 0,
		endRoundB : 0,
		endRoundC : 0,

		exchangeRate : 0,
		bonusPreSale : 0,
		bonusRoundA : 0,
		bonusRoundB : 0,
		bonusRoundC : 0,
		bonusVolumeA : 0,
		bonusVolumeB : 0,
		bonusVolumeC : 0,
		bonusVolumeNumOfEthA : 0,
		bonusVolumeNumOfEthB : 0,
		bonusVolumeNumOfEthC : 0,
		bonusReferral : 0,
		minimumInvesteEth : 0,
	});
	newIcoInfo.save(callback);
}

module.exports.initIcoInfo = function(tokenString, callback) {	
	IcoInfo.update({name: tokenString}, { $set:{
													contractAddr : config.data.icoInfo.contractAddr.toLowerCase(),
													icoAddr : config.data.icoInfo.icoAddr.toLowerCase(),
													ownerAddr : config.data.icoInfo.ownerAddr.toLowerCase(),

													totalSalesVolume : config.data.icoInfo.totalSalesVolume,
													preSalesVolume : config.data.icoInfo.preSalesVolume,
													roundAVolume : config.data.icoInfo.roundAVolume,
													roundBVolume : config.data.icoInfo.roundBVolume,
													roundCVolume : config.data.icoInfo.roundCVolume,
													
													round : config.data.icoInfo.round,		
													startPreSale : config.data.icoInfo.startPreSale,
													endPreSale : config.data.icoInfo.endPreSale,
													endRoundA : config.data.icoInfo.endRoundA,
													endRoundB : config.data.icoInfo.endRoundB,
													endRoundC : config.data.icoInfo.endRoundC,

													exchangeRate : config.data.icoInfo.exchangeRate,
													bonusPreSale : config.data.icoInfo.bonusPreSale,
													bonusRoundA : config.data.icoInfo.bonusRoundA,
													bonusRoundB : config.data.icoInfo.bonusRoundB,
													bonusRoundC : config.data.icoInfo.bonusRoundC,
													bonusVolumeA : config.data.icoInfo.bonusVolumeA,
													bonusVolumeB : config.data.icoInfo.bonusVolumeB,
													bonusVolumeC : config.data.icoInfo.bonusVolumeC,
													bonusVolumeNumOfEthA : config.data.icoInfo.bonusVolumeNumOfEthA,
													bonusVolumeNumOfEthB : config.data.icoInfo.bonusVolumeNumOfEthB,
													bonusVolumeNumOfEthC : config.data.icoInfo.bonusVolumeNumOfEthC,
													bonusReferral : config.data.icoInfo.bonusReferral,
													minimumInvesteEth : config.data.icoInfo.minimumInvesteEth }
										}, callback);
}


module.exports.saveIcoInfoAll = function(icoInfo, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, { $set:{
																	contractAddr : icoInfo.contractAddr.toLowerCase(),
																	icoAddr : icoInfo.icoAddr.toLowerCase(),
																	ownerAddr : icoInfo.ownerAddr.toLowerCase(),

																	totalSalesVolume: icoInfo.totalSalesVolume,
																	preSalesVolume: icoInfo.preSalesVolume,
																	roundAVolume: icoInfo.preSalesVolume,
																	roundBVolume: icoInfo.roundBVolume,
																	roundCVolume: icoInfo.roundCVolume,

																	round: icoInfo.round, 
																	startPreSale: icoInfo.startPreSale, 
																	endPreSale: icoInfo.endPreSale, 
																	endRoundA: icoInfo.endRoundA, 
																	endRoundB: icoInfo.endRoundB, 
																	endRoundC: icoInfo.endRoundC,

																	exchangeRate : icoInfo.exchangeRate,
																	bonusPreSale: icoInfo.bonusPreSale,
																	bonusRoundA: icoInfo.bonusRoundA,
																	bonusRoundB: icoInfo.bonusRoundB,
																	bonusRoundC: icoInfo.bonusRoundC,
																	bonusVolumeA: icoInfo.bonusVolumeA,
																	bonusVolumeB: icoInfo.bonusVolumeB,
																	bonusVolumeC: icoInfo.bonusVolumeC,
																	bonusVolumeNumOfEthA: icoInfo.bonusVolumeNumOfEthA,
																	bonusVolumeNumOfEthB: icoInfo.bonusVolumeNumOfEthB,
																	bonusVolumeNumOfEthC: icoInfo.bonusVolumeNumOfEthC,
																	bonusReferral: icoInfo.bonusReferral,
																	minimumInvesteEth: icoInfo.minimumInvesteEth }
															}, callback);
}

module.exports.saveIcoInfo = function(icoItem, value, callback) {
	if (icoItem == "contractAddr") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{contractAddr: value.toLowerCase()}}, callback);
	} else if (icoItem == "icoAddr") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{icoAddr: value.toLowerCase()}}, callback);
	} else if (icoItem == "ownerAddr") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{ownerAddr: value.toLowerCase()}}, callback);
	} else if (icoItem == "totalSalesVolume") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{totalSalesVolume: value}}, callback);
	} else if(icoItem == "preSalesVolume") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{preSalesVolume: value}}, callback);
	} else if(icoItem == "roundAVolume") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{roundAVolume: value}}, callback);
	} else if(icoItem == "roundBVolume") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{roundBVolume: value}}, callback);
	} else if(icoItem == "roundCVolume") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{roundCVolume: value}}, callback);
	} else if(icoItem == "round") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{round: value}}, callback);
	} else if(icoItem == "startPreSale") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{startPreSale: value}}, callback);
	} else if(icoItem == "endPreSale") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endPreSale: value}}, callback);
	} else if(icoItem == "endRoundA") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endRoundA: value}}, callback);
	} else if(icoItem == "endRoundB") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endRoundB: value}}, callback);
	} else if(icoItem == "endRoundC") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endRoundC: value}}, callback);
	} else if(icoItem == "exchangeRate") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{exchangeRate: value}}, callback);
	} else if(icoItem == "bonusPreSale") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusPreSale: value}}, callback);
	} else if(icoItem == "bonusRoundA") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusRoundA: value}}, callback);
	} else if(icoItem == "bonusRoundB") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusRoundB: value}}, callback);
	} else if(icoItem == "bonusRoundC") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusRoundC: value}}, callback);
	} else if(icoItem == "bonusVolumeA") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolumeA: value}}, callback);
	} else if(icoItem == "bonusVolumeB") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolumeB: value}}, callback);
	} else if(icoItem == "bonusVolumeC") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolumeC: value}}, callback);
	} else if(icoItem == "bonusVolumeNumOfEthA") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolumeNumOfEthA: value}}, callback);
	} else if(icoItem == "bonusVolumeNumOfEthB") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolumeNumOfEthB: value}}, callback);
	} else if(icoItem == "bonusVolumeNumOfEthC") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolumeNumOfEthC: value}}, callback);
	} else if(icoItem == "bonusReferral") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusReferral: value}}, callback);
	} else if(icoItem == "minimumInvesteEth") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{minimumInvesteEth: value}}, callback);
	}
}

