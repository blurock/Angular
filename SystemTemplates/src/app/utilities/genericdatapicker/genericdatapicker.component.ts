import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {DatePickerComponent} from 'ng2-date-picker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genericdatapicker',
  templateUrl: './genericdatapicker.component.html',
  styleUrls: ['./genericdatapicker.component.css']
})
export class GenericdatapickerComponent {

  constructor(public dialogRef: MatDialogRef<GenericdatapickerComponent>) {
              }

 dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  myFilter(d: Date): boolean {
		const day = d.getDay();
    const month = d.getMonth();
		const todays_date = d.getDate();
		const todaysDateObject = new Date();
		const today = todaysDateObject.getDate();
    const actualMonth = todaysDateObject.getMonth();
    console.log(todays_date)

    	/** Prevent actual system date from being selected.*/
    if (month === actualMonth && todays_date === today) {
      return false;
    } else if (day !== 0 && day !== 6) {
      return true;
    } else {
      return false;
    }

		/** Prevent Saturday, Sunda.*/
//		return day !== 0 && day !== 6;
  }
 /* @ViewChild('dayPicker') datePicker: DatePickerComponent;  
 open() { this.datePicker.api.open(); }  
 close() { this.datePicker.api.close(); }
 */
}
