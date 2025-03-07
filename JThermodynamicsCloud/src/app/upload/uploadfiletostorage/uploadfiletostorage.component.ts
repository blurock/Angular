import { Input, Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';

@Component({
	selector: 'app-uploadfiletostorage',
	templateUrl: './uploadfiletostorage.component.html',
	styleUrls: ['./uploadfiletostorage.component.scss']
})
export class UploadfiletostorageComponent implements OnInit {
	@Input() uploadForm: UntypedFormGroup;
	@Input() filemediatype: string;

	filenamehint = "Can be changed from upload name";
	filesourceidentifierlabel = "File Source Identifier"

	imageURL: string;
	constructor(public fb: UntypedFormBuilder) {
	}
	ngOnInit(): void {
	}
	dataimage: any;
	// Image Preview
	showPreview(event) {
		const file = (event.target as HTMLInputElement).files[0];
		this.uploadForm.patchValue({
			avatar: file,
			FileSourceIdentifier: file.name
		});
		this.uploadForm.get('avatar').updateValueAndValidity()
		// File Preview
		const reader = new FileReader();
		reader.onload = () => {
			this.imageURL = reader.result as string;
		}
		reader.readAsDataURL(file)
	}
	uploadFileEvt(imgFile: any) {
		alert(imgFile);
		if (imgFile.target.files && imgFile.target.files[0]) {
			const file = (imgFile.target as HTMLInputElement).files[0];
			this.uploadForm.patchValue({
				avatar: file,
				FileSourceIdentifier: file.name
			});
			let reader = new FileReader();
			reader.onload = (e: any) => {
				this.dataimage = e.target.result;
				alert(this.dataimage);
			};
			reader.readAsText(imgFile.target.files[0]);

		} else {

		}
	}
}
