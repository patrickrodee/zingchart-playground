var fs = require('fs');
var path = require('path');
var grunt = require('grunt');
var semver = require('semver');
var shell = require('shelljs');

var util = module.exports = {

  testDependencies: {
    unit: ['bower_components/jquery/jquery.min.js', 'lib/test/jquery.simulate.js', 'dist/release/ui-grid.css', 'bower_components/lodash/dist/lodash.min.js']
  },

  testFiles: {
    unit: ['src/js/core/bootstrap.js', 'src/js/**/*.js', 'test/unit/**/*.spec.js', 'src/features/*/js/**/*.js', 'src/features/*/test/**/*.spec.js', '.tmp/template.js']
  },

  // Return a list of angular files for a specific version
  angularFiles: function (version) {
    // Get the list of angulary files (angular.js, angular-mocks.js, etc)
    var files = grunt.file.readJSON('lib/test/angular/files.json');

    // Start with our test files
    var retFiles = []; //grunt.template.process('<%= karma.options.files %>').split(",");

    files.forEach(function(f) {
      var filePath = path.join('lib', 'test', 'angular', version, f);

      if (! fs.existsSync(filePath)) {
        grunt.fatal("Angular file " + filePath + " doesn't exist");
      }

      retFiles.push(filePath);
    });

    return retFiles;
  },

  startKarma: function(config, singleRun, done){
    var browsers = grunt.option('browsers');
    var reporters = grunt.option('reporters');
    var noColor = grunt.option('no-colors');
    var port = grunt.option('port');
    var p = spawn('node', ['node_modules/karma/bin/karma', 'start', config,
      singleRun ? '--single-run=true' : '',
      reporters ? '--reporters=' + reporters : '',
      browsers ? '--browsers=' + browsers : '',
      noColor ? '--no-colors' : '',
      port ? '--port=' + port : ''
    ]);
    p.stdout.pipe(process.stdout);
    p.stderr.pipe(process.stderr);
    p.on('exit', function(code){
      if(code !== 0) grunt.fail.warn("Karma test(s) failed. Exit code: " + code);
      done();
    });
  },

  customLaunchers: function() {
    return {
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox'
      },
      'SL_Safari_5': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'Mac 10.6',
        version: '5'
      },
      'SL_Safari_6': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'Mac 10.8',
        version: '6'
      },
      'SL_Safari_7': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'Mac 10.9',
        version: '7'
      },
      // 'SL_IE_8_XP': {
      //   base: 'SauceLabs',
      //   browserName: 'internet explorer',
      //   platform: 'Windows XP',
      //   version: '8'
      // },
      // 'SL_IE_8': {
      //   base: 'SauceLabs',
      //   browserName: 'internet explorer',
      //   platform: 'Windows 7',
      //   version: '8'
      // },
      'SL_IE_9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9'
      },
      'SL_IE_10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10'
      },
      'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      },
      'SL_Android_4': {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '4.0'
      },
      'SL_Android_4.3': {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '4.3'
      },
      'SL_Linux_Opera': {
        base: 'SauceLabs',
        browserName: 'opera',
        platform: 'Linux',
        version: '12'
      },

      // NOTE (c0bra): Currently both iOS 6 and 7 will run (w/ a 45 second activity timeout) and the tests pass, but after that the session just hangs indefinitely -- 20140320
      // 'SL_iOS_6': {
      //   base: 'SauceLabs',
      //   browserName: 'iphone',
      //   platform: 'OS X 10.8',
      //   version: '6.0'
      // },
      // 'SL_iOS_7': {
      //   base: 'SauceLabs',
      //   browserName: 'iphone',
      //   platform: 'OS X 10.9',
      //   version: '7.0'
      // }
    };
  },

  // 
  browsers: function() {

  },

  angulars: function() {
    var angularLib = path.join('lib', 'test', 'angular');

    // Loop over all the files in the angular testlib directory
    var files = fs.readdirSync(angularLib);

    // For each file found, make sure it's a directory...
    var versions = [];
    files.forEach(function(file) {
      var dir = path.join(angularLib, file);
      if (! fs.lstatSync(dir).isDirectory()) return;

      if (! semver.valid(file)) return;

      versions.push(file);
    });

    return versions;
  },

  latestAngular: function() {
    function sortFn(a,b) {
      return semver.gt(b, a);
    };

    // For each file found, make sure it's a directory...
    var versions = util.angulars();

    return versions.sort(sortFn)[0];
  },

  /* Read in whatever angular versions are in lib/test/angular and register karma configs for them all! */
  createKarmangularConfig: function() {
    // For each file found, make sure it's a directory...
    var versions = grunt.option('angular') ? grunt.option('angular').split(/,/) : null || util.angulars();

    if (grunt.option('angular')) {
      grunt.log.writeln("Using angular " + grunt.util.pluralize(versions, "version/versions") + ": " + versions.join(', '));
    }

    versions.forEach(function (version) {
      // .. then create a karma config for it!
      var karmaConfigName = 'angular-' + grunt.config.escape(version);

      grunt.config('karma.' + karmaConfigName, {
        options: {
          files: util.testDependencies.unit
            .concat(util.angularFiles(version)
            .concat(util.testFiles.unit))
        }
      });
    });
  },

  // Take the SauceLabs browsers from the karma config file and split them into groups of 3
  createSauceConfig: function() {
    var launchers = util.customLaunchers();

    var chunkNames = Object.keys(launchers);
    var chunks = [].concat.apply([], chunkNames.map(function (c, i) {
      return i % 3 ? [] : [ chunkNames.slice(i, i + 3) ];
    }));

    // console.log(chunks);
    chunks.forEach(function (c, i) {
      grunt.config('karma.sauce-' + i, {
        background: false,
        singleRun: true,
        // reporters: ['saucelabs', 'coverage'],
        reporters: ['saucelabs'],
        browsers: c
        // preprocessors: {
        //   'src/**/!(*.spec)+(.js)': ['coverage']
        // },
        // coverageReporter: {
        //   type: 'lcov',
        //   dir:  'coverage',
        //   subdir: '.'
        // }
      });
    });

    // console.log('tasks', chunks.map(function(c, i) { return 'karma:sauce-' + i }));

    grunt.config('serialsauce', chunks.map(function(c, i) { return 'karma:sauce-' + i }));
  },

  updateConfig: function() {
    grunt.config('customLaunchers', util.customLaunchers());
    util.createKarmangularConfig()
    util.createSauceConfig();

    if (process.env.TRAVIS) {
      grunt.config('gh-pages.gh-pages.options.user', {
        name: 'grud',
        email: 'nggridteam@gmail.com'
      });

      grunt.config('gh-pages.gh-pages.options.repo', 'https://' + process.env.GITHUB_NAME + ':' + process.env.GITHUB_PASS + '@github.com/angular-ui/ui-grid.info.git');
    }
  },

  // Get the current release version
  getVersion: function() {
    // Get the current git tag
    // var version = shell.exec('git describe', {silent:true}).output.trim();

    // Try to get a tag for the current version
    var out = shell.exec('git rev-list --all --max-count=1 | xargs git describe', {silent:true});

    var version;

    // If there's a tag on this commit, use it
    if (out.code == 0) {
      version = out.output.trim();
    }
    // ...otherwise, get the most recent stable tag
    else {
      version = shell.exec('git rev-list --tags --max-count=1 | xargs git describe', {silent:true}).output.trim();

      // Append the commit hash suffix
      var hash = shell.exec('git describe --always', {silent:true}).output.trim();
      version = version + '-' + hash;
    }

    // Clean up the tag (git describe --long comes out as: v1.0.0-123-a78fda, need to remove the middle part though with the above commands we should not have the build number)
    var tag = version.replace(/-\d+-/, '-');

    tag = semver.clean(tag);

    return tag;
  },

  getStableVersion: function() {
    var cmd = 'git log --date-order --graph --tags --simplify-by-decoration --pretty=format:\"%ai %h %d\"';
    // grunt.log.writeln(cmd);
    var out = shell.exec(cmd, {silent:true}).output;

    // grunt.log.writeln(lines);

    var lines = out.split('\n');
    for (var i in lines) {
      var l = lines[i];
      
      var match = l.match(/\(.*?tag: (.+?)(\)|,)/);
      if (! match || match.length < 2 || !match[1]) { continue; }
      var tag = match[1];

      var v = semver.clean(tag);
      
      if (!v.match(/-.+?$/)) {
        return v;
      }
    }
  }

};