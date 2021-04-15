// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');
const jasmineReporters = require('jasmine-reporters');

process.env.CHROME_BIN = process.env.CHROME_BIN || require('puppeteer').executablePath();
console.log('process.env.CHROME_BIN: ' + process.env.CHROME_BIN);

/**
 * @type { import("protractor").Config }
 */

let protractorDefaults = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {},
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json'),
    });
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: StacktraceOption.PRETTY,
        },
      }),
    );
  },
};

if (process.env.CI) {
  Object.assign(protractorDefaults, {
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless'],
        binary: process.env.CHROME_BIN,
      },
    },
    onPrepare() {
      require('ts-node').register({
        project: require('path').join(__dirname, './tsconfig.json'),
      });
      jasmine.getEnv().addReporter(
        new SpecReporter({
          spec: {
            displayStacktrace: StacktraceOption.PRETTY,
          },
        }),
      );
      jasmine.getEnv().addReporter(
        new jasmineReporters.JUnitXmlReporter({
          consolidateAll: true,
          savePath: 'e2e/results',
          filePrefix: 'e2e-results-junit',
        }),
      );
    },
    plugins: [
      {
        package: 'protractor-console-plugin',
        failOnWarning: false,
        failOnError: true,
        logWarnings: true,
      },
    ],
  });
}

exports.config = protractorDefaults;
