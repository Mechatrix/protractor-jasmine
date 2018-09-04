var browser = require("protractor").protractor.browser;
var convpage = require('../../Page objects/Communications/comm_conversations.po');
var loginpage = require('../../Page objects/Common/loginpage.po');
var commonlib = require('../../Page objects/Common/common.po');
var logindata = require('../../Test Data/TD.json');
var until = protractor.ExpectedConditions;
var dt = new Date();
var utcDate = dt.toUTCString();
describe('PW-39841_Conversations', function () {
    jasmine.getEnv().topSuite().beforeEach({
        fn: function () {
            loginpage.Login(browser.params.login.Normaluser, browser.params.login.Normalpass);
            browser.sleep(5000);
            commonlib.Navigateto('Communications', 'Conversations');
            browser.wait(until.urlContains('/conversations'), 30000).then(function (result) {
                expect(result).toEqual(true);
            });
        }
    });
    it('should able to Create a New Conversation with Tenant (Default)', function () {
        browser.sleep(15000);
        convpage.clickAddconv();
        //Default should be Tenant
        expect(element(by.id('conversationPerson')).$('option:checked').getText()).toEqual('Tenant(s)');
        convpage.Forminput('Automated script for Conversation with Tenant:' + utcDate, 'a');
        element.all(by.css('[ng-click="config.selectrealatedItem(record)"]')).get(0).click();
        convpage.pressApply();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
        commonlib.Highlight();
        browser.ignoreSynchronization = false;
    });
    it('should able to Create a New Conversation with Owner', function () {
        browser.sleep(15000);
        convpage.clickAddconv();
        //Select Owner
        commonlib.SelectbyText('conversationPerson', 'Owner(s)');
        //Select The Related Item Type
        commonlib.SelectbyText('relatedItemType', 'Portfolio');
        convpage.Forminput('Automated script for Conversation with Owner:' + utcDate, '*');
        element.all(by.css('[ng-click="config.selectrealatedItem(record)"]')).get(0).click();
        convpage.pressApply();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
        commonlib.Highlight();
        browser.ignoreSynchronization = false;
    });
    it('should able to Create a New Conversation with My Management Team', function () {
        browser.sleep(15000);
        convpage.clickAddconv();
        //Select My Managment team
        commonlib.SelectbyText('conversationPerson', 'My Management Team');
        convpage.Forminput('Automated script for Conversation with Owner:' + utcDate, 'a');
        element.all(by.css('[ng-click="config.selectrealatedItem(record)"]')).get(2).click();
        convpage.pressApply();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
        commonlib.Highlight();
    });
    it('should able to reply with comment to a Conversation successfully', function () {
        browser.waitForAngular();
        browser.sleep(5000);
        element.all(by.css(".rp-accordion-panel:last-child .rp-form-input-text-field")).then(function (theElement) {
            var accordian = theElement[0];
            browser.wait(until.elementToBeClickable(accordian), 30000).then(function () {
                accordian.click();
                accordian.sendKeys('Automated reply for the conversation:' + utcDate);
            });
            element.all(by.css('.discussions-reply-btn')).get(0).click();
        });
    });
    it('should not able to reply without comment ', function () {
        browser.waitForAngular();
        browser.sleep(5000);
        var err = element(by.css('.rp-notification-msg'));
        element.all(by.css(".rp-accordion-panel:last-child .rp-form-input-text-field")).then(function (theElement) {
            var accordian = theElement[0];
            browser.wait(until.elementToBeClickable(accordian), 30000).then(function () {
                accordian.click();
            });
            element.all(by.css('.discussions-reply-btn')).get(0).click();
            expect(err.isDisplayed()).toBe(true);
            expect(err.getText()).toContain('Please fill comment field');
        });
    });
    it('should able to Expand-Collapse the Accordians Successfully', function () {
        browser.waitForAngular();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
        commonlib.ExpandCollapse();
        //Since its quickone add sleep to get a screenshot
        browser.sleep(2000);
    });
    it('should able to filter by Owner,Tenant,Management Team the Accordians Successfully', function () {
        browser.waitForAngular();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
        //Filter by Owner Conversations
        element(by.xpath('//select[@id="selectSortBy"]/option[text()="Owner Conversations"]')).click();
        browser.sleep(2000);
        element.all(by.repeater('item in page.model.discussions track by $index')).each(function (elem, index) {
            elem.getText().then(function (text) {
                console.log(text);
                expect(text).toContain('(Owner)');
            });
        });
        //Filter by Tenant Conversations
        element(by.xpath('//select[@id="selectSortBy"]/option[text()="Tenant Conversations"]')).click();
        browser.sleep(2000);
        element.all(by.repeater('item in page.model.discussions track by $index')).each(function (elem, index) {
            elem.getText().then(function (text) {
                console.log(text);
                expect(text).toContain('(Tenant)');
            });
        });
        //Filter by My Management Team Conversations
        element(by.xpath('//select[@id="selectSortBy"]/option[text()="My Management Team"]')).click();
        browser.sleep(2000);
        element.all(by.repeater('item in page.model.discussions track by $index')).each(function (elem, index) {
            elem.getText().then(function (text) {
                console.log(text);
                expect(text).toContain('(Management Team)');
            });
        });
    });
    it('should able to delete the "reply comments" for Conversations', function () {
        browser.waitForAngular();
        browser.sleep(5000);
        element(by.repeater("item in page.model.discussions track by $index").row(0)).all(by.repeater('repliedComment in item.comments track by $index')).count().then(function (count) {
            console.log(count);
            var elem = element(by.css('.discussions-deleteComment'));
            for (var a = 0; a < count; a++) {
                elem.getCssValue('display').then(function (val) {
                    if (val != 'none' && elem.isDisplayed()) {
                        expect(elem.getCssValue('display')).not.toEqual('none');
                        expect(elem.isDisplayed()).toBe(true);
                        elem.click();
                        convpage.Submit();
                        browser.sleep(3000);
                    }
                });
            }
        });
    });
    it('should able to delete the Conversations created', function () {
        browser.waitForAngular();
        browser.sleep(5000);
        element.all(by.repeater('item in page.model.discussions track by $index')).count().then(function (count) {
            console.log(count);
            var elem = element(by.css('[ng-click="page.deleteDiscussion(item);$event.stopPropagation();"]'));
            for (var a = 0; a < count; a++) {
                elem.getCssValue('display').then(function (val) {
                    if (val != 'none' && elem.isDisplayed()) {
                        expect(elem.getCssValue('display')).not.toEqual('none');
                        expect(elem.isDisplayed()).toBe(true);
                        elem.click();
                        convpage.Submit();
                        browser.sleep(3000);
                    }
                });
            }
        });
    });
});