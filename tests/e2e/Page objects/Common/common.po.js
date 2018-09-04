var until = protractor.ExpectedConditions;
var dt = new Date();
var utcDate = dt.toUTCString();
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
var commonPageObject = function () {
    this.get = function () {
        browser.get('');
    };
    //Click on Hamburger menu and select the menu item respectively
    this.Hamburger = element(by.css('[ng-click="$ctrl.toggle()"]'));
    this.clickHamburger = function () {
        this.Hamburger.click();
    }
    this.Navigateto = function (Mainmenu, submenu) {
        browser.sleep(3000);
        browser.wait(until.presenceOf(this.Hamburger), 5000);
        //Open HamburgerMenu
        this.Hamburger.click();
        //Navigate to Notes Sub-Menu using below Method
        element.all(by.repeater('level1 in $ctrl.model.data')).each(function (main) {
            main.getText().then(function (maintext) {
                //console.log(maintext);
                if (maintext.indexOf(Mainmenu) > -1) {
                    main.click();
                    element.all(by.repeater('level2 in level1.submenu.links')).each(function (sub) {
                        sub.getText().then(function (subtext) {
                            //console.log(subtext);
                            if (subtext.indexOf(submenu) > -1) {
                                sub.click();
                            }
                        });
                    });
                }
            });
        });
        // //Navigate to Notes
        //   browser.actions().mouseMove(calendarpage.mouseDown).mouseMove(calendarpage.mouseMove).click().mouseMove({
        //     x: 400,
        //     y: 0
        // }).perform();
        this.Hamburger.click();
    }
    var selectDropdownElement = element(by.id('selectActions'));
    this.Dropdown = function (text) {
        element(by.cssContainingText('option', text)).click();
    }
    this.dropdownselect = function (index, milliseconds) {
        selectDropdownElement.all(by.tagName('option'))
            .then(function (options) {
                options[index].click();
            });
        if (typeof milliseconds !== 'undefined') {
            browser.sleep(milliseconds);
        }
    }
    this.Applybutton = element(by.css('button[type="submit"]'));
    this.Cancelbutton = element(by.buttonText('Cancel'));
    function Save() {
        element(by.css('button[type="submit"]')).click();
    }
    this.Save = function () {
        element(by.css('button[type="submit"]')).click();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 10000);
    }
    this.Cancel = function () {
        this.Cancelbutton.click();
    }
    //Tip to check the Error messages across the Form Dialog
    this.ErrorMessage = function (Errormessage) {
        element.all(by.repeater('msg in config.errorMsgs')).each(function (elem) {
            elem.getText().then(function (text) {
                console.log(text);
                //var ErrorMessages = [Errormessage];
                expect(Errormessage).toContain(text);
            });
        });
    }
    this.Submit = function () {
        element(by.css('[ng-click="page[page.deleteContent.clickEvent](page.deleteContent.item)"]')).click();
    }
    var datePicker = element(by.css(".rp-datetimepicker .rp-datetimepicker-text"));
    this.Pickdate = function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = mm + '/' + dd + '/' + yyyy;
            datePicker.clear();
            datePicker.sendKeys(today);
        },
        this.Highlight = function () {
            highlightElement(element.all(by.css('.rp-accordion-panel-title')).get(0));
        }
    this.ExpandCollapse = function () {
        element(by.xpath('//div[@rp-model="page.model.expandAll"]')).click();
    }
    this.SelectbyText = function SelectbyText(id, text) {
        element(by.xpath('//select[@id=' + '"' + id + '"' + ']/option[text()=' + '"' + text + '"' + ']')).click();
    }
    //Need to check this block
    function SelectbyText(id, text) {
        element(by.xpath('//select[@id=' + '"' + id + '"' + ']/option[text()=' + '"' + text + '"' + ']')).click();
    }
    this.SelectActions = function () {
        element(by.css('.rp-dropdown-label')).click();
        element(by.cssContainingText('.rp-dropdown-link', 'Manage Dashboard')).click();
        browser.sleep(3000);
        browser.wait(until.presenceOf(element(by.id('selectActions'))), 10000);
        browser.sleep(5000);
    }
    this.CreateDashlet = function (reportCat, reportName, chartGroup, chartType, firstAxisGroup, firstAxis, secondAxis, filterGroup, filter) {
        this.SelectActions();
        //Select the Action
        SelectbyText('selectActions', 'Add Dashlet');
        browser.wait(until.presenceOf(element(by.id('edit-widget-dashboard-aside'))), 5000);
        //Add Dashlet
        element(by.id('title')).sendKeys('Charttype:' + chartType + ' created thru AutomatedScript:' + utcDate);
        //Add Report Category
        element(by.xpath('//div[@rp-model="page.model.dashlet.reportCategory"]//select[@id="Category"]/option[text()=' + '"' + reportCat + '"' + ']')).click();
        //Add Report Name
        element(by.xpath('//div[@rp-model="page.model.dashlet.reportName"]//select[@id="Category"]/option[text()=' + '"' + reportName + '"' + ']')).click();
        //Since above select calls the service,selecting the chart will be resetted hence sleep
        browser.sleep(2000);
        //Add Chart Type
        element(by.xpath('//div[@rp-model="page.model.dashlet.chartType"]//select[@id="Category"]/optgroup[@label=' + '"' + chartGroup + '"' + ']/option[text()=' + '"' + chartType + '"' + ']')).click();
        //Add First Axis
        element(by.xpath('//div[@rp-model="page.model.dashlet.firstAxis"]//select[@id="Category"]/optgroup[@label=' + '"' + firstAxisGroup + '"' + ']/option[text()=' + '"' + firstAxis + '"' + ']')).click();
        //Add Second Axis
        element(by.xpath('//div[@rp-model="page.model.dashlet.secondAxis"]//select[@id="Category"]/option[text()=' + '"' + secondAxis + '"' + ']')).click();
        //Add Y-axis Filter
        element(by.xpath('//div[@rp-model="page.model.dashlet.yaxisFilterData"]//select[@id="Category"]/optgroup[@label=' + '"' + filterGroup + '"' + ']/option[text()=' + '"' + filter + '"' + ']')).click();
        Save();
        browser.wait(until.invisibilityOf(element(by.id('edit-widget-dashboard-aside'))), 20000);
        element.all(by.repeater('item in page.model.dashboardDashlets')).each(function (elem) {
            elem.getText().then(function (text) {
                console.log(text)
                if (text.indexOf('Charttype:' + chartType + '') != -1) {
                    expect(elem.getCssValue('display')).not.toEqual('none');
                    var Dashlet = element(by.cssContainingText('.box-header', 'Charttype:' + chartType + ''));
                    browser.controlFlow().execute(function () {
                        browser.executeScript('arguments[0].scrollIntoView(true)', Dashlet.getWebElement());
                    });
                    highlightElement(element(by.cssContainingText('.dashboard-graphs-margin', 'Charttype:' + chartType + '')));
                }
            });
        });
    }
    this.CreateDashletGroupBy = function (reportCat, reportName, chartGroup, chartType, firstAxisGroup, firstAxis, secondAxis, filterGroup, filter, groupByFilter, groupBy) {
        this.SelectActions();
        //Select the Action
        SelectbyText('selectActions', 'Add Dashlet');
        browser.wait(until.presenceOf(element(by.id('edit-widget-dashboard-aside'))), 5000);
        //Add Dashlet
        element(by.id('title')).sendKeys('Charttype:' + chartType + ' created thru AutomatedScript:' + utcDate);
        //Add Report Category
        element(by.xpath('//div[@rp-model="page.model.dashlet.reportCategory"]//select[@id="Category"]/option[text()=' + '"' + reportCat + '"' + ']')).click();
        //Add Report Name
        element(by.xpath('//div[@rp-model="page.model.dashlet.reportName"]//select[@id="Category"]/option[text()=' + '"' + reportName + '"' + ']')).click();
        //Since above select calls the service,selecting the chart will be resetted hence sleep
        browser.sleep(2000);
        //Add Chart Type
        element(by.xpath('//div[@rp-model="page.model.dashlet.chartType"]//select[@id="Category"]/optgroup[@label=' + '"' + chartGroup + '"' + ']/option[text()=' + '"' + chartType + '"' + ']')).click();
        //Add First Axis
        element(by.xpath('//div[@rp-model="page.model.dashlet.firstAxis"]//select[@id="Category"]/optgroup[@label=' + '"' + firstAxisGroup + '"' + ']/option[text()=' + '"' + firstAxis + '"' + ']')).click();
        //Add Second Axis
        element(by.xpath('//div[@rp-model="page.model.dashlet.secondAxis"]//select[@id="Category"]/option[text()=' + '"' + secondAxis + '"' + ']')).click();
        //Add Y-axis Filter
        element(by.xpath('//div[@rp-model="page.model.dashlet.yaxisFilterData"]//select[@id="Category"]/optgroup[@label=' + '"' + filterGroup + '"' + ']/option[text()=' + '"' + filter + '"' + ']')).click();
        //Add Group by Filter
        element(by.xpath('//div[@rp-model="page.model.dashlet.groupBy"]//select[@id="Category"]/optgroup[@label=' + '"' + groupByFilter + '"' + ']/option[text()=' + '"' + groupBy + '"' + ']')).click();
        Save();
        browser.wait(until.invisibilityOf(element(by.id('edit-widget-dashboard-aside'))), 10000);
        element.all(by.repeater('item in page.model.dashboardDashlets')).each(function (elem) {
            elem.getText().then(function (text) {
                console.log(text)
                if (text.indexOf('Charttype:' + chartType + '') != -1) {
                    expect(elem.getCssValue('display')).not.toEqual('none');
                    var Dashlet = element(by.cssContainingText('.box-header', 'Charttype:' + chartType + ''));
                    browser.controlFlow().execute(function () {
                        browser.executeScript('arguments[0].scrollIntoView(true)', Dashlet.getWebElement());
                    });
                    highlightElement(element(by.cssContainingText('.dashboard-graphs-margin', 'Charttype:' + chartType + '')));
                }
            });
        });
    }
    this.CreateDashletMintable = function (reportCat, reportName, chartGroup, chartType) {
        this.SelectActions();
        //Select the Action
        SelectbyText('selectActions', 'Add Dashlet');
        browser.wait(until.presenceOf(element(by.id('edit-widget-dashboard-aside'))), 5000);
        //Add Dashlet
        element(by.id('title')).sendKeys('Charttype:' + chartType + ' created thru AutomatedScript:' + utcDate);
        //Add Report Category
        element(by.xpath('//div[@rp-model="page.model.dashlet.reportCategory"]//select[@id="Category"]/option[text()=' + '"' + reportCat + '"' + ']')).click();
        //Add Report Name
        element(by.xpath('//div[@rp-model="page.model.dashlet.reportName"]//select[@id="Category"]/option[text()=' + '"' + reportName + '"' + ']')).click();
        //Since above select calls the service,selecting the chart will be resetted hence sleep
        browser.sleep(5000);
        //Add Chart Type
        element(by.xpath('//div[@rp-model="page.model.dashlet.chartType"]//select[@id="Category"]/optgroup[@label=' + '"' + chartGroup + '"' + ']/option[text()=' + '"' + chartType + '"' + ']')).click();
        //Select the Columns to display
        var myArray = ["Bill #", "Payee", "Portfolio", "Building", "Unit", "Account Code", "Payment Account", "Payment Method", "Check Number", "Payment Amount",
            "Company Name", "Portfolio Name", "Building Type", "Address", "Target Deposit", "Amenities", "County", "City", "Building Name", "Zip"
        ];
        element.all(by.repeater('item in page.model.columns')).each(function (elem) {
            elem.getText().then(function (text) {
                console.log(text)
                if (myArray.indexOf(text) > -1) {
                    console.log("Oops!!")
                    element(by.cssContainingText('.rp-form-input-checkbox-label', text)).click();
                }
            });
        });
        Save();
        browser.wait(until.invisibilityOf(element(by.id('edit-widget-dashboard-aside'))), 10000);
        element.all(by.repeater('item in page.model.dashboardDashlets')).each(function (elem) {
            elem.getText().then(function (text) {
                console.log(text)
                if (text.indexOf('Charttype:' + chartType + '') != -1) {
                    expect(elem.getCssValue('display')).not.toEqual('none');
                    var Dashlet = element(by.cssContainingText('.box-header', 'Charttype:' + chartType + ''));
                    browser.controlFlow().execute(function () {
                        browser.executeScript('arguments[0].scrollIntoView(true)', Dashlet.getWebElement());
                    });
                    highlightElement(element(by.cssContainingText('.dashboard-graphs-margin', 'Charttype:' + chartType + '')));
                }
            });
        });
    }
    this.CreateDashboard = function (Action) {
        browser.waitForAngular();
        browser.wait(until.presenceOf($('.rp-dropdown-label')), 10000, 'Element taking too long to appear in the DOM');
        element(by.css('.rp-dropdown-label')).click();
        browser.sleep(2000);
        element(by.cssContainingText('.rp-dropdown-link', 'Manage Dashboard')).click();
        browser.sleep(3000);
        browser.wait(until.presenceOf(element(by.id('selectActions'))), 5000);
        //Select the Action
        SelectbyText('selectActions', Action);
        browser.sleep(3000);
        browser.wait(until.presenceOf(element(by.id('edit-dashboard-aside'))), 5000);
        //Add Dashboard Title
        element(by.id('DashboardTitle')).sendKeys('Created thru AutomatedScript on:' + utcDate);
        //Add Description
        element(by.id('Description')).sendKeys('Lorem ipsum dolor sit amet, ei pri quod ludus vocent. Quot virtute vix ad. Velit prompta inermis ad per. Dictas necessitatibus vix eu, quod omittam recusabo his an. Percipit vituperata dissentiet duo eu, ad idque causae ancillae vim, eam nostrud appareat inciderint eu.');
        //check Accessible to Selected Users and verify thw all user is unchecked
        element(by.xpath('//div[@rp-model="page.model.dashboardDetails.accessToSelectedUser"]')).click();
        expect(element(by.xpath('//div[@rp-model="page.model.dashboardDetails.accessTo"]')).isSelected()).toBe(false);
        //Check Accessible to all users and save
        element(by.xpath('//div[@rp-model="page.model.dashboardDetails.accessTo"]')).click();
        expect(element(by.xpath('//div[@rp-model="page.model.dashboardDetails.accessToSelectedUser"]')).isSelected()).toBe(false);
        Save();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
        //var msg = element(by.css('.rp-notification-msg'));
        // expect(msg.isDisplayed()).toBe(true);
        // expect(msg.getText()).toContain('Added Dashboard Successfully');
    }
    this.EditDashboard = function (Action) {
        browser.waitForAngular();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 20000);
        element(by.css('.rp-dropdown-label')).click();
        browser.sleep(2000);
        element(by.cssContainingText('.rp-dropdown-option', 'Created')).click();
        browser.sleep(2000);
        element(by.cssContainingText('.rp-dropdown-link', 'Manage Dashboard')).click();
        browser.sleep(3000);
        browser.wait(until.presenceOf(element(by.id('selectActions'))), 5000);
        //Select the Action
        SelectbyText('selectActions', Action);
        browser.sleep(3000);
        browser.wait(until.presenceOf(element(by.id('edit-dashboard-aside'))), 5000);
        //Add Dashboard Title
        element(by.id('DashboardTitle')).clear();
        element(by.id('DashboardTitle')).sendKeys('Modified thru AutomatedScript on:' + utcDate);
        //Add Description
        element(by.id('Description')).clear();
        element(by.id('Description')).sendKeys('Modified Lorem ipsum dolor sit amet.iet duo eu, ad idque causae ancillae vim, eam nostrud appareat inciderint eu.');
        //Check by default Accessible to all user is checked
        expect(element(by.xpath('//div[@rp-model="page.model.dashboardDetails.accessTo"]')).isSelected()).toBe(false);
        //check Accessible to Selected Users and verify thw all user is unchecked
        element(by.xpath('//div[@rp-model="page.model.dashboardDetails.accessToSelectedUser"]')).click();
        //expect(element(by.xpath('//div[@rp-model="page.model.dashboardDetails.accessTo"]')).isSelected()).toBe(false);
        Save();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
        //var msg = element(by.css('.rp-notification-msg'));
        // expect(msg.isDisplayed()).toBe(true);
        // expect(msg.getText()).toContain('Added Dashboard Successfully');
    }
    this.EditDashlet = function () {
        browser.waitForAngular();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 10000);
        element(by.css('.rp-dropdown-label')).click();
        browser.sleep(5000);
        element(by.cssContainingText('.rp-dropdown-link', 'Manage Dashboard')).click();
        browser.wait(until.invisibilityOf(element(by.id('edit-widget-dashboard-aside'))), 10000);
        element.all(by.repeater('item in page.model.dashboardDashlets')).each(function (elem, index) {
            elem.getText().then(function (text) {
                //console.log(text)
                if (text.indexOf('Charttype:Area') > -1) {
                    expect(elem.getCssValue('display')).not.toEqual('none');
                    //Edit actions
                    element.all(by.css('.rp-actions-menu')).get(index).click();
                    element(by.cssContainingText('.rp-actions-menu-item', 'Edit')).click();
                    browser.wait(until.presenceOf(element(by.id('edit-widget-dashboard-aside'))), 10000);
                    browser.sleep(10000);
                    //Add Dashlet
                    element(by.id('title')).clear();
                    element(by.id('title')).sendKeys('Modified Area to GroupedArea thru AutomatedScript');
                    //Modify Chart Type
                    element(by.xpath('//div[@rp-model="page.model.dashlet.chartType"]//select[@id="Category"]/optgroup[@label="Group By Charts"]/option[text()="Grouped Area"]')).click();
                    switch (env) {
                        case 'PROD':
                        case 'OCR':
                            //Modify First Axis
                            element(by.xpath('//div[@rp-model="page.model.dashlet.firstAxis"]//select[@id="Category"]/optgroup[@label="Vendor: Summary"]/option[text()="Amount Paid Last Year"]')).click();
                            //Add Group by Filter
                            element(by.xpath('//div[@rp-model="page.model.dashlet.groupBy"]//select[@id="Category"]/optgroup[@label="Report Options"]/option[text()="Company Name"]')).click();
                            break;
                        case 'SAT':
                        case 'SIT':
                            //Modify Chart Type
                            element(by.xpath('//div[@rp-model="page.model.dashlet.groupBy"]//select[@id="Category"]/optgroup[@label="Bill Summary"]/option[text()="Auto Bill"]')).click();
                            break;
                    }
                    Save();
                    browser.wait(until.invisibilityOf(element(by.id('edit-widget-dashboard-aside'))), 10000);
                    element.all(by.repeater('item in page.model.dashboardDashlets')).each(function (elem) {
                        elem.getText().then(function (text) {
                            console.log(text)
                            if (text.indexOf('GroupedArea') > -1) {
                                expect(elem.getCssValue('display')).not.toEqual('none');
                                var Dashlet = element(by.cssContainingText('.box-header', 'GroupedArea'));
                                browser.controlFlow().execute(function () {
                                    browser.executeScript('arguments[0].scrollIntoView(true)', Dashlet.getWebElement());
                                });
                                browser.sleep(3000);
                                //mainpage.Highlight('GroupedArea');
                                highlightElement(element(by.cssContainingText('.dashboard-graphs-margin', 'GroupedArea')));
                            }
                        });
                    });
                }
            });
        });
    }
    this.WithoutreqFields = function () {
        browser.waitForAngular();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 10000);
        element(by.css('.rp-dropdown-label')).click();
        browser.sleep(2000);
        element(by.cssContainingText('.rp-dropdown-link', 'Manage Dashboard')).click();
        browser.sleep(3000);
        browser.wait(until.presenceOf(element(by.id('selectActions'))), 5000);
        //Select the Action
        SelectbyText('selectActions', 'New Dashboard');
        browser.sleep(3000);
        browser.wait(until.presenceOf(element(by.id('edit-dashboard-aside'))), 5000);
        //Add Dashboard Title
        element(by.id('DashboardTitle')).sendKeys();
        //Add Description
        element(by.id('Description')).sendKeys('Lorem ipsum dolor sit amet, ei pri quod ludus vocent.Percipit vituperata dissentiet duo eu, ad idque causae ancillae vim, eam nostrud appareat inciderint eu.');
        Save();
        //Tip to check the Error messages across the Form Dialog
        element.all(by.repeater('msg in config.errorMsgs')).each(function (elem) {
            elem.getText().then(function (text) {
                console.log(text);
                var ErrorMessages = ["Dashboard Title Required"];
                expect(ErrorMessages).toContain(text);
            });
        });
    }
    this.DeleteDashboard = function (DashboardName) {
        browser.waitForAngular();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 10000);
        element(by.css('.rp-dropdown-label')).click();
        browser.sleep(2000);
        element(by.cssContainingText('.rp-dropdown-option', DashboardName)).click();
        browser.sleep(2000);
        element(by.cssContainingText('.rp-dropdown-link', 'Manage Dashboard')).click();
        browser.sleep(3000);
        browser.wait(until.presenceOf(element(by.id('selectActions'))), 5000);
        //Select the Action
        SelectbyText('selectActions', 'Delete Dashboard');
        browser.sleep(3000);
    }
    this.CheckUrlContains = function (text) {
        browser.wait(until.urlContains(text), 10000).then(function (result) {
            expect(result).toEqual(true);
        });
    }
    this.WaitForPageLoad = function() {
        browser.waitForAngular();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 10000);
    }
};
module.exports = new commonPageObject();