var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var cors = require('cors');

var User = require('../models/mongoose/user');

var fileStorage1 =  multer.diskStorage( {
	destination: function (req, file, callback) {
		callback(null, 'uploads');      //목적지 폴더 지정 : 'uploads' 를 목적지로 정한다(이쪽으로 파일이 오게됨)
	},
	filename: function (req, file, callback) {
		//올린 파일명이 기존과 같으면 덮어씌워짐으로 시간을 기준으로 다른 파일로 저장되게끔 처리한다	
		var extention = path.extname(file.originalname);
		var basename = path.basename("kycPicture1", extention); //확장자 .jpg 만 빠진 파일명을 얻어온다
		var fname = "[" + req.user.email + "]" + basename + extention;
		callback(null, fname);  
	}
});		
var fileStorage2 =  multer.diskStorage( {
	destination: function (req, file, callback) {
		callback(null, 'uploads');      //목적지 폴더 지정 : 'uploads' 를 목적지로 정한다(이쪽으로 파일이 오게됨)
	},
	filename: function (req, file, callback) {
		//올린 파일명이 기존과 같으면 덮어씌워짐으로 시간을 기준으로 다른 파일로 저장되게끔 처리한다	
		var extention = path.extname(file.originalname);
		var basename = path.basename("kycPicture2", extention); //확장자 .jpg 만 빠진 파일명을 얻어온다
		var fname =  "[" + req.user.email + "]" + basename + extention;
		callback(null, fname);  
	}
});	

var uploadKycPicture1 = multer( {
	storage: fileStorage1,
	limits:
	{
		fileSize: 2 * 1024 * 1024 // 2M
	}
});

var uploadKycPicture2 = multer( {
	storage: fileStorage2,
	limits:
	{
		fileSize: 2 * 1024 * 1024	// 2M
	}
});

var tmpKycPicturePath1 = "";
var tmpKycPicturePath2 = "";


// Get kyc
router.get('/', ensureAuthenticated, function(req, res, next){
	User.getUserByEmail(req.user.email, function (err, user) {
		if (err || !user) {
			res.redirect('/');
		} else {		
			res.render('kyc', {isLogin : "true", navbarType : "kyc", kycStatus : user.kycStatus, kycPicturePath1 : user.kycPicturePath1, kycPicturePath2 : user.kycPicturePath2,
			firstName : user.firstName, lastName : user.lastName, walletAddr : user.walletAddr, email : user.email,});
		}
	});
});

router.post('/', function(req, res,){	
	if (req.body.checkLogin == 'true') {
		if (req.isAuthenticated()) {			
			res.json({"LoginState" : "true"});		
		} else {			
			res.json({"LoginState" : "false"});				
		}
	}
	else {
		res.redirect('/');
	}
});


// post saveKycPicture1
router.route('/kycPicture1').post(uploadKycPicture1.array('photo', 1), function (req, res) {
	if (req.files.length > 0) {
		tmpKycPicturePath1 = req.files[0].path;		
		res.json({success: 'true'});		
	} else {
		res.json({success: 'false'});
	}
	
});

router.route('/kycPicture2').post(uploadKycPicture2.array('photo', 1), function (req, res) {
	if (req.files.length > 0) {
		tmpKycPicturePath2 = req.files[0].path;
		res.json({success: 'true'});		
	} else {
		res.json({success: 'false'});
	}
});

// post saveKyc
router.post('/saveKyc', function (req, res) {
	// Validation
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var wallet = req.body.wallet;
	req.checkBody('firstName', 'firstName is required').notEmpty();
	req.checkBody('lastName', 'lastName is required').notEmpty();
	req.checkBody('wallet', 'wallet is required').notEmpty();
	var errors = req.validationErrors();

	if (errors) {	
		res.json({success: 'false', errors});
	} else {
		var user = new User({
			email : req.user.email,
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			walletAddr : req.body.wallet,
			kycPicturePath1 : tmpKycPicturePath1,
			kycPicturePath2 : tmpKycPicturePath2,
			kycStatus: "approving"
		});
	
		User.saveKycInfo(user, function (err) {
			if (err) {				
				res.json({success: 'false'});
			}
			else {
				res.json({success: 'true'});
			}
		});
	}
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/');
	}
}

module.exports = router;
