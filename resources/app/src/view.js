let $ = require('jquery');
var fs = require('fs')
var myShell = require('./my_shell');
const path = require('path')
const {remote, dialog} = require('electron')
const url = require('url');  
const querystring = require('querystring');
var http = require('http');

// Global variables
auxnetHomePath = process.env.AUXNET
terminalCommandStart = "gnome-terminal --tab -e \"/bin/bash -c '"
terminalCommandEnd = "; exec /bin/bash -i'\""
networkDataDir = process.env.HOME + '/.auxnet/nodes/'
auxnetDirName = 'auxnet/'
publicDirName = 'my_public/'
otherPublicDirName = 'other_public/'
auxnetDataFileName = 'auxnet'
auxnetNetworkName = 'Auxnet Public'

//App Quit
$('#appQuit').on('click', () => {
	remote.getCurrentWindow().close()
})

// Auxnet Public - Starts

$('#joinAuxnetPublic').on('click', () => {

	try {
		$('#joinAuxnetPublic').delay(1500).hide(0);
		$('#greendiv').delay(1500).show(0);
		$('#attachDiv').delay(1500).hide(0);
		$('.cust_form_group, .cust_btn, .form_control').delay(1500).removeAttr("disabled");
		$('.cust_form_group').delay(1500).removeClass("disabled");

		var auxnetDataDirPath = document.getElementById("auxnetDataDirPath").value;
		var auxnetPortNumber = document.getElementById("auxnetPortNumber").value;
		var auxnetRPCPortNumber = document.getElementById("auxnetRPCPortNumber").value;
		
		// -------------------------- Saving Data - Starts
		ipcPath = auxnetDataDirPath + '/gaux.ipc'
		file_path = networkDataDir + auxnetDirName + auxnetDataFileName + '.json'
		networkData = { 
			'name' : auxnetNetworkName, 
			'network' : auxnetNetworkName , 
			'dataDir' : auxnetDataDirPath, 
			'localPortNumber' :  auxnetPortNumber, 
			'ipc' : ipcPath,
			'rpcPort': auxnetRPCPortNumber
		}
		saveData(file_path, networkData)
		// --------------------------  Saving Data - Ends

		// Starting Node
		command = terminalCommandStart + auxnetHomePath + '/bin/gaux --datadir=' + auxnetDataDirPath + ' --rpc --rpccorsdomain="*" --port=' + auxnetPortNumber + ' --rpcport=' + auxnetRPCPortNumber + terminalCommandEnd
		myShell.execute(command);

		// Set IPC Path
		$('#auxnetIpcPath').val(ipcPath);
	}

	catch(err) {
    	alert(err.message);
	}	
	
})

$('#attachAuxnetTerminal').on('click', () => {
	var auxnetIpcPath = document.getElementById("auxnetIpcPath").value;	
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux attach ipc:' + auxnetIpcPath + terminalCommandEnd
	myShell.execute(command);
})

// Auxnet Public - Ends

// Public Network - Starts

$('#startPublic').on('click', () => {
	try {
		$('#startPublic').delay(1500).hide(0);
		$('#greendiv').delay(1500).show(0);
		$('#attachDiv').delay(1500).hide(0);
		$('.cust_form_group, .cust_btn, .form_control').delay(1500).removeAttr("disabled");
		$('.cust_form_group').delay(1500).removeClass("disabled");

		var publicNetworkName = document.getElementById("publicNetworkName").value;
		var publicDataDirPath = document.getElementById("publicDataDirPath").value;
		var publicGenesisFile = document.getElementById("publicGenesisFile").value;
		var publicPortNumber = document.getElementById("publicPortNumber").value;
		var publicRPCPortNumber = document.getElementById("publicRPCPortNumber").value;
		
		// -------------------------- Saving Data - Starts
		ipcPath = publicDataDirPath + '/gaux.ipc'
		file_path = networkDataDir + publicDirName + publicNetworkName + '.json'
		networkData = { 
			'name' : publicNetworkName, 
			'network' : publicNetworkName , 
			'dataDir' : publicDataDirPath, 
			'localPortNumber' :  publicPortNumber, 
			'genesisFile' :  publicGenesisFile, 
			'ipc' : ipcPath,
			'rpcPort': publicRPCPortNumber
		}
		saveData(file_path, networkData)		
		// --------------------------  Saving Data - Ends

		// Starting Node
		command = terminalCommandStart + auxnetHomePath + '/bin/gaux init ' + publicGenesisFile + ' --datadir=' + publicDataDirPath + '; ' + auxnetHomePath + '/bin/gaux --datadir=' + publicDataDirPath + ' --rpc --rpccorsdomain="*" --port=' + publicPortNumber + ' --rpcport=' + publicRPCPortNumber + terminalCommandEnd
		myShell.execute(command);

		// Set IPC Path
		$('#publicIpcPath').val(ipcPath);
	}

	catch(err) {
    	alert(err.message);
	}	
	
})

