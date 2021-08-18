import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { ModelParameterAnnotations } from '../../models/modelparameterannotations';
import { Observable } from 'rxjs';
import { DatePickerComponent } from 'ng2-date-picker';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GenericdatapickerComponent } from '../../utilities/genericdatapicker/genericdatapicker.component';

@Component({
  selector: 'app-descriptiondata',
  templateUrl: './descriptiondata.component.html',
  styleUrls: ['./descriptiondata.component.css']
})


export class DescriptiondataComponent implements OnInit {

  @Input() titleparam: Observable<any>;
  @Input() descrparam: Observable<any>;
  @Input() keywordparam: Observable<any>;
  @Input() classifications: Observable<any>;
  @Input() classificationtitle: string;
  @Input() defaultvalue: string;
  @Input() allowFreeChoice: boolean;

  datevalue = new Date();
  
  @ViewChild('dayPicker') datePicker: DatePickerComponent;
  open() { this.datePicker.api.open(); }
  close() { this.datePicker.api.close(); }
  show: boolean = false;
  title = new FormControl('one line title');
  description: string = "sldfjwe lsdjg wldjg wldgw slkdjfwl sldfj sldfjw sdlfjf";
  concept: string = "concept";
  purpose: string = "purpose";
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(public dialog: MatDialog) {

  }
  ngOnInit(): void {
	
    this.titleparam.subscribe(val => {

    })
    this.descrparam.subscribe(val => {

    })
  }

  valueChanged(changedtitle) {
  }

  toggleRest(showit) {
    this.show = showit;
  }

chooseDate() {
    alert("chooseDate");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    const dialogRef = this.dialog.open(GenericdatapickerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.datevalue = result;
    });

  }
}

