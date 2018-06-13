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

module.exports.saveIcoInfoTotalSalesVolume = function(value, callback) {
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{totalSalesVolume: value}}, callback);
}

module.exports.saveIcoInfoPreSalesVolume = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{preSalesVolume: value}}, callback);
}

module.exports.saveIcoInfoRoundAVolume = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{roundAVolume: value}}, callback);
}

module.exports.saveIcoInfoRoundBVolume = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{roundBVolume: value}}, callback);
}

module.exports.saveIcoInfoRoundCVolume = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{roundCVolume: value}}, callback);
}

module.exports.saveIcoInfoRound = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{round: value}}, callback);
}

module.exports.saveIcoInfoStartPreSale = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{startPreSale: value}}, callback);
}

module.exports.saveIcoInfoEndPreSale = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endPreSale: value}}, callback);
}

module.exports.saveIcoInfoEndRoundA = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endRoundA: value}}, callback);
}

module.exports.saveIcoInfoEndRoundB = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endRoundB: value}}, callback);
}

module.exports.saveIcoInfoEndRoundC = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{endRoundC: value}}, callback);
}

module.exports.saveIcoInfoExchangeRate = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{exchangeRate: value}}, callback);
}

module.exports.saveIcoInfoBonusPreSale = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusPreSale: value}}, callback);
}

module.exports.saveIcoInfoBonusRoundA = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusRoundA: value}}, callback);
}

module.exports.saveIcoInfoBonusRoundB = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusRoundB: value}}, callback);
}

module.exports.saveIcoInfoBonusRoundC = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusRoundC: value}}, callback);
}

module.exports.saveIcoInfoBonusVolume10Eth = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolume10Eth: value}}, callback);
}

module.exports.saveIcoInfoBonusVolume30Eth = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolume30Eth: value}}, callback);
}

module.exports.saveIcoInfoBonusVolume50Eth = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusVolume50Eth: value}}, callback);
}

module.exports.saveIcoInfoBonusReferral = function(value, callback) {	
	IcoInfo.update({name:config.data.icoInfo.tokenString}, {$set:{bonusReferral: value}}, callback);
}
