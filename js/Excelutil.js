var ExcelData = function () {

    var XLSX = require('xlsx');
    const fs = require('fs');

    var workbook = XLSX.readFile('D:\Sample.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    //console.log(xlData);

    let data = JSON.stringify(xlData);
    fs.writeFileSync('student.json', data);

    let rawdata = fs.readFileSync('../e2e/student.json');
    let student = JSON.parse(rawdata);
    //console.log(student);

    //var Output = Excelutil('Morgan')
    //console.log(Output)

    this.xldata = function Excelutil(inputdata) {
        var arr = []
        for (var i in student) {
            if (student[i].Rep == inputdata)
                arr.push(student[i].Item)
        }
        return arr
    }

}

module.exports = new ExcelData();