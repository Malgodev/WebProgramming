'use strict';

class TemplateProcessor {
    constructor(template) {
        this.template = template;
    }

    fillIn(dict) {
        let filledTemplate = this.template;
        // eslint-disable-next-line guard-for-in
        for (const key in dict){
            filledTemplate = filledTemplate.replace(new RegExp('\\{\\{' + key + '\\}\\}'), dict[key]);
        }
        filledTemplate = filledTemplate.replace(/\{\{\w+\}\}/, "");
        return filledTemplate;
    }
}