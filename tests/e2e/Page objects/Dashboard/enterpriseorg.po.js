var commonlib = require('../../Page objects/Common/common.po');
var until = protractor.ExpectedConditions;
var dt = new Date();
var utcDate = dt.toUTCString();
var mainPageObject = function () {
    this.get = function () {
        browser.get('');
    };
    //Click on Hamburger menu and select the menu item respectively
    this.ToggleMenu = element(by.css('[ng-click="$ctrl.toggleMenu()"]'));
    this.clickToggleMenu = function () {
        this.ToggleMenu.click();
    }
    function highlightElement(el) {
        console.log("highlight--");
        console.log("locator---:" + el.locator());
        return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);", el.getWebElement(), "color: Red; border: 2px solid red;").
        then(function (resp) {
            browser.sleep(2000);
            return el;
        }, function (err) {
            console.log("error is :" + err);
        });
    };
    this.Highlight = function (text) {
        highlightElement(element(by.cssContainingText('.dashboard-graphs-margin', text)));
    }
    this.NavigateTo = function (linktext) {
        element(by.cssContainingText('.rp-gn-menu-item-label.link', linktext)).click();
    }
    this.pageModelDashboardName = element(by.exactBinding('page.model.dashboardName'));
    this.pageModelDashboardNameShouldHaveText = function (value) {
        expect(this.pageModelDashboardName.getText()).toBe(value);
    };
    this.pageModelDashboardNameShouldHaveClass = function (className) {
        this.pageModelDashboardName.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageModelDashboardNameShouldNotHaveClass = function (className) {
        this.pageModelDashboardName.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageModelDashboardDescription = element(by.exactBinding('page.model.dashboardDescription'));
    this.pageModelDashboardDescriptionShouldHaveText = function (value) {
        expect(this.pageModelDashboardDescription.getText()).toBe(value);
    };
    this.pageModelDashboardDescriptionShouldHaveClass = function (className) {
        this.pageModelDashboardDescription.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageModelDashboardDescriptionShouldNotHaveClass = function (className) {
        this.pageModelDashboardDescription.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageModelDashboardDashlets = element.all(by.exactRepeater('item in page.model.dashboardDashlets'));
    this.pageModelDashboardDashletsCountShouldBe = function (count) {
        expect(this.pageModelDashboardDashlets.count()).toBe(count);
    };
    this.itemTitleShouldHaveText = function (rowIndex1, value) {
        expect(this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactBinding('item.title')).getText()).toBe(value);
    };
    this.itemTitleShouldHaveClass = function (rowIndex1, className) {
        this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactBinding('item.title')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.itemTitleShouldNotHaveClass = function (rowIndex1, className) {
        this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactBinding('item.title')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.itemDescriptionShouldHaveText = function (rowIndex1, value) {
        expect(this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactBinding('item.description')).getText()).toBe(value);
    };
    this.itemDescriptionShouldHaveClass = function (rowIndex1, className) {
        this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactBinding('item.description')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.itemDescriptionShouldNotHaveClass = function (rowIndex1, className) {
        this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactBinding('item.description')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.itemTotalsDisplayUnitsCountShouldBe = function (rowIndex1, count) {
        expect(this.pageModelDashboardDashlets.get(rowIndex1).all(by.exactRepeater('totals in item.totalsDisplay.units')).count()).toBe(count);
    };
    this.totalsTitleShouldHaveText = function (rowIndex1, rowIndex2, value) {
        expect(this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactRepeater('totals in item.totalsDisplay.units').row(rowIndex2)).element(by.exactBinding('totals.title')).getText()).toBe(value);
    };
    this.totalsTitleShouldHaveClass = function (rowIndex1, rowIndex2, className) {
        this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactRepeater('totals in item.totalsDisplay.units').row(rowIndex2)).element(by.exactBinding('totals.title')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.totalsTitleShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
        this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactRepeater('totals in item.totalsDisplay.units').row(rowIndex2)).element(by.exactBinding('totals.title')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.totalsTextShouldHaveText = function (rowIndex1, rowIndex2, value) {
        expect(this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactRepeater('totals in item.totalsDisplay.units').row(rowIndex2)).element(by.exactBinding('totals.text')).getText()).toBe(value);
    };
    this.totalsTextShouldHaveClass = function (rowIndex1, rowIndex2, className) {
        this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactRepeater('totals in item.totalsDisplay.units').row(rowIndex2)).element(by.exactBinding('totals.text')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.totalsTextShouldNotHaveClass = function (rowIndex1, rowIndex2, className) {
        this.pageModelDashboardDashlets.get(rowIndex1).element(by.exactRepeater('totals in item.totalsDisplay.units').row(rowIndex2)).element(by.exactBinding('totals.text')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
};
module.exports = new mainPageObject();