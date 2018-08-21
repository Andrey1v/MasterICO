//--------------------index-----------------

var owner;

var proposalCount = 0;
var sumRequested = 0;



function addProposalToTable(_num, _name, _openingTime, _duringTime, _requestedAmount, _statistics){ 
    //status: 0 - row, 1 - success, 2 - danger, 3 - warning
	//addProposalToTable("firstTest", "222-222", "1000", [55,44], 0);
	console.log("stat:" + _statistics[0] + ":" + _statistics[1]);
	var _status = 0;	
	
	var table = document.getElementById("genTbody");
	var newEntry = document.createElement('tr');
	
	switch (_status) {
	  case 0:                                             break;
	  case 1: newEntry.className = "table-success";       break;
	  case 2: newEntry.className = "table-danger";        break;
	  case 3: newEntry.className = "table-warning";       break;
	  
	}
	
	var date = new Date(_openingTime*1000);
	var openingTimeText = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "." + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) + "." + date.getFullYear();
	date = new Date(_openingTime*1000 + _duringTime*1000);
	var closingTimeText = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "." + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) + "." + date.getFullYear();
		
	
	newEntry.innerHTML = '<th scope="row"><a href="./proposal.html?id=' + _num + '" target="_blank" style="color: #373a3c;">' + 
							_name + '</a></th>'+
	                     '<td>' + openingTimeText + ' — ' + closingTimeText + '</td>'+
						 '<td>Ξ' + ((parseFloat(_requestedAmount))/1000000000000000000).toFixed(2) + '</td>' +
						 '<td>' + (parseFloat(_statistics[0])/Math.pow(10, decimal)).toFixed(0) + ' / ' + (parseFloat(_statistics[1])/Math.pow(10, decimal)).toFixed(0) + '</td>';
		
	table.insertBefore(newEntry, table.firstChild);	
}


function updateIndexHead(){
	var block;
    block = document.getElementById("dSumRequested");
	block.innerHTML = "Ξ" + ((parseFloat(sumRequested))/1000000000000000000).toFixed(2);
	
	block = document.getElementById("dSumRequestedUSD");
	block.innerHTML = "$" + (parseFloat(((parseFloat(sumRequested))/1000000000000000000).toFixed(2)) * cPriceEth).toFixed(2);
	
	block = document.getElementById("dProposalCount");
	block.innerHTML = "Командой проекта запрошено финансирование " + proposalCount + " предложений на данную сумму.";
	
	masterICO.getTotalSupply((err,res)=>{
			var totalSupply = (parseFloat(res))/Math.pow(10, decimal); //
			
			var block;
			block = document.getElementById("dTotalSupply");
			block.innerHTML = totalSupply.toFixed(2) + " " + tokenNAME;
			
			block = document.getElementById("dTotalSupplyUSD");
			block.innerHTML = "$" + (totalSupply * cPriceToken).toFixed(2);
	
	});
	
	web3.eth.getBalance(address, (err,res)=>{
		console.log(err);
		console.log(res);
	});
	
	
}
function getProposalforTable(_num, _proposalCount){
    if(!(_num < _proposalCount)){
		updateIndexHead(); 
		return; }
		
    masterICO.proposals(_num, (err,res)=>{
		//! processing
		sumRequested += parseFloat(res[3]);
		
		masterICO.currentProposalResults(_num, (err,resultsRes)=>{
			addProposalToTable(_num, res[0], res[1], res[2], res[3], [resultsRes[0], resultsRes[1]]);
		});
		
		
		getProposalforTable(_num+1, _proposalCount);
	});
}
function checkOwnerI(){
	var isOwner = false;
	if(web3.eth.defaultAccount == owner){
		isOwner = true;
	}	
	document.getElementById("onlyOwnerCreateProposle").style.display   	= isOwner ? "block" : "none";	
	document.getElementById("notOwnerCancel").style.display   	= isOwner ? "none" : "block";
}

function updateOwnerI(){
	masterICO.owner((err,res)=>{
		owner = res;
		checkOwnerI(); 
	});
}

function initIndex(){
	updateOwnerI();
	setInterval(updateOwnerI, 1500);
	
	masterICO.getProposalsLength((err,res)=>{
		proposalCount = res;
		
		getProposalforTable(0, proposalCount);
	});
}
//--------------------/index----------------