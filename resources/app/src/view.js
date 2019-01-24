let $ = require('jquery');
var fs = require('fs')
var myShell = require('./my_shell');
const path = require('path')
const { remote, dialog } = require('electron')
const url = require('url');
const querystring = require('querystring');
var http = require('http');
const util = require('./util')
const axios = require('axios');


// Global variables
auxnetHomePath = path.dirname(__dirname)
gauxPath = auxnetHomePath + '/bin/gaux'
terminalCommandStart = "gnome-terminal --tab -e \"/bin/bash -c '"
terminalCommandEnd = "; exec /bin/bash -i'\""
nodesDataDir = process.env.HOME + '/.auxnet/nodes/'
auxnetDirName = 'auxnet/'
publicDirName = 'myPublic/'
publicDirNamePOA = 'myPublicPOA/'
otherPublicDirName = 'otherPublic/'
otherPublicDirNamePOA = 'otherPublicPOA/'
auxnetDataFileName = 'auxnet'
auxnetNetworkName = 'Auxnet Public'

// Default Values
auxnetDataDirPath = process.env.HOME + '/.auxnet/dataDirectory/mainnet'
auxnetPortNumber = 30303
auxnetIpcPath = process.env.HOME + '/.auxnet/dataDirectory/mainnet/gaux.ipc'
auxnetRPCPortNumber = 8545

publicGasPrice = 200000000
publicNetworkNamePOA = "POA1"
publicAccountPassword = 'aaaa'
publicNetworkName = 'MyNetwork1'
publicNetworkPOAChainID = '1515'
publicGenesisFile = auxnetHomePath + '/genesis.json'
publicGenesisFilePOA = auxnetHomePath + '/genesis_poa.json'
publicDataDirPath = process.env.HOME + '/.auxnet/dataDirectory/public'
publicPortNumber = 30304
publicIpcPath = process.env.HOME + '/.auxnet/dataDirectory/public/gaux.ipc'
publicRPCPortNumber = 8546

joinPublicAccountPassword = 'aaaa'
joinPublicNetworkNamePOA = "OtherPOA1"
joinPublicNetworkName = 'OtherNetwork1'
joinPublicGenesisFile = auxnetHomePath + '/genesis.json'
joinPublicDataDirPath = process.env.HOME + '/.auxnet/dataDirectory/otherPublic'
joinPublicBootNode = 'enode://abcd@127.0.0.1:30303'
joinPublicLocalHostPort = 30305
joinPublicIpcPath = process.env.HOME + '/.auxnet/dataDirectory/otherPublic/gaux.ipc'
joinPublicRPCPortNumber = 8547

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
		filePath = nodesDataDir + auxnetDirName + auxnetDataFileName + '.json'
		networkData = {
			'name': auxnetNetworkName,
			'network': auxnetNetworkName,
			'dataDir': auxnetDataDirPath,
			'localPortNumber': auxnetPortNumber,
			'ipc': ipcPath,
			'rpcPort': auxnetRPCPortNumber,
			'consensus': 'POW'
		}
		util.saveNodeData(filePath, networkData)
		// --------------------------  Saving Data - Ends

		// Starting Node
		command = terminalCommandStart + auxnetHomePath + '/bin/gauxold --datadir=' + auxnetDataDirPath + ' --rpc --rpccorsdomain="*" --port=' + auxnetPortNumber + ' --rpcport=' + auxnetRPCPortNumber + terminalCommandEnd
		myShell.execute(command);

		// Set IPC Path
		$('#auxnetIpcPath').val(ipcPath);
	}

	catch (err) {
		alert(err.message);
	}

})

$('#attachAuxnetTerminal').on('click', () => {
	var auxnetIpcPath = document.getElementById("auxnetIpcPath").value;
	command = terminalCommandStart + auxnetHomePath + '/bin/gauxold attach ipc:' + auxnetIpcPath + terminalCommandEnd
	myShell.execute(command);
});

$('#browseAuxnetDataDirPath').on('click', () => {
	try {
		dir = util.selectDirectory()
		// Set Path
		if (dir) {
			ipcPath = dir + '/gaux.ipc'
			$('#auxnetDataDirPath').val(dir);
			$('#auxnetIpcPath').val(ipcPath);
		}
	}
	catch (err) {
		alert(err.message)
	}

});

// Auxnet Public - Ends

// Public Network - Starts

