import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';
import { DatasetreferenceComponent } from '../../datasetreference/datasetreference.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { SetofdataobjectlinksComponent } from '../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { DatasettransactionspecificationforcollectionComponent } from '../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgIf } from '@angular/common';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { SpecificationfordatasetComponent } from '../../specificationfordataset/specificationfordataset.component';


@Component({
	selector: 'app-chemconnectthermodynamicsdatabase',
	templateUrl: './chemconnectthermodynamicsdatabase.component.html',
	styleUrls: ['./chemconnectthermodynamicsdatabase.component.scss'],
	standalone: true,
	imports: [
			MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, MatGridListModule,
			MenuItemComponent,
			MatMenuModule,
			SetofsitereferencesComponent,
			SetofdataobjectlinksComponent,
			DatasettransactionspecificationforcollectionComponent,
			DatasetreferenceComponent,
			FiresytorecatalogidComponent,
			SpecificationfordatasetComponent 
			]
})

export class ChemconnectthermodynamicsdatabaseComponent implements OnInit {

	@Input() dataset: boolean = true;
	@Input() annoinfo: any;
	@Input() catalogtype: string = '';
	@Output() showCatalogObject = new EventEmitter<any>();

	objectform: UntypedFormGroup;
	objectmenulabel = 'dataset:DatabaseObjectType';
	items: NavItem[] = [];
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	specsubtitle = 'Collection Specification';


	@ViewChild('databasespec') databasespec!: SpecificationfordatasetComponent;
	@ViewChild('datasetspec') datasetspec!: DatasettransactionspecificationforcollectionComponent;
	@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;
	@ViewChild('references') references!: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks!: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks!: SetofsitereferencesComponent;

	constructor(
		private manageuser: ManageuserserviceService,
		private formBuilder: UntypedFormBuilder,
		private menusetup: MenutreeserviceService
	) {
		this.objectform = this.formBuilder.group({
			DatabaseObjectType: ['', Validators.required],
			CatalogObjectOwner: ['', Validators.required],
			CatalogObjectKey: ['', Validators.required],
			TransactionID: ['', Validators.required],
			CatalogObjectAccessModify: ['', Validators.required],
			CatalogObjectAccessRead: ['', Validators.required]
		});


	}

	ngOnInit(): void {
		this.items = this.menusetup.findChoices(this.annoinfo, this.objectmenulabel);
		if (this.catalogtype != null) {
			this.objectform.get('DatabaseObjectType')!.setValue(this.catalogtype);
			this.manageuser.determineMaintainer().subscribe(result => {
				if (result != null) {
					this.objectform.get('CatalogObjectOwner')!.setValue(result);
					this.objectform.get('CatalogObjectAccessModify')!.setValue(result);
					this.objectform.get('CatalogObjectAccessRead')!.setValue(result);
				} else {
					alert(this.manageuser.errormaintainer);
				}
			});
		}
	}
	
	showOutputFromFirestore(firestoreid: any): void {
		this.showCatalogObject.emit(firestoreid);
	}

	setDatabaseObjectType($event: string): void {
		this.objectform.get('DatabaseObjectType')!.setValue($event);
	}

	public setData(catalog: any): void {
		const firestoreidvalues = catalog[this.annoinfo['dataset:FirestoreCatalogID'][this.identifier]];
		this.firestoreid.setData(firestoreidvalues);

		this.objectform.get('DatabaseObjectType')!.setValue(catalog[this.annoinfo['dataset:DatabaseObjectType'][this.identifier]]);
		this.objectform.get('CatalogObjectOwner')!.setValue(catalog[this.annoinfo['dataset:CatalogObjectOwner'][this.identifier]]);
		this.objectform.get('CatalogObjectKey')!.setValue(catalog[this.annoinfo['dataset:CatalogObjectKey'][this.identifier]]);
		this.objectform.get('TransactionID')!.setValue(catalog[this.annoinfo['dataset:TransactionID'][this.identifier]]);
		this.objectform.get('CatalogObjectAccessModify')!.setValue(catalog[this.annoinfo['dataset:CatalogObjectAccessModify'][this.identifier]]);
		this.objectform.get('CatalogObjectAccessRead')!.setValue(catalog[this.annoinfo['dataset:CatalogObjectAccessRead'][this.identifier]]);
		if(this.dataset) {
			this.datasetspec.setData(catalog);
		}  else {
			this.databasespec.setData(catalog);
		}		
		const refs = catalog[this.annoinfo['dataset:DataSetReference'][this.identifier]];
		this.references.setData(refs);
		const olinks = catalog[this.annoinfo['dataset:DataObjectLink'][this.identifier]];
		this.objectlinks.setData(olinks);
		const wlinks = catalog[this.annoinfo['dataset:ObjectSiteReference'][this.identifier]];
		this.weblinks.setData(wlinks);

	}
	public getData(catalog: any): void {
		catalog[this.annoinfo['dataset:DatabaseObjectType'][this.identifier]] = this.objectform.get('DatabaseObjectType')?.value ?? '';
		catalog[this.annoinfo['dataset:CatalogObjectOwner'][this.identifier]] = this.objectform.get('CatalogObjectOwner')?.value ?? '';
		catalog[this.annoinfo['dataset:CatalogObjectKey'][this.identifier]] = this.objectform.get('CatalogObjectKey')?.value ?? '';
		catalog[this.annoinfo['dataset:TransactionID'][this.identifier]] = this.objectform.get('TransactionID')?.value ?? '';
		catalog[this.annoinfo['dataset:CatalogObjectAccessModify'][this.identifier]] = this.objectform.get('CatalogObjectAccessModify')?.value ?? '';
		catalog[this.annoinfo['dataset:CatalogObjectAccessRead'][this.identifier]] = this.objectform.get('CatalogObjectAccessRead')?.value ?? '';
		this.references.getData(catalog);
		this.weblinks.getData(catalog);
		this.objectlinks.getData(catalog);
		this.firestoreid.getData(catalog);
	if(this.dataset) {
		this.datasetspec.getData(catalog);
	}  else {
		this.databasespec.getData(catalog);
	}
	}

}
