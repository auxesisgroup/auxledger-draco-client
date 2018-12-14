function execute(command) {
	return new Promise(async (resolve, reject) => {
		
		const exec = require('child_process').exec 
	  	exec(command, (err, stdout, stderr) => {
		    resolve(stdout);
	  	})
	})
}

module.exports = {
	execute
}