$('#startPublic').on('click', async () => {
	try {
		$('#startPublic').delay(1500).hide(0);
		$('#greendiv').delay(1500).show(0);
		$('#attachDiv').delay(1500).hide(0);
		$('.cust_form_group, .cust_btn, .form_control').delay(1500).removeAttr("disabled");
		$('.cust_form_group').delay(1500).removeClass("disabled");

		var publicNetworkConsensus = document.getElementById("selectPublicNetworkConsensus").value
		var publicNetworkName = document.getElementById("publicNetworkName").value;
		var publicDataDirPath = document.getElementById("publicDataDirPath").value;
		var publicPortNumber = document.getElementById("publicPortNumber").value;
		var publicRPCPortNumber = document.getElementById("publicRPCPortNumber").value;
		var publicGasPrice = document.getElementById("publicGasPrice").value;
		var ipcPath = publicDataDirPath + '/gaux.ipc'

		genesisFilePath = publicDataDirPath + '/genesis.json'

		var flag;
		flag = await findDir(publicDataDirPath);
		if (flag == true) {
			alert("You chose to use the previous network data!");
		} else {
			deleteData(publicDataDirPath);
			alert("You chose to use the newly submitted data to start the node!");
		}


		if (publicNetworkConsensus == "publicNetworkConsensusPOA") {

			var publicAccountPassword = document.getElementById("publicAccountPassword").value;
			var publicNetworkPOAChainID = document.getElementById("publicNetworkPOAChainID").value;

			// Generate Password File
			passFilePath = publicDataDirPath + '/password.txt'
			util.saveFile(passFilePath, publicAccountPassword)

			// Generate Address, Return Type - address :{abcd}
			generateAddressCommand = auxnetHomePath + '/bin/gaux --datadir=' + publicDataDirPath + ' account new --password=' + passFilePath
			var address = await myShell.execute(generateAddressCommand);
			address = address.split(':')[1]
			address = address.trim()
			address = address.slice(1, address.length - 1)
			var extraData = '0x0000000000000000000000000000000000000000000000000000000000000000'
			extraData += address
			extraData += '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

			// Create Genesis File. TODO - Need to be improved
			fs.readFile(publicGenesisFilePOA, 'utf8', function (err, contents) {
				if (err) alert('Unable to Find/Read Genesis File')
				else {
					var obj = JSON.parse(contents);
					obj['config']['chainId'] = parseInt(publicNetworkPOAChainID, 10);
					obj['alloc'] = {
						[address]: {
							"balance": "0x900000000000000000000000000000000000000000000000000000000000000"
						}
					}
					obj['extraData'] = extraData
					obj['gasPrice'] = publicGasPrice
					util.saveNodeData(genesisFilePath, obj)
				}
			})

			// -------------------------- Saving Data - Starts
			nodefilePath = nodesDataDir + publicDirNamePOA + publicNetworkName + '.json'
			networkData = {
				'name': publicNetworkName,
				'network': publicNetworkName,
				'dataDir': publicDataDirPath,
				'localPortNumber': publicPortNumber,
				'genesisFile': genesisFilePath,
				'ipc': ipcPath,
				'rpcPort': publicRPCPortNumber,
				'address': address,
				'password': publicAccountPassword,
				'passwordFile': passFilePath,
				'chainId': publicNetworkPOAChainID,
				'consensus': 'POA',
				'gasPrice': publicGasPrice
			}
			util.saveNodeData(nodefilePath, networkData)
			// --------------------------  Saving Data - Ends

			// Starting Node			
			command = terminalCommandStart + gauxPath + ' init ' + genesisFilePath + ' --datadir=' + publicDataDirPath + "; " + gauxPath + ' --datadir=' + publicDataDirPath + ' --rpc --rpcaddr \'localhost\' --port=' + publicPortNumber + ' --rpcapi \'admin,debug,eth,ethash,miner,net,personal,rpc,txpool,web3,clique,db\' --rpcport=' + publicRPCPortNumber + ' --networkid=' + publicNetworkPOAChainID + ' -unlock=\'0x' + address + '\' --password=' + passFilePath + terminalCommandEnd
			myShell.execute(command)
		}
		else {

			// Create Genesis File. TODO - Need to be improved
			fs.readFile(publicGenesisFile, 'utf8', function (err, contents) {
				if (err) alert('Unable to Find/Read Genesis File')
				else {
					var obj = JSON.parse(contents);
					obj['gasPrice'] = publicGasPrice
					util.saveNodeData(genesisFilePath, obj)
				}
			})

			// -------------------------- Saving Data - Starts
			nodeFilePath = nodesDataDir + publicDirName + publicNetworkName + '.json'
			networkData = {
				'name': publicNetworkName,
				'network': publicNetworkName,
				'dataDir': publicDataDirPath,
				'localPortNumber': publicPortNumber,
				'genesisFile': genesisFilePath,
				'ipc': ipcPath,
				'rpcPort': publicRPCPortNumber,
				'consensus': 'POW',
				'gasPrice': publicGasPrice
			}
			util.saveNodeData(nodeFilePath, networkData)
			// --------------------------  Saving Data - Ends

			// Starting Node
			command = terminalCommandStart + auxnetHomePath + '/bin/gaux init ' + genesisFilePath + ' --datadir=' + publicDataDirPath + '; ' + auxnetHomePath + '/bin/gaux --datadir=' + publicDataDirPath + ' --rpc --rpcaddr \'localhost\' --port=' + publicPortNumber + ' --rpcapi \'admin,debug,eth,ethash,miner,net,personal,rpc,txpool,web3,clique,db\' --rpcport=' + publicRPCPortNumber + terminalCommandEnd
			// alert(command);
			myShell.execute(command);
		}

		// Set IPC Path
		$('#publicIpcPath').val(ipcPath)

	}

	catch (err) {
		alert(err.message);
	}

})
function findDir(publicDataDirPath) {
	return new Promise(async (resolve, reject) => {

		fs.open(publicDataDirPath, 'wx', (err, fd) => {
			if (err) {
				if (err.code === 'EEXIST') {
					var a = confirm("The mentioned Datadirectory already has previous network data in it! To continue using that data, press OK! To delete the previous data and start new network press CANCEL!");
					resolve(a);
				} else {
					resolve(a);
				}
			}
		});
	})
}

