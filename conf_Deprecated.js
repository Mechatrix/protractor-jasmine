// conf.js

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var EnvParams = require('../e2e/Environment/Env.json');
var HtmlReporter = require('protractor-beautiful-reporter');
var path = require('path');
var q = require('q');

//If user wants to change the Environment please change it Environment Parametr after EnvParams
var EnvbaseUrl = EnvParams.SAT

var jasmine2HtmlReporter = new Jasmine2HtmlReporter({
    savePath: 'reports/e2e/protractor-jasmine2-html-reporter/',
    filename: 'Summary-Report.html',
    screenshotsFolder: 'screenshots',
});

var htmlScreenshotReporter = new HtmlScreenshotReporter({
    dest: 'reports/e2e/protractor-jasmine2-screenshot-reporter/',
    filename: 'Detailed-Report.html',
    consolidateAll: false,
});

// function mail_func() {

//     const exec = require('child_process').exec;

//     //Run the mailer Job from Mailgun
//     exec('node C:/Users/vbadugu/Desktop/Protractor/js/mail.js', (err, stdout, stderr) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log(stdout);
//     });

//     console.log("Shooting Email!!");
// }

exports.config = {

    //sauceUser: 'latonyagreen',
    //sauceKey: '5c5cb6bf-9656-4327-800b-160dfb76d2df',

    //bin/sc -u latonyagreen  -k 5c5cb6bf-9656-4327-800b-160dfb76d2df

    allScriptsTimeout: 11000,
    framework: 'jasmine2',
    //restartBrowserBetweenTests: true,
    params: {
        baseUrl: EnvbaseUrl
    },

    rootElement: '.rp-app-wrap  appNav appHeader appFooter appSubheader global-nav-collapsed pace-done',

    // 'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

    // 'capabilities': {
    //     'browserstack.user': 'vinaykumar58',
    //     'browserstack.key': 'mQguuPam8A1b99Wrj1NX',
    //     'browserstack.local': true,
    //     'browserName': 'chrome'
    // },

    // Setup the report before any tests start
    beforeLaunch: function () {

        //For browser Stack
        // console.log("Connecting local");
        // return new Promise(function (resolve, reject) {
        //     exports.bs_local = new browserstack.Local();
        //     exports.bs_local.start({
        //         'key': exports.config.capabilities['browserstack.key']
        //     }, function (error) {
        //         if (error) return reject(error);
        //         console.log('Connected. Now testing...');

        //         resolve();
        //     });
        // });

        return new Promise(function (resolve) {
            htmlScreenshotReporter.beforeLaunch(resolve);
        });

        return new Promise(function (resolve) {
            jasmine2HtmlReporter.beforeLaunch(resolve);
        });
    },

    onPrepare: function () {

        browser.driver.manage().window().maximize();

        browser.manage().timeouts().implicitlyWait(15000);

        var originalTimeout;
        var DeviceName;

        global.isAngularSite = function (flag) {
            browser.ignoreSynchronization = !flag;
        };

        global.isAngularSite = function (flag) {
            browser.ignoreSynchronization = !flag;
        };


        //Imp for delaying 100ms before each queued action
        var origFn = browser.driver.controlFlow().execute;

        browser.driver.controlFlow().execute = function () {
            var args = arguments;

            // queue 100ms wait
            origFn.call(browser.driver.controlFlow(), function () {
                return protractor.promise.delayed(100);
            });

            return origFn.apply(browser.driver.controlFlow(), args);
        };

        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            //browser.ignoreSynchronization = true;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

        });

        browser.ignoreSynchronization = false;

        //jasmine.getEnv().addReporter(jasmine2HtmlReporter);
        //jasmine.getEnv().addReporter(htmlScreenshotReporter);

        // browser.getProcessedConfig().then((c) => {
        //     console.log(c.capabilities.chromeOptions.mobileEmulation.deviceName);
        //     DeviceName = c.capabilities.chromeOptions.mobileEmulation.deviceName
        // });

        //     return new Promise(function (fulfill, reject) {
        //         browser.getCapabilities().then(function (value) {
        //             var currentDate = new Date(),
        //                 day = currentDate.getDate(),
        //                 month = currentDate.getMonth() + 1,
        //                 year = currentDate.getFullYear();
        //             //console.log(DeviceName);

        //             reportName = 'RAUL Automation' + '_' + value.get('webdriver.remote.sessionid') + '_' + value.get('browserName') + '_' + day + "-" + month + "-" + year,
        //                 jasmine.getEnv().addReporter(
        //                     new Jasmine2HtmlReporter({
        //                         savePath:'target/',
        //                         docTitle: 'RAUL Automation Report',
        //                         screenshotsFolder: 'images',
        //                         takeScreenshots: true,
        //                         //takeScreenshotsOnlyOnFailures: true,
        //                         consolidate: true,
        //                         consolidateAll: false,
        //                         preserveDirectory: true,

        //                         //cleanDirectory: false,
        //                         //fixedScreenshotName: true,
        //                         fileNamePrefix: reportName +".html"
        //                     })
        //                 );
        //             fulfill();
        //         });
        //     });
        // },


        // // Close the report after all tests finish
        // afterLaunch: function afterLaunch() {

        //     //Broswerstack
        //     // return new Promise(function (resolve, reject) {
        //     //     exports.bs_local.stop(resolve);
        //     // });

        //     var fs = require('fs');
        //     var output = '';
        //     fs.readdirSync('target/').forEach(function (file) {
        //         if (!(fs.lstatSync('target/' + file).isDirectory()))
        //             output = output + fs.readFileSync('target/' + file);
        //     });
        //     fs.writeFileSync('target/ConsolidatedReport.html', output, 'utf8');

        // },

        return new Promise(function (fulfill, reject) {
            browser.getCapabilities().then(function (value) {
                var currentDate = new Date(),
                    day = currentDate.getDate(),
                    month = currentDate.getMonth() + 1,
                    year = currentDate.getFullYear();
                //console.log(DeviceName);

                reportName = 'RAUL Automation' + '_' + value.get('browserName') + '_' + day + "-" + month + "-" + year,
                    jasmine.getEnv().addReporter(
                        new Jasmine2HtmlReporter({
                            savePath: __dirname + '/target',
                            docTitle: 'RAUL Automation Report',
                            screenshotsFolder: '/image',
                            takeScreenshots: true,
                            //takeScreenshotsOnlyOnFailures: true,
                            consolidate: true,
                            consolidateAll: true,
                            preserveDirectory: true,

                            //cleanDirectory: false,
                            //fixedScreenshotName: true,
                            fileName: "Report.html",
                            fileNamePrefix: reportName
                        })
                    );
                fulfill();
            });
        });
    },


    // Close the report after all tests finish
    afterLaunch: function afterLaunch() {

        //Broswerstack
        // return new Promise(function (resolve, reject) {
        //     exports.bs_local.stop(resolve);
        // });

        var fs = require('fs');
        var output = '';
        fs.readdirSync('target/').forEach(function (file) {
            if (!(fs.lstatSync('target/' + file).isDirectory()))
                output = output + fs.readFileSync('target/' + file);
        });
        fs.writeFileSync('target/ConsolidatedReport.html', output, 'utf8');

    },

    // seleniumServerJar: '../node_modules/webdriver-manager/selenium/selenium-server-standalone-3.11.0.jar',
    // localSeleniumStandaloneOpts: {
    //     args: ['-log', 'selenium_server_logs.log', '-debug'],
    //     jvmArgs: [
    //         '-Dwebdriver.chrome.driver=../node_modules/webdriver-manager/selenium/chromedriver_2.38',
    //         '-Dwebdriver.chrome.logfile=./browser_logs_chrome.log',
    //         '-Dwebdriver.gecko.driver=../node_modules/webdriver-manager/selenium/geckodriver-v0.20.1',
    //         '-Dwebdriver.gecko.logfile=./browser_logs_firefox.log',
    //         '-Dwebdriver.ie.driver=../node_modules/webdriver-manager/selenium/IEDriverServer3.11.1',
    //         '-Dwebdriver.ie.logfile=./browser_logs_ie.log'
    //     ]
    // },

    multiCapabilities: [

        {
            browserName: 'chrome',
            // chromeOptions: {
            //     args: ['--user-data-dir=C:/Users/vbadugu/Desktop/Protractor/user-profile']
            // }
            // chromeOptions: {
            //     args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
            //   }

        },
        // {
        //     browserName: 'firefox',
        //     marionette: true,
        //     //'setAcceptUntrustedCertificates': true,
        //     //'setAssumeUntrustedCertificateIssuer': false,
        //     //'acceptInsecureCerts': true,
        //     directConnect: true,
        //     loggingPrefs: {
        //         'driver': 'OFF',
        //         'server': 'OFF',
        //         'browser': 'OFF'
        //     }
        // },
        // {
        //     browserName: 'firefox',
        //     firefoxOptions: {
        //         args: ['--headless']
        //     },
        //     'moz:firefoxOptions': {
        //         args: ['--headless']
        //     }
        // },
        // {
        //     browserName: 'internet explorer',
        //     // 'version': 11,
        //     // 'nativeEvents': false,
        //     // 'unexpectedAlertBehaviour': 'accept',
        //     // 'ignoreProtectedModeSettings': true,
        //     // 'enablePersistentHover': true,
        //     // 'disable-popup-blocking': true,
        //     // 'ignoreZoomSetting':true

        //     directConnect: true
        // },
        // {
        //     browserName: 'internet explorer',
        //     'version': 11,
        //     'nativeEvents': false,
        //     'unexpectedAlertBehaviour': 'accept',
        //     'ignoreProtectedModeSettings': true,
        //     'enablePersistentHover': true,
        //     'disable-popup-blocking': true

        // },
        //This is for Physical Device using Appium
        // {
        //     browserName: 'chrome',
        //     platformName: 'Android',
        //     platformVersion: '6.0',
        //     deviceName: 'Android Emulator',
        //     clearSystemFiles: true
        // },
        //This should be executed through Saucelabs
        // {
        //      'browserName': 'safari',
        // },
        // {
        //     browserName: 'chrome',
        //     chromeOptions: {
        //         mobileEmulation: {
        //             deviceName: 'Galaxy S5'
        //         }
        //     }
        // },
        // {
        //     browserName: 'chrome',
        //     chromeOptions: {
        //         mobileEmulation: {
        //             deviceName: 'Galaxy S5'
        //         }
        //     }
        // },
        // {
        //     browserName: 'chrome',
        //     chromeOptions: {
        //         mobileEmulation: {
        //             deviceName: 'iPhone X'
        //         }
        //     }
        // },
        // {
        //     browserName: 'chrome',
        //     chromeOptions: {
        //         mobileEmulation: {
        //             deviceName: 'iPad Pro'
        //         }
        //     }
        // },
    ],

    maxSessions: 8,


    specs: [
        //  'tests/e2e/Specs/Dashboard/dashboard_main.spec.js',
        'tests/e2e/Specs/Dashboard/dashboard_calendar.spec.js',
        //  'tests/e2e/Specs/Dashboard/dashboard_tasks.spec.js',
        //  'tests/e2e/Specs/Dashboard/dashboard_docs.spec.js',
        //  'tests/e2e/Specs/Dashboard/dashboard_notes.spec.js',
        //  'tests/e2e/Specs/Communications/comm_conversations.spec.js',
        //  'tests/e2e/Specs/Dashboard/enterpriseorg.spec.js',
    ],
    // suites: {
    //     Dashboard: 'tests/e2e/Specs/Dashboard/*.spec.js',
    //     Communications:'tests/e2e/Specs/Communications/*.spec.js',
    // },

    useAllAngular2AppRoots: true,

    //For Desktop and Emulators
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',

    //For Android Device
    //seleniumAddress: 'http://localhost:4723/wd/hub',


    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: false
    },

    // onComplete: () => {

    //     // console.log("Zipping");

    //     // const exec = require('child_process').exec;

    //     // // //Run the zipper for reporting
    //     // exec('node C:/Users/vbadugu/Desktop/Protractor/js/zipper.js', (err, stdout, stderr) => {
    //     //     if (err) {
    //     //         console.error(err);
    //     //         return;
    //     //     }

    //     //     console.log(stdout);
    //     // });

    //     // console.log("Shooting Email!!");

    //     // const exec = require('child_process').exec;

    //     // // // //Run the zipper for reporting
    //     // // exec('node C:/Users/vbadugu/Desktop/Protractor/js/zipper.js', (err, stdout, stderr) => {
    //     // //     if (err) {
    //     // //         console.error(err);
    //     // //         return;
    //     // //     }

    //     // //     console.log(stdout);
    //     // // });

    //     // //Run the mailer Job from Mailgun
    //     // exec('node C:/Users/vbadugu/Desktop/Protractor/js/mail.js', (err, stdout, stderr) => {
    //     //     if (err) {
    //     //         console.error(err);
    //     //         return;
    //     //     }
    //     //     console.log(stdout);
    //     // });

    // },

};