$('#attachPublicTerminal').on('click', () => {
	var publicIpcPath = document.getElementById("publicIpcPath").value;	
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux attach ipc:' + publicIpcPath + terminalCommandEnd
	myShell.execute(command);
})



$('#joinPublicNetwork').on('click', () => {
	$('#joinPublicNetwork').delay(1500).hide(0);
	$('#greendiv').delay(1000).show(0);
	$('#attachDiv').delay(1500).hide(0);
	$('.cust_form_group, .cust_btn, .form_control').delay(1500).removeAttr("disabled");
	$('.cust_form_group').delay(1500).removeClass("disabled");

	var joinPublicNetworkName = document.getElementById("joinPublicNetworkName").value;
	var joinPublicGenesisFile = document.getElementById("joinPublicGenesisFile").value;
	var joinPublicDataDirPath = document.getElementById("joinPublicDataDirPath").value;
	var joinPublicBootNode = document.getElementById("joinPublicBootNode").value;
	var joinPublicLocalHostPort = document.getElementById("joinPublicLocalHostPort").value;
	var joinPublicRPCPortNumber = document.getElementById("joinPublicRPCPortNumber").value;	

	// -------------------------- Saving Data - Starts
	ipcPath = joinPublicDataDirPath + '/gaux.ipc'
	file_path = networkDataDir + otherPublicDirName + joinPublicNetworkName + '.json'
	networkData = { 
		'name' : joinPublicNetworkName, 
		'network' : joinPublicNetworkName , 
		'dataDir' : joinPublicDataDirPath, 
		'localPortNumber' :  joinPublicLocalHostPort, 
		'genesisFile' :  joinPublicGenesisFile, 
		'ipc' : ipcPath,
		'bootNode' : joinPublicBootNode,
		'rpcPort': joinPublicRPCPortNumber
	}
	saveData(file_path, networkData)		
	// --------------------------  Saving Data - Ends

	// Starting Node
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux --datadir=' + joinPublicDataDirPath + ' init ' + joinPublicGenesisFile + '; ' + auxnetHomePath + '/bin/gaux --datadir=' + joinPublicDataDirPath + ' --rpc --rpccorsdomain="*" --port=' + joinPublicLocalHostPort + ' --rpcport=' + joinPublicRPCPortNumber + ' --bootnodes=' + joinPublicBootNode + terminalCommandEnd
	myShell.execute(command);

	// Set IPC Path
	$('#publicIpcPath').val(ipcPath);
})


$('#joinAttachPublicTerminal').on('click', () => {
	var joinPublicIpcPath = document.getElementById("joinPublicIpcPath").value;	
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux attach ipc:' + joinPublicIpcPath + terminalCommandEnd
	myShell.execute(command);
})


// $('#testRPC').on('click', () => {

// 	try {
// 		var Web3 = require('web3');
// 		web3 = new Web3("http://localhost:8546");
// 		address = '0x5eb9d9d2df3e4b8de2dda0df1f3dd5e7b316e18e'
// 		web3.eth.net.isListening((err, result) => {
// 			if (result) alert('True')
// 			else alert('False')
// 		})		
// 	}

// 	catch(err){
// 		alert(err.message)
// 	}
	
	
// })
// Public Network - Ends


// Common - Starts

$('#goHome').on('click', () => {
	location.href = "index.html";
}) 

function saveData(file_path, data) {

	try {
		
		directory = path.dirname(file_path)

		if (!fs.existsSync(directory)){
			var shell = require('shelljs');
			shell.mkdir('-p', directory);
		}

		var json = JSON.stringify(networkData, null, 4);
		fs.writeFile(file_path, json, (err) => {
		  if (err){
		  	alert(err.message);
		  	return false
		  }	  

		})
		return true
	}
	catch(err) {
    	alert(err.message);
	}		
}

