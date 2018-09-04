var loginpage = require('../../Page objects/Common/loginpage.po')
var logindata = require('../../Test Data/TD.json');
describe('LoginPage', function () {
    it('should login', function () {
        //Main for Non-Angular Applications
        //browser.ignoreSynchronization = true
        isAngularSite(false);
        loginpage.get();
        loginpage.setEmail(browser.params.login.Normaluser);
        loginpage.setPassword(browser.params.login.Normalpass);
        loginpage.clickSignMeInButton();
        isAngularSite(true);
    });
});