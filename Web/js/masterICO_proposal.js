//--------------------proposal--------------


var owner;

var proposalCount = 0;
var sumRequested = 0;
var proposalId = 0;


function vote(_vote){
	masterICO.vote(proposalId, _vote, (err,res)=>{
		console.log("vote:" + _vote);	
	});
	
}

function getProposalFunds(){
	masterICO.getProposalFunds(proposalId, (err,res)=>{
		console.log("getProposalFunds()");	
	});
	
}


function updateMainInfo(_name, _openingTime, _duringTime, _requestedAmount ){
    var block;
    block = document.getElementById("_name");
	block.innerHTML = _name;
	
	var date = new Date(_openingTime*1000);
	
    block = document.getElementById("_openingTime");
	block.innerHTML = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "." + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) + "." + date.getFullYear();
		
	date = new Date(_duringTime*1000);	
    block = document.getElementById("_duringTime");
	block.innerHTML = "" + (_duringTime/86400).toFixed(0); 
	
	date = new Date(_openingTime*1000 + _duringTime*1000);
	console.log(date);
    block = document.getElementById("_closingTime");
	block.innerHTML = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "." + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) + "." + date.getFullYear();
		
    block = document.getElementById("_requestAmount");
	block.innerHTML = "Ξ" + ((parseFloat(_requestedAmount))/1000000000000000000).toFixed(4); //wei to eth
	
}
function updateCurrentProposalResults(_yes, _no, _abstain){
	var block;
	block = document.getElementById("_yes");
	block.innerHTML = ((parseFloat(_yes))/Math.pow(10, decimal)).toFixed(3) + " " + tokenNAME; 
	
	block = document.getElementById("_no");
	block.innerHTML = ((parseFloat(_no))/Math.pow(10, decimal)).toFixed(3) + " " + tokenNAME;
	
	block = document.getElementById("_abstain");
	block.innerHTML = ((parseFloat(_abstain))/Math.pow(10, decimal)).toFixed(3) + " " + tokenNAME;
	
}

function addOverviewInfoToTable( _date, _url, _hashDocument){
	var table = document.getElementById("overviewTbody");
		
	var newEntry = document.createElement('tr');
		
	var date = new Date(_date*1000);
	var name = _url.split('/')[_url.split('/').length-1];
	name = name.split('&&&')[name.split('&&&').length-1];
	console.log(_url + ', ' + _hashDocument); //
	newEntry.innerHTML = '<th scope="row"><a href="#" onclick="downloadPdf(\'' + _url + '\', \'' + _hashDocument + '\'); return false;" style="color: #373a3c;">'
							+ name  +'</a></th>' +
                         '<td>'+ date.getDate() + "." + date.getMonth() + "." + date.getFullYear(); +'</td>';
		
	table.appendChild(newEntry);	
}
function addReportInfoToTable( _date, _url, _hashDocument){
	var table = document.getElementById("reportTbody");
		
	var newEntry = document.createElement('tr');
		
	var date = new Date(_date*1000);
	var name = _url.split('/')[_url.split('/').length-1];
	name = name.split('&&&')[name.split('&&&').length-1];
	newEntry.innerHTML = '<th scope="row"><a href="#" onclick="downloadPdf(\'' + _url + '\', \'' + _hashDocument + '\'); return false;" style="color: #373a3c;">'
							+ name  +'</a></th>' +
                         '<td>'+ date.getDate() + "." + date.getMonth() + "." + date.getFullYear(); +'</td>';
		
	table.appendChild(newEntry);	
}

function updateOverviewInfo(_proposalId, _num, _overviewsCounter){
	if(!(_num < _overviewsCounter)){
		return; }
		
    masterICO.getOverview(_proposalId, _num, (err,res)=>{ 
		console.log(res[2] + "|");//
		addOverviewInfoToTable(res[0], res[1], res[2]);
		
		updateOverviewInfo(_proposalId, _num+1, _overviewsCounter);
	});
}
function updateReportInfo(_proposalId, _num, _reportCounter){
	if(!(_num < _reportCounter)){
		return; }
		
    masterICO.getReport(_proposalId, _num, (err,res)=>{ 	
		addReportInfoToTable(res[0], res[1], res[2]);
	
		updateReportInfo(_proposalId, _num+1, _reportCounter);
	});
}

