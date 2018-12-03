const {dialog} = require('electron').remote

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

function createPublicNetwork(){
	alert(document.getElementById("auxnetDataDirPath").value)
}

function saveFile(filePath, data) {

	try {
		
		directory = path.dirname(filePath)

		if (!fs.existsSync(directory)){
			var shell = require('shelljs');
			shell.mkdir('-p', directory);
		}

		fs.writeFile(filePath, data, (err) => {
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

function saveNodeData(filePath, data) {

	try {
		
		directory = path.dirname(filePath)

		if (!fs.existsSync(directory)){
			var shell = require('shelljs');
			shell.mkdir('-p', directory);
		}

		var json = JSON.stringify(data, null, 4);
		fs.writeFile(filePath, json, (err) => {
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

function readFileData(filePath) {
	try {

		fs.readFile(filePath, function (err, data) {
		    if (err) alert(err);
		    return data.toString();
		});
	}
	catch(err) {
    	alert(err.message);
	}		
}

module.exports = {
	selectDirectory,
	selectFile,
	createPublicNetwork,
	saveFile,
	saveNodeData,
	readFileData
	// getEnodeID
}



// function getEnodeID(){
// 	return new Promise(async (resolve, reject) => {
// 		try{
// 			var Web3 = require('web3');
// 			web3 = new Web3("http://localhost:8546");
// 			alert(web3)
// 			// web3.version.getNetwork((err, result) => {				
// 			// 	if (result) resolve(result);
// 			// 	else resolve(err)
// 			// })	
// 		}
// 		catch(err){
// 			reject(err)
// 		}
// 	});
// }

// function isActive(){
// 	return new Promise(async (resolve, reject) => {
// 		try{
// 			var Web3 = require('web3');
// 			web3 = new Web3("http://localhost:8546");
// 			web3.eth.net.isListening((err, result) => {
// 				if (result) resolve('True');
// 				else resolve('False')
// 			})	
// 		}
// 		catch(err){
// 			reject(err.message)
// 		}
// 	});
// }
