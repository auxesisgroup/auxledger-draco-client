let $ = require('jquery');
var myShell = require('./my_shell');
auxnet_home_path = process.env.AUXNET

// Auxnet Public - Starts
$('#auxnetPublicMenu').on('click', () => {
	location.href = "AuxnetMenu.html";
})

// Set on Load Params
$('#auxnetDataDirPath').val(process.env.HOME + '/Documents/Auxledger/auxclient/dataDirectory/mainnet');
$('#auxnetPortNumber').val('30303');
$('#auxnetIpcPath').val(process.env.HOME + '/Documents/Auxledger/auxclient/dataDirectory/mainnet/gaux.ipc');

$('#joinAuxnetPublic').on('click', () => {
	var auxnetDataDirPath = document.getElementById("auxnetDataDirPath").value;
	var auxnetPortNumber = document.getElementById("auxnetPortNumber").value;	
	command = 'gnome-terminal -x ' + auxnet_home_path + '/bin/gaux --datadir=' + auxnetDataDirPath + ' --port=' + auxnetPortNumber
	myShell.execute(command);
})

$('#attachAuxnetTerminal').on('click', () => {
	var auxnetIpcPath = document.getElementById("auxnetIpcPath").value;	
	command = 'gnome-terminal -x ' + auxnet_home_path + '/bin/gaux attach ipc:' + auxnetIpcPath
	myShell.execute(command);
})
// Auxnet Public - Ends

// Public Network - Starts

// Set on Load Params
$('#publicGenesisFile').val(process.env.HOME + 'Documents/Auxledger/auxclient/auxledger-draco-client/genesis.json');
$('#publicDataDirPath').val(process.env.HOME + '/Documents/Auxledger/auxclient/dataDirectory/public');
$('#publicPortNumber').val('30304');
$('#publicIpcPath').val(process.env.HOME + '/Documents/Auxledger/auxclient/dataDirectory/public/gaux.ipc');


$('#createPublicMenu').on('click', () => {
	location.href = "CreatePublicForm.html";
})

$('#startPublic').on('click', () => {
	var publicDataDirPath = document.getElementById("publicDataDirPath").value;
	var publicGenesisFile = document.getElementById("publicGenesisFile").value;
	var publicPortNumber = document.getElementById("publicPortNumber").value;
	command = 'gnome-terminal -x bash -c "' + auxnet_home_path + '/bin/gaux init ' + publicGenesisFile + ' --datadir=' + publicDataDirPath + '; ' + auxnet_home_path + '/bin/gaux --datadir=' + publicDataDirPath + ' --port=' + publicPortNumber + ';"'
	myShell.execute(command);
})

$('#attachPublicTerminal').on('click', () => {
	var publicIpcPath = document.getElementById("publicIpcPath").value;	
	command = 'gnome-terminal -x ' + auxnet_home_path + '/bin/gaux attach ipc:' + publicIpcPath
	myShell.execute(command);
})


$('#joinPublicMenu').on('click', () => {
	location.href = "JoinPublicNetwork.html";
})

// on load params
$('#joinPublicGenesisFile').val(process.env.HOME + 'Documents/Auxledger/auxclient/auxledger-draco-client/genesis.json');
$('#joinPublicDataDirPath').val(process.env.HOME + '/Documents/Auxledger/auxclient/dataDirectory/public');
$('#joinPublicBootNode').val('127.0.0.1:30304');
$('#joinPublicLocalHostPort').val('30305');
$('#joinPublicIpcPath').val(process.env.HOME + '/Documents/Auxledger/auxclient/dataDirectory/public/gaux.ipc');


$('#joinPublicNetwork').on('click', () => {
	
	var joinPublicGenesisFile = document.getElementById("joinPublicGenesisFile").value;
	var joinPublicDataDirPath = document.getElementById("joinPublicDataDirPath").value;
	var joinPublicBootNode = document.getElementById("joinPublicBootNode").value;
	var joinPublicLocalHostPort = document.getElementById("joinPublicLocalHostPort").value;

	command = 'gnome-terminal -x bash -c "' + auxnet_home_path + '/bin/gaux --datadir=' + joinPublicDataDirPath + ' init ' + joinPublicGenesisFile + '; ' + auxnet_home_path + '/bin/gaux --datadir=' + joinPublicDataDirPath + ' --port=' + joinPublicLocalHostPort +  ' --bootnodes=' + joinPublicBootNode + ';"' 
	alert(command)
	// myShell.execute(command);
})


$('#joinAttachPublicTerminal').on('click', () => {
	var joinPublicIpcPath = document.getElementById("joinPublicIpcPath").value;	
	command = 'gnome-terminal -x ' + auxnet_home_path + '/bin/gaux attach ipc:' + joinPublicIpcPath
	alert(command)
	// myShell.execute(command);
})


// Common - Starts
$('#goHome').on('click', () => {
	location.href = "index.html";
}) 

// Common - Ends