function checkOwner(){
	var isOwner = false;
	if(web3.eth.defaultAccount == owner){
		isOwner = true;
	}
	
	document.getElementById("onlyOwnerFin").style.display         		= isOwner ? "block" : "none";
	document.getElementById("onlyOwnerAddOverview").style.display 		= isOwner ? "block" : "none";	
	document.getElementById("onlyOwnerAddReport").style.display   		= isOwner ? "block" : "none";	
	document.getElementById("onlyOwnerCreateProposle").style.display   	= isOwner ? "block" : "none";		
	
	document.getElementById("VoteBlock").style.display = isOwner ? "none" : "block";	
	document.getElementById("notOwnerCancel").style.display   	= isOwner ? "none" : "block";
}

function updateOwner(){
	masterICO.owner((err,res)=>{
		owner = res;
		checkOwner(); 
	});
}
function initProposal(){
	
	proposalId = parseInt((location+"").split('=')[(location+"").split('=').length-1]);
	
	checkOwner();
	updateOwner();
	setInterval(updateOwner, 1500);
	
	masterICO.proposals(proposalId, (err,res)=>{
		updateMainInfo(res[0], res[1] , res[2], res[3] );
		
		
		masterICO.currentProposalResults(proposalId, (err,res)=>{
			updateCurrentProposalResults(res[0], res[1], res[2]);
			console.log("masterICO.currentProposalResults :" + res[0] + "," + res[1] + "," + res[2]);
		});
		
		
		console.log("Overviews:" + res[4] + "; Reports:" + res[5]);
		updateOverviewInfo(proposalId, 0, res[4]);
		updateReportInfo(proposalId, 0, res[5]);
		
	});
}


function convertDataURIToBinary(dataURI){
	var BASE64_MARKER = ';base64,';
	var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	var base64 = dataURI.substring(base64Index);
	var raw = window.atob(base64);
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));
	
	for(i = 0; i < rawLength; i++){
		array[i] = raw.charCodeAt(i);
	} 
	return array;
}
function savePdf(b64, name){
	
	download(convertDataURIToBinary("data:application/pdf;base64," + b64), name.split('&&&')[name.split('&&&').length-1], 'application/pdf');
}
function downloadPdf(name, hash){
  console.log(name + ":" + hash); //
  if(name == "null"){console.log("error: name is null"); return; }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', './userFile' + name, true); ////
  xhr.responseType = 'arraybuffer';

  xhr.onload = function(e){

    var byteArray = new Uint8Array(this.response);

    var b64 = base64js.fromByteArray(byteArray);
    var bitArray = sjcl.hash.sha256.hash(b64);
    var textHash = sjcl.codec.hex.fromBits(bitArray);
    console.log(textHash);
    
    if(textHash == hash){
		savePdf(b64, name);
	}
    else{
		alert("Хэш не совпадает! Файл был изменен!");
	}
  };

  xhr.onerror = function(e){
    alert("Не удалось соединиться с сервером");
  }

  xhr.send();


}




function addEntryT(URL, hash, typeDoc){
	
	console.log(URL, hash, typeDoc);
	if(typeDoc == "overview")masterICO.addOverview( proposalId, URL, hash, (err,res)=>{ console.log(err); console.log(res); });
	if(typeDoc == "report")masterICO.addReport( proposalId, URL, hash, (err,res)=>{ console.log(err); console.log(res); });

}

function getHashT(file, name, typeDoc){
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(){
    var bitArray = sjcl.hash.sha256.hash(reader.result.slice(reader.result.indexOf(',')+1));
    var textHash = sjcl.codec.hex.fromBits(bitArray);
    
    addEntryT("/"+name, textHash, typeDoc);
  }

}

function addOverview(){
	
	var file_data = document.getElementById('addProposalOverview').files[0];
    if(file_data == undefined){ 
		return ;
	}

	var formData = new FormData();

	var bitArray = sjcl.hash.sha256.hash(Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15));
	var nameFile = sjcl.codec.hex.fromBits(bitArray).substring(0, 32);
	nameFile += "&&&" + file_data.name;

	getHashT(file_data, nameFile, "overview");

	formData.append('proposalOverview', file_data, nameFile);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', uploadFileScript, true);
	xhr.onload = function(e){ console.log(e); };

	xhr.send(formData);
	
}
function addReport(){
			
	var file_data = document.getElementById('addProposalReport').files[0];
    if(file_data == undefined){ 
		return ;
	}


	var formData = new FormData();

	var bitArray = sjcl.hash.sha256.hash(Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15));
	var nameFile = sjcl.codec.hex.fromBits(bitArray).substring(0, 32);
	nameFile += "&&&" + file_data.name;

	getHashT(file_data, nameFile, "report");

	formData.append('proposalReport', file_data, nameFile);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', uploadFileScript, true);
	xhr.onload = function(e){ console.log(e); };

	xhr.send(formData);
	
}










//--------------------/proposal-------------