import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, FormBuilder, FormGroup} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput} from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {UserinterfaceconstantsService} from '../../const/userinterfaceconstants.service';
import { Ontologyconstants } from 'systemconstants';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-uploadcatalogobject',
  standalone: true,
  imports: [MatFormFieldModule, 
  	MatCardModule, 
  	MatGridListModule,
  	FormsModule,
	CommonModule, 
	ReactiveFormsModule,  
	MatMenuModule,
	MatIconModule,
	MatButtonModule],
  templateUrl: './uploadcatalogobject.component.html',
  styleUrl: './uploadcatalogobject.component.scss'
})
export class UploadcatalogobjectComponent {
	
	uploadForm: FormGroup;
	filesourceidentifierlabel: string;
	filenamehint: string;
	title: string;
	
	catalog: any;
	dataimage = 'text';
	
	constructor(
		private constants: UserinterfaceconstantsService,
		private dialogRef: MatDialogRef<UploadcatalogobjectComponent>,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.title = data.title;
			if(this.title.length == 0) {
			    this.title =this.constants.fetchobjectbutton;
		}
		this.filenamehint = this.constants.filenamehint;
		this.filesourceidentifierlabel = this.constants.uploadfileinfo;
		
		
		this.uploadForm = this.fb.group({
			FileSourceIdentifier: ['No file selected'],
		});
	}
	setDataFromFile(): void {
		if (this.catalog != null) {
			const response:Record<any,unknown> = {};
			response[Ontologyconstants.successful] = 'true';
			response[Ontologyconstants.message] = this.constants.fileuploaded;
			response[Ontologyconstants.catalogobject] = this.catalog;
			this.dialogRef.close(response);
		}
	}
		getCatalogObject(): any {
		let catalog = {};
		if (this.dataimage != null) {
			catalog = JSON.parse(this.dataimage);
		}
		return catalog;
	}

		uploadFileEvt(imgFile: any): void {
		if (imgFile.target.files && imgFile.target.files[0]) {
		const f = (imgFile.target as HTMLInputElement);
		if(f.files != null) {
			const file = f.files![0];
			this.uploadForm.patchValue({
				FileSourceIdentifier: file.name
			});
			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.dataimage = e.target.result;
				this.catalog = this.getCatalogObject();
				this.setDataFromFile();
			};
			reader.readAsText(imgFile.target.files[0]);
			} else {
				
			}
		} else {

		}
	}
	onNoClick(): void {
		this.dialogRef.close();
	}

}
