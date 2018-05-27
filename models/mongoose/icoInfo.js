var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// IcoInfo Schema
var icoInfoSchema = mongoose.Schema({
	round: {
        type: String,
		index: true,
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
	}
});

var IcoInfo = module.exports = mongoose.model('IcoInfo', icoInfoSchema);

module.exports.getTargetDate = function(Round, callback){
	var query = {round: Round};
	IcoInfo.findOne(query, callback);
}

module.exports.saveIcoInfo = function(icoInfo, callback) {	
	IcoInfo.update({round:icoInfo.round}, {$set:{year:icoInfo.year, month:icoInfo.month, 
		day:icoInfo.day, hour:icoInfo.hour, min:icoInfo.min, sec:icoInfo.sec, utc:icoInfo.utc}}, callback);
}

module.exports.initIcoInfo = function(Round, callback) {
	IcoInfo.update({round:Round}, {$set:{	round: "commingSoon",
											startPreSale:1534345200000, 
											endPreSale:1111111,
											endRoundA:1111111,
											endRoundB:1111111,
											endRoundC:1111111,
											}}, callback);
}

module.exports.createIcoInfo = function(icoInfo, callback) {
	icoInfo.save(callback);
}
