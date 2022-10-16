import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
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
	
	@Input() annoinfo: any;

	catalogtype = 'dataset:ActivityRepositoryInitialReadLocalFile';
	uploadfnotsuccessful = 'Upload of local file not successful';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
    title = 'Read Local File Activity Informaton for Transaction';
    
    
	infoform: FormGroup;
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

	}

	ngOnInit(): void {
		this.infoform = this._formBuilder.group({
			FileSourceIdentifier: ['No file selected'],
			Identifier: ['No file', Validators.required]
		});
	}
	
	invalid(): boolean {
	     let ans = true;
	     if(this.reposfile != null) {
			 ans = this.reposfile.invalid() || this.infoform.invalid;
		 }
		 return ans;
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
		const filesrcid = this.infoform.get('FileSourceIdentifier').value;
		catalog[this.annoinfo['dataset:FileSourceIdentifier'][this.identifier]] = filesrcid;
		this.reposfile.getData(catalog);
		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
	}
	setData(catalog: any) {
		const filesrcid = catalog[this.annoinfo['dataset:FileSourceIdentifier'][this.identifier]];
		this.infoform.get('Identifier').setValue(filesrcid);
		this.infoform.patchValue({
			FileSourceIdentifier: filesrcid
		});
		this.cd.detectChanges();
		this.reposfile.setData(catalog);
	}

}
