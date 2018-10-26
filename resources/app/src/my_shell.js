function execute(command) {

  const exec = require('child_process').exec
  
  exec(command, (err, stdout, stderr) => {
    process.stdout.write(stdout);
  })
}

module.exports = {
	execute
}