$('#attachPublicTerminal').on('click', () => {
	var publicIpcPath = document.getElementById("publicIpcPath").value;
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux attach ipc:' + publicIpcPath + terminalCommandEnd
	myShell.execute(command);
})

$('#shareNetwork').on('click', () => {
	var publicDataDirPath = document.getElementById("publicDataDirPath").value
	var publicRPCPortNumber = document.getElementById("publicRPCPortNumber").value
	util.getEnodeID(publicDataDirPath, publicRPCPortNumber)
})

$('#selectPublicNetworkConsensus').change(function () {
	consensus = $(this).val();

	if (consensus == "publicNetworkConsensusPOA") {
		$('#publicNetworkName').val(publicNetworkNamePOA)
		$('#publicNetworkPOAParams').show("slow");
	}
	else {
		$('#publicNetworkName').val(publicNetworkName)
		$('#publicNetworkPOAParams').hide("slow");
	}

});

$('#selectJoinPublicNetworkConsensus').change(function () {
	consensus = $(this).val();

	if (consensus == "joinPublicNetworkConsensusPOA") {
		$('#joinPublicNetworkName').val(joinPublicNetworkNamePOA)
		$('#joinPublicNetworkPOAParams').show("slow");
	}
	else {
		$('#joinPublicNetworkName').val(joinPublicNetworkName)
		$('#joinPublicNetworkPOAParams').hide("slow");
	}

});


$('#browsePublicDataDirPath').on('click', () => {
	try {
		dir = util.selectDirectory()
		// Set Path
		if (dir) {
			ipcPath = dir + '/gaux.ipc'
			$('#publicDataDirPath').val(dir);
			$('#publicIpcPath').val(ipcPath);
		}
	}
	catch (err) {
		alert(err.message)
	}

});


// $('#browsePublicGenesisFile').on('click', () => {
// 	try{
// 		genPath = util.selectFile()
// 		// Set Path
// 		if (genPath) $('#publicGenesisFile').val(genPath);
// 	}
// 	catch(err){
// 		alert(err.message)
// 	}

// });


