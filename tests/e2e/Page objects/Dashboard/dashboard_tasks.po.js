var until = protractor.ExpectedConditions;
var tasksPageObject = function () {
    this.mouseDown = element(by.repeater('level1 in $ctrl.model.data').row(0));
    //this.mouseDown = element(by.css('.rp-gn-menu-item-toggle'));
    this.mouseMove = element(by.cssContainingText('.rp-gn-level2-submenu-item-text', 'Tasks'));
    this.addTask = element(by.css('[ng-click="page.addNewTask()"]'));
    this.loadTemplate = element(by.css('[ng-click="page.addTempleteTasks()"]'));
    this.checkbox = element(by.xpath('//div[@rp-model="page.model.form.private"]'));
    this.editComments = element.all(by.css('[ng-click="config.editComments(record)"]'));

    this.comments=function () {
        this.editComments.get(0).click();
    }
    this.clickaddTask = function () {
        this.addTask.click();
    }
    this.LoadfromTemplate = function () {
        this.loadTemplate.click();
    }
    //Click on Hamburger menu and select the menu item respectively
    this.Hamburger = element(by.css('[ng-click="$ctrl.toggle()"]'));
    this.clickHamburger = function () {
        this.Hamburger.click();
    }
    this.get = function () {
        browser.get('');
    };
    this.TaskDesc = element(by.id("Task Description"));
    this.Applybutton = element(by.css('button[type="submit"]'));
    this.Cancelbutton = element(by.buttonText('Cancel'));
    this.pressApply = function () {
        this.Applybutton.click();
    }
    this.pressCancel = function () {
        this.Cancelbutton.click();
    }
    this.SendTaskDesc = function (params) {
        this.TaskDesc.clear();
        this.TaskDesc.sendKeys(params);
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
    }
    this.Delegateitem = element(by.css('[ng-click="$select.activate()"]'));
    this.Delegate = function () {
        this.Delegateitem.click();
    }
    var selectDropdownElement = element(by.id('selectSortBy'));
    this.SelectDropdown = function () {
        selectDropdownElement.all(by.tagName('option'))
            .then(function (options) {
                options[0].click();
            });
    }

    this.dropdownselect = function (index, milliseconds) {
        selectDropdownElement.all(by.tagName('option'))
          .then(function(options) {
            options[index].click();
          });
        if (typeof milliseconds !== 'undefined') {
          browser.sleep(milliseconds);
       }
    }
    var Dropdown_arr = ['All','Open','Completed'];
    this.DropdownText = function () {
        selectDropdownElement.all(by.tagName('option')).each(function (elem){
            elem.getText().then(function(text) {
            //console.log(text);
            expect(Dropdown_arr).toContain(text);
            });
        });
    }
    var Templatesdrpdwn = element(by.xpath('//div[@rp-model="page.loadFromTempleteSelect"]'));
    this.TemplateDropdownText = function () {
        Templatesdrpdwn.all(by.tagName('option')).each(function (elem){
            elem.getText().then(function(text) {
            console.log(text);
            //expect(Dropdown_arr).toContain(text);
            });
        });
    }
    this.selectTemplate = function (index, milliseconds) {
        Templatesdrpdwn.all(by.tagName('option'))
          .then(function(options) {
            options[index].click();
          });
        if (typeof milliseconds !== 'undefined') {
          browser.sleep(milliseconds);
       }
    }
    function Submit() {
        element(by.css('[ng-click="page[page.deleteContent.clickEvent](page.deleteContent.item)"]')).click();
    }
    //var submitButton = $('.rp-btn.primary');
    this.ScrollTab = function (Tablink) {
        element.all(by.cssContainingText('.rp-scrolling-tab-link', Tablink)).click();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 10000);
    }
    this.VerifyCount = function () {

        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 10000);
        //Verify the count
        element.all(by.repeater('record in model.data.records track by record.rowIndex')).count().then(function (count) {
            console.log(count);
            element(by.css('.rg-pagination-showing-records')).getText().then(function (text) {
                console.log(text)
                if (text.indexOf(count) > -1) {
                    console.log("Count matched")
                }
            });
        });
    }
    this.Delete = function () {
        browser.waitForAngular();
        var elem = element(by.css('.rp-actions-menu'));
        element.all(by.css('.rp-actions-menu')).count().then(function (count) {
            console.log(count);
            for (var a = 0; a < count; a++) {
                elem.getCssValue('display').then(function (val) {
                    if (val != 'none' && elem.isDisplayed()) {
                        expect(elem.getCssValue('display')).not.toEqual('none');
                        expect(elem.isDisplayed()).toBe(true);
                        element(by.css('.rp-actions-menu')).click();
                        element(by.cssContainingText('.rp-actions-menu-item', 'Delete')).click();
                        Submit();
                        browser.sleep(3000);
                        expect(element(by.cssContainingText('.rp-notification-msg', 'Task Deleted Successfully')).isDisplayed()).toBeTruthy();
                    }
                });
            }
        });
    }
    this.pageTasksHeading = element(by.exactBinding('page.tasksHeading'));
    this.pageTasksHeadingShouldHaveText = function (value) {
        expect(this.pageTasksHeading.getText()).toBe(value);
    };
    this.pageTasksHeadingShouldHaveClass = function (className) {
        this.pageTasksHeading.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageTasksHeadingShouldNotHaveClass = function (className) {
        this.pageTasksHeading.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.div0 = element(by.css('#tasks > div.tasks-addattchment.m-t-2:nth-of-type(3)'));
    this.clickDiv0 = function () {
        this.div0.click();
    };
    this.div0ShouldBeVisible = function () {
        expect(this.div0.isDisplayed()).toBeTruthy();
    };
    this.div0ShouldNotBeVisible = function () {
        expect(this.div0.isDisplayed()).toBeFalsy();
    };
    this.div0ShouldHaveClass = function (className) {
        this.div0.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.div0ShouldNotHaveClass = function (className) {
        this.div0.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageContentNewTask = element(by.exactBinding('::page.content.newTask'));
    this.pageContentNewTaskShouldHaveText = function (value) {
        expect(this.pageContentNewTask.getText()).toBe(value);
    };
    this.pageContentNewTaskShouldHaveClass = function (className) {
        this.pageContentNewTask.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentNewTaskShouldNotHaveClass = function (className) {
        this.pageContentNewTask.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.div1 = element(by.css('#tasks > div.tasks-addattchment.m-t-2:nth-of-type(4)'));
    this.clickDiv1 = function () {
        this.div1.click();
    };
    this.div1ShouldBeVisible = function () {
        expect(this.div1.isDisplayed()).toBeTruthy();
    };
    this.div1ShouldNotBeVisible = function () {
        expect(this.div1.isDisplayed()).toBeFalsy();
    };
    this.div1ShouldHaveClass = function (className) {
        this.div1.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.div1ShouldNotHaveClass = function (className) {
        this.div1.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageContentLoadFromTemplete = element(by.exactBinding('::page.content.loadFromTemplete'));
    this.pageContentLoadFromTempleteShouldHaveText = function (value) {
        expect(this.pageContentLoadFromTemplete.getText()).toBe(value);
    };
    this.pageContentLoadFromTempleteShouldHaveClass = function (className) {
        this.pageContentLoadFromTemplete.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentLoadFromTempleteShouldNotHaveClass = function (className) {
        this.pageContentLoadFromTemplete.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
};
module.exports = new tasksPageObject();