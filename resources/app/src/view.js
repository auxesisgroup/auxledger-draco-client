let $ = require('jquery');
var myShell = require('./my_shell');
const path = require('path')
const remote = require('electron').remote
auxnetHomePath = process.env.AUXNET
terminalCommandStart = "gnome-terminal --tab -e \"/bin/bash -c '"
terminalCommandEnd = "; exec /bin/bash -i'\""

//App Quit
$('#appQuit').on('click', () => {
	remote.getCurrentWindow().close()
})

// Auxnet Public - Starts

// Set on Load Params
$('#auxnetDataDirPath').val(process.env.HOME + '/.auxnet/dataDirectory/mainnet');
$('#auxnetPortNumber').val('30303');
$('#auxnetIpcPath').val(process.env.HOME + '/.auxnet/dataDirectory/mainnet/gaux.ipc');

$('#joinAuxnetPublic').on('click', () => {
	$('#joinAuxnetPublic').delay(1500).hide(0);
	$('#greendiv').delay(1500).show(0);
	$('#attachDiv').delay(1500).hide(0);
	$('.cust_form_group, .cust_btn, .form_control').delay(1500).removeAttr("disabled");
	$('.cust_form_group').delay(1500).removeClass("disabled");

	var auxnetDataDirPath = document.getElementById("auxnetDataDirPath").value;
	var auxnetPortNumber = document.getElementById("auxnetPortNumber").value;	
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux --datadir=' + auxnetDataDirPath + ' --port=' + auxnetPortNumber + terminalCommandEnd
	myShell.execute(command);
})

$('#attachAuxnetTerminal').on('click', () => {
	var auxnetIpcPath = document.getElementById("auxnetIpcPath").value;	
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux attach ipc:' + auxnetIpcPath + terminalCommandEnd
	myShell.execute(command);
})
// Auxnet Public - Ends

// Public Network - Starts

// Set on Load Params
// $('#publicGenesisFile').val(process.env.HOME + '/.auxnet/genesis.json');
$('#publicDataDirPath').val(process.env.HOME + '/.auxnet/dataDirectory/public');
$('#publicPortNumber').val('30304');
$('#publicIpcPath').val(process.env.HOME + '/.auxnet/dataDirectory/public/gaux.ipc');


$('#startPublic').on('click', () => {
	$('#startPublic').delay(1500).hide(0);
	$('#greendiv').delay(1500).show(0);
	$('#attachDiv').delay(1500).hide(0);
	$('.cust_form_group, .cust_btn, .form_control').delay(1500).removeAttr("disabled");
	$('.cust_form_group').delay(1500).removeClass("disabled");

	var publicDataDirPath = document.getElementById("publicDataDirPath").value;
	var publicGenesisFile = document.getElementById("publicGenesisFile").value;
	var publicPortNumber = document.getElementById("publicPortNumber").value;
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux init ' + publicGenesisFile + ' --datadir=' + publicDataDirPath + '; ' + auxnetHomePath + '/bin/gaux --datadir=' + publicDataDirPath + ' --port=' + publicPortNumber + terminalCommandEnd
	myShell.execute(command);
})

$('#attachPublicTerminal').on('click', () => {
	var publicIpcPath = document.getElementById("publicIpcPath").value;	
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux attach ipc:' + publicIpcPath + terminalCommandEnd
	myShell.execute(command);
})




// on load params
// $('#joinPublicGenesisFile').val(process.env.HOME + '/.auxnet/genesis.json');
$('#joinPublicDataDirPath').val(process.env.HOME + '/.auxnet/dataDirectory/public');
$('#joinPublicBootNode').val('127.0.0.1:30304');
$('#joinPublicLocalHostPort').val('30305');
$('#joinPublicIpcPath').val(process.env.HOME + '/.auxnet/public/gaux.ipc');


$('#joinPublicNetwork').on('click', () => {
	$('#joinPublicNetwork').delay(1500).hide(0);
	$('#greendiv').delay(1000).show(0);
	$('#attachDiv').delay(1500).hide(0);
	$('.cust_form_group, .cust_btn, .form_control').delay(1500).removeAttr("disabled");
	$('.cust_form_group').delay(1500).removeClass("disabled");

	var joinPublicGenesisFile = document.getElementById("joinPublicGenesisFile").value;
	var joinPublicDataDirPath = document.getElementById("joinPublicDataDirPath").value;
	var joinPublicBootNode = document.getElementById("joinPublicBootNode").value;
	var joinPublicLocalHostPort = document.getElementById("joinPublicLocalHostPort").value;
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux --datadir=' + joinPublicDataDirPath + ' init ' + joinPublicGenesisFile + '; ' + auxnetHomePath + '/bin/gaux --datadir=' + joinPublicDataDirPath + ' --port=' + joinPublicLocalHostPort +  ' --bootnodes=' + joinPublicBootNode + terminalCommandEnd
	myShell.execute(command);
})


$('#joinAttachPublicTerminal').on('click', () => {
	var joinPublicIpcPath = document.getElementById("joinPublicIpcPath").value;	
	command = terminalCommandStart + auxnetHomePath + '/bin/gaux attach ipc:' + joinPublicIpcPath + terminalCommandEnd
	myShell.execute(command);
})


// Common - Starts
$('#goHome').on('click', () => {
	location.href = "index.html";
}) 

// Common - Ends