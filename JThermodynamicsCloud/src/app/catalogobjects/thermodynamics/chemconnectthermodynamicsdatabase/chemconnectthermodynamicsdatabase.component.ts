import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { MenutreeserviceService } from 'systemprimitives';
import { NavItem } from 'systemprimitives';
import { DatasetreferenceComponent } from '../../datasetreference/datasetreference.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { SetofdataobjectlinksComponent } from '../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { Ontologyconstants } from 'systemconstants';
import { DatasettransactionspecificationforcollectionComponent } from '../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgIf } from '@angular/common';
import { MenuItemComponent } from 'systemprimitives';
import { MatMenuModule } from '@angular/material/menu';
import { SpecificationfordatasetComponent } from '../../specificationfordataset/specificationfordataset.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';


@Component({
	selector: 'app-chemconnectthermodynamicsdatabase',
	templateUrl: './chemconnectthermodynamicsdatabase.component.html',
	styleUrls: ['./chemconnectthermodynamicsdatabase.component.scss'],
	standalone: true,
	imports: [
			MatCardModule, 
			MatFormFieldModule, 
			MatInputModule, 
			ReactiveFormsModule, NgIf, MatGridListModule,
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
 	
	istransaction: boolean = false;
	transactionpositiontitle: string;
	
	catalogbase:Record<string,any> = {};

	@ViewChild('databasespec') databasespec!: SpecificationfordatasetComponent;
	@ViewChild('datasetspec') datasetspec!: DatasettransactionspecificationforcollectionComponent;
	@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;
	@ViewChild('firestoreidtrans') firestoreidtrans!: FiresytorecatalogidComponent;
	@ViewChild('references') references!: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks!: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks!: SetofsitereferencesComponent;

	constructor(
		public interfaceconst: UserinterfaceconstantsService,
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
			CatalogObjectAccessRead: ['', Validators.required],
			ShortDescription: ['', Validators.required]
		});
		this.transactionpositiontitle = interfaceconst.transactionpositiontitle;

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
		this.catalogbase = catalog;

		this.objectform.get('DatabaseObjectType')!.setValue(catalog[this.annoinfo['dataset:DatabaseObjectType'][this.identifier]]);
		this.objectform.get('CatalogObjectOwner')!.setValue(catalog[this.annoinfo['dataset:CatalogObjectOwner'][this.identifier]]);
		this.objectform.get('CatalogObjectKey')!.setValue(catalog[this.annoinfo['dataset:CatalogObjectKey'][this.identifier]]);
		this.objectform.get('TransactionID')!.setValue(catalog[this.annoinfo['dataset:TransactionID'][this.identifier]]);
		this.objectform.get('CatalogObjectAccessModify')!.setValue(catalog[this.annoinfo['dataset:CatalogObjectAccessModify'][this.identifier]]);
		this.objectform.get('CatalogObjectAccessRead')!.setValue(catalog[this.annoinfo['dataset:CatalogObjectAccessRead'][this.identifier]]);
		this.objectform.get('ShortDescription')!.setValue(catalog[this.annoinfo['dataset:ShortDescription'][this.identifier]]);
		if(this.dataset) {
			this.datasetspec.setData(catalog);
		}  else {
			this.databasespec.setData(catalog);
		}
		if(!this.istransaction) {
			if(catalog[Ontologyconstants.FirestoreCatalogIDForTransaction]) {
			 	this.firestoreidtrans.setData(catalog[Ontologyconstants.FirestoreCatalogIDForTransaction]);
			}
		}
		this.firestoreid.setData(catalog[Ontologyconstants.FirestoreCatalogID]);
		const refs = catalog[this.annoinfo['dataset:BibliographicReferenceLink'][this.identifier]];
		this.references.setData(refs);
		const olinks = catalog[this.annoinfo['dataset:DataObjectLink'][this.identifier]];
		this.objectlinks.setData(olinks);
		const wlinks = catalog[this.annoinfo['dataset:ObjectSiteReference'][this.identifier]];
		this.weblinks.setData(wlinks);

	}
	public getData(catalog: any): void {
		catalog[this.annoinfo['dataset:CatalogObjectID'][this.identifier]] = this.catalogbase[this.annoinfo['dataset:CatalogObjectID'][this.identifier]]
		
		catalog[this.annoinfo['dataset:DatabaseObjectType'][this.identifier]] = this.objectform.get('DatabaseObjectType')?.value ?? '';
		catalog[this.annoinfo['dataset:CatalogObjectOwner'][this.identifier]] = this.objectform.get('CatalogObjectOwner')?.value ?? '';
		catalog[this.annoinfo['dataset:CatalogObjectKey'][this.identifier]] = this.objectform.get('CatalogObjectKey')?.value ?? '';
		catalog[this.annoinfo['dataset:TransactionID'][this.identifier]] = this.objectform.get('TransactionID')?.value ?? '';
		catalog[this.annoinfo['dataset:CatalogObjectAccessModify'][this.identifier]] = this.objectform.get('CatalogObjectAccessModify')?.value ?? '';
		catalog[this.annoinfo['dataset:CatalogObjectAccessRead'][this.identifier]] = this.objectform.get('CatalogObjectAccessRead')?.value ?? '';
		catalog[this.annoinfo['dataset:ShortDescription'][this.identifier]] = this.objectform.get('ShortDescription')?.value ?? '';
		this.references.getData(catalog);
		this.weblinks.getData(catalog);
		this.objectlinks.getData(catalog);
		if(!this.istransaction) {
			this.firestoreidtrans.getData(catalog);
			catalog[Ontologyconstants.FirestoreCatalogIDForTransaction] = catalog[Ontologyconstants.FirestoreCatalogID];
		}
		this.firestoreid.getData(catalog);
		if(this.dataset) {
			this.datasetspec.getData(catalog);
		}  else {
			this.databasespec.getData(catalog);
		}
	}

}
