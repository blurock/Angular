import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-visualizefile',
  templateUrl: './visualizefile.component.html',
  styleUrls: ['./visualizefile.component.scss']
})
export class VisualizefileComponent implements OnInit {

public filename = 'not initial';
public text: string;
public catalogS = 'not initialized';

  constructor(    
    public dialogRef: MatDialogRef<VisualizefileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
) { 
  this.filename = data['filename'];
  this.text = data['dataimage'];

}

  ngOnInit(): void {
    this.filename = "The File";
  }
  
  onNoClick(): void {
    this.dialogRef.close('Cancel');
     alert('Cancel');
  }
  saveDataClick() {
    this.dialogRef.close('save data file simulation');
     alert('save data file simulation');
  }
}