$('#joinPublicNetwork').on('click', async () => {

	try {

		$('#joinPublicNetwork').delay(1500).hide(0);
		$('#greendiv').delay(1000).show(0);
		$('#attachDiv').delay(1500).hide(0);
		$('.cust_form_group, .cust_btn, .form_control').delay(1500).removeAttr("disabled");
		$('.cust_form_group').delay(1500).removeClass("disabled");

		var joinPublicNetworkConsensus = document.getElementById("selectJoinPublicNetworkConsensus").value
		var joinPublicNetworkName = document.getElementById("joinPublicNetworkName").value;
		var joinPublicGenesisFile = document.getElementById("joinPublicGenesisFile").value;
		var joinPublicDataDirPath = document.getElementById("joinPublicDataDirPath").value;
		var joinPublicBootNode = document.getElementById("joinPublicBootNode").value;
		var joinPublicLocalHostPort = document.getElementById("joinPublicLocalHostPort").value;
		var joinPublicRPCPortNumber = document.getElementById("joinPublicRPCPortNumber").value;
		ipcPath = joinPublicDataDirPath + '/gaux.ipc'

		var flag;
		flag = await findDir(joinPublicDataDirPath);
		if (flag == true) return;

		if (joinPublicNetworkConsensus == "joinPublicNetworkConsensusPOA") {

			nodefilePath = nodesDataDir + otherPublicDirNamePOA + joinPublicNetworkNamePOA + '.json'
			var joinPublicAccountPassword = document.getElementById("joinPublicAccountPassword").value;

			// Generate Password File
			passFilePath = joinPublicDataDirPath + '/password.txt'
			util.saveFile(passFilePath, joinPublicAccountPassword)

			// Generate Address, Return Type - address :{abcd}
			generateAddressCommand = gauxPath + ' --datadir=' + joinPublicDataDirPath + ' account new --password=' + passFilePath
			var address = await myShell.execute(generateAddressCommand)
			address = address.split(':')[1]
			address = address.trim()
			address = address.slice(1, address.length - 1)

			// TODO - Get Chain ID from Genesis
			publicNetworkPOAChainID = 1515

			// -------------------------- Saving Data - Starts
			networkData = {
				'name': joinPublicNetworkName,
				'network': joinPublicNetworkName,
				'dataDir': joinPublicDataDirPath,
				'localPortNumber': joinPublicLocalHostPort,
				'genesisFile': joinPublicGenesisFile,
				'ipc': ipcPath,
				'bootNode': joinPublicBootNode,
				'rpcPort': joinPublicRPCPortNumber,
				'address': address,
				'password': joinPublicAccountPassword,
				'passwordFile': passFilePath,
				'chainId': publicNetworkPOAChainID,
				'consensus': 'POA'
			}
			util.saveNodeData(nodefilePath, networkData)
			// --------------------------  Saving Data - Ends

			// Starting Node
			command = terminalCommandStart + gauxPath + ' init ' + joinPublicGenesisFile + ' --datadir=' + joinPublicDataDirPath + "; " + gauxPath + ' --datadir=' + joinPublicDataDirPath + ' --rpc --rpcaddr \'localhost\' --port=' + joinPublicLocalHostPort + ' --rpcapi \'admin,debug,eth,ethash,miner,net,personal,rpc,txpool,web3,clique,db\' --rpcport=' + joinPublicRPCPortNumber + ' --networkid=' + publicNetworkPOAChainID + ' --bootnodes ' + joinPublicBootNode + ' -unlock=\'0x' + address + '\' --password=' + passFilePath + terminalCommandEnd
			myShell.execute(command)
		}
		else {

			// -------------------------- Saving Data - Starts	
			filePath = nodesDataDir + otherPublicDirName + joinPublicNetworkName + '.json'
			networkData = {
				'name': joinPublicNetworkName,
				'network': joinPublicNetworkName,
				'dataDir': joinPublicDataDirPath,
				'localPortNumber': joinPublicLocalHostPort,
				'genesisFile': joinPublicGenesisFile,
				'ipc': ipcPath,
				'bootNode': joinPublicBootNode,
				'rpcPort': joinPublicRPCPortNumber,
				'consensus': 'POW'

			}
			util.saveNodeData(filePath, networkData)
			// --------------------------  Saving Data - Ends

			// Starting Node
			command = terminalCommandStart + auxnetHomePath + '/bin/gaux --datadir=' + joinPublicDataDirPath + ' init ' + joinPublicGenesisFile + '; ' + auxnetHomePath + '/bin/gaux --datadir=' + joinPublicDataDirPath + ' --rpc --rpccorsdomain="*" --port=' + joinPublicLocalHostPort + ' --rpcport=' + joinPublicRPCPortNumber + ' --bootnodes=' + joinPublicBootNode + terminalCommandEnd
			myShell.execute(command);

		}

		// Set IPC Path
		$('#joinPublicIpcPath').val(ipcPath);

	}

	catch (err) {
		alert(err.message)
	}

})


$('#joinAttachPublicTerminal').on('click', () => {
	var joinPublicIpcPath = document.getElementById("joinPublicIpcPath").value;
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux attach ipc:' + joinPublicIpcPath + terminalCommandEnd
	myShell.execute(command);
})