function dashboardAuxnetPublic(){

	try {
		htmlData = ''

		file_path = networkDataDir + auxnetDirName + auxnetDataFileName + '.json'

		
		fs.readFile(file_path, 'utf8', function(err, contents) {

			if (err){
					htmlData += '<div class="intro_screen_link existing_nodes">'
					htmlData += '<p class="label_thin_white mb-0">'
					htmlData += 'No Network Found'
					htmlData += '</p>'
					htmlData += '</div>'
					$('#auxnetPublicNetworkList').html(htmlData);
				}

			else {

				var obj = JSON.parse(contents);
				htmlData += '<div class="intro_screen_link existing_nodes">'
				htmlData += '<p class="label_thin_white mb-0">'
				htmlData += obj['name']
				htmlData += '</p>'
				htmlData += '<p class="nw_name">'
				htmlData += obj['localPortNumber']
				htmlData += '</p>'
				htmlData += '<a title="Click here to Connect to the node" href="./auxnet.html?auxnetDataDirPath=' + obj['dataDir'] + '&auxnetPortNumber=' + obj['localPortNumber'] + '&auxnetIpcPath=' + obj['ipc']  + '&auxnetRPCPortNumber='+ obj['rpcPort'] +'" >'
				htmlData += 'Connect'
				htmlData += '</a>'
				htmlData += '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
				htmlData += '<a href="?deletePath=' + file_path + '" title="Click here to delete network(It will not delete the network data)">'
				htmlData += 'Delete'
				htmlData += '</a>'
				htmlData += '</div>'

				$('#auxnetPublicNetworkList').html(htmlData);				
			
			}
		
		})
		
	}

	catch(err) {
    	alert(err.message);
    	htmlData += '<div class="intro_screen_link existing_nodes">'
		htmlData += '<p class="label_thin_white mb-0">'
		htmlData += 'No Network Found'
		htmlData += '</p>'
		htmlData += '</div>'
		$('#auxnetPublicNetworkList').html(htmlData);
	}	

}


var htmlDataPublic = ''
function dashboardPublic(){

	try {			

			// Checking other netwrok folder first 
			otherFolder = networkDataDir + otherPublicDirName
			var otherPresent = false

			fs.readdir(otherFolder, (err, files) => {
			  if (files.length > 0){
			  	otherPresent = true
			  }
			});	


			folder = networkDataDir + publicDirName

			fs.readdir(folder, (err, files) => {
			  if (files.length == 0 && otherPresent == false){
			  	htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
				htmlDataPublic += '<p class="label_thin_white mb-0">'
				htmlDataPublic += 'No Network Found'
				htmlDataPublic += '</p>'
				htmlDataPublic += '</div>'
				$('#publicNetworkList').html(htmlDataPublic);
				return
			  }
			});
			
			fs.readdirSync(folder).forEach(file => {
				var file_path = folder + file
				fs.readFile(file_path, 'utf8', function(err, contents) {

					if (err){
						htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
						htmlDataPublic += '<p class="label_thin_white mb-0">'
						htmlDataPublic += 'No Network Found'
						htmlDataPublic += '</p>'
						htmlDataPublic += '</div>'
						$('#publicNetworkList').html(htmlDataPublic);
						return
					}

				else {

					var obj = JSON.parse(contents);
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_thin_white mb-0">'
					htmlDataPublic += obj['name']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<p class="nw_name">'
					htmlDataPublic += obj['localPortNumber']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<a title="Click here to Connect to the node" href="./create-public-network.html?publicGenesisFile=' + obj['genesisFile'] + '&publicDataDirPath=' + obj['dataDir'] + '&publicPortNumber=' + obj['localPortNumber'] + '&publicNetworkName=' + obj['name'] + '&publicIpcPath=' + obj['ipc'] + '&publicRPCPortNumber='+obj['rpcPort']+'">'
					htmlDataPublic += 'Connect'
					htmlDataPublic += '</a>'
					htmlDataPublic += '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
					htmlDataPublic += '<a href="?deletePath=' + file_path + '" title="Click here to delete network(It will not delete the network data)">'
					htmlDataPublic += 'Delete'
					htmlDataPublic += '</a>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
				}

			});			
		});
		
		
	}

	catch(err) {
    	htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
		htmlDataPublic += '<p class="label_thin_white mb-0">'
		htmlDataPublic += 'No Active Nodes'
		htmlDataPublic += '</p>'
		htmlDataPublic += '</div>'
		$('#publicNetworkList').html(htmlDataPublic);
	}	

}


