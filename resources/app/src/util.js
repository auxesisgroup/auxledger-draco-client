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

module.exports = {
	selectDirectory,
	selectFile
}