$('#browseJoinPublicDataDirPath').on('click', () => {
	try {
		dir = util.selectDirectory()
		// Set Path
		if (dir) {
			ipcPath = dir + '/gaux.ipc'
			$('#joinPublicDataDirPath').val(dir);
			$('#joinPublicIpcPath').val(ipcPath);
		}
	}
	catch (err) {
		alert(err.message)
	}

});

$('#browseJoinPublicGenesisFile').on('click', () => {
	try {
		genPath = util.selectFile()
		// Set Path
		if (genPath) $('#joinPublicGenesisFile').val(genPath);
	}
	catch (err) {
		alert(err.message)
	}

});

$('#uploadNetworkDetailsFiles').on('click', () => {
	try {
		dir = util.selectDirectory()
		if (dir) {
			$('#joinPublicGenesisFile').val(dir + '/genesis.json');
			var enodeFile = dir + "/enodeDetails.json"
			fs.readFile(enodeFile, 'utf8', function (err, contents) {
				if (err) alert('Unable to Find/Read Genesis File')
				else {
					var obj = JSON.parse(contents);
					var enode = obj['enode'];
					var json = JSON.stringify(enode, null, 4);
					$('#joinPublicBootNode').val(json);
				}
			})

		}
	}
	catch (err) {
		alert(err.message)
	}

});

$('#testRPC').on('click', async () => {

	try {
		ret = await util.getEnodeID()
		alert(ret)
	}

	catch (err) {
		alert(err.message)
	}


})
// Public Network - Ends


// Common - Starts

$('#goHome').on('click', () => {
	location.href = "index.html";
})

function dashboardAuxnetPublic() {

	try {
		htmlData = ''

		filePath = nodesDataDir + auxnetDirName + auxnetDataFileName + '.json'

		fs.readFile(filePath, 'utf8', function (err, contents) {

			if (err) {
				htmlData += '<div class="intro_screen_link existing_nodes">'
				htmlData += '<p class="label_white mb-0">'
				htmlData += 'No Saved Configuration Found'
				htmlData += '</p>'
				htmlData += '</div>'
				$('#auxnetPublicNetworkList').html(htmlData);
			}

			else {

				var obj = JSON.parse(contents);
				htmlData += '<div class="intro_screen_link existing_nodes">'
				htmlData += '<p class="label_white mb-0">'
				htmlData += obj['name']
				htmlData += '</p>'
				htmlData += '<p class="nw_name mb-3">'
				htmlData += obj['localPortNumber']
				htmlData += '</p>'
				htmlData += '<a title="Click here to Connect to the node" href="./auxnet.html?auxnetDataDirPath=' + obj['dataDir'] + '&auxnetPortNumber=' + obj['localPortNumber'] + '&auxnetIpcPath=' + obj['ipc'] + '&auxnetRPCPortNumber=' + obj['rpcPort'] + '" >'
				htmlData += 'Connect'
				htmlData += '</a>'
				htmlData += '<a href="javascript:deletePath(' + "'" + filePath + "'" + ',' + "'" + obj['dataDir'] + "'" + ')" title="Click here to delete network(It will also delete the network data)" class="d-block edit_nodes">'
				htmlData += '<i class="fas fa-trash" style="color: #fff; font-size: 12px;"></i>'
				htmlData += '</a>'
				htmlData += '</div>'

				$('#auxnetPublicNetworkList').html(htmlData);

			}

		})

	}

	catch (err) {
		alert(err.message);
		htmlData += '<div class="intro_screen_link existing_nodes">'
		htmlData += '<p class="label_white mb-0">'
		htmlData += 'No Saved Configuration Found'
		htmlData += '</p>'
		htmlData += '</div>'
		$('#auxnetPublicNetworkList').html(htmlData);
	}

}


