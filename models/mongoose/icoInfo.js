var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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
	bonusVolume10Eth : {
		type: Number
	},
	bonusVolume30Eth : {
		type: Number
	},
	bonusVolume50Eth : {
		type: Number
	},
});

var IcoInfo = module.exports = mongoose.model('IcoInfo', icoInfoSchema);

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
		bonusPreSale : 0.3,
		bonusRoundA : 0.05,
		bonusRoundB : 0.03,
		bonusVolume10Eth : 0.03,
		bonusVolume30Eth : 0.05,
		bonusVolume50Eth : 0.07
	});
	newIcoInfo.save(callback);
}

module.exports.getIcoInfo = function(Name, callback){
	var query = {name: Name};
	IcoInfo.findOne(query, callback);
}

module.exports.saveIcoInfoAll = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{	totalSalesVolume: icoInfo.totalSalesVolume,
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
												bonusVolume10Eth: icoInfo.bonusVolume10Eth,
												bonusVolume30Eth: icoInfo.bonusVolume30Eth,
												bonusVolume50Eth: icoInfo.bonusVolume50Eth}}, callback);
}

module.exports.saveIcoInfoTotalSalesVolume = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{totalSalesVolume: icoInfo.totalSalesVolume}}, callback);
}

module.exports.saveIcoInfoPreSalesVolume = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{preSalesVolume: icoInfo.preSalesVolume}}, callback);
}

module.exports.saveIcoInfoRoundAVolume = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{roundAVolume: icoInfo.roundAVolume}}, callback);
}

module.exports.saveIcoInfoRoundBVolume = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{roundBVolume: icoInfo.roundBVolume}}, callback);
}

module.exports.saveIcoInfoRoundCVolume = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{roundCVolume: icoInfo.roundCVolume}}, callback);
}

module.exports.saveIcoInfoRound = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{round: icoInfo.round}}, callback);
}

module.exports.saveIcoInfoStartPreSale = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{startPreSale: icoInfo.startPreSale}}, callback);
}

module.exports.saveIcoInfoEndPreSale = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{endPreSale: icoInfo.endPreSale}}, callback);
}

module.exports.saveIcoInfoEndRoundA = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{endRoundA: icoInfo.endRoundA}}, callback);
}

module.exports.saveIcoInfoEndRoundB = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{endRoundB: icoInfo.endRoundB}}, callback);
}

module.exports.saveIcoInfoEndRoundC = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{endRoundC: icoInfo.endRoundC}}, callback);
}

module.exports.saveIcoInfoExchangeRate = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{exchangeRate: icoInfo.exchangeRate}}, callback);
}

module.exports.saveIcoInfoBonusPreSale = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{bonusPreSale: icoInfo.bonusPreSale}}, callback);
}

module.exports.saveIcoInfoBonusRoundA = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{bonusRoundA: icoInfo.bonusRoundA}}, callback);
}

module.exports.saveIcoInfoBonusRoundB = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{bonusRoundB: icoInfo.bonusRoundB}}, callback);
}

module.exports.saveIcoInfoBonusVolume10Eth = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{bonusVolume10Eth: icoInfo.bonusVolume10Eth}}, callback);
}

module.exports.saveIcoInfoBonusVolume30Eth = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{bonusVolume30Eth: icoInfo.bonusVolume30Eth}}, callback);
}

module.exports.saveIcoInfoBonusVolume50Eth = function(icoInfo, callback) {	
	IcoInfo.update({name:icoInfo.name}, {$set:{bonusVolume50Eth: icoInfo.bonusVolume50Eth}}, callback);
}

