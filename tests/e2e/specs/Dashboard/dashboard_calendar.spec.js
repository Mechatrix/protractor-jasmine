var browser = require("protractor").protractor.browser;
var calendarpage = require('../../Page objects/Dashboard/dashboard_calendar.po');
var loginpage = require('../../Page objects/Common/loginpage.po');
var commonlib = require('../../Page objects/Common/common.po');
var until = protractor.ExpectedConditions;
describe('PW-38486_Calendar', function () {
	jasmine.getEnv().topSuite().beforeEach({
		fn: function () {
			loginpage.Login(browser.params.login.Normaluser, browser.params.login.Normalpass);
			browser.sleep(5000);
			commonlib.Navigateto('Dashboard', 'Calendar');
			commonlib.CheckUrlContains('/calendar');
		}
	});
	it('should able to Verify the Event Types available and create a event', function () {
		commonlib.WaitForPageLoad();
		//Verify the Default view is Week
		calendarpage.CheckTabText('Week');
		//Select 'Completed' Option in Filter
		commonlib.Dropdown('New Event');
		var array = ['Showing', 'Appointment', 'Inspection', 'Lease Signing', 'Meeting', 'Move In Walk Thru', 'Move Out Walk Thru', 'Other'];
		browser.sleep(5000);
		element(by.id('eventType')).all(by.tagName('option')).each(function (element, index) {
			element.getText().then(function (text) {
				console.log(index, text);
				//expect(array).toContain(text);
			});
		});
		//Default should be Open
		calendarpage.EventTypeText('Other');
		//Send Form Text
		calendarpage.FormInput('Other', 'F');
		commonlib.Save();
		//verify the event is created
		calendarpage.CheckEvent('Other');
	});
	it('should able to Create a Showing EventType', function () {
		commonlib.WaitForPageLoad();
		switch (env) {
			case 'PROD':
			case 'OCR':
				calendarpage.CreateEvent('Showing', 'Gattu Sathish', 'Lease');
				break;
			case 'SAT':
			case 'SIT':
				calendarpage.CreateEvent('Showing', 'Jeff Hedrick', 'Lease');
				break;
		}
	});
	it('should able to Create a Lease Signing EventType', function () {
		commonlib.WaitForPageLoad();
		switch (env) {
			case 'PROD':
			case 'OCR':
				calendarpage.CreateEvent('Lease Signing', 'Prakash kumar', 'Portfolio');
				break;
			case 'SAT':
			case 'SIT':
				calendarpage.CreateEvent('Lease Signing', 'Elaine Olsen', 'Portfolio');
				break;
		}
	});
	it('should able to Create a Other EventType', function () {
		commonlib.WaitForPageLoad();
		switch (env) {
			case 'PROD':
			case 'OCR':
				calendarpage.CreateEvent('Other', 'Prakash kumar', 'Portfolio');
				break;
			case 'SAT':
			case 'SIT':
				calendarpage.CreateEvent('Other', 'Elaine Olsen', 'Portfolio');
				break;
		}
	});
	it('should able to Create a Appointment EventType', function () {
		commonlib.WaitForPageLoad();
		switch (env) {
			case 'PROD':
			case 'OCR':
				calendarpage.CreateEvent('Appointment', 'Prakash kumar', 'Building');
				break;
			case 'SAT':
			case 'SIT':
				calendarpage.CreateEvent('Appointment', 'Jeff Hedrick', 'Building');
				break;
		}
	});
	it('should able to Create a Meeting EventType', function () {
		commonlib.WaitForPageLoad();
		switch (env) {
			case 'PROD':
			case 'OCR':
				calendarpage.CreateEvent('Meeting', 'Gattu Sathish', 'Lease');
				break;
			case 'SAT':
			case 'SIT':
				calendarpage.CreateEvent('Meeting', 'Jeff Hedrick', 'Lease');
				break;
		}
	});
	it('should able to Create a Move In Walk Thru EventType', function () {
		commonlib.WaitForPageLoad();
		switch (env) {
			case 'PROD':
			case 'OCR':
				calendarpage.CreateEvent('Move In Walk Thru', 'Gattu Sathish', 'Work Order');
				break;
			case 'SAT':
			case 'SIT':
				calendarpage.CreateEvent('Move In Walk Thru', 'Elaine Olsen', 'Work Order');
				break;
		}
	});
	it('should able to Create a Move Out Walk Thru EventType', function () {
		commonlib.WaitForPageLoad();
		switch (env) {
			case 'PROD':
			case 'OCR':
				calendarpage.CreateEvent('Move Out Walk Thru', 'Gattu Sathish', 'Prospect');
				break;
			case 'SAT':
			case 'SIT':
				calendarpage.CreateEvent('Move Out Walk Thru', 'Elaine Olsen', 'Prospect');
				break;
		}
	});
	it('should able to Edit an Event', function () {
		commonlib.WaitForPageLoad();
		//Select Event based on specific text on event
		element.all(by.css('.fc-event')).get(0).click();
		browser.sleep(2000);
		//Select The showing filter
		calendarpage.Filter("Meeting");
		calendarpage.FormInput("Meeting", 'T');
		//Navigate to Share tab
		calendarpage.ShiftTab('Share');
		//Click on User profile checkbox
		switch (env) {
			case 'PROD':
			case 'OCR':
				calendarpage.UserprofileChkbox('Prakash kumar');
				break;
			case 'SAT':
			case 'SIT':
				calendarpage.UserprofileChkbox('Savanna Stanley');
				break;
		}
		//Navigate to Related tab
		calendarpage.ShiftTab('Related');
		calendarpage.AttachItem();
		element(by.xpath('//select[@id="type"]/option[text()="Work Order"]')).click();
		//Search
		element(by.id('search')).sendKeys("*");
		element(by.buttonText('Search')).click();
		browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
		element.all(by.xpath('//div[@rp-model="record.isSelect"]')).get(1).click();
		calendarpage.Apply();
		commonlib.Save();
		browser.wait(until.invisibilityOf($('.rp-busy-indicator-msg')), 5000);
		//verify the event is created
		expect(element(by.cssContainingText('.fc-event', "Meeting")).isPresent()).toBe(true);
		browser.sleep(5000);
	});
	it('should able to view Month,Week,Day view on the calendar', function () {
		commonlib.WaitForPageLoad();
		calendarpage.ValidateCalendarViews();
	});
	it('should able to view Month,Week,Day view on the View Showings', function () {
		calendarpage.ValidateViewshowingsViews();
	});
	it('should not able to Save without Mandatory fields', function () {
		commonlib.WaitForPageLoad();
		//Select 'Completed' Option in Filter
		commonlib.Dropdown('New Event');
		commonlib.Save();
		commonlib.ErrorMessage("Title is required");
		browser.sleep(5000);
	});
	it('should able to Delete the Events', function () {
		commonlib.WaitForPageLoad();
		calendarpage.DeleteEvent();
	});
});