var htmlDataPublic = ''
function dashboardPublic() {

	try {
		folder = nodesDataDir + publicDirName

		if (!fs.existsSync(folder)) {
			return
		}

		fs.readdir(folder, (err, files) => {
			if (files.length == 0) {
				return
			}
		});

		fs.readdirSync(folder).forEach(file => {
			var filePath = folder + file
			fs.readFile(filePath, 'utf8', function (err, contents) {

				if (err) {
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_white mb-0">'
					htmlDataPublic += 'No Saved Configuration Found'
					htmlDataPublic += '</p>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
					return
				}

				else {

					var obj = JSON.parse(contents);
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_white mb-0">'
					htmlDataPublic += obj['name']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<p class="nw_name mb-3">'
					htmlDataPublic += obj['localPortNumber']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<a title="Click here to Connect to the node" href="./create-public-network.html?publicGenesisFile=' + obj['genesisFile'] + '&publicDataDirPath=' + obj['dataDir'] + '&publicPortNumber=' + obj['localPortNumber'] + '&publicNetworkName=' + obj['name'] + '&publicIpcPath=' + obj['ipc'] + '&publicRPCPortNumber=' + obj['rpcPort'] + '&publicGasPrice=' + obj['gasPrice'] + '">'
					htmlDataPublic += 'Connect'
					htmlDataPublic += '</a>'
					htmlDataPublic += '<a title="Click here to Share the node details" href="javascript:util.getEnodeID(' + "'" + obj['dataDir'] + "'" + ',' + "'" + obj['rpcPort'] + "'" + ')" >'
					htmlDataPublic += ' &nbsp'
					htmlDataPublic += ' Share'
					htmlDataPublic += '</a>'
					htmlDataPublic += '<a href="javascript:deletePath(' + "'" + filePath + "'" + ',' + "'" + obj['dataDir'] + "'" + ')" title="Click here to delete network(It will also delete the network data)" class="d-block edit_nodes">'
					htmlDataPublic += '<i class="fas fa-trash" style="color: #fff; font-size: 12px;"></i>'
					htmlDataPublic += '</a>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
				}

			});
		});


	}

	catch (err) {
		htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
		htmlDataPublic += '<p class="label_white mb-0">'
		htmlDataPublic += 'No Saved Configuration Found'
		htmlDataPublic += '</p>'
		htmlDataPublic += '</div>'
		$('#publicNetworkList').html(htmlDataPublic);
	}

}


function dashboardOtherPublic() {

	try {
		folder = nodesDataDir + otherPublicDirName

		if (!fs.existsSync(folder)) {
			return
		}

		fs.readdir(folder, (err, files) => {
			if (files.length == 0) {
				return
			}
		});

		fs.readdirSync(folder).forEach(file => {
			var filePath = folder + file
			fs.readFile(filePath, 'utf8', function (err, contents) {

				if (err) {
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_white mb-0">'
					htmlDataPublic += 'No Saved Configuration Found'
					htmlDataPublic += '</p>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
					return
				}

				else {

					var obj = JSON.parse(contents);
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_white mb-0">'
					htmlDataPublic += obj['name']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<p class="nw_name mb-3">'
					htmlDataPublic += obj['localPortNumber']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<a title="Click here to Connect to the node" href="./join-public-network.html?joinPublicGenesisFile=' + obj['genesisFile'] + '&joinPublicDataDirPath=' + obj['dataDir'] + '&joinPublicLocalHostPort=' + obj['localPortNumber'] + '&joinPublicNetworkName=' + obj['name'] + '&joinPublicIpcPath=' + obj['ipc'] + '&joinPublicBootNode=' + obj['bootNode'] + '&joinPublicRPCPortNumber=' + obj['rpcPort'] + '">'
					htmlDataPublic += 'Connect'
					htmlDataPublic += '</a>'
					htmlDataPublic += '<a title="Click here to Share the node details" href="javascript:util.getEnodeID(' + "'" + obj['dataDir'] + "'" + ',' + "'" + obj['rpcPort'] + "'" + ')" >'
					htmlDataPublic += ' &nbsp'
					htmlDataPublic += ' Share'
					htmlDataPublic += '</a>'
					htmlDataPublic += '<a href="javascript:deletePath(' + "'" + filePath + "'" + ',' + "'" + obj['dataDir'] + "'" + ')" title="Click here to delete network(It will also delete the network data)" class="d-block edit_nodes">'
					htmlDataPublic += '<i class="fas fa-trash" style="color: #fff; font-size: 12px;"></i>'
					htmlDataPublic += '</a>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
				}

			});
		});


	}

	catch (err) {

	}

}

