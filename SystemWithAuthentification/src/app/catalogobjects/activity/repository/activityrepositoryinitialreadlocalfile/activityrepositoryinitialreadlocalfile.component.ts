import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisualizefileComponent } from '../../../../dialog/visualizefile/visualizefile.component';
import { DatasetrepositoryfileComponent } from '../datasetrepositoryfile/datasetrepositoryfile.component';

@Component({
	selector: 'app-activityrepositoryinitialreadlocalfile',
	templateUrl: './activityrepositoryinitialreadlocalfile.component.html',
	styleUrls: ['./activityrepositoryinitialreadlocalfile.component.scss']
})
export class ActivityrepositoryinitialreadlocalfileComponent implements OnInit {

	message: string;
	catalogtype = 'dataset:ActivityRepositoryInitialReadLocalFile';
	uploadfnotsuccessful = 'Upload of local file not successful';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	infoform: FormGroup;
	catalogobj: any;
	annoinfo: any;
	maintainer: string;
	dataimage = null;

	@ViewChild('reposfile') reposfile: DatasetrepositoryfileComponent;

	constructor(
		public annotations: OntologycatalogService,
		manageuser: ManageuserserviceService,
		private _formBuilder: FormBuilder,
		public dialog: MatDialog,
		private cd: ChangeDetectorRef
	) {


		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
				} else {
					alert("Error: " + JSON.stringify(responsedata));
					this.message = JSON.stringify(responsedata);
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});


	}

	ngOnInit(): void {
		this.infoform = this._formBuilder.group({
			FileSourceIdentifier: ['No file selected'],
			Identifier: ['No file', Validators.required]
		});
	}
	uploadFileEvt(imgFile: any): void  {
		if (imgFile.target.files && imgFile.target.files[0]) {
			alert('uploadFileEvt(imgFile: any) 1' + imgFile);

			const file = (event.target as HTMLInputElement).files[0];
			this.infoform.patchValue({
				FileSourceIdentifier: file.name
			});
			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.dataimage = e.target.result;

			};
			reader.readAsText(imgFile.target.files[0]);

		} else {
			alert(this.uploadfnotsuccessful);
		}
	}

	displayFile(): void {
		const myDialogRef = this.dialog.open(VisualizefileComponent, {
			data: { filename: this.infoform.get('FileSourceIdentifier').value, dataimage: this.dataimage },
		});

	}

	getData(catalog: any): void {
		const spec = this.infoform.get('FileSourceIdentifier').value;
		catalog[this.annoinfo['dataset:FileSourceIdentifier'][this.identifier]] = spec;
		this.reposfile.getData(catalog);
	}
	setData(catalog: any) {
		const spec = catalog[this.annoinfo['dataset:FileSourceIdentifier'][this.identifier]];
		this.infoform.get('Identifier').setValue(spec);
		this.infoform.patchValue({
			FileSourceIdentifier: spec
		});
		this.cd.detectChanges();
		this.reposfile.setData(catalog);
	}

}