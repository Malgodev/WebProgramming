'use strict';

class DatePicker{
	constructor(id, callback){
		this.id = id;
		this.callback = callback;
	}

	render(date) {
        var parent = document.getElementById(this.id);
        parent.appendChild(this.CreateCalender(date));
	}

	CreateCalender(date){
        var table = document.createElement("table");
        var header = this.CreateCalenderHeader(table, date);
		var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var rowWeek = header.insertRow(1);
		for (let i = 0; i < 7; i++){
			var tmpCell = rowWeek.insertCell(i);
			tmpCell.innerHTML = daysOfWeek[i];
		}

        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var curDate = new Date(firstDay.getTime());
        curDate.setDate(-firstDay.getDay() + 1);

		var curRow = 2;

		while (true) {
			var row = table.insertRow(curRow++);
            for (var i = 0; i < 7; ++ i) {
                var cell = row.insertCell(i);
                cell.innerHTML = curDate.getDate();

                if (curDate.getMonth() === date.getMonth()) {
                    cell.setAttribute("id", "CurMonth");
                        const ob = {
                            month: curDate.getMonth() + 1,
                            day: cell.innerHTML,
                            year: curDate.getFullYear()
                        };
                    cell.addEventListener("click", () => {
                        this.callback(this.id, ob);
                    });
                } else {
                    cell.setAttribute("id", "OtherMonth");
                }

                curDate.setDate(curDate.getDate() + 1);
            }
			if (curDate.getMonth() !== date.getMonth()) {
                break;
            }
		}

        return table;
	}

	CreateCalenderHeader(table, date){
        var header = table.createTHead();
        var headerRow = header.insertRow(0);

        var leftArrowCell = headerRow.insertCell(0);
        leftArrowCell.innerHTML = "<\t";
        leftArrowCell.setAttribute("id", "LeftArrow");
        
        var monthCell = headerRow.insertCell(1);

        var months = ["Jan", "Feb","Mar", "Apr",
						"May", "Jun", "Jul", "Aug", 
						"Sep", "Oct","Nov","Dec"];

        monthCell.innerHTML = months[date.getMonth()] + "   " + date.getFullYear();
        monthCell.colSpan = "5";

        var rightArrowCell = headerRow.insertCell(2);
        rightArrowCell.innerHTML = "\t>";
        rightArrowCell.setAttribute("id", "RightArrow");

        // event handler.
        leftArrowCell.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() - 1);
            this.render(date);
        });

        rightArrowCell.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() + 1);
            this.render(date);
        });

        return header;
    }
}

var datePicker = new DatePicker("div1", function (id, fixedDate) {
	console.log("DatePicker with id", id,
	"selected date:", fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year
	);
});
datePicker.render(new Date("July 4, 1776"));

// function DatePicker(id) {
// 	this.id = id;
// }

// DatePicker.prototype.render = function(date) {
// 	var week_days = ['sun','mon','tue','wed','thu','fri','sat'];
// 	var tbl = document.createElement('table');
// 	tbl.style.width = '100px';
// 	tbl.style.border = '1px solid black';

// 	var tr = tbl.insertRow();
//     for (let j = 0; j < 7; j++) {
//     	var td = tr.insertCell();
// 	    td.appendChild(document.createTextNode(week_days[j]));
// 	    td.style.border = '1px solid black';
//     }

// 	for (let i = 0; i < 5; i++) {
// 		var tr = tbl.insertRow();
// 		for (let j = 1; j < 8; j++) {
// 		    var td = tr.insertCell();
// 		    td.appendChild(document.createTextNode(7*i+j));
// 		    td.style.border = '1px solid black';
// 		}
// 	}

// 	var elem = document.getElementById(this.id);
// 	elem.appendChild(tbl);
// }

