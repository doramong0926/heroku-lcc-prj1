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
	}
});

var IcoInfo = module.exports = mongoose.model('IcoInfo', icoInfoSchema);
var tokenName = config.data.icoInfo.tokenString;

module.exports.createIcoInfo = function(tokenString, callback) {
	var newIcoInfo = new IcoInfo({
		name : tokenString,

		totalSalesVolume : 100000000,
		preSalesVolume : 2500000,
		roundAVolume : 2500000,
		roundBVolume : 2500000,
		roundCVolume : 2500000,
		
		round : "commingSoon",		
		startPreSale : 1534345200000,
		endPreSale : 0,
		endRoundA : 0,
		endRoundB : 0,
		endRoundC : 0,

		exchangeRate : 100000,
		bonusPreSale : 30,
		bonusRoundA : 5,
		bonusRoundB : 3,
		bonusRoundC : 0,
		bonusVolume10Eth : 3,
		bonusVolume30Eth : 5,
		bonusVolume50Eth : 7,
		bonusReferral : 5
	});
	newIcoInfo.save(callback);
}

module.exports.getIcoInfo = function(Name, callback){
	var query = {name: Name};
	IcoInfo.findOne(query, callback);
}

module.exports.saveIcoInfoAll = function(icoInfo, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, { $set:{
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
													bonusReferral: icoInfo.bonusReferral }
										}, callback);
}

module.exports.saveIcoInfo = function(icoItem, value, callback) {
	if (icoItem == "totalSalesVolume")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{totalSalesVolume: value}}, callback);
	}
	else if(icoItem == "preSalesVolume")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{preSalesVolume: value}}, callback);
	}
	else if(icoItem == "roundAVolume")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{roundAVolume: value}}, callback);
	}
	else if(icoItem == "roundBVolume")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{roundBVolume: value}}, callback);
	}
	else if(icoItem == "roundCVolume")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{roundCVolume: value}}, callback);
	}
	else if(icoItem == "round")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{round: value}}, callback);
	}
	else if(icoItem == "startPreSale")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{startPreSale: value}}, callback);
	}
	else if(icoItem == "endPreSale")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endPreSale: value}}, callback);
	}
	else if(icoItem == "endRoundA")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endRoundA: value}}, callback);
	}
	else if(icoItem == "endRoundB")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endRoundB: value}}, callback);
	}
	else if(icoItem == "endRoundC")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endRoundC: value}}, callback);
	}
	else if(icoItem == "exchangeRate")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{exchangeRate: value}}, callback);
	}
	else if(icoItem == "bonusPreSale")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusPreSale: value}}, callback);
	}
	else if(icoItem == "bonusRoundA")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusRoundA: value}}, callback);
	}
	else if(icoItem == "bonusRoundB")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusRoundB: value}}, callback);
	}
	else if(icoItem == "bonusRoundC")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusRoundC: value}}, callback);
	}
	else if(icoItem == "bonusVolume10Eth")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolume10Eth: value}}, callback);
	}
	else if(icoItem == "bonusVolume30Eth")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolume30Eth: value}}, callback);
	}
	else if(icoItem == "bonusVolume50Eth")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolume50Eth: value}}, callback);
	}
	else if(icoItem == "bonusReferral")
	{
		IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusReferral: value}}, callback);
	}
}

