let $ = require('jquery');
var myshell = require('./my_shell');
var exec = require('child_process').exec;
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require('shelljs');



$('#connect').on('click', () => {
	$('#attach').delay(2500).show(0);
	myshell.execute('shellscript.sh');
})

$('#attach').on('click', () => {
	myshell.execute('shellscript2.sh');
})
$('#attachtopub').on('click', () => {
	myshell.execute('publicconsole.sh');
})

$('#createpub').on('click', () => {
	location.href = "networkCreateForm.html";
})
$('#joinpub').on('click', () => {
	location.href = "joinnetwork.html";
})

$('#start').on('click', () => {
	var genesispath = document.getElementById("genesisfile").value;
	
	myshell.execute("createnetwork.sh " + genesispath);

	$('#attachtopub').delay(2500).show(0);
	// myshell.execute('createnetwork.sh');

})

$('#start').on('click', () => {
	var genesisfilepath = document.getElementById("genesisfilepath").value;
	var bootnode = document.getElementById("bootnode").value;
	
	myshell.execute("joinnetwork.sh " + genesisfilepath + bootnode);

	$('#attachtopub').delay(2500).show(0);
	// myshell.execute('createnetwork.sh');

})

$('#goback').on('click', () => {
	location.href = "index.html";
}) 