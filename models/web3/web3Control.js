var Web3 = require('web3');  
var axios = require('axios');
const fs = require('fs');
let config = require('../../config/config.json');

var web3 = new Web3();
var etherScanApiString;
var providerString;
var etherScanApiKey = config.data.etherScan.apiKey;

if (config.data.web3.networkType == "ropsten") {
	etherScanApiString = config.data.etherScan.providerRopsten;
	if (config.data.web3.provideVendor == "ehterScan") {
		providerString = config.data.etherScan.providerRopsten + config.data.infura.apiKey;
	} else if (config.data.web3.provideVendor == "infura") {
		providerString = config.data.infura.providerRopsten + config.data.infura.apiKey;
	}
} else {
	etherScanApiString = config.data.etherScan.providerRopsten;
	if (config.data.web3.provideVendor == "ehterScan") {
		providerString = config.data.etherScan.providerMainNet + config.data.infura.apiKey;
	} else if (config.data.web3.provideVendor == "infura") {
		providerString = config.data.infura.providerMainNet + config.data.infura.apiKey;
	}
}

// web3 setting
web3.setProvider(new web3.providers.HttpProvider(providerString));

module.exports.isValidAddress = function(addr, callback) {
	callback(web3.isAddress(addr));
}

module.exports.getTokenbalance = function(contractAddr, walletAddr, callback) {
	var contractAddr = contractAddr.toLowerCase();
	axios.get(etherScanApiString + "?module=account&action=tokenbalance&contractaddress=" + contractAddr +"&address=" + walletAddr + "&tag=latest&apikey=" + etherScanApiKey)
.then(res => {
	const balance = res.data.result / Math.pow(10, 18);
	var err = false;
	if(res.data.message != 'OK') {
		err = true;
	}
	callback(err, balance);
})
.catch(console.log);
}

getNomalTxlist = function(walletAddr, callback) {
	var walletAddr = walletAddr.toLowerCase();
	axios.get(etherScanApiString + "?module=account&action=txlist&address=" + walletAddr + "&startblock=0&endblock=99999999&sort=asc&apikey=" + etherScanApiKey)
	.then(res => {
		var err = false;
		if(res.data.message != 'OK') {
			err = true;
		}		
		callback(err, res.data.result);
	})
	.catch(console.log);
}

getErc20TokenTxlistWithAddress = function(contractAddr, walletAddr, callback) {	
	var contractAddr = contractAddr.toLowerCase();
	var walletAddr = walletAddr.toLowerCase();
	axios.get(etherScanApiString + "?module=account&action=tokentx&contractaddress=" + contractAddr + "&address=" + walletAddr + "&startblock=0&endblock=999999999&sort=asc&apikey=" + etherScanApiKey)
	.then(res => {
		var err = false;
		if(res.data.message != 'OK') {
			err = true;
		}
		callback(err, res.data.result);
	})
	.catch(console.log);
}

getErc20TokenTxlist = function(contractAddr, callback) {
	var contractAddr = contractAddr.toLowerCase();
	axios.get(etherScanApiString + "?module=account&action=tokentx&contractaddress=" + contractAddr + "&startblock=0&endblock=999999999&sort=asc&apikey=" + etherScanApiKey)
	.then(res => {
		var err = false;
		if(res.data.message != 'OK') {
			err = true;
		}
		callback(err, res.data.result);
	})
	.catch(console.log);
}

getTokenTxReceiptStatus = function(txid, callback) {
	axios.get(etherScanApiString + "?module=transaction&action=gettxreceiptstatus&txhash=" + txid + "&apikey=" + etherScanApiKey)
	.then(res => {
		var err = false;
		if(res.data.message != 'OK') {
			err = true;
		}
		callback(err, res.data.result.status);
	})
	.catch(console.log);
}

