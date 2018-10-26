function execute(command) {
  const exec = require('child_process').exec
  const shell = require('shelljs')
  auxnet_home_path = process.env.AUXNET
  shell_script_path = '/src/shell_script/'
  command = auxnet_home_path + shell_script_path + command

  exec(command, (err, stdout, stderr) => {
    process.stdout.write(stdout);
    shell.echo(stdout);
    // shell.echo(stderr);
    // shell.echo(err);
    
  })
}

module.exports = {
	execute
}
