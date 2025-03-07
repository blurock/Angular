import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { NameofpersonComponent } from '../../catalogbaseobjects/nameofperson/nameofperson.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';
import { SimpledatabaseobjectstructureComponent } from '../../simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavItem } from '../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { SetofdataobjectlinksComponent } from '../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { DatasetreferenceComponent } from '../../datasetreference/datasetreference.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ContactlocationinformationComponent } from '../../contactlocationinformation/contactlocationinformation.component';
import {SetofcontactinfodataComponent} from '../../catalogbaseobjects/setofcontactinfodata/setofcontactinfodata.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

@Component({
	selector: 'app-databaseperson',
	templateUrl: './databaseperson.component.html',
	styleUrls: ['./databaseperson.component.scss'],
	standalone: true,
	imports: [MatCardModule, MatGridListModule, MatFormFieldModule, MenuItemComponent, CommonModule, MatInputModule,
		ReactiveFormsModule, MatMenuTrigger, MatMenuModule,MatProgressSpinnerModule,
		NameofpersonComponent, DatadatadescriptionComponent,
		SimpledatabaseobjectstructureComponent, DatasetreferenceComponent,
		SetofsitereferencesComponent, SetofdataobjectlinksComponent,
		ContactlocationinformationComponent,SetofcontactinfodataComponent]
})
export class DatabasepersonComponent implements OnInit, AfterViewInit {


	message: string = '';
	catalogtype = 'dataset:DatabasePerson';
	descriptionsuffix = 'Person';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;


	annoinfo: any = null;
	personGroup: FormGroup;
	userclassification = 'dataset:UserClassification';
	userclassificationitems: NavItem[] = [];
	viewinitialized: boolean = false;

	databaseperson: any | null = null;
	
	@Output() setDataChange = new EventEmitter<any>();
	@Output() annoReady = new EventEmitter<any>();

	@ViewChild('nameofperson', { static: false }) nameofperson!: NameofpersonComponent;
	@ViewChild('description') description!: DatadatadescriptionComponent;
	@ViewChild('simpledata') simpledata!: SimpledatabaseobjectstructureComponent;
	@ViewChild('references') references!: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks!: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks!: SetofsitereferencesComponent;
	@ViewChild('location', { static: false }) location!: ContactlocationinformationComponent;
	@ViewChild('contactinfo', { static: false }) contactinfo!: SetofcontactinfodataComponent;

	constructor(
		private menusetup: MenutreeserviceService,
		private formBuilder: FormBuilder,
		private cdRef: ChangeDetectorRef,
		public annotations: OntologycatalogService
	) {
		this.getCatalogAnnoations();
		this.personGroup = this.formBuilder.group({
			UserClassification: ['', Validators.required],
			PersonFullName: ['', Validators.required],
		});

	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.viewinitialized = true;
		if (this.databaseperson) {
			this.setData(this.databaseperson);
		}

	}

	delete(event: String) {

	}

	setUserClassification($event: String) {
		this.personGroup.get('UserClassification')!.setValue($event);
	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				if (responsedata) {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.userclassificationitems = this.menusetup.findChoices(this.annoinfo, this.userclassification);
					this.annoReady.emit();
					this.cdRef.detectChanges();
					if (this.databaseperson) {
						this.setData(this.databaseperson);
					}
				} else {
					this.message = responsedata;
				}
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}

	setData(catalog: any): void {
		this.databaseperson = catalog;
		if(this.setDataChange) {
			this.setDataChange.emit(catalog);
		}
		if (this.viewinitialized && this.annoinfo != null && this.nameofperson) {
			const pdescr = catalog[this.annoinfo['dataset:PersonalDescription'][this.identifier]];
			this.personGroup.get('UserClassification')?.setValue(pdescr[this.annoinfo['dataset:UserClassification'][this.identifier]]);
			this.personGroup.get('PersonFullName')?.setValue(catalog[this.annoinfo['dataset:PersonFullName'][this.identifier]]);
			const name = pdescr[this.annoinfo['dataset:NameOfPerson'][this.identifier]]
			this.nameofperson.setData(name);
			this.simpledata.setData(catalog);
			const descr = catalog[this.annoinfo['dataset:DataDescriptionPerson'][this.identifier]];
			this.description.setData(descr);
			const loc = catalog[this.annoinfo['dataset:ContactLocationInformation'][this.identifier]];
			this.location.setData(loc);
			const refs = catalog[this.annoinfo['dataset:DataSetReference'][this.identifier]];
			this.references.setData(refs);
			const olinks = catalog[this.annoinfo['dataset:DataObjectLink'][this.identifier]];
			this.objectlinks.setData(olinks);
			const wlinks = catalog[this.annoinfo['dataset:ObjectSiteReference'][this.identifier]];
			this.objectlinks.setData(wlinks);
			const contactinfo = catalog[this.annoinfo['dataset:ContactInfoData'][this.identifier]];
			this.contactinfo.setData(contactinfo);
		}
	}

	getData(catalog: any): void {
		const pdescr: Record<string, unknown> = {};
		catalog[this.annoinfo['dataset:PersonalDescription'][this.identifier]] = pdescr;
		pdescr[this.annoinfo['dataset:UserClassification'][this.identifier]] = this.personGroup.get('UserClassification')?.value ?? '';
		catalog[this.annoinfo['dataset:PersonFullName'][this.identifier]] = this.personGroup.get('PersonFullName')?.value ?? '';
		const name: Record<string, unknown> = {};
		this.nameofperson.getData(name);
		pdescr[this.annoinfo['dataset:NameOfPerson'][this.identifier]] = name;
		this.simpledata.getData(catalog);
		this.description.getData(catalog);
		this.references.getData(catalog);
		this.objectlinks.getData(catalog);
		this.weblinks.getData(catalog);
		this.location.getData(catalog);
		this.contactinfo.getData(catalog);
	}

}
