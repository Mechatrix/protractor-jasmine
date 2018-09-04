var notesPageObject = function () {
    this.get = function () {
        browser.get('/pw/login.jsp');
    };
    //Tricky code to Handle isPresent() and isDisplayed() differences
    this.waitUntilReady = function (elm) {
        browser.wait(function () {
            return elm.isPresent();
        }, 10000);
        browser.wait(function () {
            return elm.isDisplayed();
        }, 10000);
    };
    this.mouseDown = element(by.repeater('level1 in $ctrl.model.data').row(0));
    //this.mouseDown = element(by.css('.rp-gn-menu-item-toggle'));
    this.mouseMove = element(by.cssContainingText('.rp-gn-level2-submenu-item-text', 'Notes'));
    this.click1 = function () {
        this.mouseDown.click();
    };
    this.AddNote = element(by.css('[ng-click="page.addNewNote()"]'));
    this.clickAddnote = function () {
        this.AddNote.click();
    }
    this.Subject = element(by.id("Subject"));
    this.Body = element(by.id("Body"));
    //this.checkbox = element(by.css('.md-check input'));
    this.checkbox = element(by.xpath('//div[@rp-model="page.model.form.private"]'));
    this.Applybutton = element(by.css('button[type="submit"]'));
    this.Cancelbutton = element(by.buttonText('Cancel'));
    this.Forminput = function (Subject, Body) {
        this.Subject.sendKeys(Subject);
        this.Body.sendKeys(Body);
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
    var submitButton = $('.rp-btn.primary');
    this.alertSubmit = function () {
        getAlertAndClose(submitButton);
        submitButton.click();
    }
    function getAlertAndClose(element) {
        return element.click().then(function (alertText) {
            //Wait for alert to pop up
            browser.wait(function () {
                return browser.switchTo().alert().then(
                    function () {
                        return true;
                    },
                    function () {
                        return false;
                    }
                );
            }); // Wait timeout
            // Test alert is what you expect
            var popupAlert = browser.switchTo().alert();
            alertText = popupAlert.getText();
            expect(alertText).toMatch('Are you sure you want to delete this note?');
        })
    }
    var selectDropdownElement = element(by.id('selectSortBy'));
    this.SelectDropdown = function () {
        selectDropdownElement.all(by.tagName('option'))
            .then(function (options) {
                expect(options[0].isSelected()).toBe(true);
                options[1].click();
            });
    }
    //this.ExpandSwitch = element(by.css('[ng-click="page.model.expandAllaccordians()"]'));
    this.ExpandSwitch = element(by.xpath('//div[@rp-model="page.model.expandAll"]'));
    this.pageContentAttachNotes = element(by.exactBinding('::page.content.attachNotes'));
    this.pageContentAttachNotesShouldHaveText = function (value) {
        expect(this.pageContentAttachNotes.getText()).toBe(value);
    };
    this.pageContentAttachNotesShouldHaveClass = function (className) {
        this.pageContentAttachNotes.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentAttachNotesShouldNotHaveClass = function (className) {
        this.pageContentAttachNotes.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageModelExpandAll = element(by.model('page.model.expandAll'));
    this.clickPageModelExpandAll = function () {
        this.ExpandSwitch.click();
    };
    //Click on Hamburger menu and select the menu item respectively
    this.Hamburger = element(by.css('[ng-click="$ctrl.toggle()"]'));
    this.clickHamburger= function () {
        this.Hamburger.click();
    }
    this.pageModelExpandAllShouldBeSelected = function () {
        expect(this.pageModelExpandAll.isSelected()).toBeTruthy();
    };
    this.pageModelExpandAllShouldNotBeSelected = function () {
        expect(this.pageModelExpandAll.isSelected()).toBeFalsy();
    };
    this.pageModelExpandAllShouldBeVisible = function () {
        expect(this.pageModelExpandAll.isDisplayed()).toBeTruthy();
    };
    this.pageModelExpandAllShouldNotBeVisible = function () {
        expect(this.pageModelExpandAll.isDisplayed()).toBeFalsy();
    };
    this.pageModelExpandAllShouldBeEnabled = function () {
        expect(this.pageModelExpandAll.isEnabled()).toBeTruthy();
    };
    this.pageModelExpandAllShouldNotBeEnabled = function () {
        expect(this.pageModelExpandAll.isEnabled()).toBeFalsy();
    };
    this.pageModelExpandAllShouldHaveClass = function (className) {
        this.pageModelExpandAll.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageModelExpandAllShouldNotHaveClass = function (className) {
        this.pageModelExpandAll.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageContentExpandAll = element(by.exactBinding('::page.content.expandAll'));
    this.pageContentExpandAllShouldHaveText = function (value) {
        expect(this.pageContentExpandAll.getText()).toBe(value);
    };
    this.pageContentExpandAllShouldHaveClass = function (className) {
        this.pageContentExpandAll.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentExpandAllShouldNotHaveClass = function (className) {
        this.pageContentExpandAll.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageModelNotes = element.all(by.exactRepeater('item in page.model.notes'));
    this.pageModelNotesCountShouldBe = function (count) {
        expect(this.pageModelNotes.count()).toBe(count);
    };
    this.itemSubjectShouldHaveText = function (rowIndex1, value) {
        expect(this.pageModelNotes.get(rowIndex1).element(by.exactBinding('item.subject')).getText()).toBe(value);
    };
    this.itemSubjectShouldHaveClass = function (rowIndex1, className) {
        this.pageModelNotes.get(rowIndex1).element(by.exactBinding('item.subject')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.itemSubjectShouldNotHaveClass = function (rowIndex1, className) {
        this.pageModelNotes.get(rowIndex1).element(by.exactBinding('item.subject')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.itemBodyShouldHaveText = function (rowIndex1, value) {
        expect(this.pageModelNotes.get(rowIndex1).element(by.exactBinding('item.body')).getText()).toBe(value);
    };
    this.itemBodyShouldHaveClass = function (rowIndex1, className) {
        this.pageModelNotes.get(rowIndex1).element(by.exactBinding('item.body')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.itemBodyShouldNotHaveClass = function (rowIndex1, className) {
        this.pageModelNotes.get(rowIndex1).element(by.exactBinding('item.body')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageContentModifiedByShouldHaveText = function (rowIndex1, value) {
        expect(this.pageModelNotes.get(rowIndex1).element(by.exactBinding('::page.content.modifiedBy')).getText()).toBe(value);
    };
    this.pageContentModifiedByShouldHaveClass = function (rowIndex1, className) {
        this.pageModelNotes.get(rowIndex1).element(by.exactBinding('::page.content.modifiedBy')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentModifiedByShouldNotHaveClass = function (rowIndex1, className) {
        this.pageModelNotes.get(rowIndex1).element(by.exactBinding('::page.content.modifiedBy')).getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
};
module.exports = new notesPageObject();