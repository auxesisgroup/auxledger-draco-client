// import { Web3 } from 'web3';
const { dialog } = require('electron').remote
const axios = require('axios');
var myShell = require('./my_shell');



function selectDirectory() {
	return dialog.showOpenDialog(remote.getCurrentWindow(), {
		properties: ['openDirectory']
	})
}

function selectFile() {
	return dialog.showOpenDialog(remote.getCurrentWindow(), {
		properties: ['openFile']
	})
}

function createPublicNetwork() {
	alert(document.getElementById("auxnetDataDirPath").value)
}

function saveFile(filePath, data) {

	try {

		directory = path.dirname(filePath)

		if (!fs.existsSync(directory)) {
			var shell = require('shelljs');
			shell.mkdir('-p', directory);
		}

		fs.writeFile(filePath, data, (err) => {
			if (err) {
				alert(err.message);
				return false
			}

		})
		return true
	}
	catch (err) {
		alert(err.message);
	}
}

function saveNodeData(filePath, data) {

	try {

		directory = path.dirname(filePath)

		if (!fs.existsSync(directory)) {
			var shell = require('shelljs');
			shell.mkdir('-p', directory);
		}

		var json = JSON.stringify(data, null, 4);
		fs.writeFile(filePath, json, (err) => {
			if (err) {
				alert(err.message);
				return false
			}

		})
		return true
	}
	catch (err) {
		alert(err.message);
	}
}

function readFileData(filePath) {
	try {

		fs.readFile(filePath, function (err, data) {
			if (err) alert(err);
			return data.toString();
		});
	}
	catch (err) {
		alert(err.message);
	}
}

function getEnode(){
	alert("in the function");
}

function getEnodeID(datadirpath, rpcport) {
	// alert("in the function");
	isActive(rpcport)
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios({
				method: 'post',
				url: 'http://localhost:' + rpcport,
				data: { "method": "admin_nodeInfo", "params": [], "id": 1, "jsonrpc": "2.0" },
				headers: {
					'content-type': `application/json;`,
				},
			});
			var enode = response.data.result.enode;
			var splitted1 = enode.split("@",1);
			var splitted2 = "@127.0.0.1:" + rpcport;
			var final = splitted1 + splitted2;
			networkData = {
				'enode': final
			}
			// var json = JSON.stringify(enode, null, 4);
			var enodeDetailpath = datadirpath + '/enodeDetails.json'
			saveNodeData(enodeDetailpath, networkData)
			command = `cd `+ datadirpath +`; zip share.zip genesis.json enodeDetails.json`
			await myShell.execute(command)			
			alert("Zip Created in the Datadirectory folder!!")
		}
		catch (err) {
			reject(err)
		}
	});
}

function isActive(rpcport) {
	return new Promise(async (resolve, reject) => {
		try {
			var Web3 = require('web3');
			web3 = new Web3("http://localhost:"+rpcport);
			web3.eth.net.isListening((err, result) => {
				if (result) {
					resolve('True');
					// alert('Connected')
				}
				else {
					resolve('False');
					alert('Network not running, first ensure that the network is running!')
				}
			})
		}
		catch (err) {
			reject(err.message)
		}
	});
}

module.exports = {
	selectDirectory,
	selectFile,
	createPublicNetwork,
	saveFile,
	saveNodeData,
	readFileData,
	getEnodeID,
	getEnode,
	isActive
}






