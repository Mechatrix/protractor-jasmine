{

    var mailgun = require('mailgun-js')({
        apiKey: "key-e54755ce6cfeb207651e317644a4a9f5",
        domain: "sandboxf7f61b55c51e48ba8076d0b30be56438.mailgun.org"
    });
    var path = require('path');
    var fs = require('fs');
     
    //var file2 = path.resolve(__dirname, '../tests/e2e/reports/e2e/protractor-jasmine2-screenshot-reporter/index.html');  
    //var data2 = fs.readFileSync(file2);
    
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

    var file = path.resolve(__dirname, '../Automation-Reports-Archive');
    var data1 = fs.readFileSync(file);

    //For Datetimetsamp
    var dt = new Date();
    var utcDate = dt.toUTCString();
    //alert(utcDate)

    var data = {
        from: 'RAUL - Automation reports (Auto-Mailer) <pwqasit1@gmail.com>',
        to: 'vinaykumar.badugu@realpage.com',
        subject: 'RAUL-PWM - Automation Suite Results :' + today,
        // HTML body
        text: 'Testing some Mailgun awesomeness!',
        html: '<p><b>Hi Team,</b></p>' +
            '<p>Please find the attached Reports for the Automation Suite ran on </p>' + utcDate +
            '<p>Regards,</p>' +
            '<p>PWM- RAUL Automation Team</p>' +
            '<p><b>Note:</b>Please Do Not Reply to this Email</p>',
        attachment: file
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });

}