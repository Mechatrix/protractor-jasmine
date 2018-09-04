var path = require('path');
var docsPageObject = function () {
    var pushtotenant =  element(by.xpath('//div[@rp-model="record.tenant"]'));
    var pushtoowner = element(by.xpath('//div[@rp-model="record.owner"]'));
    var DocCount = element(by.css('.m-r-xs'));
    this.get = function () {
        browser.get('');
    };
    //Click on Hamburger menu and select the menu item respectively
    this.Hamburger = element(by.css('[ng-click="$ctrl.toggle()"]'));
    this.clickHamburger = function () {
        this.Hamburger.click();
    }
    this.addDoc = element(by.css('[ng-click="page.addNewDocuments()"]'));
    this.clickAdddocs = function () {
        this.addDoc.click();
    }
    this.docbtn = element(by.xpath('//div[@rp-model="page.files"]'));
    this.UploadDocs = function () {
        this.docbtn.click();
    }
    this.upload = element(by.css('[ng-click="page.uploadCsvData()"]'));
    this.Uploadall = function () {
        this.upload.click();
    }
    this.modal = element(by.css('.rp-btn.primary:hover'));
    this.modalclose = function () {
        this.modal.click();
    }
    this.remove = element(by.css('[ng-click="page.removeAllFiles()"]'));
    this.removeall = function () {
        this.remove.click();
    }
    this.close = element(by.css('.rp-btn.primary'));
    this.Closepane = function () {
        this.close.click();
    }
    this.Submit = function () {
        element(by.css('[ng-click="page[page.deleteContent.clickEvent](page.deleteContent.item)"]')).click();
    }
    this.actionsmenu = function(){
        element.all(by.css('.rp-actions-menu')).get(0).click();
    }
    this.actionsmenuitem = function (item) {
        element.all(by.cssContainingText('.rp-actions-menu-item', item)).get(0).click();
    }
    this.PushtoTenant = function () {
        pushtotenant.click();
    }
    this.PushtoOwner = function () {
        pushtoowner.click();
    }
    this.CheckCount = function (count) {
        expect(DocCount.getText()).toEqual(count);
    }
    this.UploadDocs = function () {
        browser.sleep(5000);
        var jpeg = '../../../../utilities/sample.jpg';
        var pdf = '../../../../utilities/sample.pdf';
        var png = '../../../../utilities/sample.png';
        var txt = '../../../../utilities/sample.txt';
        var doc = '../../../../utilities/sample.docx';
        var xlsx = '../../../../utilities/sample.xlsx';
        var absolutePath1 = path.resolve(__dirname, jpeg);
        var absolutePath2 = path.resolve(__dirname, pdf);
        var absolutePath3 = path.resolve(__dirname, png);
        var absolutePath4 = path.resolve(__dirname, txt);
        var absolutePath5 = path.resolve(__dirname, doc);
        var absolutePath6 = path.resolve(__dirname, xlsx);
        $('input[type="file"]').sendKeys(absolutePath1 + "\n" + absolutePath2 + "\n" + absolutePath3 + "\n" +
            absolutePath4 + "\n" + absolutePath5 + "\n" + absolutePath6);
        browser.sleep(10000);
        //Check the count
        expect(element(by.css('.m-r-xs')).getText()).toEqual("6");
    }
    var elem = element.all(by.css('.document-span-content'));
    this.DocumentDesc = function (text) {
        browser.actions().doubleClick(elem.get(0)).click().sendKeys(text).perform();
    }
    this.pageContentPageHeading = element(by.exactBinding('::page.content.pageHeading'));
    this.pageContentPageHeadingShouldHaveText = function (value) {
        expect(this.pageContentPageHeading.getText()).toBe(value);
    };
    this.pageContentPageHeadingShouldHaveClass = function (className) {
        this.pageContentPageHeading.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentPageHeadingShouldNotHaveClass = function (className) {
        this.pageContentPageHeading.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.div0 = element(by.css('div.document-page > div.document-row > div.document-header-right'));
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
    this.pageContentDownloadAll = element(by.exactBinding('::page.content.downloadAll'));
    this.pageContentDownloadAllShouldHaveText = function (value) {
        expect(this.pageContentDownloadAll.getText()).toBe(value);
    };
    this.pageContentDownloadAllShouldHaveClass = function (className) {
        this.pageContentDownloadAll.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentDownloadAllShouldNotHaveClass = function (className) {
        this.pageContentDownloadAll.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.div1 = element(by.css('div.document-page > div.document-addattchment'));
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
    this.pageContentAddAttachment = element(by.exactBinding('::page.content.addAttachment'));
    this.pageContentAddAttachmentShouldHaveText = function (value) {
        expect(this.pageContentAddAttachment.getText()).toBe(value);
    };
    this.pageContentAddAttachmentShouldHaveClass = function (className) {
        this.pageContentAddAttachment.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentAddAttachmentShouldNotHaveClass = function (className) {
        this.pageContentAddAttachment.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.div2 = element(by.css('div.document-page > div.rp-bulk-actions.document-bulkactions > div.rp-bulk-actions-list > div.rp-bulk-action:nth-of-type(1)'));
    this.clickDiv2 = function () {
        this.div2.click();
    };
    this.div2ShouldBeVisible = function () {
        expect(this.div2.isDisplayed()).toBeTruthy();
    };
    this.div2ShouldNotBeVisible = function () {
        expect(this.div2.isDisplayed()).toBeFalsy();
    };
    this.div2ShouldHaveClass = function (className) {
        this.div2.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.div2ShouldNotHaveClass = function (className) {
        this.div2.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageContentDelete = element(by.exactBinding('::page.content.delete'));
    this.pageContentDeleteShouldHaveText = function (value) {
        expect(this.pageContentDelete.getText()).toBe(value);
    };
    this.pageContentDeleteShouldHaveClass = function (className) {
        this.pageContentDelete.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentDeleteShouldNotHaveClass = function (className) {
        this.pageContentDelete.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.div3 = element(by.css('div.document-page > div.rp-bulk-actions.document-bulkactions > div.rp-bulk-actions-list > div.rp-bulk-action:nth-of-type(2)'));
    this.clickDiv3 = function () {
        this.div3.click();
    };
    this.div3ShouldBeVisible = function () {
        expect(this.div3.isDisplayed()).toBeTruthy();
    };
    this.div3ShouldNotBeVisible = function () {
        expect(this.div3.isDisplayed()).toBeFalsy();
    };
    this.div3ShouldHaveClass = function (className) {
        this.div3.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.div3ShouldNotHaveClass = function (className) {
        this.div3.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageContentDownload = element(by.exactBinding('::page.content.download'));
    this.pageContentDownloadShouldHaveText = function (value) {
        expect(this.pageContentDownload.getText()).toBe(value);
    };
    this.pageContentDownloadShouldHaveClass = function (className) {
        this.pageContentDownload.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageContentDownloadShouldNotHaveClass = function (className) {
        this.pageContentDownload.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.pageModelSelectedCount = element(by.exactBinding('page.model.selectedCount'));
    this.pageModelSelectedCountShouldHaveText = function (value) {
        expect(this.pageModelSelectedCount.getText()).toBe(value);
    };
    this.pageModelSelectedCountShouldHaveClass = function (className) {
        this.pageModelSelectedCount.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.pageModelSelectedCountShouldNotHaveClass = function (className) {
        this.pageModelSelectedCount.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
    this.div4 = element(by.css('div.document-page > div.rp-bulk-actions.document-bulkactions > div.rp-bulk-actions-status > div.rp-bulk-action.remove'));
    this.clickDiv4 = function () {
        this.div4.click();
    };
    this.div4ShouldBeVisible = function () {
        expect(this.div4.isDisplayed()).toBeTruthy();
    };
    this.div4ShouldNotBeVisible = function () {
        expect(this.div4.isDisplayed()).toBeFalsy();
    };
    this.div4ShouldHaveClass = function (className) {
        this.div4.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) !== -1).toBeTruthy();
        });
    };
    this.div4ShouldNotHaveClass = function (className) {
        this.div4.getAttribute('class').then(function (classes) {
            expect(classes.split(' ').indexOf(className) === -1).toBeTruthy();
        });
    };
};
module.exports = new docsPageObject();