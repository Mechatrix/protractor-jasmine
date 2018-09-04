var browser = require("protractor").protractor.browser;
var docspage = require('../../Page objects/Dashboard/dashboard_docs.po');
var loginpage = require('../../Page objects/Common/loginpage.po')
var commonlib = require('../../Page objects/Common/common.po');
var path = require('path');
var until = protractor.ExpectedConditions;
describe('PW-38469_Documents', function () {
	jasmine.getEnv().topSuite().beforeEach({
		fn: function () {
			loginpage.Login(browser.params.login.Normaluser, browser.params.login.Normalpass);
			browser.sleep(5000);
			commonlib.Navigateto('Dashboard', 'Documents');
			commonlib.CheckUrlContains('/documents');
		}
	});
	it('should able to Upload a Single file and add Description', function () {
		commonlib.WaitForPageLoad();
		docspage.clickAdddocs();
		browser.sleep(2000);
		//Check for button is disabled before attach
		expect(docspage.upload.getAttribute('disabled')).toEqual('true');
		var fileToUpload = '../../../../utilities/sample.jpg';
		var absolutePath = path.resolve(__dirname, fileToUpload);
		$('input[type="file"]').sendKeys(absolutePath);
		docspage.Uploadall();
		//docspage.Closepane();
		browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
		browser.sleep(3000);
		//Add Description
		docspage.DocumentDesc('Sample Description by Automated Tests');
		switch (env) {
			case 'PROD':
			case 'OCR':
				element.all(by.cssContainingText('.created-by', 'gsathish')).get(0).click();
				break;
			case 'SAT':
			case 'SIT':
				element.all(by.cssContainingText('.created-by', 'jhedrick')).get(0).click();
				break;
		}
		commonlib.WaitForPageLoad();
	});
	it('should able to View Download URL,Download,Delete from Actions Menu', function () {
		commonlib.WaitForPageLoad();
		//Edit actions
		docspage.actionsmenu();
		browser.sleep(2000);
		docspage.actionsmenuitem('View Download Url');
		browser.sleep(3000);
		//docspage.modalclose();
		browser.actions().
		sendKeys(protractor.Key.ESCAPE).
		perform();
	});
	it('should able to Download from Actions Menu', function () {
		commonlib.WaitForPageLoad();
		//Edit actions
		docspage.actionsmenu();
		browser.sleep(2000);
		docspage.actionsmenuitem('Download Document');
		browser.sleep(3000);
		//docspage.modalclose();
		browser.actions().
		sendKeys(protractor.Key.ESCAPE).
		perform();
	});
	it('should able to Upload a file and push to Tenant', function () {
		commonlib.WaitForPageLoad();
		docspage.clickAdddocs();
		browser.sleep(5000);
		var fileToUpload = '../../../../utilities/sample.docx';
		var absolutePath = path.resolve(__dirname, fileToUpload);
		$('input[type="file"]').sendKeys(absolutePath);
		//Tenant enable
		docspage.PushtoTenant();
		//element(by.xpath('//div[@rp-model="record.tenant"]')).click();
		browser.sleep(3000);
		//Check the count
		docspage.CheckCount('1');
		docspage.Uploadall();
		//docspage.Closepane();
		commonlib.WaitForPageLoad();
	});
	it('should able to Upload a file and push to Owner', function () {
		commonlib.WaitForPageLoad();
		docspage.clickAdddocs();
		browser.sleep(5000);
		var fileToUpload = '../../../../utilities/sample.pdf';
		var absolutePath = path.resolve(__dirname, fileToUpload);
		$('input[type="file"]').sendKeys(absolutePath);
		//Tenant enable
		docspage.PushtoOwner();
		browser.sleep(3000);
		//Check the count
		docspage.CheckCount('1');
		docspage.Uploadall();
		//docspage.Closepane();
		commonlib.WaitForPageLoad();
	});
	it('should able to not able upload files after Remove all is clicked and must be removed from grid', function () {
		commonlib.WaitForPageLoad();
		docspage.clickAdddocs();
		docspage.UploadDocs();
		//Remove all from the table
		docspage.removeall();
		//docspage.Closepane();
		commonlib.WaitForPageLoad();
	});
	it('should able to Upload mutiple files of different file types at a time', function () {
		commonlib.WaitForPageLoad();
		docspage.clickAdddocs();
		docspage.UploadDocs();
		//Upload all
		docspage.Uploadall();
		//docspage.Closepane();
		commonlib.WaitForPageLoad();
	});
	it('should able to Delete from Actions Menu', function () {
		commonlib.WaitForPageLoad();
		//Edit actions
		docspage.actionsmenu();
		browser.sleep(2000);
		docspage.actionsmenuitem('Delete Document');
		browser.sleep(3000);
		//docspage.modalclose();
		docspage.Submit();
		commonlib.WaitForPageLoad();
	});
	it('should able to Delete all', function () {
		commonlib.WaitForPageLoad();
		element(by.css('.rp-select-all-state')).click();
		browser.sleep(2000);
		element(by.css('[ng-click="page.selectedFilesDelete()"]')).click();
		//docspage.modalclose();
		docspage.Submit();
		commonlib.WaitForPageLoad();
	});
	//*************************************Hold this block for Drag & Drop,Private dropdowns*************//
	// it('should able to Upload file using Drag & Drop', function () {
	//     browser.waitForAngular();
	//     browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
	//     docspage.clickAdddocs();
	//     browser.sleep(5000);
	//     var fileToUpload = '../../../../utilities/sample.jpg';
	//     var absolutePath = path.resolve(__dirname, fileToUpload);
	//     // drop an image file on the drop area
	//     dropFile($('.aside-doc-file-container'), absolutePath);
	//     //browser.pause();
	//     // wait for the droped image to be displayed in the drop area
	//     browser.wait(until.presenceOf($("#holder[style*='data:image']")));
	//     docspage.Uploadall();
	//     browser.sleep(5000);
	// });
	// it('should able to make a file private', function () {
	//     browser.waitForAngular();
	//     browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
	//     //browser.pause();
	//     //Make Private
	//     //filter through each row using the ng-repeat as locator
	//     $$('[ng-repeat="config in model.config"]').filter(function (foo) {
	//         //check for the text in the td with index 1
	//         return foo.$$('td').get(1).getText().then(function (bar) {
	//             //return the row which has your value
	//             return bar === "sample.jpg";
	//         });
	//         //Here you can use the elements in the row with your value
	//         //So you'd want to click the checkbox
	//     }).then(function (values) {
	//         values[0].$('[type="checkbox"]').click();
	//     });
	//     //browser.pause();
	//     browser.waitForAngular();
	//     browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
	// });
});