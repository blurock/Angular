import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { NavItem } from '../../primitives/nav-item';
import { MenutreeserviceService } from '../../services/menutreeservice.service';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from '../../primitives/menu-item/menu-item.component';
import { MatIconModule } from '@angular/material/icon';
import {UserinterfaceconstantsService} from '../../const/userinterfaceconstants.service';

@Component({
	selector: 'app-fetchcatalogobject',
	templateUrl: './fetchcatalogobject.component.html',
	styleUrls: ['./fetchcatalogobject.component.scss'],
	standalone: true,
	imports: [MatFormFieldModule, MatCardModule, MatGridListModule,FormsModule,MenuItemComponent,
		CommonModule, ReactiveFormsModule, MatSelectModule, MatInput,MatMenuModule,MenuItemComponent,MatIconModule]
})
export class FetchcatalogobjectComponent implements OnInit {
	filenamehint: string;
	filesourceidentifierlabel: string;
	imageURL: string = '';
	message: string = 'message';
	uploadForm: UntypedFormGroup;
	idForm: UntypedFormGroup;
	dataimage = 'text';
	catalog: any;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	statusitems = 'dataset:CatalogDataObjectStatus';

	items: NavItem[] = [];

	annoinfo: any;
	maintainer: string;
	catalogtype: string
	fromdatabase: boolean

	constructor(
		private constants: UserinterfaceconstantsService,
		private dialogRef: MatDialogRef<FetchcatalogobjectComponent>,
		private menusetup: MenutreeserviceService,
		private runservice: RunserviceprocessService,
		private fb: UntypedFormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any,

	) {
		this.filenamehint = this.constants.filenamehint;
		this.filesourceidentifierlabel = this.constants.filesourceidentifierlabel;
		
		
		this.annoinfo = data['annoinfo'];
		this.maintainer = data['maintainer'];
		this.fromdatabase = data['fromdatabase'];
		this.catalogtype = data['catalogtype'];

		this.uploadForm = this.fb.group({
			FileSourceIdentifier: ['No file selected'],
		});

		this.idForm = this.fb.group({
			DatasetName: ['', Validators.required],
			DatasetVersion: ['', Validators.required],
			CatalogObjectUniqueGenericLabel: ['', Validators.required],
			SimpleCatalogName: ['', Validators.required],
			CatalogDataObjectStatus: ['', Validators.required]
		});
		this.catalog = null;

	}

	ngOnInit(): void {
		this.dataimage = 'texxxxxt';
		if(this.fromdatabase) {
			this.items = this.menusetup.findChoices(this.annoinfo, this.statusitems);
		}
		
	}
	onNoClick(): void {
		this.dialogRef.close();
	}
	fetchFromDatabaseObject() {
		let json: Record<any,unknown> = {};
		json['service'] = 'ReadSpecificCatalogObjectInDataset';
		json[this.annoinfo['dataset:CatalogObjectKey'][this.identifier]] = this.idForm.get('SimpleCatalogName')?.value ?? '';
		json[this.annoinfo['dataset:DatabaseObjectType'][this.identifier]] = this.catalogtype;
		let jsontransspec: Record<any,unknown> = {};
		let specid  = 'dataset:datasetfortypeincollection';
		json[specid] = jsontransspec;
		jsontransspec[this.annoinfo['dataset:CatalogDataObjectStatus'][this.identifier]] = this.idForm.get('CatalogDataObjectStatus')?.value ?? '';
		jsontransspec[this.annoinfo['dataset:DatasetName'][this.identifier]] = this.idForm.get('DatasetName')?.value ?? '';
		jsontransspec[this.annoinfo['dataset:DatasetVersion'][this.identifier]] = this.idForm.get('DatasetVersion')?.value ?? '';
		jsontransspec[this.annoinfo['dataset:CatalogObjectUniqueGenericLabel'][this.identifier]] = this.idForm.get('CatalogObjectUniqueGenericLabel')?.value ?? '';
		jsontransspec['dataset:catalogobjectmaintainer'] = this.maintainer;
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata['dataset:servicesuccessful'];
				if (success == 'true') {
					this.dialogRef.close(responsedata);
				} else {
					this.message = responsedata['dataset:serviceresponsemessage'];
					this.runservice.checkReturn(responsedata);
					this.dialogRef.close(responsedata);
				}
			}
		})
	}

	setDataFromFile(): void {
		if (this.catalog != null) {
			const response:Record<any,unknown> = {};
			response['dataset:servicesuccessful'] = 'true';
			response['dataset:serviceresponsemessage'] = 'Catalog interpreted from file';
			response['dataset:simpcatobj'] = this.catalog;
			this.dialogRef.close(response);
		}
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
	getCatalogObject(): any {
		let catalog = {};
		if (this.dataimage != null) {
			catalog = JSON.parse(this.dataimage);
		}
		return catalog;
	}
	setStatus($event: String): void {
		this.idForm.get('CatalogDataObjectStatus')!.setValue($event);
	}

}
