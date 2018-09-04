var conversationsPageObject = function () {
    this.get = function () {
        browser.get('');
    };
    this.AddConv = element(by.css('[ng-click="page.addNewDiscussion()"]'));
    this.clickAddconv = function () {
        this.AddConv.click();
    }
    this.Message = element(by.id("message"));
    this.Linkrelated = element(by.id("searchKey"));
    this.Applybutton = element(by.css('button[type="submit"]'));
    this.Cancelbutton = element(by.buttonText('Cancel'));
    this.Forminput = function (Message, Linkrelated) {
        this.Message.sendKeys(Message);
        this.Linkrelated.sendKeys(Linkrelated);
    }
    this.pressApply = function () {
        this.Applybutton.click();
    }
    this.pressCancel = function () {
        this.Cancelbutton.click();
    }
    this.Submit = function () {
        element(by.css('[ng-click="page[page.deleteContent.clickEvent](page.deleteContent.item)"]')).click();
    }
    this.Delete = function(){
        element(by.css('[ng-click="page.deleteDiscussion(item);$event.stopPropagation();"]')).click();
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
module.exports = new conversationsPageObject();