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

module.exports = {
	selectDirectory,
	selectFile,
	// getEnodeID
}