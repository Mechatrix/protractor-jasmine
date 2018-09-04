var logindata = require('../../Test Data/TD.json');
var until = protractor.ExpectedConditions;
// A Protracterized httpGet() promise
function httpGet(siteUrl) {
    var http = require('http');
    var defer = protractor.promise.defer();
    http.get(siteUrl, function (response) {
        var bodyString = '';
        response.setEncoding('utf8');
        response.on("data", function (chunk) {
            bodyString += chunk;
        });
        response.on('end', function () {
            defer.fulfill({
                statusCode: response.statusCode,
                bodyString: bodyString
            });
        });
    }).on('error', function (e) {
        defer.reject("Got http.get error: " + e.message);
    });
    return defer.promise;
}
var LoginPageObject = function () {
    this.get = function () {
        browser.get(browser.params.baseUrl);
    };
    this.raulViewLink = element(by.css('[href="/pw/index.html#/dashboard"]'));
    this.clickraul = function () {
        this.raulViewLink.click();
    }
    this.email = element(by.id('loginEmail'));
    this.setEmail = function (value) {
        this.email.clear();
        this.email.sendKeys(value);
    };
    this.shouldHaveEmail = function (value) {
        expect(this.email.getAttribute('value')).toEqual(value);
    };
    this.emailShouldBeVisible = function () {
        expect(this.email.isDisplayed()).toBeTruthy();
    };
    this.emailShouldNotBeVisible = function () {
        expect(this.email.isDisplayed()).toBeFalsy();
    };
    this.emailShouldBeEnabled = function () {
        expect(this.email.isEnabled()).toBeTruthy();
    };
    this.emailShouldNotBeEnabled = function () {
        expect(this.email.isEnabled()).toBeFalsy();
    };
    this.password = element(by.name('password'));
    this.setPassword = function (value) {
        this.password.clear();
        this.password.sendKeys(value);
    };
    this.shouldHavePassword = function (value) {
        expect(this.password.getAttribute('value')).toEqual(value);
    };
    this.passwordShouldBeVisible = function () {
        expect(this.password.isDisplayed()).toBeTruthy();
    };
    this.passwordShouldNotBeVisible = function () {
        expect(this.password.isDisplayed()).toBeFalsy();
    };
    this.passwordShouldBeEnabled = function () {
        expect(this.password.isEnabled()).toBeTruthy();
    };
    this.passwordShouldNotBeEnabled = function () {
        expect(this.password.isEnabled()).toBeFalsy();
    };
    this.signMeInButton = element(by.buttonText('Sign Me In'));
    this.clickSignMeInButton = function () {
        this.signMeInButton.click();
    };
    this.Login = function (UserName, Password) {
        isAngularSite(false);
        browser.get(browser.baseUrl);
        // httpGet(browser.baseUrl).then(function (result) {
        //     expect(result.statusCode).toBe(200);
        //     expect(result.bodyString).toContain('Apache');
        // });
        //clears out cookies, session/local storage.
        browser.executeScript('window.localStorage.clear();');
        browser.executeScript('window.sessionStorage.clear();');
        browser.driver.manage().deleteAllCookies();
        this.setEmail(UserName);
        this.setPassword(Password);
        this.clickSignMeInButton(); // Just use the plain old webdriver here, it won't complain if Angular isn't loaded yet.
        browser.sleep(2000);
        //calendarpage.waitUntilReady(calendarpage.raulViewLink);
        this.clickraul();
        //Get current URL
        browser.getCurrentUrl().then(function (url) {
            //console.log(url);
        });
        //wait until page completely  loaded
        browser.wait(until.urlContains("/pw/index.html#/dashboard"), 25000);
        isAngularSite(true);
    };
    this.signMeInButtonShouldBeVisible = function () {
        expect(this.signMeInButton.isDisplayed()).toBeTruthy();
    };
    this.signMeInButtonShouldNotBeVisible = function () {
        expect(this.signMeInButton.isDisplayed()).toBeFalsy();
    };
    this.signMeInButtonShouldHaveClass = function (className) {
        this.signMeInButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.signMeInButtonShouldNotHaveClass = function (className) {
        this.signMeInButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
};
module.exports = new LoginPageObject();