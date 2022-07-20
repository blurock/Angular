import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewcatalogandsavetolocalfile',
  templateUrl: './viewcatalogandsavetolocalfile.component.html',
  styleUrls: ['./viewcatalogandsavetolocalfile.component.scss']
})
export class ViewcatalogandsavetolocalfileComponent {

  constructor(    
    public dialogRef: MatDialogRef<ViewcatalogandsavetolocalfileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
) {
  
  
 }

closeDialog() { this.dialogRef.close('Cancel event'); }

}

