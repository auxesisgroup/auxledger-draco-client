function execute(command) {
  return new Promise(function(resolve, reject) {
    const exec = require('child_process').exec
    
    exec(command, (err, stdout, stderr) => {
      process.stdout.write(stdout);
      resolve(stdout);
    })
  });  
}
  

module.exports = {
	execute
}