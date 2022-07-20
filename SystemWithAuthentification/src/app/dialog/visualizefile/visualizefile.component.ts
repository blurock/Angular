import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-visualizefile',
  templateUrl: './visualizefile.component.html',
  styleUrls: ['./visualizefile.component.scss']
})
export class VisualizefileComponent implements OnInit {

public filename = 'not initial';
public catalog = {};
public catalogS = 'not initialized';

  constructor(    
    public dialogRef: MatDialogRef<VisualizefileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
) { 
  /*
  this.filename = data['filename'];
  this.catalog = data['dataimage'];
  alert("VisualizefileComponent: " + this.filename);
  if(this.catalog != null) {
    this.catalogS = JSON.stringify(this.catalog);
  } else {
    alert("VisualizefileComponent: no catalog");
  }
  */
}

  ngOnInit(): void {
    this.filename = "The File";
  }
  
  onNoClick(): void {
    this.dialogRef.close('Cancel');
     alert("Cancel");
  }
  saveDataClick() {
    this.dialogRef.close('save data file simulation');
     alert("save data file simulation");
  }
}
