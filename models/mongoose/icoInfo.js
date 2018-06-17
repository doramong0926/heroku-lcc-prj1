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
		roundA
		roundB
		roundC
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
	bonusVolume10Eth : {
		type: Number
	},
	bonusVolume30Eth : {
		type: Number
	},
	bonusVolume50Eth : {
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
	IcoInfo.findOne(query, callback);
}

module.exports.createIcoInfo = function(tokenString, callback) {
	var newIcoInfo = new IcoInfo({
		name : config.data.icoInfo.tokenString,
		contractAddr : "0x",
		icoAddr : "0x",
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
		bonusVolume10Eth : 0,
		bonusVolume30Eth : 0,
		bonusVolume50Eth : 0,
		bonusReferral : 0,
		minimumInvesteEth : 0,
	});
	newIcoInfo.save(callback);
}

module.exports.initIcoInfo = function(tokenString, callback) {	
	IcoInfo.update({name: tokenString}, { $set:{
													contractAddr : config.data.icoInfo.contractAddr,
													icoAddr : config.data.icoInfo.icoAddr,
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
													bonusVolume10Eth : config.data.icoInfo.bonusVolume10Eth,
													bonusVolume30Eth : config.data.icoInfo.bonusVolume30Eth,
													bonusVolume50Eth : config.data.icoInfo.bonusVolume50Eth,
													bonusReferral : config.data.icoInfo.bonusReferral,
													minimumInvesteEth : config.data.icoInfo.minimumInvesteEth }
										}, callback);
}


module.exports.saveIcoInfoAll = function(icoInfo, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, { $set:{
																	contractAddr : icoInfo.contractAddr,
																	icoAddr : icoInfo.icoAddr,

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
																	bonusVolume10Eth: icoInfo.bonusVolume10Eth,
																	bonusVolume30Eth: icoInfo.bonusVolume30Eth,
																	bonusVolume50Eth: icoInfo.bonusVolume50Eth,
																	bonusReferral: icoInfo.bonusReferral,
																	minimumInvesteEth: icoInfo.minimumInvesteEth }
															}, callback);
}

module.exports.saveIcoInfo = function(icoItem, value, callback) {
	if (icoItem == "contractAddr") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{contractAddr: value}}, callback);
	} else if (icoItem == "icoAddr") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{icoAddr: value}}, callback);
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
	} else if(icoItem == "bonusVolume10Eth") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolume10Eth: value}}, callback);
	} else if(icoItem == "bonusVolume30Eth") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolume30Eth: value}}, callback);
	} else if(icoItem == "bonusVolume50Eth") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolume50Eth: value}}, callback);
	} else if(icoItem == "bonusReferral") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusReferral: value}}, callback);
	} else if(icoItem == "minimumInvesteEth") {
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{minimumInvesteEth: value}}, callback);
	}
}

