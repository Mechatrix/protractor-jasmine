var zipFolder = require('zip-folder');

//For todays Date only
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}
var today = dd + '-' + mm + '-' + yyyy;

var date = new Date(); // Or the date you'd like converted.
var isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

var archive = 'Automation_Reports_'+isoDate+'.zip'

console.log(archive);

var fs = require('fs');
var dir = 'Automation results-Archive/AutomationReports.zip';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

zipFolder('target', 'AutomationReports.zip', function (err) {
    if (err) {
        console.log('oh no!', err);
    } else {
        console.log('Zipped Bro!!');
    }
});