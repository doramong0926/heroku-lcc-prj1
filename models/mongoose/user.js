var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var userSchema = mongoose.Schema({
	email: {
        type: String,
		index: true,
	},
	password: {
		type: String
	},
	userType: {
		type: String
		/* 
			superAdmin
			admin
			manager
			nomal
		*/
	},
	referralAddr: {
		type: String
	},
	invitation: {
		type: String
	},
	walletAddr: {
		type: String
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	kycPicturePath1: {
		type: String
	},
	kycPicturePath2: {
		type: String
	},
	kycStatus: {
		/* 
			ready
			approving
			waitingWhiteList
			completed			
			rejected
		*/
		type: String
	}
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback){	
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.saveKycInfo = function(user, callback) {
	console.log(user);
	User.update({email:user.email}, {$set:{firstName:user.firstName, lastName:user.lastName, 
		walletAddr:user.walletAddr, kycStatus:user.kycStatus, kycPicturePath1:user.kycPicturePath1, kycPicturePath2:user.kycPicturePath2}}, callback);
}

module.exports.initKycInfo = function(email, callback) {
	User.update({email:email}, {$set:{firstName: "", lastName: "", walletAddr:"", kycPicturePath1: "", kycPicturePath2: "", kycStatus: "ready"}}, callback);
}

module.exports.findInvitation = function(referralAddr, callback) {
	var query = {referralAddr: referralAddr};
	User.findOne(query, callback);
}

module.exports.getUserList = function(callback){
	User.find(callback);
}

module.exports.changeUserType = function(email, value, callback){
	User.update({email:email}, {$set:{ userType : value}}, callback);
}

module.exports.changeWalletAddr = function(email, value, callback){
	User.update({email:email}, {$set:{ walletAddr : value}}, callback);
}

module.exports.changeFirstName = function(email, value, callback){
	User.update({email:email}, {$set:{ firstName : value}}, callback);
}
module.exports.changeLastName = function(email, value, callback){
	User.update({email:email}, {$set:{ lastName : value}}, callback);
}

module.exports.changeKycStatus = function(email, value, callback){
	User.update({email:email}, {$set:{ kycStatus : value}}, callback);
}

module.exports.changeKycPicturePath1 = function(email, value, callback){
	User.update({email:email}, {$set:{ kycPicturePath1 : value}}, callback);
}

module.exports.changeKycPicturePath2 = function(email, value, callback){
	User.update({email:email}, {$set:{ kycPicturePath2 : value}}, callback);
}
