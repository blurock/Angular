import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';

@Component({
	selector: 'app-fetchcollectiondatasetids',
	templateUrl: './fetchcollectiondatasetids.component.html',
	styleUrls: ['./fetchcollectiondatasetids.component.scss']
})
export class FetchcollectiondatasetidsComponent implements OnInit {
	filenamehint = 'Can be changed from upload name';
	filesourceidentifierlabel = 'File Source Identifier'

	imageURL: string;
	message: string;
	uploadForm: FormGroup;
	idForm: FormGroup;
	dataimage = 'text';
	catalog: any;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	maintainernotchange = true;

	title = 'Fetch Dataset Collection IDs';

	annoinfo: any;
	maintainer: string;
	catalogtype: string
	fromdatabase: boolean

	constructor(
		public dialogRef: MatDialogRef<FetchcollectiondatasetidsComponent>,
		private runservice: RunserviceprocessService,
		public fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any,

	) {
		this.annoinfo = data['annoinfo'];
		this.maintainer = data['maintainer'];
		this.fromdatabase = data['fromdatabase'];
		this.catalogtype = data['catalogtype'];

		this.uploadForm = this.fb.group({
			FileSourceIdentifier: ['No file selected'],
		});

		this.idForm = this.fb.group({
			CatalogDataObjectMaintainer: ['', Validators.required],
			DatasetCollectionsSetLabel: ['', Validators.required],
		});
		this.catalog = null;
	}

	ngOnInit(): void {
		this.dataimage = 'texxxxxt';
		this.idForm.get('CatalogDataObjectMaintainer').setValue(this.maintainer);
	}
		public setMaintainer(maintainer: string): void {
		this.idForm.get('CatalogDataObjectMaintainer').setValue(maintainer);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
	fetchFromDatabase() {
		let json = {};
		json['service'] = 'GetListOfDatasetCollectionIDsSet';
		json['dcterms:creator'] = this.maintainer;
		const recordid = {};
		json['dataset:collectionsetrecordidinfo'] = recordid;
		recordid[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.idForm.get('CatalogDataObjectMaintainer').value;
		recordid[this.annoinfo['dataset:DatasetCollectionsSetLabel'][this.identifier]] = this.idForm.get('DatasetCollectionsSetLabel').value;
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata['dataset:servicesuccessful'];
				if (success == 'true') {
					this.dialogRef.close(responsedata);
				} else {
					this.message = responsedata['dataset:serviceresponsemessage'];
					this.dialogRef.close(responsedata);
				}
			}
		})
	}

	setDataFromFile(): void {
		if (this.catalog != null) {
			const response = {};
			response['dataset:servicesuccessful'] = 'true';
			response['dataset:serviceresponsemessage'] = 'Catalog interpreted from file';
			response['dataset:simpcatobj'] = this.catalog;
			this.dialogRef.close(response);
		}
	}
	uploadFileEvt(imgFile: any): void {
		if (imgFile.target.files && imgFile.target.files[0]) {
			const file = (imgFile.target as HTMLInputElement).files[0];
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
	}
	getCatalogObject(): any {
		let catalog = {};
		if (this.dataimage != null) {
			catalog = JSON.parse(this.dataimage);
		}
		return catalog;
	}

}
