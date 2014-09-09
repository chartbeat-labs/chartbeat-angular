'use strict';

module.exports = function(config) {
  config.set({
    // testing framework to use
    frameworks: ['jasmine'],

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,
    preprocessors: {
      'src/components/{,*/}*.html': 'ng-html2js',
      'src/components/{,*/}*.less': 'less'
    },
    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'src/components/'

      // // setting this option will create only a single module that contains templates
      // // from all the files, so you can load them all with module('foo')
      // moduleName: 'foo'
    },
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-less-preprocessor',
      'karma-phantomjs-launcher'
    ]
  });
};