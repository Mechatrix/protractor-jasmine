var browser = require("protractor").protractor.browser;
var loginpage = require('../../Page objects/Common/loginpage.po')
var commonlib = require('../../Page objects/Common/common.po');
var mainpage = require('../../Page objects/Dashboard/dashboard_main.po');
var until = protractor.ExpectedConditions;
describe('PW-38429_Main', function () {
    jasmine.getEnv().topSuite().beforeEach({
        fn: function () {
            loginpage.Login(browser.params.login.Normaluser, browser.params.login.Normalpass);
            browser.sleep(5000);
            commonlib.CheckUrlContains('/dashboard');
        }
    });
    it('should able to switch to Legacy view from RAUL', function () {
        //check
        mainpage.SwitchtoLegacy();
        //element(by.xpath('//div[@rp-model="$ctrl.model.appView"]')).click();
        isAngularSite(false);
        expect(browser.getCurrentUrl()).toContain('pw/home/home.do');
        //check back RAUL
        loginpage.clickraul();
        isAngularSite(true);
    });
    fit('should able to Create a Dashboard', function () {
        commonlib.CreateDashboard('New Dashboard');
    });
    it('should able to Edit a Dashboard', function () {
        commonlib.EditDashboard('Edit Dashboard');
    });
    it('should not able create a Dashboard without required fields', function () {
        commonlib.WithoutreqFields();
    });
    it('should able to Delete Dashboard', function () {
        commonlib.DeleteDashboard('Automated');
    });
    it('should able to Create a Dashlet of Chart type Area', function () {
        commonlib.WaitForPageLoad();
        //Refer the PO for complete Objects
        commonlib.CreateDashlet('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Basic Charts',
            'Area', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary', 'Total Bill Amount');
    });
    it('should able to Create a Dashlet of Chart type Bar', function () {
        commonlib.WaitForPageLoad();
        //Refer the PO for complete Objects
        commonlib.CreateDashlet('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Basic Charts',
            'Bar', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary', 'Total Bill Amount');
    });
    fit('should able to Create a Dashlet of Chart type Doughnut', function () {
        commonlib.WaitForPageLoad();

        //Refer the PO for complete Objects --changed to 1
        commonlib.CreateDashlet('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Basic Charts',
            'Doughnut', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary1', 'Total Bill Amount');
    });
    it('should able to Create a Dashlet of Chart type Line', function () {
        commonlib.WaitForPageLoad();

        //Refer the PO for complete Objects
        commonlib.CreateDashlet('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Basic Charts',
            'Line', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary', 'Total Bill Amount');
    });
    it('should able to Create a Dashlet of Chart type Column', function () {
        commonlib.WaitForPageLoad();

        //Refer the PO for complete Objects
        commonlib.CreateDashlet('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Basic Charts',
            'Column', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary', 'Total Bill Amount');
    });
    it('should able to Create a Dashlet of Chart type Pie', function () {
        commonlib.WaitForPageLoad();

        //Refer the PO for complete Objects
        commonlib.CreateDashlet('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Basic Charts',
            'Pie', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary', 'Total Bill Amount');
    });
    it('should able to Create a Dashlet of Chart type Mini-Table', function () {
        commonlib.WaitForPageLoad();
        switch (env) {
            case 'PROD':
            case 'OCR':
            commonlib.CreateDashletMintable('Finance Reports', 'Money Out - Bills', 'Basic Charts', 'Mini-Table');
                break;
            case 'SAT':
            case 'SIT':
            commonlib.CreateDashletMintable('Finance Reports', 'Money Out - Bill Payments', 'Basic Charts', 'Mini-Table');
                break;
        }
    });
    it('should able to Create a Dashlet of Chart type GroupedBar', function () {
        commonlib.WaitForPageLoad();

        //Refer the PO for complete Objects
        commonlib.CreateDashletGroupBy('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Group By Charts',
            'Grouped Bar', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary', 'Total Bill Amount', 'Bill Summary', 'Vendor Type');
    });
    it('should able to Create a Dashlet of Chart type GroupedArea', function () {
        commonlib.WaitForPageLoad();

        //Refer the PO for complete Objects
        commonlib.CreateDashletGroupBy('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Group By Charts',
            'Grouped Area', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary', 'Total Bill Amount', 'Bill Summary', 'Vendor Type');
    });
    it('should able to Create a Dashlet of Chart type GroupedColumn', function () {
        commonlib.WaitForPageLoad();
        //Refer the PO for complete Objects
        commonlib.CreateDashletGroupBy('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Group By Charts',
            'Grouped Column', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary', 'Total Bill Amount', 'Bill Summary', 'Vendor Type');
    });
    it('should able to Create a Dashlet of Chart type GroupedLine', function () {
        commonlib.WaitForPageLoad();

        //Refer the PO for complete Objects
        commonlib.CreateDashletGroupBy('Finance Reports', 'Accts. Payable- Unpaid Bills', 'Group By Charts',
            'Grouped Line', 'Bill Summary', 'Vendor Name', 'Sum', 'Bill Summary', 'Total Bill Amount', 'Bill Summary', 'Vendor Type');
    });
    it('should able to Edit Dashlet', function () {
        commonlib.EditDashlet();
    });
    //Hold for the MINIMIZE AND Go To Report
    it('should able to Expand/Minimize and Go To report Dashlet', function () {
        commonlib.WaitForPageLoad();
        // element(by.css('.rp-dropdown-label')).click();
        // browser.sleep(5000);
        // element(by.cssContainingText('.rp-dropdown-link', 'Manage Dashboard')).click();
        // browser.wait(until.invisibilityOf(element(by.id('edit-widget-dashboard-aside'))), 10000);
        element.all(by.css('.rp-actions-menu')).get(0).click();
        mainpage.actionsmenu('Expand / Minimize');
        //element(by.cssContainingText('.rp-actions-menu-item', 'Expand / Minimize')).click();
        // var boxmax = element(by.css('.dashboard-graphs-height-expand'));
        // //After Maximize
        // // boxmax.getSize().then(function(eleSize){
        // //     console.log('element size: '+eleSize.width);
        // //     expect(eleSize.width).toEqual(701);
        // // });
        //Go to Report
        element.all(by.css('.rp-actions-menu')).get(0).click();
        mainpage.actionsmenu('Go to Report');
        isAngularSite(false);
        commonlib.CheckUrlContains('/reporting');
    });
    it('should able to Delete Dashlets(Dashboard Cleanup)', function () {
        commonlib.WaitForPageLoad();
        commonlib.SelectActions();
        element.all(by.repeater('item in page.model.dashboardDashlets')).count().then(function (count) {
            console.log(count);
            var elem = element(by.css('.rp-actions-menu'));
            var elem1 = element(by.cssContainingText('.rp-actions-menu-item', 'Delete'));
            for (var a = 0; a < count; a++) {
                elem.getCssValue('display').then(function (val) {
                    if (val != 'none' && elem.isDisplayed()) {
                        expect(elem.getCssValue('display')).not.toEqual('none');
                        expect(elem.isDisplayed()).toBe(true);
                        elem.click();
                        browser.sleep(5000);
                        elem1.click();
                        commonlib.Submit();
                        browser.wait(until.presenceOf(element(by.id('selectActions'))), 10000);
                        browser.sleep(10000);
                    }
                });
            }
        });
    });
});