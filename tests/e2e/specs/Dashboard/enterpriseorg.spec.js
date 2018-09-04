var browser = require("protractor").protractor.browser;
var Enterprisepage = require("../../Page objects/Dashboard/enterpriseorg.po");
var loginpage = require("../../Page objects/Common/loginpage.po");
var commonlib = require("../../Page objects/Common/common.po");
var until = protractor.ExpectedConditions;
describe("Enterprise Org", function () {
  jasmine
    .getEnv()
    .topSuite()
    .beforeEach({
      fn: function () {
        loginpage.Login(
          browser.params.login.Enterpriseuser,
          browser.params.login.Enterprisepass
        );
        //commonlib.clickHamburger();
        //Navigate to Notes Sub-Menu using below Method
        // element.all(by.repeater('level1 in $ctrl.model.data')).each(function (main) {
        //     main.getText().then(function (maintext) {
        //         console.log(maintext);
        //     });
        // });
      }
    });
  it("should able to navigate to the Enterpise page showing list of companies", function () {
    Enterprisepage.NavigateTo("Enterprise");
    commonlib.CheckUrlContains('/franchise');
  });
  it("should able to navigate to the Reports", function () {
    Enterprisepage.NavigateTo("Reports");
    commonlib.CheckUrlContains('/reporting');
  });
  it("should able to navigate to the Sites Home", function () {
    Enterprisepage.NavigateTo("Sites");
    commonlib.CheckUrlContains('/website');
  });
  it("should able to Create a Dashboard", function () {
    commonlib.CreateDashboard("New Dashboard");
  });
  it("should able to Edit a Dashboard", function () {
    commonlib.EditDashboard("Edit Dashboard");
  });
  it("should not able create a Dashboard without required fields", function () {
    commonlib.WithoutreqFields();
  });
  it("should able to Delete Dashboard", function () {
    commonlib.DeleteDashboard("Automated");
  });
  it("should able to Create a Dashlet of Chart type Area", function () {
    commonlib.WaitForPageLoad();
    commonlib.SelectActions();
    switch (env) {
      case 'PROD':
      case 'OCR':
        //Refer the PO for complete Objects
        commonlib.CreateDashlet(
          "Finance Reports",
          "Accts. Payable - Vendor Balance",
          "Basic Charts",
          "Area",
          "Vendor: Summary",
          "Amount Paid Last Year",
          "Sum",
          "Vendor: Summary",
          "Vendor Balance"
        );
        break;
      case 'SAT':
      case 'SIT':
        //Refer the PO for complete Objects
        commonlib.CreateDashlet(
          "Finance Reports",
          " Money In - Payments",
          "Basic Charts",
          "Area",
          "Transaction Summary",
          "Payment Status",
          "Sum",
          "Transaction Summary",
          "Amount"
        );
        break;
    }
  });
  it("should able to Create a Dashlet of Chart type Doughnut", function () {
    commonlib.WaitForPageLoad();
    commonlib.SelectActions();
    //Refer the PO for complete Objects
    commonlib.CreateDashlet(
      "Enterprise Reports",
      "Enterprise Total Income",
      "Basic Charts",
      "Doughnut",
      "Enterprise Total Income",
      "Date",
      "Sum",
      "Enterprise Total Income",
      "Date"
    );
  });
  it("should able to Create a Dashlet of Chart type Line", function () {
    commonlib.WaitForPageLoad();
    commonlib.SelectActions();
    switch (env) {
      case 'PROD':
      case 'OCR':
        //Refer the PO for complete Objects
        commonlib.CreateDashlet(
          "Maintenance Reports",
          "Work Orders - Service Requests",
          "Basic Charts",
          "Line",
          "Work Order Summary",
          "Lease",
          "Sum",
          "Work Order Summary",
          "Estimated Cost"
        );
        break;
      case 'SAT':
      case 'SIT':
        //Refer the PO for complete Objects
        commonlib.CreateDashlet(
          "Maintenance Reports",
          "Work Orders - Service Requests",
          "Basic Charts",
          "Line",
          "Work Order Summary",
          "Vendor NameRequested By",
          "Sum",
          "Work Order Summary",
          "Estimated Cost"
        );
        break;
    }
  });
  it("should able to Create a Dashlet of Chart type Mini-Table", function () {
    commonlib.WaitForPageLoad();
    commonlib.SelectActions();
    switch (env) {
      case 'PROD':
      case 'OCR':
        //Refer the PO for complete Objects
        //Refer the PO for complete Objects
        commonlib.CreateDashletMintable(
          "Property Reports",
          "Units - Vacant Unit Loss",
          "Basic Charts",
          "Mini-Table"
        );
        break;
      case 'SAT':
      case 'SIT':
        //Refer the PO for complete Objects
        commonlib.CreateDashletMintable(
          "Property Reports",
          "Buildings",
          "Basic Charts",
          "Mini-Table"
        );
        break;
    }
  });
  it("should able to Create a Dashlet of Chart type GroupedBar", function () {
    commonlib.WaitForPageLoad();
    commonlib.SelectActions();
    //Refer the PO for complete Objects
    commonlib.CreateDashletGroupBy(
      "Finance Reports",
      "Accts. Payable - Vendor Balance",
      "Group By Charts",
      "Grouped Bar",
      "Vendor: Summary",
      "Vendor Type",
      "Sum",
      "Vendor: Summary",
      "Credit Limit",
      "Vendor: Summary",
      "Rating"
    );
  });
  it("should able to Create a Dashlet of Chart type GroupedLine", function () {
    commonlib.WaitForPageLoad();
    commonlib.SelectActions();
    switch (env) {
      case 'PROD':
      case 'OCR':
        commonlib.CreateDashletGroupBy(
          "Finance Reports",
          "Accts. Payable - Vendor Balance",
          "Group By Charts",
          "Grouped Line",
          "Vendor: Summary",
          "Vendor Type",
          "Sum",
          "Vendor: Summary",
          "Credit Limit",
          "Vendor: Summary",
          "Rating"
        );
        break;
      case 'SAT':
      case 'SIT':
        //Refer the PO for complete Objects
        commonlib.CreateDashletGroupBy(
          "Finance Reports",
          "Money Out - Bills",
          "Group By Charts",
          "Grouped Line",
          "Bill Split Detail",
          "Portfolio",
          "Sum",
          "Bill Split Detail",
          "Amount",
          "Report Options",
          "Org ID"
        );
        break;
    }
  });
  it("should able to Edit Dashlet", function () {
    commonlib.EditDashlet();
  });
  it("should able to Delete Dashlets(Dashboard Cleanup)", function () {
    commonlib.WaitForPageLoad();
    commonlib.SelectActions();
    element
      .all(by.repeater("item in page.model.dashboardDashlets"))
      .count()
      .then(function (count) {
        console.log(count);
        var elem = element(by.css(".rp-actions-menu"));
        var elem1 = element(
          by.cssContainingText(".rp-actions-menu-item", "Delete")
        );
        for (var a = 0; a < count; a++) {
          elem.getCssValue("display").then(function (val) {
            if (val != "none" && elem.isDisplayed()) {
              expect(elem.getCssValue("display")).not.toEqual("none");
              expect(elem.isDisplayed()).toBe(true);
              elem.click();
              browser.sleep(2000);
              elem1.click();
              commonlib.Submit();
              browser.wait(
                until.presenceOf(element(by.id("selectActions"))),
                5000
              );
              browser.sleep(5000);
            }
          });
        }
      });
  });
  it("should able to perform Global ,Advanced and Enterprise Search", function () {
    commonlib.WaitForPageLoad();
    //check Accessible to Selected Users and verify thw all user is unchecked
    element(by.xpath('//div[@rp-model="searchText"]')).click();
    element(by.id("input2")).sendKeys("a");
    browser.wait(until.presenceOf(element(by.css(".select-property"))), 5000);
    //Global Search
    var Listelem = element.all(by.css(".list-group-item:last-child"));
    Listelem.get(2)
      .getAttribute("href")
      .then(function (value) {
        console.log(value);
        if (value.indexOf("contacts") > -1) {
          isAngularSite(false);
          Listelem.get(2).click();
          commonlib.CheckUrlContains('/contacts');
        }
      });
    // element.all(by.repeater("item in $ctrl.model.list"))
    //   .each(function(elem, index) {
    //     elem.getText().then(function(text) {
    //       console.log(text);
    //       //expect(text).toContain('(Owner)');
    //       var Listelem = element.all(by.css(".list-group-item:last-child"));
    //       Listelem.get(2)
    //         .getAttribute("href")
    //         .then(function(value) {
    //           console.log(value);
    //           if (value.indexOf("contacts") > -1) {
    //               isAngularSite(false);
    //             Listelem.get(2).click();
    //             browser
    //               .wait(until.urlContains("/contacts"), 10000)
    //               .then(function(result) {
    //                 expect(result).toEqual(true);
    //               });
    //           }
    //         });
    //       // browser.wait(until.urlContains('/dashboard'), 10000).then(function (result) {
    //       //     expect(result).toEqual(true);
    //       // });
    //     });
    //   });
  });
  it("should able to perform Advanced Search", function () {
    commonlib.WaitForPageLoad();
    //check Accessible to Selected Users and verify thw all user is unchecked
    element(by.xpath('//div[@rp-model="searchText"]')).click();
    element(by.id("input2")).sendKeys("a");
    browser.wait(until.presenceOf(element(by.css(".select-property"))), 5000);
    //Advance search navigate to the Legacy
    element(
      by.cssContainingText(".list-group-item:first-child", "Advanced Search")
    ).click();
    browser.ignoreSynchronization = true;
    commonlib.CheckUrlContains('/search');
  });
  it("should able to perform Enterprise Search", function () {
    browser.waitForAngular();
    browser.wait(until.invisibilityOf($(".rp-busy-indicator-msg")), 5000);
    //check Accessible to Selected Users and verify thw all user is unchecked
    element(by.xpath('//div[@rp-model="searchText"]')).click();
    element(by.id("input2")).sendKeys("a");
    browser.wait(until.presenceOf(element(by.css(".select-property"))), 5000);
    //Advance search navigate to the Legacy
    element(
      by.cssContainingText(".list-group-item:last-child", "Enterprise Search")
    ).click();
    commonlib.CheckUrlContains('/enterprises');
  });
  it("should able to Navigate to Child Orgs", function () {
    commonlib.WaitForPageLoad();
    browser.wait(until.presenceOf(element(by.css(".rp-gh-title"))), 5000);
    //check Accessible to Child Orgs
    element(by.css(".rp-gh-title")).click();
    //var Drpdwn = element.all(by.repeater('option in $ctrl.model.options | limitTo: $ctrl.model.limit'));
    //Global Search
    // Drpdwn.each(function (elem) {
    //     elem.getText().then(function (text) {
    //console.log(text);
    //expect(text).toContain('(Owner)');
    element(by.id("input1")).sendKeys("a");
    element(by.css('[ng-click="$ctrl.selectOption(option)"]')).click();
    browser.sleep(5000);
    commonlib.CheckUrlContains('/dashboard');
  });
  it("should able to Navigate to Help page,Settings page and able to Logout", function () {
    commonlib.WaitForPageLoad();
    browser.wait(until.presenceOf(element(by.css(".rp-gh-title"))), 5000);
    //Navigate to Help page
    //element(by.css('.rp-gh-toolbar-icon.help')).click();
    element(by.css(".rp-gh-toolbar-icon.help"))
      .click()
      .then(function () {
        isAngularSite(false);
        browser.getAllWindowHandles().then(function (handles) {
          newWindowHandle = handles[1]; // this is your new window
          browser
            .switchTo()
            .window(newWindowHandle)
            .then(function () {
              // fill in the form here
              expect(browser.getCurrentUrl()).toMatch(
                "http://propertyware.force.com/KB2/articles/FAQ/What-is-the-Dashboard/"
              );
            });
        });
      });
  });
  it("should able to Navigate to Settings page and able to Logout", function () {
    commonlib.WaitForPageLoad();
    browser.wait(until.presenceOf(element(by.css(".rp-gh-title"))), 5000);
    //Navigate to Settings page
    element(by.css(".rp-gh-toolbar-icon.settings")).click();
    commonlib.CheckUrlContains('/setup');
    isAngularSite(false);
    element(by.css(".tabLblDesktop")).click();
    loginpage.clickraul();
    element(by.css(".rp-gh-user-links-toggle")).click();
    element(
      by.cssContainingText(".rp-gh-user-links-list-item", "Logout")
    ).click();
    commonlib.CheckUrlContains('/logoff');
  });
});