function dashboardPublicPOA() {

	try {
		folder = nodesDataDir + publicDirNamePOA

		if (!fs.existsSync(folder)) {
			return
		}

		fs.readdir(folder, (err, files) => {
			if (files.length == 0) {
				return
			}
		});

		fs.readdirSync(folder).forEach(file => {
			var filePath = folder + file
			fs.readFile(filePath, 'utf8', function (err, contents) {

				if (err) {
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_white mb-0">'
					htmlDataPublic += 'No Saved Configuration Found'
					htmlDataPublic += '</p>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
					return
				}

				else {

					var obj = JSON.parse(contents);
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_white mb-0">'
					htmlDataPublic += obj['name']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<p class="nw_name mb-3">'
					htmlDataPublic += obj['localPortNumber']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<a title="Click here to Connect to the node" href="./create-public-network.html?publicGenesisFile=' + obj['genesisFile'] + '&publicDataDirPath=' + obj['dataDir'] + '&publicPortNumber=' + obj['localPortNumber'] + '&publicNetworkName=' + obj['name'] + '&publicIpcPath=' + obj['ipc'] + '&publicRPCPortNumber=' + obj['rpcPort'] + '&publicNetworkPOAChainID=' + obj['chainId'] + '&publicAccountPassword=' + obj['password'] + '&publicConsensus=' + obj['consensus'] + '&publicGasPrice=' + obj['gasPrice'] + '">'
					htmlDataPublic += 'Connect'
					htmlDataPublic += '</a>'
					htmlDataPublic += '<a title="Click here to Share the node details" href="javascript:util.getEnodeID(' + "'" + obj['dataDir'] + "'" + ',' + "'" + obj['rpcPort'] + "'" + ')" >'
					htmlDataPublic += ' &nbsp'
					htmlDataPublic += ' Share'
					htmlDataPublic += '</a>'
					htmlDataPublic += '<a href="javascript:deletePath(' + "'" + filePath + "'" + ',' + "'" + obj['dataDir'] + "'" + ')" title="Click here to delete network(It will also delete the network data)" class="d-block edit_nodes">'
					htmlDataPublic += '<i class="fas fa-trash" style="color: #fff; font-size: 12px;"></i>'
					htmlDataPublic += '</a>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
				}

			});
		});


	}

	catch (err) {
		htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
		htmlDataPublic += '<p class="label_white mb-0">'
		htmlDataPublic += 'No Saved Configuration Found'
		htmlDataPublic += '</p>'
		htmlDataPublic += '</div>'
		$('#publicNetworkList').html(htmlDataPublic);
	}

}

function dashboardOtherPublicPOA() {

	try {
		folder = nodesDataDir + otherPublicDirNamePOA

		if (!fs.existsSync(folder)) {
			return
		}

		fs.readdir(folder, (err, files) => {
			if (files.length == 0) {
				return
			}
		});

		fs.readdirSync(folder).forEach(file => {
			var filePath = folder + file
			fs.readFile(filePath, 'utf8', function (err, contents) {

				if (err) {
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_white mb-0">'
					htmlDataPublic += 'No Saved Configuration Found'
					htmlDataPublic += '</p>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
					return
				}

				else {

					var obj = JSON.parse(contents);
					htmlDataPublic += '<div class="intro_screen_link existing_nodes">'
					htmlDataPublic += '<p class="label_white mb-0">'
					htmlDataPublic += obj['name']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<p class="nw_name mb-3">'
					htmlDataPublic += obj['localPortNumber']
					htmlDataPublic += '</p>'
					htmlDataPublic += '<a title="Click here to Connect to the node" href="./join-public-network.html?joinPublicGenesisFile=' + obj['genesisFile'] + '&joinPublicDataDirPath=' + obj['dataDir'] + '&joinPublicLocalHostPort=' + obj['localPortNumber'] + '&joinPublicNetworkName=' + obj['name'] + '&joinPublicIpcPath=' + obj['ipc'] + '&joinPublicBootNode=' + obj['bootNode'] + '&joinPublicRPCPortNumber=' + obj['rpcPort'] + '&joinPublicAccountPassword=' + obj['password'] + '&joinPublicConsensus=' + obj['consensus'] + '">'
					htmlDataPublic += 'Connect'
					htmlDataPublic += '</a>'
					htmlDataPublic += '<a title="Click here to Share the node details" href="javascript:util.getEnodeID(' + "'" + obj['dataDir'] + "'" + ',' + "'" + obj['rpcPort'] + "'" + ')" >'
					htmlDataPublic += ' &nbsp'
					htmlDataPublic += ' Share'
					htmlDataPublic += '</a>'
					htmlDataPublic += '<a href="javascript:deletePath(' + "'" + filePath + "'" + ',' + "'" + obj['dataDir'] + "'" + ')" title="Click here to delete network(It will also delete the network data)" class="d-block edit_nodes">'
					htmlDataPublic += '<i class="fas fa-trash" style="color: #fff; font-size: 12px;"></i>'
					htmlDataPublic += '</a>'
					htmlDataPublic += '</div>'
					$('#publicNetworkList').html(htmlDataPublic);
				}

			});
		});


	}

	catch (err) {

	}

}

