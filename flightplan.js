// Running this requires installing flightplan (see https://github.com/pstadler/flightplan).
// Then use the "fly" command to deploy this application. Note: At the moment there are not multiple tasks
// specified in this flightplan file. Consult the PaperQuick project to see a flightplan with commands for 
// configuration of a new server and upgrading it to the latest software.
plan.target('production', [
  {
    host: 'PocketChange',
    username: 'root',
    agent: process.env.SSH_AUTH_SOCK
  }
]);

var tmpDir = 'ClearAndDraw-com-' + new Date().getTime();

// run commands on localhost
plan.local(function(local) {
  local.log('Deploy the current build of ClearAndDraw.com.');
  local.log('Run build');
  local.exec('grunt build');

  local.log('Copy files to remote hosts');
  local.with('cd dist', function() {
    var filesToCopy = local.exec('find .');

    // rsync files to all the target's remote hosts
    local.transfer(filesToCopy, '/tmp/' + tmpDir);
  });
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
  remote.log('Move folder to web root');
  remote.sudo('cp -R /tmp/' + tmpDir + '/*' + ' /var/www/mdm');
  remote.rm('-rf /tmp/' + tmpDir);
});
