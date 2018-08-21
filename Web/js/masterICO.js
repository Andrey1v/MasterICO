
const cPriceEth = 439.75;
const cPriceToken = 0.84;
var   tokenNAME = "INV";
var   decimal = 18;

const NoneVote = 0;
const YesVote = 1;
const NoVote = 2;
const AbstainedVote = 3;

var masterICO;
var address = "0x0dd89bd82918ee6c5e4f4a07c910849b78501bd5";
var eventIsInitialized = new Event('IsInitialized');

const uploadFileScript = "http://localhost/masterchain/preReleaseMasterchain/uploadFile.php";


function cancelVote(){
	masterICO.cancelVote( YesVote, (err,res)=>{
		console.log("vote:" + _vote);	
	});	
	
}
function initEth(){

  web3.eth.getAccounts((error,accounts)=>{
  if(error){console.log(error); return; }

  web3.eth.defaultAccount = accounts[0];

  
  if(typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
  } else {}

  
	var ContractInterface = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "openingTime",
				"type": "uint256"
			},
			{
				"name": "durationTime",
				"type": "uint256"
			},
			{
				"name": "requestedAmount",
				"type": "uint256"
			},
			{
				"name": "overviewsCounter",
				"type": "uint256"
			},
			{
				"name": "reportsCounter",
				"type": "uint256"
			},
			{
				"name": "votesCounter",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalAllStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxSeedStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "proposalResult",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "rateSeedStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "currentCancellationResults",
		"outputs": [
			{
				"name": "yes",
				"type": "uint256"
			},
			{
				"name": "no",
				"type": "uint256"
			},
			{
				"name": "abstain",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "currentProposalResults",
		"outputs": [
			{
				"name": "yes",
				"type": "uint256"
			},
			{
				"name": "no",
				"type": "uint256"
			},
			{
				"name": "abstain",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSeedStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxPublicSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "getReportsCounter",
		"outputs": [
			{
				"name": "reportsCounter",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalPreSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "minPayment",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "canceled",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "endPublicSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "getProposalFunds",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "wallet",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_cancelVote",
				"type": "uint8"
			}
		],
		"name": "cancelVote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ratePrivateSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "endSeedStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ratePreSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"name": "_url",
				"type": "string"
			},
			{
				"name": "_documentHash",
				"type": "string"
			}
		],
		"name": "addOverview",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_durationTime",
				"type": "uint256"
			},
			{
				"name": "_requestedAmount",
				"type": "uint256"
			},
			{
				"name": "_url",
				"type": "string"
			},
			{
				"name": "_documentHash",
				"type": "string"
			}
		],
		"name": "addProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalTokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxPreSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalPrivateSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"name": "_vote",
				"type": "uint8"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "FundingThresholdPercent",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalPublicSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "startPreSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "startSeedStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "endPrivateSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getRefund",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ratePublicSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "CancellationThresholdPercent",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxPrivateSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"name": "_url",
				"type": "string"
			},
			{
				"name": "_documentHash",
				"type": "string"
			}
		],
		"name": "addReport",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getProposalsLength",
		"outputs": [
			{
				"name": "proposalsLength",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "MinimumDuration",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"name": "_reportId",
				"type": "uint256"
			}
		],
		"name": "getReport",
		"outputs": [
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "url",
				"type": "string"
			},
			{
				"name": "documentHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalSupply",
		"outputs": [
			{
				"name": "totalSupply",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "endPreSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"name": "_overviewId",
				"type": "uint256"
			}
		],
		"name": "getOverview",
		"outputs": [
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "url",
				"type": "string"
			},
			{
				"name": "documentHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "checkProposalExistence",
		"outputs": [
			{
				"name": "exist",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "getOverviewsCounter",
		"outputs": [
			{
				"name": "overviewsCounter",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cancel",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "startPrivateSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "startPublicSaleStage",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "purchaser",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "beneficiary",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokenPurchase",
		"type": "event"
	}
]);
	
  masterICO = ContractInterface.at(address);

  console.log("Contract initialized successfully");

  //---------
		
	//updateCoinInfo();
	
	document.dispatchEvent(eventIsInitialized);
  });
}

function updateCoinInfo(){
	masterICO.decimals((err,res)=>{
		decimal = res;	
			
	});
	
}

function addEntry(URL, hash){
	
  var votingDurationUnixTime = parseInt(document.getElementById('aProposalVotingDuration').value) * 86400; //time to unixTime
  var requestedAmountWei     = parseFloat(document.getElementById('aProposalRequestedAmount').value) * 1000000000000000000; //eth to wei
  
  console.log(document.getElementById('aProposalName').value + ":" + parseInt(document.getElementById('aProposalVotingDuration').value) + ":" + parseInt(document.getElementById('aProposalRequestedAmount').value)+":" + URL +":" +hash);
  masterICO.addProposal(document.getElementById('aProposalName').value,
              votingDurationUnixTime,
              requestedAmountWei, 
               URL, hash, (err,res)=>{ console.log(err); console.log(res);});

}

function getHash(file, name){
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(){
    var bitArray = sjcl.hash.sha256.hash(reader.result.slice(reader.result.indexOf(',')+1));
    var textHash = sjcl.codec.hex.fromBits(bitArray);
    
    addEntry("/"+name, textHash)
  }

}

function addProposal(){
	
	if(document.getElementById('aProposalName').value == "" ||
		parseInt(document.getElementById('aProposalVotingDuration').value == "") ||
		document.getElementById('aProposalRequestedAmount').value == ""){
		alert("Заполните все поля!");
		return ;
	}
		
		
	var file_data = document.getElementById('proposalOverview').files[0];
    if(file_data == undefined){ 
		return ;
	}

	
	var formData = new FormData();

	var bitArray = sjcl.hash.sha256.hash(Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15));
	var nameFile = sjcl.codec.hex.fromBits(bitArray).substring(0, 32);
	nameFile += "&&&" + file_data.name;

	getHash(file_data, nameFile);

	formData.append('userFile', file_data, nameFile);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', uploadFileScript, true); //
	xhr.onload = function(e){ console.log(e); };

	xhr.send(formData);
	
}


