// conf.js
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
//var EnvParams = require('../Protractor/tests/e2e/Environment/Env.json')
var HtmlReporter = require('protractor-beautiful-reporter');
var jasmineReporters = require('jasmine-reporters');
var path = require('path');
var fs = require('fs');
var zipper = require("zip-local");
var mkdirp = require('mkdirp');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var retry = require('protractor-retry').retry;
var q = require('q');
//If user wants to change the Environment please change it Environment Parametr after EnvParams
var Environment = '';
var htmlScreenshotReporter = new HtmlScreenshotReporter({
    // dest: 'reports/ScreenshotReporter/protractor-jasmine2-screenshot-reporter/',
    // filename: 'Detailed-Report.html',
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
function rmDir(dirPath) {
    try {
        var files = fs.readdirSync(dirPath);
    } catch (e) {
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    fs.rmdirSync(dirPath);
};
function Archiver() {
    var date = new Date(); // Or the date you'd like converted.
    var isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    var data = isoDate.split('T');
    var archive = 'Automation-Reports-Archive/' + browser.params.Environment + '/Automation_Reports_' + data[0] + 'T' + data[1].substring(0, 5).replace(':', '.') + '.zip';
    var dir = 'Automation-Reports-Archive/' + browser.params.Environment;
    mkdirp(dir, function (err) {
        if (err) console.error(err)
        else console.log('Dir created')
    });
    console.log(archive);
    zipper.zip('Reports', function (error, zipped) {
        if (!error) {
            zipped.compress(); // compress before exporting
            var buff = zipped.memory(); // get the zipped file as a Buffer
            // or save the zipped file to disk
            zipped.save(archive, function (error) {
                if (!error) {
                    console.log("saved successfully !");
                } else {
                    console.log(error)
                }
            });
        }
    });
}
exports.config = {
    // sauceUser: 'latonyagreen',
    // sauceKey: '5c5cb6bf-9656-4327-800b-160dfb76d2df',
    //bin/sc -u latonyagreen  -k 5c5cb6bf-9656-4327-800b-160dfb76d2df
    allScriptsTimeout: 2500000,
    framework: 'jasmine2',
    //restartBrowserBetweenTests: true,
    params: {
        login: {
            Normaluser: '',
            Normalpass: '',
            Enterpriseuser: '',
            Enterprisepass: '',
        },
        Environment: '',
        Shareto: ''
    },
    baseUrl: 'test',
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
        //Clear the Folder before run to avoid overriding
        rmDir('Reports');
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
    onCleanUp: function (results) {
        retry.onCleanUp(results);
    },
    logLevel: 'WARN',
    onPrepare: function () {
        retry.onPrepare();
        browser.driver.manage().window().maximize();
        browser.driver.executeScript("document.body.style.zoom='50%';");
        browser.manage().timeouts().implicitlyWait(15000);
        var originalTimeout;
        global.env = browser.params.Environment;
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
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 2500000;
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
        browser.ignoreSynchronization = false;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            },
            summary: {
                displayDuration: false
            }
        }));
        // Add a screenshot reporter:
        jasmine.getEnv().addReporter(new HtmlReporter({
            preserveDirectory: true,
            takeScreenShotsOnlyForFailedSpecs: false,
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            baseDirectory: 'Reports',
            displayStacktrace: 'specs',
            //consolidate: true,//Check this
            //consolidateAll: true,//Check this
            docTitle: 'RAUL-Automation Test Report on:' + browser.params.Environment,
            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                // Return '<30-12-2016>/<browser>/<specname>' as path for screenshots:
                // Example: '30-12-2016/firefox/list-should work'.
                var currentDate = new Date(),
                    day = currentDate.getDate(),
                    month = currentDate.getMonth() + 1,
                    year = currentDate.getFullYear();
                var validDescriptions = descriptions.map(function (description) {
                    return description.replace('/', '@');
                });
                return path.join(
                    browser.params.Environment,
                    capabilities.get('browserName'),
                    //day + "-" + month + "-" + year,
                    validDescriptions.join('-'));
            },
            sortFunction: function sortFunction(a, b) {
                if (a.sessionId < b.sessionId) return -1;
                else if (a.sessionId > b.sessionId) return 1;
                if (a.timestamp < b.timestamp) return -1;
                else if (a.timestamp > b.timestamp) return 1;
                return 0;
            }
        }).getJasmine2Reporter());
        //For Teamcity/Jenkins related JUNIT XMLs for Allure Reporting
        // returning the promise makes protractor wait for the reporter config before executing tests
        return browser.getProcessedConfig().then(function (config) {
            // you could use other properties here if you want, such as platform and version
            var browserName = config.capabilities.browserName;
            var junitReporter = new jasmineReporters.JUnitXmlReporter({
                consolidateAll: false,
                savePath: 'testresults_dev',
                modifyReportFileName: function (generatedFileName, suite) {
                    // this will produce distinct file names for each capability,
                    // e.g. 'firefox.SuiteName' and 'chrome.SuiteName'
                    return browserName + '.' + generatedFileName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
        });
    },
    afterLaunch: function () {
        return retry.afterLaunch(2);
    },
    //Close the report after all tests finish
    afterLaunch: function () {
        //Archiver is an async type code ,it must return a promise before the program exits
        return q.fcall(function () {
            Archiver();
        }).delay(1000);
        //Broswerstack
        // return new Promise(function (resolve, reject) {
        //     exports.bs_local.stop(resolve);
        // });
        // return new Promise(function (resolve) {
        //     htmlScreenshotReporter.afterLaunch(resolve.bind(this, exitCode));
        // });
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
    seleniumArgs: ['-Dwebdriver.edge.driver=../node_modules/webdriver-manager/selenium/MicrosoftWebDriver.exe'],
    multiCapabilities: [
        {
            browserName: 'chrome',
            platform: "OS X 10.13",
            // chromeOptions: {
            //     args: ['--user-data-dir=C:/Users/vbadugu/Desktop/Protractor/user-profile']
            // }
            // chromeOptions: {
            //     args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
            //   }
            shardTestFiles: true,
            directConnect: true,
        },
        // {
        //     browserName: 'MicrosoftEdge',
        //     shardTestFiles: true
        // },
        // {
        //     browserName: 'firefox',
        //     //marionette: true,
        //     'setAcceptUntrustedCertificates': true,
        //     'setAssumeUntrustedCertificateIssuer': false,
        //     'acceptInsecureCerts': true,
        //     directConnect: true,
        //     // loggingPrefs: {
        //     //     'driver': 'OFF',
        //     //     'server': 'OFF',
        //     //     'browser': 'OFF'
        //     // },
        //     shardTestFiles: true
        // },
        // {
        //     browserName: 'internet explorer',
        //     version: 11,
        //     nativeEvents: false,
        //     unexpectedAlertBehaviour: 'accept',
        //     ignoreProtectedModeSettings: true,
        //     enablePersistentHover: true,
        //     'disable-popup-blocking': true,
        //     ignoreZoomSetting:true
        // },
        //This should be executed through Saucelabs
        // {
        //      browserName: 'safari',
        //      shardTestFiles: true
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
        //     },
        //     shardTestFiles:true
        // },
        // {
        //     browserName: 'chrome',
        //     chromeOptions: {
        //         mobileEmulation: {
        //             deviceName: 'iPad Pro'
        //         }
        //     },
        //     shardTestFiles:true
        //  },
        //This is for Physical Device using Appium
        // {
        //     browserName: 'chrome',
        //     platformName: 'Android',
        //     platformVersion: '6.0',
        //     deviceName: 'Android Emulator',
        //     clearSystemFiles: true
        // },
        //  {
        //     browserName: 'chrome',
        //     platformName: 'Android',
        //     platformVersion: '8.1.0',
        //     deviceName: 'Android Emulator',
        //   },
        //   {
        //     browserName: 'safari',
        //     platformName: 'iOS',
        //     platformVersion: '7.1',
        //     deviceName: 'iPhone Simulator',
        //   },
        // {
        //     browserName: 'safari',
        //     platformName: 'iOS',
        //     platformVersion: '7.1',
        //     deviceName: 'IPad Simulator',
        // },
    ],
    specs: [
          'tests/e2e/Specs/Dashboard/dashboard_main.spec.js',
        //  'tests/e2e/Specs/Dashboard/dashboard_calendar.spec.js',
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
    maxSessions: 8,
    useAllAngular2AppRoots: true,
    //For Desktop and Emulators
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //For Edge
    //seleniumAddress: 'http://localhost:17556/wd/hub',
    //seleniumAddress: 'http://ondemand.saucelabs.com:80/wd/hub',
    //For Android Device
    //seleniumAddress: 'http://localhost:4723/wd/hub',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 2500000,
        isVerbose: true,
        includeStackTrace: true
    },
    // onComplete: () => {
    //     var date = new Date(); // Or the date you'd like converted.
    //     var isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    //     var data = isoDate.split('T');
    //     var archive = 'Automation-Reports-Archive/' + browser.params.Environment + '/Automation_Reports_' + data[0] + 'T' + data[1].substring(0, 5).replace(':', '.') + '.zip';
    //     var dir = 'Automation-Reports-Archive/' + browser.params.Environment
    //     mkdirp(dir, function (err) {
    //         if (err) console.error(err)
    //         else console.log('Dir created')
    //     });
    //     console.log(archive)
    //     zipper.zip('Reports', function (error, zipped) {
    //         if (!error) {
    //             zipped.compress(); // compress before exporting
    //             var buff = zipped.memory(); // get the zipped file as a Buffer
    //             // or save the zipped file to disk
    //             zipped.save(archive, function (error) {
    //                 if (!error) {
    //                     console.log("saved successfully !");
    //                 } else {
    //                     console.log(error)
    //                 }
    //             });
    //         }
    //     });
    // },
};