module.exports.getUserInvestInfo = function(icoAddr, contractAddr, ownerAddr, walletAddr, callback) {
	var tempArray = new Array();
	var investInfo = new Array();
	var numOfdata = 0;
	var investEth = 0;	
	var receviedToken = 0;
	var icoAddr = icoAddr.toLowerCase();
	var contractAddr = contractAddr.toLowerCase();
	var ownerAddr = ownerAddr.toLowerCase();
	var walletAddr = walletAddr.toLowerCase();
	var err = false;

	getNomalTxlist(walletAddr, function (err, result) {
		if (err == true) {
			investInfo = {numOfdata : numOfdata, investEth : investEth / Math.pow(10, 18), receviedToken : receviedToken / Math.pow(10, 18), result : tempArray.sort(tempArray.timeStamp)};
			callback(err, investInfo);
		}
		else {
			for (var i=0, len = result.length; i < len; i++) {			
				if ((result[i].txreceipt_status == '1') && (result[i].from.toLowerCase() == walletAddr) && (result[i].to.toLowerCase() == icoAddr))
				{			
					var date = new Date(result[i].timeStamp * 1000); 														
					tempArray[numOfdata] = {timeStamp : date.toUTCString(),
											inOut : 'out', 
											from : walletAddr, 
											to : icoAddr, 
											value : result[i].value / Math.pow(10, 18), 
											txId : result[i].hash,
											tokenName : 'Ethereum',
											tokenSymbol : 'ETH'};						
					investEth = investEth + parseInt(result[i].value);
					numOfdata = parseInt(numOfdata) + 1;					
				}		
			}	
			getErc20TokenTxlistWithAddress(contractAddr, walletAddr, function (err, result) {		
				if (err == true) {
					investInfo = {numOfdata : numOfdata, investEth : investEth / Math.pow(10, 18), receviedToken : receviedToken / Math.pow(10, 18), result : tempArray.sort(tempArray.timeStamp)};
					callback(err, investInfo);
				}
				else {					
					for (var i=0, len = result.length; i < len; i++) {					
						if ((result[i].from.toLowerCase() == icoAddr) && (result[i].to.toLowerCase() == walletAddr))
						{		
							var date = new Date(result[i].timeStamp * 1000); 														
							tempArray[numOfdata] = {timeStamp : date.toUTCString(),
													inOut : 'in', 
													from : icoAddr, 
													to : walletAddr, 
													value : result[i].value / Math.pow(10, 18), 
													txId : result[i].hash,
													tokenName : result[i].tokenName,
													tokenSymbol : result[i].tokenSymbol};		
							receviedToken = receviedToken + parseInt(result[i].value);
							numOfdata = parseInt(numOfdata) + 1;
						}						
					}		
					investInfo = {numOfdata : numOfdata, investEth : investEth / Math.pow(10, 18), receviedToken : receviedToken / Math.pow(10, 18), result : tempArray.sort(tempArray.timeStamp)};
					callback(err, investInfo);				
				}
			});
		}
	});
}

module.exports.getTotalInvestedEth = function(icoAddr, callback) {
	var investEth = 0;
	var icoAddr = icoAddr.toLowerCase();	
	var err = false;
	getNomalTxlist(icoAddr, function (err, result) {
		if (err) {
			callback(err, 0);
		}
		else {
			for (var i=0, len = result.length; i < len; i++) {			
				if ((result[i].txreceipt_status == '1') && (result[i].to.toLowerCase() == icoAddr))
				{						
					investEth = investEth + parseInt(result[i].value);				
				}		
			}
			callback(err, investEth / Math.pow(10, 18));
		}
	});
}

module.exports.getTotalDistributedToken = function(contractAddr, icoAddr, ownerAddr, callback) {
	var icoAddr = icoAddr.toLowerCase();
	var ownerAddr = ownerAddr.toLowerCase();
	var distributedToken = 0;	
	var err = false;
	getErc20TokenTxlist(contractAddr, function (err, result) {								
		if (err == true) {
			callback(err, 0);
		}
		else {					
			for (var i=0, len = result.length; i < len; i++) {					
				if ((result[i].from.toLowerCase() == icoAddr) && 
					(result[i].to.toLowerCase() != ownerAddr))
				{		
					distributedToken = distributedToken + parseInt(result[i].value);					
				}						
			}					
		}
		callback(err, distributedToken / Math.pow(10, 18));	
	});
}