function dashboardOtherPublic(){

	try {
			folder = networkDataDir + otherPublicDirName

			fs.readdir(folder, (err, files) => {
			  if (files.length == 0){
			  	return
			  }
			});
			
			fs.readdirSync(folder).forEach(file => {
				var file_path = folder + file
				fs.readFile(file_path, 'utf8', function(err, contents) {

					if (err){
						htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
						htmlDataPublic += '<p class="label_thin_white mb-0">'
						htmlDataPublic += 'No Other Public Network Found'
						htmlDataPublic += '</p>'
						htmlDataPublic += '</div>'
						$('#publicNetworkList').html(htmlDataPublic);
						return
					}

				else {

					var obj = JSON.parse(contents);
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_thin_white mb-0">'
					htmlDataPublic += obj['name']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<p class="nw_name">'
					htmlDataPublic += obj['localPortNumber']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<a title="Click here to Connect to the node" href="./join-public-network.html?joinPublicGenesisFile=' + obj['genesisFile'] + '&joinPublicDataDirPath=' + obj['dataDir'] + '&joinPublicLocalHostPort=' + obj['localPortNumber'] + '&joinPublicNetworkName=' + obj['name'] + '&joinPublicIpcPath=' + obj['ipc'] + '&joinPublicBootNode=' + obj['bootNode'] + '&joinPublicRPCPortNumber='+obj['rpcPort']+'">'
					htmlDataPublic += 'Connect'
					htmlDataPublic += '</a>'
					htmlDataPublic += '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
					htmlDataPublic += '<a href="?deletePath=' + file_path + '" title="Click here to delete network(It will not delete the network data)">'
					htmlDataPublic += 'Delete'
					htmlDataPublic += '</a>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
				}

			});			
		});
		
		
	}

	catch(err) {
    	htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
		htmlDataPublic += '<p class="label_thin_white mb-0">'
		htmlDataPublic += 'No Other Public Network Found'
		htmlDataPublic += '</p>'
		htmlDataPublic += '</div>'
		$('#publicNetworkList').html(htmlDataPublic);
	}	

}

function deletePath(path){

	swal({
	  title: "Are you sure you want to delete?",
	  text: "It will not delete the node data.",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
	  	fs.unlinkSync(path)
	    swal("Deleted!", {
	      icon: "success",
	    });	    
	  }
	  location.href = "./index.html";
	});

}


