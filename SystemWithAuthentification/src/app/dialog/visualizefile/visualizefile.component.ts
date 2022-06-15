import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-visualizefile',
  templateUrl: './visualizefile.component.html',
  styleUrls: ['./visualizefile.component.scss']
})
export class VisualizefileComponent implements OnInit {

	@Input() dataimage: any;
	@Input() filename: string;

  constructor(    
    public dialogRef: MatDialogRef<VisualizefileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
) { }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
