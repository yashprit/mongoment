var gulp = require('gulp');
var shell = require('gulp-shell');
var gutil = require('gulp-util');

var NodeWebkitBuilder = require('node-webkit-builder');

// Run project
gulp.task('run', shell.task([
  'node node_modules/node-webkit-builder/bin/nwbuild -r ./'
]));

gulp.task('build', function(cb) {

  // Read package.json
  var package = require('./package.json')

  // Find out which modules to include
  var modules = []
  if (!!package.dependencies) {
    modules = Object.keys(package.dependencies)
      .filter(function(m) {
        return m != 'nodewebkit'
      })
      .map(function(m) {
        return './node_modules/' + m + '/**/*'
      });
  }

  // Which platforms should we build
  var platforms = []
  if (process.argv.indexOf('--win') > -1) platforms.push('win')
  if (process.argv.indexOf('--mac') > -1) platforms.push('osx')
  if (process.argv.indexOf('--linux32') > -1) platforms.push('linux32')
  if (process.argv.indexOf('--linux64') > -1) platforms.push('linux64')

  // Build for All platforms
  if (process.argv.indexOf('--all') > -1) platforms = ['win', 'osx', 'linux32', 'linux64']

  // If no platform where specified, determine current platform
  if (!platforms.length) {
    if (process.platform === 'darwin') platforms.push('osx')
    else if (process.platform === 'win32') platforms.push('win')
    else if (process.arch === 'ia32') platforms.push('linux32')
    else if (process.arch === 'x64') platforms.push('linux64')
  }

  // Initialize NodeWebkitBuilder
  var nw = new NodeWebkitBuilder({
    files: ['./package.json', './app/**/*'].concat(modules),
    cacheDir: './os/cache',
    platforms: platforms,
    macIcns: './app/assets/icons/play-icon.icns',
    winIco: './app/assets/icons/play-icon.ico',
    checkVersions: false
  })

  nw.on('log', function(msg) {
    // Ignore 'Zipping... messages
    if (msg.indexOf('Zipping') !== 0) console.log(msg);
  });

  nw.build().then(function() {
    gutil.log("all done");
  }).catch(gutil.error);
});
