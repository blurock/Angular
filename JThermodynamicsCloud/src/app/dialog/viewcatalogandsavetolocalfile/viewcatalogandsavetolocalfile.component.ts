import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import * as saveAs from 'file-saver';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-viewcatalogandsavetolocalfile',
	templateUrl: './viewcatalogandsavetolocalfile.component.html',
	styleUrls: ['./viewcatalogandsavetolocalfile.component.scss'],
	standalone: true,
	imports: [MatTabsModule,CommonModule,MatGridListModule,MatCardModule,MatButtonModule,FormsModule,ReactiveFormsModule,MatInputModule]
})

export class ViewcatalogandsavetolocalfileComponent {

	public filename = 'not initial';
	public catalog = {};

	filenamelabel = 'Filename Root';
	hintlabel = 'Root name of the json file (no .json suffix)';
	filenamenotvalid = 'Filename no valid';
	saved = 'Saved to ';
	cancel = 'Canceled';
	title = 'Catalog Object';

	objectform: FormGroup;

	//public catalogS = 'not initialized';

	constructor(
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<ViewcatalogandsavetolocalfileComponent>,
		@Inject(MAT_DIALOG_DATA) public mydata: any
	) {
		this.filename = mydata['filename'];
		this.catalog = mydata['dataimage'];
		if(mydata['title']) {
			this.title = mydata['title'];
		} else {
			this.title = this.filename;
		}

		this.objectform = this.formBuilder.group({
			filename: [this.filename, Validators.required]
		});

	}

	saveDataClick() {
		if (this.objectform.valid) {
			const root = this.objectform.get('filename')!.value;
			const filename = root + '.json';
			const blob = new Blob([JSON.stringify(this.catalog, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			// Clean up the object URL to release memory
			URL.revokeObjectURL(url);

			//saveAs(blob, filename);
			this.dialogRef.close(this.saved + filename);
		} else {
			alert(this.filenamenotvalid)
		}
	}



	closeDialog() { this.dialogRef.close(this.cancel); }

}

