let assert = require('assert');
const { SlowBuffer } = require('buffer');

class TemplateProcessor {
    constructor(template) {
        this.template = template;
    }

    fillIn(dict) {
        let filledTemplate = this.template;
        for (let key in dict){
            filledTemplate = filledTemplate.replace(new RegExp('\\{\\{' + key + '\\}\\}'), dict[key]);
        }
        filledTemplate = filledTemplate.replace(new RegExp("\\{\\{\\w+\\}\\}"), "");
        return filledTemplate;
    }
}

var template = "My favorite month is {{month}} but not the day {{day}} or the year {{year}}";
var dateTemplate = new TemplateProcessor(template);
var dictionary = {month: "July", day: "1", year: "2016"};
var str = dateTemplate.fillIn(dictionary);
console.log(str === "My favorite month is July but not the day 1 or the year 2016");

// assert(str === "My favorite month is July but not the day 1 or the year 2016");

// Case: property doesn't exist in dictionary
var dictionary2 = {day: "1", year: "2016"};
var str2 = dateTemplate.fillIn(dictionary2);
console.log(str2 === "My favorite month is but not the day 1 or the year 2016");
// assert(str2 === "My favorite month is {{month}} but not the day 1 or the year 2016");
