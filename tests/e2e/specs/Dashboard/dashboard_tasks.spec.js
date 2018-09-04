var browser = require("protractor").protractor.browser;
var taskspage = require('../../Page objects/Dashboard/dashboard_tasks.po');
var loginpage = require('../../Page objects/Common/loginpage.po')
var commonlib = require('../../Page objects/Common/common.po');
var logindata = require('../../Test Data/TD.json');
var until = protractor.ExpectedConditions;
var desiredoption;
function perfActions(Actionitem) {
    element.all(by.css('.rp-actions-menu')).get(0).click();
    browser.sleep(2000);
    element.all(by.cssContainingText('.rp-actions-menu-item', Actionitem)).get(0).click();
}
describe('PW-38488_Tasks', function () {
    jasmine.getEnv().topSuite().beforeEach({
        fn: function () {
            loginpage.Login(browser.params.login.Normaluser, browser.params.login.Normalpass);
            browser.sleep(5000);
            commonlib.Navigateto('Dashboard', 'Tasks');
            browser.wait(until.urlContains('/tasks'), 10000).then(function (result) {
                expect(result).toEqual(true);
            });
        }
    });
    it('should display My Tasks,Undelegated,Delegated menus on Tasks Page', function () {
        browser.waitForAngular();
        var tab_arr = ['My Tasks', 'Undelegated', 'Delegated'];
        element.all(by.repeater('tab in $ctrl.model.data')).each(function (elem) {
            elem.getText().then(function (text) {
                //console.log(text)
                //  if (tab_arr.indexOf(text) > -1) {
                //    console.log("Test Passed")
                //  }
                expect(tab_arr).toContain(text);
            });
        });
    });
    it('should able to Add a Task Delegated to Logged in User', function () {
        browser.waitForAngular();
        taskspage.clickaddTask();
        browser.sleep(1000);
        taskspage.SendTaskDesc("Task created through Automated Script");
        taskspage.Pickdate();
        var input = element(by.xpath("//*[@id='edit-dashboard-task-aside']/form/div[2]/div/div[4]/div[2]/div/div/input"));
        switch (env) {
            case 'PROD':
            case 'OCR':
            input.sendKeys("G");
                break;
            case 'SAT':
            case 'SIT':
            input.sendKeys("j");
                break;
        }
        //Dropdown select
        desiredoption = element.all(by.repeater('delegate in $select.items')).get(0);
        browser.wait(until.visibilityOf(desiredoption), 5000);
        desiredoption.click();
        browser.sleep(2000);
        taskspage.pressApply();
        browser.sleep(2000);
    });
    it('should able to Add a New Task (Undelegate) under Tasks Page', function () {
        browser.waitForAngular();
        taskspage.clickaddTask();
        browser.sleep(1000);
        taskspage.SendTaskDesc("Task created through Automated Script");
        taskspage.Pickdate();
        taskspage.pressApply();
        browser.sleep(3000);
    });
    it('should able to Add New Task (Delegate) under Tasks Page', function () {
        browser.waitForAngular();
        taskspage.clickaddTask();
        browser.sleep(1000);
        taskspage.SendTaskDesc("Task created through Automated Script");
        taskspage.Pickdate();
        var input = element(by.xpath("//*[@id='edit-dashboard-task-aside']/form/div[2]/div/div[4]/div[2]/div/div/input"));
        input.sendKeys("A");
        //Dropdown select
        desiredoption = element.all(by.repeater('delegate in $select.items')).get(2);
        browser.wait(until.visibilityOf(desiredoption), 5000);
        desiredoption.click();
        browser.sleep(2000);
        taskspage.pressApply();
        browser.sleep(2000);
    });
    it('should able to Add New Task using "Load from Template" Undelegated', function () {
        browser.waitForAngular();
        taskspage.LoadfromTemplate();
        browser.sleep(2000);
        taskspage.TemplateDropdownText();
        taskspage.selectTemplate(1);
        browser.sleep(2000);
        element(by.css('[ng-click="$select.activate()"]')).click();
        //browser.pause();
        element(by.xpath("//input[@ng-model='$select.search']")).click();
        element(by.xpath("//input[@ng-model='$select.search']")).sendKeys("a");
        browser.sleep(5000);
        var dropdown = element(by.css('.ui-select-choices.dropdown-menu'));
        var dropdownItems = element.all(by.repeater("item in $group.items"));
        browser.wait(until.visibilityOf(dropdown), 5000);
        dropdownItems.get(1).click();
        taskspage.pressApply();
        browser.wait(until.invisibilityOf(element(by.css('.rp-aside-modal-right'))), 10000);
    });
    it('should able to Add New Task using "Load from Template" Delegated', function () {
        browser.waitForAngular();
        taskspage.LoadfromTemplate();
        browser.sleep(2000);
        taskspage.TemplateDropdownText();
        taskspage.selectTemplate(1);
        browser.sleep(2000);
        //Select the Attach Related Item
        element.all(by.css('[ng-click="$select.activate()"]')).get(0).click();
        //browser.pause();
        element.all(by.xpath("//input[@ng-model='$select.search']")).get(0).click();
        element.all(by.xpath("//input[@ng-model='$select.search']")).get(0).sendKeys("a");
        browser.sleep(3000);
        var dropdown = element(by.css('.ui-select-choices.dropdown-menu'));
        var dropdownItems = element.all(by.repeater("item in $group.items"));
        browser.wait(until.visibilityOf(dropdown), 5000);
        dropdownItems.get(1).click();
        //Delegate Dropdown select(Handle this loop efficiently need modifications)
        element.all(by.css('[ng-click="$select.activate()"]')).get(2).click();
        element.all(by.xpath("//input[@ng-model='$select.search']")).get(2).click();
        element.all(by.xpath("//input[@ng-model='$select.search']")).get(2).sendKeys("g");
        desiredoption = element.all(by.repeater('delegate in $select.items')).get(0);
        browser.wait(until.visibilityOf(desiredoption), 5000);
        desiredoption.click();
        element.all(by.css('[ng-click="$select.activate()"]')).get(4).click();
        element.all(by.xpath("//input[@ng-model='$select.search']")).get(4).click();
        element.all(by.xpath("//input[@ng-model='$select.search']")).get(4).sendKeys("g");
        desiredoption = element.all(by.repeater('delegate in $select.items')).get(0);
        browser.wait(until.visibilityOf(desiredoption), 5000);
        desiredoption.click();
        taskspage.pressApply();
        browser.wait(until.invisibilityOf(element(by.css('.rp-aside-modal-right'))), 5000);
        //expect(element(by.cssContainingText('.rp-notification-msg', 'Updated Tasks Successfully')).isDisplayed()).toBeTruthy();
    });
    it('should able to Filter by All,Open,Completed on Tasks Page under "My Tasks" Tab', function () {
        browser.waitForAngular();
        //Default should be Open
        expect(element(by.id('selectSortBy')).$('option:checked').getText()).toEqual('Open')
        //Verify the Dropdown elements present as expected
        taskspage.DropdownText();
        //Select 'All' option in Filter
        taskspage.dropdownselect(0);
        //Verify count
        taskspage.VerifyCount();
        //Verify 'Delegated To' is matched to User Login
        element(by.css(".rp-gh-user-name")).getText().then(function (userinfo) {
            console.log(userinfo)
            //Table Scraping
            var grid = $$('.rp-grid-body-wrap tr');
            grid.each(function (row) {
                var rowElems = row.$$('td');
                //expect(rowElems.count()).toBe(11);
                expect(rowElems.get(4).getText()).toMatch(userinfo);
            });
        });
        //Select 'Completed' Option in Filter
        taskspage.dropdownselect(2);
        taskspage.VerifyCount();
        //Verify the Column with Completed is checked for all rows
        var Checkboxselect = element.all(by.css('record.completed'));
        Checkboxselect.filter(function (eachCell) {
            return eachCell.Checkboxselect.isEnabled().then(function (selected) {
                return selected;
            });
        }).count().then(function (count) {
            console.log(count); //returns count of elements that are checked
        });
    });
    it('should not allow to Create New Task without Mandatory fields Delegated', function () {
        browser.waitForAngular();
        taskspage.clickaddTask();
        browser.sleep(1000);
        taskspage.pressApply();
        commonlib.ErrorMessage("Task Description is required");
    });
    it('should not allow to Create New Task from Load from template without Mandatory fields', function () {
        browser.waitForAngular();
        taskspage.LoadfromTemplate();
        browser.sleep(2000);
        taskspage.pressApply();
        commonlib.ErrorMessage("Related Item is required");
    });
    it('should able to edit the Tasks under My Tasks', function () {
        //My Tasks
        var Actionmenu = element(by.css('[class*=rp-grid-body]'));
        browser.wait(until.visibilityOf(Actionmenu), 10000);
        element.all(by.css('.rp-actions-menu')).get(0).click();
        element.all(by.cssContainingText('.rp-actions-menu-item', 'Edit')).get(0).click();
        taskspage.SendTaskDesc("Modified Description for My Tasks");
        taskspage.checkbox.click();
        taskspage.pressApply();
        browser.wait(until.invisibilityOf(element(by.css('.rp-aside-modal-right'))), 5000);
        //expect(element(by.cssContainingText('.rp-notification-msg', 'Updated Tasks Successfully')).isDisplayed()).toBeTruthy();
    });
    it('should able to edit the Tasks under Undelegated', function () {
        ////Undelegated Edit
        taskspage.ScrollTab('Undelegated');
        perfActions('Edit');
        browser.sleep(2000);
        taskspage.SendTaskDesc("Modified Description for Undelegated");
        taskspage.checkbox.click();
        taskspage.pressApply();
    });
    it('should able to edit the Tasks under Delegated', function () {
        //Delegated Edit
        taskspage.ScrollTab('Delegated');
        perfActions('Edit');
        browser.sleep(2000);
        taskspage.SendTaskDesc("Modified Description for Delegated");
        taskspage.checkbox.click();
        taskspage.pressApply();
    });
    it('should able to Add a comment  for a Task under My Tasks,Delegated,Undelegated', function () {
        ////My Tasks
        taskspage.comments();
        //browser.pause();
        element(by.id("new comment")).sendKeys("Comments from My Tasks Tab");
        element.all(by.css('[ng-click="page.newTaskComment(page.model.newComment)"]')).click();
        element(by.css('.rp-aside-modal-close')).click();
        ////Delegated
        taskspage.ScrollTab('Delegated');
        taskspage.comments();
        //browser.pause();
        element(by.id("new comment")).sendKeys("Comments from Delegated Tab");
        element.all(by.css('[ng-click="page.newTaskComment(page.model.newComment)"]')).click();
        element(by.css('.rp-aside-modal-close')).click();
        ////Undelegated
        taskspage.ScrollTab('Undelegated');
        taskspage.comments();
        //browser.pause();
        element(by.id("new comment")).sendKeys("Comments from Undelegated Tab");
        element.all(by.css('[ng-click="page.newTaskComment(page.model.newComment)"]')).click();
        element(by.css('.rp-aside-modal-close')).click();
        function calcTime(offset) {
            // create Date object for current location
            var d = new Date();
            // convert to msec
            // subtract local time zone offset
            // get UTC time in msec
            var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            // create new Date object for different city
            // using supplied offset
            var nd = new Date(utc + (3600000 * offset));
            // return time as a string
            //return "The local time for city" + city + " is " + nd.toLocaleString();
            return nd.toLocaleString();
        }
        browser.sleep(5000);
        //Since Jhedrick time zone in LA
        //console.log(calcTime('-7'));
        var elm = element.all(by.repeater('item in page.model.taskComments'));
        elm.each(function (obj) {
            obj.getText().then(function (text) {
                //console.log(text);
                if (text.indexOf(calcTime('-7')) >= 0) {
                    console.log('Yes');
                  } else {
                    console.log('No');
                  }
                //expect(calcTime('-7')).toContain(text);
            });
        });
    });
    it('should able to Delete the Task under My Tasks', function () {
        //My Tasks Delete
        taskspage.ScrollTab('My Tasks');
        taskspage.Delete();
    });
     it('should able to Delete the Task under Delegated', function () {
        ////Delegated Delete
        taskspage.ScrollTab('Delegated');
        taskspage.Delete();
    });
    it('should able to Delete the Task under Undelegated', function () {
        ////Undelegated Delete
        taskspage.ScrollTab('Undelegated');
        taskspage.Delete();
    });
});