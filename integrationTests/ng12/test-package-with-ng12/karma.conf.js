// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const defaults = {
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/test-package-with-ng11'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  };

  if (process.env.CI) {
    Object.assign(defaults, {
      autoWatch: false,
      browsers: ['ChromeHeadlessNoSandbox'],
      reporters: ['progress', 'kjhtml'],
      singleRun: true,
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: [
            '--no-sandbox',
            '--headless',
            '--disable-gpu',
            '--disable-translate',
            '--disable-web-security',
            '--disable-extensions',
            '--remote-debugging-port=9222',
          ],
          debug: false,
        },
      },
      browserNoActivityTimeout: 30000,
    });
  }

  config.set(defaults);
};
