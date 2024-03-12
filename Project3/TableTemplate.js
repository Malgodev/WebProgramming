/* eslint-disable max-classes-per-file */
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

class TableTemplate{
    static fillIn(id, dict, columnName){
        const table = document.getElementById(id);
        const rows = table.rows;
        const header = rows.item(0);

        const proc = new TemplateProcessor(header.innerHTML);
        const newHeader = proc.fillIn(dict);
        header.innerHTML = newHeader;

        let cols = [];
        if (columnName === undefined) {
            cols = Array.from(Array(header.cells.length).keys());
        } else {
            for (let i = 0; i < header.cells.length; ++ i) {
                if (header.cells[i].innerHTML === columnName) {
                    cols = [i];
                }
            }
        }

        for (let i = 1; i < table.rows.length; ++ i) {
            const row = table.rows[i];
            for (let j = 0; j < cols.length; ++ j) {
                const tmpCell = row.cells[cols[j]];
                const tmpProc = new TemplateProcessor(tmpCell.innerHTML);
                tmpCell.innerHTML = tmpProc.fillIn(dict);
            }
        }

        if (table.style.visibility === 'hidden') {
            table.style.visibility = 'visible';
        }
    }
}