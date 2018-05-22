var Web3 = require('web3');  
var axios = require('axios');

const providerInfura = 'https://mainnet.infura.io/';
const providerInfuraRopsten = 'https://mainnet.infura.io/';
const infuraApiKey = 'boKaU6ROXir6GBk9fqEk';
const etherScanRopstenApiAddr = 'https://api-ropsten.etherscan.io/api?';
etherScanApiKey = 'ZGZW3C6175M2MNQTS14HDDIGBYFDHEMXBR';

// web3 setting
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(providerInfuraRopsten + infuraApiKey));

module.exports.getTokenbalance = function(contractAddr, walletAddr, callback) {
	axios.get(etherScanRopstenApiAddr + "module=account&action=tokenbalance&contractaddress=" + contractAddr +"&address=" + walletAddr + "&tag=latest&apikey=" + etherScanApiKey)
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

module.exports.getTxlist = function(walletAddr, callback) {
	axios.get(etherScanRopstenApiAddr + "module=account&action=txlist&address=" + walletAddr + "&startblock=3072600&endblock=99999999&page=1&offset=1000&sort=asc&apikey=" + etherScanApiKey)
.then(res => {
	var err = false;
	if(res.data.message != 'OK') {
		err = true;
	}
	callback(err, res.data.result);
})
.catch(console.log);
}

module.exports.getTokenTxlist = function(contractAddr, walletAddr, callback) {
	axios.get(etherScanRopstenApiAddr + "module=account&action=tokentx&contractaddress=" + contractAddr + "&address=" + walletAddr + "&startblock=0&endblock=999999999&sort=asc&apikey=" + etherScanApiKey)
.then(res => {
	var err = false;
	if(res.data.message != 'OK') {
		err = true;
	}
	callback(err, res.data.result);
})
.catch(console.log);
}

module.exports.getUserInvestInfo = function(icoAddr, contractAddr, walletAddr, callback) {
	var tempArray = new Array();
	var investInfo = new Array();
	var numOfdata = 0;
	var investEth = 0;
	var receviedToken = 0;
	var err = false;
	
	axios.get(etherScanRopstenApiAddr + "module=account&action=txlist&address=" + walletAddr + "&startblock=3072600&endblock=99999999&page=1&offset=1000&sort=asc&apikey=" + etherScanApiKey)
.then(res => {
	err = false;
	if(res.data.message != 'OK') {
		err = true;
	}
	else {		
		for (var i=0, len = res.data.result.length; i < len; i++) {
			if((res.data.result[i].from.toLowerCase() == walletAddr.toLowerCase()) && (res.data.result[i].to.toLowerCase() == icoAddr.toLowerCase()))
			{				
				tempArray[numOfdata] + {timeStamp : res.data.result[i].timeStamp,
										inOut : 'out', 
										from : walletAddr.toLowerCase(), 
										to : icoAddr.toLowerCase(), 
										value : res.data.result[i].value / Math.pow(10, 18), 
										txId : res.data.result[i].hash};
				investEth = parseInt(investEth) + parseInt(res.data.result[i].value);
				numOfdata = parseInt(numOfdata) + 1;

			}		
		}	
		axios.get(etherScanRopstenApiAddr + "module=account&action=tokentx&contractaddress=" + contractAddr + "&address=" + walletAddr + "&startblock=0&endblock=999999999&sort=asc&apikey=" + etherScanApiKey)
			.then(res => {
				var err = false;
				if(res.data.message != 'OK') {					
					err = true;
				}	
				else {
					for (var i=0, len = res.data.result.length; i < len; i++) {
						if((res.data.result[i].from.toLowerCase() == icoAddr.toLowerCase()) && (res.data.result[i].to.toLowerCase() == walletAddr.toLowerCase()))
						{														
							tempArray[numOfdata] = {timeStamp : res.data.result[i].timeStamp,
													inOut : 'in', 
													from : icoAddr.toLowerCase(), 
													to : walletAddr.toLowerCase(), 
													value : res.data.result[i].value / Math.pow(10, 18), 
													txId : res.data.result[i].hash};							
							receviedToken = receviedToken + parseInt(res.data.result[i].value);
							numOfdata = parseInt(numOfdata) + 1;
						}
					}		
				}
				investInfo = {numOfdata : numOfdata, investEth : investEth / Math.pow(10, 18), receviedToken : receviedToken / Math.pow(10, 18), result : tempArray};
				callback(err, investInfo);
			})
			.catch(console.log);		
	}	
})
.catch(console.log);
}


/*
web3.setProvider(new web3.providers.HttpProvider(providerInfura + infuraApiKey));
var wallet_1 = "0x88e343f4599292c2cffe683c1bb93cd3480bdbab";

var balanceWei = web3.eth.getBalance(wallet_1).toNumber();
var balance = web3.fromWei(balanceWei, 'ether');


var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint128"}],"name":"push","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint128"}],"name":"pull","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"burn","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
var MyContract = web3.eth.contract(abi);
var myContractInstance = MyContract.at('0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0');
var testVal = myContractInstance.balanceOf.call('0xd5e783f6d745135ed6de7eafd43c4521981c7441');
console.log(testVal);
console.log(testVal.toNumber());
console.log(testVal.toNumber() / Math.pow(10, 18));

var n = web3.eth.blockNumber;
console.log(n);



var txs = [];
for(var i = 0; i < n; i++) {
	var block = web3.eth.getBlock(i);
	console.log(block);
    for(var j = 0; j < block.transactions; j++) {
        if( block.transactions[j].to == '0xd5e783f6d745135ed6de7eafd43c4521981c7441' ) {
			txs.push(block.transactions[j]);
			console.log(block.transactions[j]);
		}
    }
}


var number = web3.eth.getTransactionCount("0xd5e783f6d745135ed6de7eafd43c4521981c7441");
console.log(number);


axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x7d25311209e3b43e23f87569089bd052e696D7C5&address=0x34A5BFD3e276700A486Af72591ACf82D09516E74&tag=latest&apikey=ZGZW3C6175M2MNQTS14HDDIGBYFDHEMXBR`)
.then(res => {
  const result = res.data.result;
  console.log(res.data);
  console.log(result);
})
.catch(console.log);


axios.get(`https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0xfd59158bb5f3607ecc2ae19b2930520164310f67&startblock=0&endblock=99999999&sort=asc&apikey=ZGZW3C6175M2MNQTS14HDDIGBYFDHEMXBR`)
.then(res => {
  const result = res.data.result;
  console.log(result);
  console.log("hash --> " + result[0].hash);
  console.log("from --> " + result[0].from);
  console.log("to --> " + result[0].to);
  console.log(result.sizeof);
})
.catch(console.log);


*/