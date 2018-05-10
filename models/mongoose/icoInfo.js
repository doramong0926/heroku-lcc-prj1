var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// IcoInfo Schema
var icoInfoSchema = mongoose.Schema({
	round: {
        type: String,
		index: true,
	},
	year: {
        type: Number
	},
	month: {
		type: Number
	},
	day: {
		type: Number
	},
	hour: {
		type: Number
	},
	min: {
		type: Number
	},
	sec: {
		type: Number
	},
	utc: {
		type: String
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
	IcoInfo.update({round:Round}, {$set:{round: "round-0", year: 2018, month:8, 
		day:16, hour:0, min:0, sec:0, utc:"UTC"}}, callback);
}

module.exports.createIcoInfo = function(icoInfo, callback) {
	icoInfo.save(callback);
}