function deletePath(nodeDetailsPath, networkDataPath) {

	swal({
		title: "Are you sure you want to delete?",
		text: "It will ALSO delete the network data.",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
		.then((willDelete) => {
			if (willDelete) {
				fs.unlinkSync(nodeDetailsPath)
				command = 'rm -rf ' + networkDataPath;
				myShell.execute(command);
				swal("Deleted!", {
					icon: "success",
				});
			}
			location.href = "./index.html";
		});

}

function deleteData(networkDataPath) {
	command = 'rm -rf ' + networkDataPath;
	myShell.execute(command);
}


$(document).ready(function () {

	var dataDict = {};
	let currentURL = window.location.href;
	let rawUrl = 'http://stackabuse.com/?page=2&limit=3';

	// Custom Parsing
	params = currentURL.split('?')[1]

	if (params) {

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



		if (dataDict['publicGasPrice']) $('#publicGasPrice').val(dataDict['publicGasPrice'])
		else $('#publicGasPrice').val(publicGasPrice)
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
		if (dataDict['publicAccountPassword']) $('#publicAccountPassword').val(dataDict['publicAccountPassword'])
		else $('#publicAccountPassword').val(publicAccountPassword)
		if (dataDict['publicNetworkPOAChainID']) $('#publicNetworkPOAChainID').val(dataDict['publicNetworkPOAChainID'])
		else $('#publicNetworkPOAChainID').val(publicNetworkPOAChainID)
		if (dataDict['publicConsensus'] == 'POA') {
			$('#selectPublicNetworkConsensus').val('publicNetworkConsensusPOA')
			$('#publicNetworkPOAParams').show("slow");
		}
		else $('#selectPublicNetworkConsensus').val('publicNetworkConsensusPOW')


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
		if (dataDict['joinPublicAccountPassword']) $('#joinPublicAccountPassword').val(dataDict['joinPublicAccountPassword'])
		else $('#joinPublicAccountPassword').val(joinPublicAccountPassword)
		if (dataDict['joinPublicConsensus'] == 'POA') {
			$('#selectJoinPublicNetworkConsensus').val('joinPublicNetworkConsensusPOA')
			$('#joinPublicNetworkPOAParams').show("slow");
		}
		else $('#selectJoinPublicNetworkConsensus').val('joinPublicNetworkConsensusPOW')


	}
	else {

		// When Click on Dashboard

		// Auxnet Public
		$('#auxnetDataDirPath').val(auxnetDataDirPath);
		$('#auxnetPortNumber').val(auxnetPortNumber);
		$('#auxnetIpcPath').val(auxnetIpcPath);
		$('#auxnetRPCPortNumber').val(auxnetRPCPortNumber);


		// Create Public Network
		$('#publicNetworkName').val(publicNetworkName);
		$('#publicDataDirPath').val(publicDataDirPath);
		$('#publicPortNumber').val(publicPortNumber);
		$('#publicIpcPath').val(publicIpcPath);
		$('#publicRPCPortNumber').val(publicRPCPortNumber);
		$('#publicAccountPassword').val(publicAccountPassword);
		$('#publicNetworkPOAChainID').val(publicNetworkPOAChainID);
		$('#publicGasPrice').val(publicGasPrice);


		// Join Public
		$('#joinPublicNetworkName').val(joinPublicNetworkName);
		$('#joinPublicGenesisFile').val(joinPublicGenesisFile);
		$('#joinPublicDataDirPath').val(joinPublicDataDirPath);
		$('#joinPublicBootNode').val(joinPublicBootNode);
		$('#joinPublicLocalHostPort').val(joinPublicLocalHostPort);
		$('#joinPublicIpcPath').val(joinPublicIpcPath);
		$('#joinPublicRPCPortNumber').val(joinPublicRPCPortNumber);
		$('#joinPublicAccountPassword').val(joinPublicAccountPassword);

	}


	// Dashboard View
	dashboardAuxnetPublic()
	dashboardPublic()
	dashboardPublicPOA()
	dashboardOtherPublic()
	dashboardOtherPublicPOA()


	// // TODO - To Be Removed
	// $('#publicNetworkPOAParams').show("slow");
	// $('#joinPublicNetworkPOAParams').show("slow");
	// $('#divPublicGenesis').hide("slow");
	// // $('#divJoinPublicGenesis').hide("slow");
	// // TODO - To Be Removed	

});


// Common - Ends


