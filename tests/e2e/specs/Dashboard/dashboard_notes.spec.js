var browser = require("protractor").protractor.browser;
var notespage = require('../../Page objects/Dashboard/dashboard_notes.po');
var loginpage = require('../../Page objects/Common/loginpage.po');
var commonlib = require('../../Page objects/Common/common.po');
var until = protractor.ExpectedConditions;
describe('PW-38487_Notes', function () {
    jasmine.getEnv().topSuite().beforeEach({
        fn: function () {
            loginpage.Login(browser.params.login.Normaluser, browser.params.login.Normalpass);
            browser.sleep(5000);
            commonlib.Navigateto('Dashboard','Notes');
            browser.wait(until.urlContains('/notes'), 10000).then(function (result) {
                expect(result).toEqual(true);
            });
        }
    });
    it('should able to Create a New Note with Mark Private Checkbox checked', function () {
        browser.waitForAngular();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
        // browser.getCapabilities().then(function (capabilities) {
        //     browserName = capabilities.get('browserName');
        //     console.log(browserName)
        //   });
        notespage.clickAddnote();
        notespage.Forminput('This is Test Subject please ignore (private checked)', 'For a specific use case I need to make sure the number of items on a table matches the API response. I read that I can use the request to make http calls and retrieve the information I need to be an authenticated user in my browser session to retrieve the information');
        browser.sleep(2000);
        notespage.checkbox.click();
        notespage.pressApply();
    });
    it('should not able to create a New Note without Subject and Body', function () {
        browser.waitForAngular();
        browser.sleep(2000);
        notespage.clickAddnote();
        browser.sleep(2000);
        notespage.pressApply();
        //Tip to check the Error messages across the Form Dialog
        element.all(by.repeater('msg in config.errorMsgs')).each(function (elem) {
            elem.getText().then(function (text) {
                console.log(text);
                var ErrorMessages = ["Subject is required", "Body is required"];
                expect(ErrorMessages).toContain(text);
            });
        });
    });
    it('should able to Create a New Note with Mark Private Checkbox Un-checked', function () {
        browser.waitForAngular();
        browser.sleep(5000);
        notespage.clickAddnote();
        notespage.Forminput('This is Test Subject please ignore (private un-checked)', 'For a specific use case I need to make sure the number of items on a table matches the API response. I read that I can use the request to make http calls and retrieve the information I need to be an authenticated user in my browser session to retrieve the information');
        //Confirm that checkbox is not selected
        expect(notespage.checkbox.isSelected()).toBe(false);
        notespage.pressApply();
    });
    it('should able to Edit and Save the Note successfully', function () {
        browser.waitForAngular();
        browser.sleep(5000);
        element.all(by.repeater("item in page.model.notes")).then(function (theElement) {
            var accordian = theElement[0];
            browser.wait(until.elementToBeClickable(accordian), 30000).then(function () {
                accordian.click();
            });
            accordian.element(by.css('[ng-click="page.editNote(item)"]')).click();
            notespage.Subject.clear().sendKeys('This is edit scenario Subject (private un-checked to checked)');
            //notespage.Forminput('This is edit scenario Subject (private un-checked to checked)', 'For a specific use case I need to make sure the number of items on a table matches the API response. I read that I can use the request to make http calls and retrieve the information I need to be an authenticated user in my browser session to retrieve the information');
            notespage.checkbox.click();
            notespage.pressApply();
            browser.sleep(2000);
        });
    });
    it('should able to Close the Left pane when clicked on Notes Form Successfully', function () {
        browser.waitForAngular();
        browser.sleep(5000);
        notespage.clickAddnote();
        browser.wait(until.elementToBeClickable(notespage.Cancelbutton), 30000).then(function () {
            notespage.pressCancel();
        });
    });
    it('should able to Expand-Collapse the Accordians Successfully', function () {
        browser.waitForAngular();
        browser.sleep(5000);
        // notespage.ExpandSwitch.click();
        notespage.clickPageModelExpandAll();
        //Since its quickone add sleep to get a screenshot
        browser.sleep(1000);
    });
    it('should able to Sort by-Newest Date and Sort by-title the Accordians Successfully', function () {
        browser.waitForAngular();
        browser.sleep(5000);
        notespage.SelectDropdown();
        browser.sleep(1000);
    });
    it('should able to delete the Note successfully', function () {
        browser.waitForAngular();
        var elem1 = element(by.css('[ng-click="page.deleteNote(item)"]'));
         element.all(by.repeater('item in page.model.notes')).count().then(function(count){
            console.log(count);
            var elem = element(by.repeater('item in page.model.notes'));
            for (var a = 0; a < count; a++) {
                elem.getCssValue('display').then(function (val) {
                    if (val != 'none' && elem.isDisplayed()) {
                        expect(elem.getCssValue('display')).not.toEqual('none');
                        expect(elem.isDisplayed()).toBe(true);
                        elem1.click();
                        browser.sleep(3000);
                        notespage.Submit();
                        browser.sleep(3000);
                    }
                });
            }
        });
        // element.all(by.repeater('item in page.model.notes')).each(function (posts, index) {
        //     posts.getText().then(function (text) {
        //         //console.log(text);
        //         if (text.indexOf(SubjectVal) > -1) {
        //             var accordian = element.all(by.repeater('item in page.model.notes')).get(index);
        //             browser.wait(function () {
        //                 return accordian.isPresent();
        //             }, 50000);
        //             accordian.click();
        //             accordian.element(by.css('[ng-click="page.deleteNote(item)"]')).click();
        //             browser.sleep(1000);
        //             notespage.Submit();
        //             //notespage.alertSubmit();
        //         }
        //     })
        // });
    });
});