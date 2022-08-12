import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as saveAs from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewcatalogandsavetolocalfile',
  templateUrl: './viewcatalogandsavetolocalfile.component.html',
  styleUrls: ['./viewcatalogandsavetolocalfile.component.scss']
})
export class ViewcatalogandsavetolocalfileComponent {

public filename = 'not initial';
public catalog = {};

filenamelabel = 'Filename Root';
hintlabel = 'Root name of the json file (no .json suffix)';
filenamenotvalid = 'Filename no valid';
saved = 'Saved to ';
cancel = 'Canceled';

objectform: FormGroup;

//public catalogS = 'not initialized';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewcatalogandsavetolocalfileComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
) {
  this.filename = mydata['filename'];
  this.catalog = mydata['dataimage'];
  
  		this.objectform = this.formBuilder.group({
			filename: [this.filename, Validators.required]
		});

 }
 
   saveDataClick() {
     if(this.objectform.valid) {
       const root = this.objectform.get('filename').value;
       const filename = root + '.json';
       const blob = new Blob([JSON.stringify(this.catalog, null, 2)], {type : 'application/json'});
saveAs(blob, filename);
       this.dialogRef.close(this.saved + filename);
     } else {
       alert(this.filenamenotvalid)
     }
  }
  
  

closeDialog() { this.dialogRef.close(this.cancel); }

}

