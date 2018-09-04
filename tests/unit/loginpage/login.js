//Budgeting Avg Exp Graph-.js
'use strict';

// 'TODO- Budgeting page navigation 

describe('Protractor Demo', function () {
    var originalTimeout;

    const EC = protractor.ExpectedConditions;
    
    browser.get('/ui/signin');
    
    browser.debugger();

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
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //Test case #1
    it('should successfully LOGIN and SELECT A PROPERTY -Fair (Eg.,)', function () {
        var email = element(by.model('login.user.username'));
        var password = element(by.model('login.user.password'));
        email.sendKeys('ia');
        password.sendKeys('ia1');
        element(by.css('.btn')).click().then(function () {

            browser.wait(EC.urlContains('ui/lrc'), 5000).then(function (result) {
                expect(result).toEqual(true);

            });
        });

        browser.waitForAngularEnabled(false);

        var prpname = element(by.css('.property-name'));

        prpname.getText().then(function (valofprop) {

            if (valofprop == 'All My Properties') {

                console.log('present');

                $('[ng-click="context.togglePicker()"]').click();
                console.log("Clicked bro");

                //browser.waitForAngularEnabled(true);

                browser.waitForAngular();

                var Property = element(by.model('propertyList.model.filter.name'));
                browser.wait(EC.visibilityOf(Property), 5000);
                //Property.click();
                Property.sendKeys('Fair');

                browser.waitForAngularEnabled(false);

                //browser.pause();

                $('[ng-click="propertyList.selectProperty(property)"]').click();
                console.log("Selected bro for Fair poperty");

            } else {

                console.log('not present');

                $('[ng-click="context.togglePicker()"]').click();
                console.log("Clicked bro");

                browser.waitForAngularEnabled(false);

                $('[ng-click="pgs.selectGroup(group)"]').click();
                console.log("Selected bro for All property");
            }


        });

    });

    it('should navigate to BUDGETING Page successfully', function () {

        element(by.css('.rp-global-nav-toggle')).click();

        element(by.cssContainingText('.rp-global-nav-menu-item-label-text', 'Budgeting')).click();
              
    });


    it('should navigate to BUDGETING Page and verify product Name', function () {

       var prdctName = element(by.className('product-name'))

        prdctName.getText().then(function (text) {
            console.log(text);
        });


    });
      

    it('should signout successfully', function () {

        element(by.css('.rp-gh-user-name')).click();

        $('[ng-click="model.userLinks.invoke(link)"]').click();

    });

});


