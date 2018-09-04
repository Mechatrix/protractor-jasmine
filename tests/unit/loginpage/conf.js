// conf.js

var browserstack = require('browserstack-local');
var jasmineReporters = require('jasmine-reporters');

exports.config = {

  framework: 'jasmine2',

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  //Code to start browserstack local before start of test
  beforeLaunch: function () {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({
        'key': exports.config.multiCapabilities['browserstack.key']
      }, function (error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  onPrepare: function () {

    browser.manage().timeouts().implicitlyWait(15000);

    browser.driver.manage().window().maximize();


    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter(null, true, true));

    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));

    jasmine.getEnv().afterEach(function (done) {
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64');
        }, 'image/png')();
        done();
      });
    });
  },


  multiCapabilities: [
    // {
    //   'browserName': 'chrome'
    // },
    // {
    //   'browserName': 'firefox'
    // },
    // {
    //   'browserName': 'internet explorer'
    // },
      {
      'browserName': 'Safari',
      'browser_version': '7.1',
      'os': 'OS X',
      'os_version': 'Mavericks',
      'resolution': '1024x768',
      'browserstack.user': 'vinaykumar58',
      'browserstack.key': 'mQguuPam8A1b99Wrj1NX',
      'browserstack.local': 'true'
    }
    // {
    //   browserName: 'chrome',
    //   'chromeOptions': {
    //     'mobileEmulation': {
    //       'deviceName': 'Galaxy S5'
    //     }
    //   }
    // },
    // {
    //   browserName: 'chrome',
    //   'chromeOptions': {
    //     'mobileEmulation': {
    //       'deviceName': 'iPhone X'
    //     }
    //   }
    // },

  ],

  maxSessions: 6,

  baseUrl: 'http://10.13.104.41/',
  specs: ['login.js'],

  //directConnect: true,

  //----For Local Desktop-----
  seleniumAddress: 'http://localhost:4444/wd/hub',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 2500000,
    isVerbose: true,
    includeStackTrace: true
  },

  //Code to stop browserstack local after end of test
  afterLaunch: function () {
    return new Promise(function (resolve, reject) {
      exports.bs_local.stop(resolve);
    });
  }

};