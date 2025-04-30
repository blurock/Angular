import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VisualizefileComponent } from '../../../../dialog/visualizefile/visualizefile.component';
import { DatasetrepositoryfileComponent } from '../datasetrepositoryfile/datasetrepositoryfile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogactivitybaseComponent } from '../../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';

@Component({
	selector: 'app-activityrepositoryinitialreadlocalfile',
	templateUrl: './activityrepositoryinitialreadlocalfile.component.html',
	styleUrls: ['./activityrepositoryinitialreadlocalfile.component.scss'],
	standalone: true,
	imports: [MatGridListModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatIconModule,
	ReactiveFormsModule,
	CommonModule,
	DatasetrepositoryfileComponent]
})
export class ActivityrepositoryinitialreadlocalfileComponent extends CatalogactivitybaseComponent {
	uploadfnotsuccessful = 'Upload of local file not successful';
    title = 'Read Local File Activity Informaton for Transaction';

	infoform: UntypedFormGroup;
	maintainer: string = '';
	dataimage: string = '';

	@ViewChild('reposfile') reposfile!: DatasetrepositoryfileComponent;

	constructor(
		manageuser: ManageuserserviceService,
		private _formBuilder: UntypedFormBuilder,
		public dialog: MatDialog,
		cd: ChangeDetectorRef,
		constants: UserinterfaceconstantsService,
		annotations: OntologycatalogService) {
		super(constants,annotations,cd);
		this.catalogtype = 'dataset:ActivityRepositoryInitialReadLocalFile';
		this.infoform = this._formBuilder.group({
			FileSourceIdentifier: ['', Validators.required],
			Identifier: ['No file', Validators.required]
		});


		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		
		this.getCatalogAnnoations();

	}

	
	invalid(): boolean {
	     let ans = true;
	     if(this.reposfile != null) {
			 ans = this.reposfile.invalid() || this.infoform.invalid;
		 }
		 return ans;
	}
	
	uploadFileEvt(imgFile: any): void {
		if (imgFile.target.files && imgFile.target.files[0]) {
		const f = (imgFile.target as HTMLInputElement);
		if(f.files != null) {
			const file = f.files![0];
			this.infoform.patchValue({
				FileSourceIdentifier: file.name
			});
			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.dataimage = e.target.result;
			};
			reader.readAsText(imgFile.target.files[0]);
			} else {
				
			}
		} else {

		}
	}

	displayFile(): void {
		const myDialogRef = this.dialog.open(VisualizefileComponent, {
			data: { filename: this.infoform.get('FileSourceIdentifier')?.value ?? '', dataimage: this.dataimage },
		});

	}
	
	getDataImage(): string {
		return this.dataimage;
	}
	
	override annotationsFound(response: any): void {
		super.annotationsFound(response);
	this.title = this.annoinfo['dataset:ActivityRepositoryInitialReadLocalFile'][this.rdfslabel];
    }

	override getData(catalog: any): void {
		catalog[this.annoinfo['dataset:FileSourceIdentifier'][this.identifier]] = this.dataimage;
		catalog[this.annoinfo['dataset:FileSourceMediaSubType'][this.identifier]] = '';
		catalog[this.annoinfo['dataset:FileSourceMediaType'][this.identifier]] = Ontologyconstants.textfile;
		catalog[this.annoinfo['dataset:UploadFileSource'][this.identifier]] = Ontologyconstants.StringSource;
		
		this.reposfile.getData(catalog);
	}
	override setData(c: any) {
		super.setData(c);
		const filesrcid = this.infoform.get('FileSourceIdentifier')?.value ?? '';
		this.reposfile.setData(this.catalog);
	}

}