$( document ).ready(function() {

	// Default Paths
	auxnetDataDirPath = process.env.HOME + '/.auxnet/dataDirectory/mainnet'
	auxnetPortNumber = 30303
	auxnetIpcPath = process.env.HOME + '/.auxnet/dataDirectory/mainnet/gaux.ipc'
	auxnetRPCPortNumber = 8545
	
	publicNetworkName = 'MyNetwork1'
	publicGenesisFile = auxnetHomePath + '/genesis.json'
	publicDataDirPath = process.env.HOME + '/.auxnet/dataDirectory/public'
	publicPortNumber = 30304	
	publicIpcPath = process.env.HOME + '/.auxnet/dataDirectory/public/gaux.ipc'
	publicRPCPortNumber = 8546

	joinPublicNetworkName = 'OtherNetwork1'
	joinPublicGenesisFile = auxnetHomePath + '/genesis.json'
	joinPublicDataDirPath = process.env.HOME + '/.auxnet/dataDirectory/otherPublic'
	joinPublicBootNode = 'enode://abcd@127.0.0.1:30303'
	joinPublicLocalHostPort = 30305
	joinPublicIpcPath = process.env.HOME + '/.auxnet/public/gaux.ipc'
	joinPublicRPCPortNumber = 8547

	
	var dataDict = {};
	let currentURL = window.location.href;
	let rawUrl = 'http://stackabuse.com/?page=2&limit=3';

	// Custom Parsing
	params = currentURL.split('?')[1]

	if (params){

		var vars = params.split('&');
	    for (var i = 0; i < vars.length; i++) {
	        var pair = vars[i].split('=');
	        dataDict[pair[0]] = pair[1]	        
	    }

	    if (dataDict['deletePath']) deletePath(dataDict['deletePath'])

	    if (dataDict['auxnetDataDirPath']) $('#auxnetDataDirPath').val(dataDict['auxnetDataDirPath'])
	    else $('#auxnetDataDirPath').val(auxnetDataDirPath)
	    if (dataDict['auxnetPortNumber']) $('#auxnetPortNumber').val(dataDict['auxnetPortNumber'])
	    else $('#auxnetPortNumber').val(auxnetPortNumber)
	    if (dataDict['auxnetIpcPath']) $('#auxnetIpcPath').val(dataDict['auxnetIpcPath'])
	    else $('#auxnetIpcPath').val(auxnetIpcPath)
	    if (dataDict['auxnetRPCPortNumber']) $('#auxnetRPCPortNumber').val(dataDict['auxnetRPCPortNumber'])
	    else $('#auxnetRPCPortNumber').val(auxnetRPCPortNumber)

	    if (dataDict['publicGenesisFile']) $('#publicGenesisFile').val(dataDict['publicGenesisFile'])
	    else $('#publicGenesisFile').val(publicGenesisFile)
	    if (dataDict['publicDataDirPath']) $('#publicDataDirPath').val(dataDict['publicDataDirPath'])
	    else $('#publicDataDirPath').val(publicDataDirPath)	
	    if (dataDict['publicPortNumber']) $('#publicPortNumber').val(dataDict['publicPortNumber'])
	    else $('#publicPortNumber').val(publicPortNumber)
	    if (dataDict['publicNetworkName']) $('#publicNetworkName').val(dataDict['publicNetworkName'])
	    else $('#publicNetworkName').val(publicNetworkName)
	    if (dataDict['publicIpcPath']) $('#publicIpcPath').val(dataDict['publicIpcPath'])
	    else $('#publicIpcPath').val(publicIpcPath)
	    if (dataDict['publicRPCPortNumber']) $('#publicRPCPortNumber').val(dataDict['publicRPCPortNumber'])
	    else $('#publicRPCPortNumber').val(publicRPCPortNumber)

	    if (dataDict['joinPublicNetworkName']) $('#joinPublicNetworkName').val(dataDict['joinPublicNetworkName'])
	    else $('#joinPublicNetworkName').val(joinPublicNetworkName)
	    if (dataDict['joinPublicGenesisFile']) $('#joinPublicGenesisFile').val(dataDict['joinPublicGenesisFile'])
	    else $('#joinPublicGenesisFile').val(joinPublicGenesisFile)	
	    if (dataDict['joinPublicDataDirPath']) $('#joinPublicDataDirPath').val(dataDict['joinPublicDataDirPath'])
	    else $('#joinPublicDataDirPath').val(joinPublicDataDirPath)
	    if (dataDict['joinPublicBootNode']) $('#joinPublicBootNode').val(dataDict['joinPublicBootNode'])
	    else $('#joinPublicBootNode').val(joinPublicBootNode)
	    if (dataDict['joinPublicLocalHostPort']) $('#joinPublicLocalHostPort').val(dataDict['joinPublicLocalHostPort'])
	    else $('#joinPublicLocalHostPort').val(joinPublicLocalHostPort)
	    if (dataDict['joinPublicIpcPath']) $('#joinPublicIpcPath').val(dataDict['joinPublicIpcPath'])
	    else $('#joinPublicIpcPath').val(joinPublicIpcPath)
	    if (dataDict['joinPublicRPCPortNumber']) $('#joinPublicRPCPortNumber').val(dataDict['joinPublicRPCPortNumber'])
	    else $('#joinPublicRPCPortNumber').val(joinPublicRPCPortNumber)

	}
	else{

		// When Click on Dashboard

		// Auxnet Public
		$('#auxnetDataDirPath').val(auxnetDataDirPath);
		$('#auxnetPortNumber').val(auxnetPortNumber);
		$('#auxnetIpcPath').val(auxnetIpcPath);
		$('#auxnetRPCPortNumber').val(auxnetRPCPortNumber);
		

		// Create Public Network
		$('#publicNetworkName').val(publicNetworkName);
		$('#publicGenesisFile').val(publicGenesisFile);
		$('#publicDataDirPath').val(publicDataDirPath);
		$('#publicPortNumber').val(publicPortNumber);
		$('#publicIpcPath').val(publicIpcPath);
		$('#publicRPCPortNumber').val(publicRPCPortNumber);

	    // Join Public
	    $('#joinPublicNetworkName').val(joinPublicNetworkName);
		$('#joinPublicGenesisFile').val(joinPublicGenesisFile);
		$('#joinPublicDataDirPath').val(joinPublicDataDirPath);
		$('#joinPublicBootNode').val(joinPublicBootNode);
		$('#joinPublicLocalHostPort').val(joinPublicLocalHostPort);
		$('#joinPublicIpcPath').val(joinPublicIpcPath);
		$('#joinPublicRPCPortNumber').val(joinPublicRPCPortNumber);

	}
	
	
	// Dashboard View
	dashboardAuxnetPublic()
	dashboardPublic()
	dashboardOtherPublic()
	

});


// Common - Ends


