"use strict";

class TemplateProcessor{
    constructor(template){
        this.template = template;
    }

    fillIn(dict){
        let result = this.template;
        
        for (const key in dict){
            if (Object.prototype.hasOwnProperty.call(dict, key)){
                result = result.replace(new RegExp("\\{\\{" + key + "\\}\\}"), dict[key]);
            }
        }
        result = result.replace(/\{\{\w+\}\}/, "");
        return result;
    }
}

window.TemplateProcessor = TemplateProcessor;


// var template = "My favorite month is {{month}} but not the day {{day}} or the year {{year}}";
// var dateTemplate = new TemplateProcessor(template);

// var dictionary = {month: "July", day: "1", year: "2016"};
// var str = dateTemplate.fillIn(dictionary);
// console.log(str)
// // assert(str === "My favorite month is July but not the day 1 or the year 2016");

// // Case: property doesn't exist in dictionary
// var dictionary2 = {day: "1", year: "2016"};
// var str = dateTemplate.fillIn(dictionary2);
// console.log(str)

// // assert(str === "My favorite month is but not the day 1 or the year 2016");