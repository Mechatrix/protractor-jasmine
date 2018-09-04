var commonlib = require('../../Page objects/Common/common.po');
var until = protractor.ExpectedConditions;
var currentDate = new Date(),
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear();
var calendersPageObject = function () {
    var CalendarTabs = element(by.css('.btn.white:not([disabled]).active'));
    var EventType = element(by.id('eventType')).$('option:checked');
    var Delete = element(by.css('[ng-click="page.deleteCalendar()"]'));
    var Titletext = element(by.id("title"));
    var Desctext = element(by.id("description"));
    this.get = function () {
        browser.get('');
    };
    this.Delete = function () {
        element(by.css('[ng-click="page.deleteCalendar()"]')).click();
    }
    this.AttachItem = function () {
        element(by.css('[ng-click="page.addAttachItems()"]')).click();
    }
    this.Apply = function () {
        element(by.css('[ng-click="page.filterdata()"]')).click();
    }
    this.Filter = function (text) {
        element(by.xpath('//select[@id="eventType"]/option[text()=' + '"' + text + '"' + ']')).click();
    }
    this.CheckTabText = function (tab) {
        expect(CalendarTabs.getText()).toEqual(tab);
    }
    this.EventTypeText = function (event) {
        expect(EventType.getText()).toEqual(event);
    }
    this.CheckEvent = function (eve) {
        expect(element(by.cssContainingText('.fc-event', eve + ":" + day + "-" + month + "-" + year)).isPresent()).toBe(true);
    }

    this.FieldInputs = function (title) {
        Titletext.sendKeys("Event Created of EventType " + title + ":" + day + "-" + month + "-" + year);
        Desctext.sendKeys("Lorem ipsum dolor sit amet, vide option placerat an pro, his et posse novum. Ut qui dicit nominavi. Ius ne natum fastidii, vix ipsum oratio altera an. Ut quando ceteros mel, cibo altera an nec. Cum omnesque scribentur complectitur at, eripuit adipisci eleifend te duo, pericula constituto ad sed. Exerci ignota cu eum.");
    }
    this.FormInput = function (title, ClearFieldsflag) {
        if (ClearFieldsflag == 'T') {
            Titletext.clear();
            Desctext.clear();
            Titletext.sendKeys("Event modified to EventType "+ title +":" + day + "-" + month + "-" + year);
            Desctext.sendKeys("Lorem ipsum dolor sit amet, vide option placerat an pro, his et posse novum. Ut qui dicit nominavi. Ius ne natum fastidii, vix ipsum oratio altera an. Ut quando ceteros mel, cibo altera an nec. Cum omnesque scribentur complectitur at, eripuit adipisci eleifend te duo, pericula constituto ad sed. Exerci ignota cu eum.");
        } else {
            this.FieldInputs(title);
        }
    }
    this.ShiftTab = function (tabtext) {
        element(by.cssContainingText('.rp-scrolling-tab', tabtext)).click();
    }
    this.UserprofileChkbox = function (text) {
        element(by.cssContainingText('.rp-form-input-checkbox label', text)).click();
    }
    this.eventType = function (eventType){
        element(by.xpath('//select[@id="eventType"]/option[text()=' + '"' + eventType + '"' + ']')).click();
    }
    this.RelatedType = function (relatedType) {
        element(by.xpath('//select[@id="type"]/option[text()=' + '"' + relatedType + '"' + ']')).click();
    }
    this.CreateEvent = function (eventType, user, relatedType) {
        //Select 'New Event' Option in Filter
        commonlib.Dropdown('New Event');
        browser.sleep(3000);
        //Select The showing filter
        this.eventType(eventType);
        //Send text
        this.FormInput(eventType,'F');
        //Navigate to Share tab
        this.ShiftTab('Share');
        //Click on User profile checkbox
        this.UserprofileChkbox(user);
        //Navigate to Share tab
        this.ShiftTab('Related');
        //Attach the Item
        this.AttachItem();
        //Search
        element(by.id('search')).sendKeys("*");
        expect(element(by.id('type')).$('option:checked').getText()).toEqual('Lease');
        //Select the Related Item Type
        this.RelatedType(relatedType);
        //element(by.xpath('//select[@id="type"]/option[text()=' + '"' + relatedType + '"' + ']')).click();
        element(by.buttonText('Search')).click();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 10000);
        element.all(by.xpath('//div[@rp-model="record.isSelect"]')).get(0).click();
        this.Apply();
        commonlib.Save();
        browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
        browser.sleep(2000);
    }
    this.DeleteEvent = function () {
        element.all(by.css('.fc-event')).count().then(function (count) {
            console.log(count);
            var elem = element(by.css('.fc-event'));
            for (var a = 0; a < count; a++) {
                elem.getCssValue('display').then(function (val) {
                    if (val != 'none' && elem.isDisplayed()) {
                        expect(elem.getCssValue('display')).not.toEqual('none');
                        expect(elem.isDisplayed()).toBe(true);
                        elem.click();
                        browser.sleep(5000);
                        Delete.click();
                        commonlib.Submit();
                        browser.wait(until.presenceOf(element(by.css('.fc-event'))), 10000);
                        browser.sleep(10000);
                    }
                });
            }
        });
    }
    this.ValidateCalendarViews = function () {
        var today = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var dd = today.getDate();
        // if (dd < 10) {
        //     dd = '0' + dd
        // }
        //
        function GetSaturday(d) {
            d = new Date(d);
            var day = d.getDay(),
                day = 6 - day;
            diff = d.getDate() + day; //+ (day == 0 ? -6 : 1);
            return new Date(d.setDate(diff)).toDateString();
        }
        function getSunday(d) {
            d = new Date(d);
            var day = d.getDay(),
                diff = d.getDate() - day;
            return new Date(d.setDate(diff)).toDateString();
        }
        var firstday = getSunday(new Date());
        var lastday = GetSaturday(new Date());
        var weekview = firstday.split(' ')[1] + " " + parseInt(firstday.split(' ')[2]) + " – " + (firstday.split(' ')[1] == lastday.split(' ')[1] ? '' : lastday.split(' ')[1] + ' ') + parseInt(lastday.split(' ')[2]) + ', ' + firstday.split(' ')[3];
        //
        var month = month[today.getMonth()];
        var year = today.getFullYear();
        var first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6;
        // var firstday = new Date(today.setDate(first));
        // var lastday = new Date(today.setDate(last));
        //console.log("Test view:" + month.substring(0, 3) + ' ' + firstday + ' ' + "–" + ' ' + lastday + "," + ' ' + year);
        //console.log("Month View:" + month + ' ' + year);
        //console.log("Day View:" + month + ' ' + dd + "," + year);
        //console.log("Week View:" + month.substring(0, 3) + ' ' + first + ' ' + "–" + ' ' + last + "," + ' ' + year);
        commonlib.WaitForPageLoad();
        //Verify the Default view is Week
        expect(element(by.css('.btn.white:not([disabled]).active')).getText()).toEqual('Week');
        expect(element(by.css('.fc-toolbar .fc-center')).getText()).toEqual(weekview);
        //Verify the Month View
        element(by.buttonText('Month')).click();
        expect(element(by.css('.fc-toolbar .fc-center')).getText()).toEqual(month + ' ' + year);
        //Verify the Day view
        element(by.buttonText('Day')).click();
        expect(element(by.css('.fc-toolbar .fc-center')).getText()).toEqual(month + ' ' + dd + "," + ' ' + year);
        browser.sleep(5000);
    }
    this.ValidateViewshowingsViews = function () {
        var today = new Date();
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var dd = today.getDate();
        if (dd < 10) {
            dd = '0' + dd
        }
        //
        function GetSaturday(d) {
            d = new Date(d);
            var day = d.getDay(),
                day = 6 - day;
            diff = d.getDate() + day; //+ (day == 0 ? -6 : 1);
            return new Date(d.setDate(diff)).toDateString();
        }
        function getSunday(d) {
            d = new Date(d);
            var day = d.getDay(),
                diff = d.getDate() - day;
            return new Date(d.setDate(diff)).toDateString();
        }
        var firstday = getSunday(new Date());
        var lastday = GetSaturday(new Date());
        var weekview = firstday.split(' ')[1] + " " + (parseInt(firstday.split(' ')[2]>9)?"":"0")+ parseInt(firstday.split(' ')[2]) + ', ' + firstday.split(' ')[3] + " - " + firstday.split(' ')[1] + " " + (firstday.split(' ')[1] == lastday.split(' ')[1] ? '' : lastday.split(' ')[1] + ' ') + (parseInt(lastday.split(' ')[2])>9?"":"0")+ parseInt(lastday.split(' ')[2]) + ', ' + firstday.split(' ')[3];
        //
        var month = month[today.getMonth()];
        var year = today.getFullYear();
        var first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6;
        commonlib.WaitForPageLoad();
        //Navigate to View Showings
        commonlib.Dropdown('View Showings');
        //Verify 'Dropdown is set default to User Login and View -Month'
        element(by.css(".rp-gh-user-name")).getText().then(function (userinfo) {
            //console.log(userinfo)
            expect(element(by.id('dateId')).$('option:checked').getText()).toEqual('View - Month');
            expect(element(by.id('userId')).$('option:checked').getText()).toEqual(userinfo);
            expect(element(by.css('.view-showings-header-width-5')).getText()).toEqual("Showings for " + month.substring(0, 3) + ' ' + year);
        });
        //Verify the view by Week
        commonlib.Dropdown('View - Week');
        expect(element(by.css('.view-showings-header-width-5')).getText()).toEqual("Showings for " + weekview);
        //Verify the view by Day
        commonlib.Dropdown('View - Day');
        expect(element(by.css('.view-showings-header-width-5')).getText()).toEqual("Showings for " + month.substring(0, 3) + ' ' + dd + "," + ' ' + year);
        //Verify the Print Functionality
        element(by.css('[ng-click="printDiv()"]')).click();
        browser.sleep(1000);
        browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
    }
    this.contentPageHeading = element(by.exactBinding('::content.pageHeading'));
    this.contentPageHeadingShouldHaveText = function (value) {
        expect(this.contentPageHeading.getText()).toBe(value);
    };
    this.contentPageHeadingShouldHaveClass = function (className) {
        this.contentPageHeading.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.contentPageHeadingShouldNotHaveClass = function (className) {
        this.contentPageHeading.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.div0 = element(by.css('div.calendar > div.calendar-width-12 > div.calendar-header-right.calendar-width-6 > div.calendar-width-2.calendar-cart.calendar-right'));
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
    this.todayButton = element(by.buttonText('Today'));
    this.clickTodayButton = function () {
        this.todayButton.click();
    };
    this.todayButtonShouldBeVisible = function () {
        expect(this.todayButton.isDisplayed()).toBeTruthy();
    };
    this.todayButtonShouldNotBeVisible = function () {
        expect(this.todayButton.isDisplayed()).toBeFalsy();
    };
    this.todayButtonShouldHaveClass = function (className) {
        this.todayButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.todayButtonShouldNotHaveClass = function (className) {
        this.todayButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.monthButton = element(by.buttonText('Month'));
    this.clickMonthButton = function () {
        this.monthButton.click();
    };
    this.monthButtonShouldBeVisible = function () {
        expect(this.monthButton.isDisplayed()).toBeTruthy();
    };
    this.monthButtonShouldNotBeVisible = function () {
        expect(this.monthButton.isDisplayed()).toBeFalsy();
    };
    this.monthButtonShouldHaveClass = function (className) {
        this.monthButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.monthButtonShouldNotHaveClass = function (className) {
        this.monthButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.weekButton = element(by.buttonText('Week'));
    this.clickWeekButton = function () {
        this.weekButton.click();
    };
    this.weekButtonShouldBeVisible = function () {
        expect(this.weekButton.isDisplayed()).toBeTruthy();
    };
    this.weekButtonShouldNotBeVisible = function () {
        expect(this.weekButton.isDisplayed()).toBeFalsy();
    };
    this.weekButtonShouldHaveClass = function (className) {
        this.weekButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.weekButtonShouldNotHaveClass = function (className) {
        this.weekButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.dayButton = element(by.buttonText('Day'));
    this.clickDayButton = function () {
        this.dayButton.click();
    };
    this.dayButtonShouldBeVisible = function () {
        expect(this.dayButton.isDisplayed()).toBeTruthy();
    };
    this.dayButtonShouldNotBeVisible = function () {
        expect(this.dayButton.isDisplayed()).toBeFalsy();
    };
    this.dayButtonShouldHaveClass = function (className) {
        this.dayButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.dayButtonShouldNotHaveClass = function (className) {
        this.dayButton.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
};
module.exports = new calendersPageObject();