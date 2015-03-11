// Running this requires installing Shipit (https://github.com/shipitjs/shipit).
// Then use commands like:
//   shipit production deploy
// Commands to install required software on the server or upgrade Ubuntu are all in the Shipit
// file for the PaperQuik project. However, it now occurs to me that I may be able to import that
// into this project and use them here as well. That will be an interesting future experiment.
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      key: '../PaperQuik/.vagrant/machines/default/virtualbox/private_key'
    },
    vagrant: {
      servers: 'vagrant@127.0.0.1:2222'
    },
    production: {
      servers: 'root@PocketChange'
    }
  });

  var tmpDir = 'ClearAndDraw-com-' + new Date().getTime();

  // This shipit file doesn't yet use the official shipit deploy functionality. It may in the future but
  // this is my old sequence and I know it works. Note: I also know theirs seems like it might be
  // better because it can roll back and I definitely do not have that.
  shipit.task('deploy', function () {
    shipit.log('Deploy the current build of ClearAndDraw.com.');
    shipit.local('grunt build')
        .then(function () {
          return shipit.remoteCopy('dist/*', '/tmp/' + tmpDir);
        })
        .then(function () {
          shipit.log('Move folder to web root');
          // The mdm name is an artifact of the fact that the prototype was named MDM after Marvel Dice Masters.
          // I knew I wasn't going to get mdm.com though so it had to change and I just never changed the
          // directory names.
          return shipit.remote('sudo cp -R /tmp/' + tmpDir + '/*' + ' /var/www/mdm');
        })
        .then(function () {
          shipit.remote('rm -rf /tmp/' + tmpDir);        
        });
  });
};
