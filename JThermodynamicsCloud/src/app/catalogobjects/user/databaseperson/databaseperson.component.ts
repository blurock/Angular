import { Component, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { NameofpersonComponent } from '../../catalogbaseobjects/nameofperson/nameofperson.component';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavItem } from 'systemprimitives';
import { MenutreeserviceService } from 'systemprimitives';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuItemComponent } from 'systemprimitives';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ContactlocationinformationComponent } from '../../contactlocationinformation/contactlocationinformation.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {ChemconnectdatastructureComponent} from '../../chemconnectdatastructure/chemconnectdatastructure.component';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';

@Component({
	selector: 'app-databaseperson',
	templateUrl: './databaseperson.component.html',
	styleUrls: ['./databaseperson.component.scss'],
	standalone: true,
	imports: [MatCardModule, 
	MatGridListModule, 
	MatFormFieldModule, 
	MenuItemComponent, 
	CommonModule, MatInputModule,
		ReactiveFormsModule, MatMenuTrigger, MatMenuModule,MatProgressSpinnerModule,
		NameofpersonComponent, 
		DatadatadescriptionComponent,
		ContactlocationinformationComponent,
		ChemconnectdatastructureComponent]
})
export class DatabasepersonComponent extends CatalogbaseComponent implements OnInit, AfterViewInit {


	descriptionsuffix = 'Person';
	personGroup: FormGroup;
	userclassification = 'dataset:UserClassification';
	userclassificationitems: NavItem[] = [];
	viewinitialized: boolean = false;

	databaseperson: any | null = null;
	
	@Output() setDataChange = new EventEmitter<any>();

	@ViewChild('nameofperson', { static: false }) nameofperson!: NameofpersonComponent;
	@ViewChild('description', { static: false }) description!: DatadatadescriptionComponent;
	@ViewChild('location', { static: false }) location!: ContactlocationinformationComponent;
	@ViewChild('simpledata', { static: false }) simpledata!: ChemconnectdatastructureComponent;
	
	constructor(
		private menusetup: MenutreeserviceService,
		private formBuilder: FormBuilder,
		constants: UserinterfaceconstantsService,
		annotations: OntologycatalogService,
		cdRef: ChangeDetectorRef
	) {
		super(constants,annotations,cdRef);
		
		this.catalogtype = 'dataset:DatabasePerson';
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
	
	override annotationsFound(response: any): void {
		super.annotationsFound(response);
		this.userclassificationitems = this.menusetup.findChoices(this.annoinfo, this.userclassification);
					if (this.databaseperson) {
						this.setData(this.databaseperson);
					}		
	}


	override setData(catalog: any): void {
		this.databaseperson = catalog;
		if(this.setDataChange) {
			this.setDataChange.emit(catalog);
		}
		if (this.viewinitialized && this.annoinfo != null && this.nameofperson && this.simpledata) {
			this.simpledata.setData(catalog);
			const pdescr = catalog[this.annoinfo['dataset:PersonalDescription'][this.identifier]];
			this.personGroup.get('UserClassification')?.setValue(pdescr[this.annoinfo['dataset:UserClassification'][this.identifier]]);
			this.personGroup.get('PersonFullName')?.setValue(catalog[this.annoinfo['dataset:PersonFullName'][this.identifier]]);
			const name = pdescr[this.annoinfo['dataset:NameOfPerson'][this.identifier]]
			this.nameofperson.setData(name);
			const descr = catalog[this.annoinfo['dataset:DataDescriptionPerson'][this.identifier]];
			this.description.setData(descr);
			const loc = catalog[this.annoinfo['dataset:ContactLocationInformation'][this.identifier]];
			this.location.setData(loc);
		}
	}

	override getData(catalog: any): void {
		this.simpledata.getData(catalog);
		const pdescr: Record<string, unknown> = {};
		catalog[this.annoinfo['dataset:PersonalDescription'][this.identifier]] = pdescr;
		pdescr[this.annoinfo['dataset:UserClassification'][this.identifier]] = this.personGroup.get('UserClassification')?.value ?? '';
		catalog[this.annoinfo['dataset:PersonFullName'][this.identifier]] = this.personGroup.get('PersonFullName')?.value ?? '';
		const name: Record<string, unknown> = {};
		this.nameofperson.getData(name);
		pdescr[this.annoinfo['dataset:NameOfPerson'][this.identifier]] = name;
	}

}
