import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from 'systemconstants';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { NavItem } from '../../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import { MatChipInputEvent } from '@angular/material/chips';
import {IdentifiersService} from '../../../../const/identifiers.service';


@Component({
	selector: 'app-thermocalculationsetup',
	templateUrl: './thermocalculationsetup.component.html',
	styleUrls: ['./thermocalculationsetup.component.scss']
})
export class ThermocalculationsetupComponent implements OnInit {

	title = 'Parameters for Calculation';
	molarenthalpyparameter = 'dataset:ParameterSpecificationEnthalpy';
	molarentropyarameter = 'dataset:ParameterSpecificationEntropy';
	molarheatcapacityparameter = 'dataset:ParameterSpecificationHeatCapacity';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	methoditemstype = 'dataset:JThermodynamicsComputation';
	structitemstype = 'dataset:JThermodynamicsSpeciesSpecificationType';
	temperaturelist = [
		300, 400, 500, 600, 800, 1000, 1500
	];
    collectionready = true;

	@Input() annoinfo: any;

	molarenthalpy: any;
	molarentropy: any;
	molarheatcapacity: any;
	objectform: UntypedFormGroup;
	methoditems: NavItem[];
	structitems: NavItem[];
	maintainer: string;


	@ViewChild('enthalpy') enthalpy: ParameterspecificationComponent;
	@ViewChild('entropy') entropy: ParameterspecificationComponent;
	@ViewChild('heatcapacity') heatcapacity: ParameterspecificationComponent;


	constructor(
		private formBuilder: UntypedFormBuilder,
		private menuserver: OntologycatalogService,
		private menusetup: MenutreeserviceService,
		manageuser: ManageuserserviceService,
		private identifiers: IdentifiersService
	) {
		const set = [];
		set.push(this.molarenthalpyparameter);
		set.push(this.molarentropyarameter);
		set.push(this.molarheatcapacityparameter);
		menuserver.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.molarenthalpy = data[this.molarenthalpyparameter];
				this.molarentropy = data[this.molarentropyarameter];
				this.molarheatcapacity = data[this.molarheatcapacityparameter];
			}
		});
        
		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			CatalogDataObjectMaintainer: ['', Validators.required],
			DatasetCollectionsSetLabel: ['', Validators.required],
			JThermodynamicsComputation: ['', Validators.required],
			JThermodynamicsStructureName: ['', Validators.required],
			JThermodynamicsSpeciesSpecificationType: ['', Validators.required],
			JThermodynamicsStructureSpecification: ['', Validators.required]
		});
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
				this.objectform.get('CatalogDataObjectMaintainer').setValue(this.maintainer);
			} else {
				alert(manageuser.determineMaintainer);
			}
		});

	}

	ngOnInit(): void {
		this.methoditems = this.menusetup.findChoices(this.annoinfo, this.methoditemstype);
		this.structitems = this.menusetup.findChoices(this.annoinfo, this.structitemstype);
	}

	invalid(): boolean {
		let ansenthalpy = true;
		let entropyans = true;
		let heatcapacityans = true;
		if (this.enthalpy != null) {
			ansenthalpy = this.enthalpy.invalid();
		}
		if (this.entropy != null) {
			entropyans = this.entropy.invalid();
		}
		if (this.heatcapacity != null) {
			heatcapacityans = this.heatcapacity.invalid();
		}
		return ansenthalpy || entropyans || heatcapacityans || this.objectform.invalid;
	}
	
	setCollection($event) {
		
		const type = $event['dcat:dataset'];
		var collectionname = $event[this.identifiers.DatasetCollectionsLabel];
		if(type == 'dataset:ThermodynamicsSystemCollectionIDsSet') {
			collectionname = $event[this.identifiers.CatalogObjectKey];
			this.objectform.get('CatalogDataObjectMaintainer').setValue('systemthermodynamics');
		} else {
			this.objectform.get('CatalogDataObjectMaintainer').setValue(this.maintainer);
		}
		this.objectform.get('DatasetCollectionsSetLabel').setValue(collectionname);
		this.collectionready = true;
	}

	setMethod($event: string): void {
		this.objectform.get('JThermodynamicsComputation').setValue($event);
	}
	setSpec($event: string): void {
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue($event);
	}


	getData(activity: any): void {
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		activity[this.annoinfo['dataset:JThermodynamicsComputation'][this.identifier]] = this.objectform.get('JThermodynamicsComputation').value;
		activity[this.annoinfo['dataset:JThermodynamicsStructureName'][this.identifier]] = this.objectform.get('JThermodynamicsStructureName').value;
		activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]] = this.objectform.get('JThermodynamicsSpeciesSpecificationType').value;
		activity[this.annoinfo['dataset:JThermodynamicsStructureSpecification'][this.identifier]] = this.objectform.get('JThermodynamicsStructureSpecification').value;
		const catrecordid = {};
		catrecordid[this.annoinfo['dataset:DatasetCollectionsSetLabel'][this.identifier]] = this.objectform.get('DatasetCollectionsSetLabel').value;
		catrecordid[this.annoinfo['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.objectform.get('CatalogDataObjectMaintainer').value;
		activity[this.annoinfo['dataset:DatabaseCollectionRecordID'][this.identifier]] = catrecordid;
		const enthalpyvalue = {};
		this.enthalpy.getData(enthalpyvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationEnthalpy'][this.identifier]] = enthalpyvalue;
		const entropyvalue = {};
		this.entropy.getData(entropyvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationEntropy'][this.identifier]] = entropyvalue;
		const heatcapacityvalue = {};
		this.heatcapacity.getData(heatcapacityvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]] = heatcapacityvalue;
		const templist = {};
		activity[this.annoinfo['dataset:JThermodynamicBensonTemperatures'][this.identifier]] = templist;
		templist[this.annoinfo['dataset:ThermodynamicTemperature'][this.identifier]] = this.temperaturelist;
	}
	setData(activity: any): void {
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
		this.objectform.get('JThermodynamicsComputation').setValue(activity[this.annoinfo['dataset:JThermodynamicsComputation'][this.identifier]]);
		this.objectform.get('JThermodynamicsStructureName').setValue(activity[this.annoinfo['dataset:JThermodynamicsStructureName'][this.identifier]]);
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue(activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]]);
		this.objectform.get('JThermodynamicsStructureSpecification').setValue(activity[this.annoinfo['dataset:JThermodynamicsStructureSpecification'][this.identifier]]);
        const recordid = activity[this.annoinfo['dataset:DatabaseCollectionRecordID'][this.identifier]];
		this.objectform.get('DatasetCollectionsSetLabel').setValue(recordid[this.annoinfo['dataset:DatasetCollectionsSetLabel'][this.identifier]]);
		const enthalpyvalue = activity[this.annoinfo['dataset:ParameterSpecificationEnthalpy'][this.identifier]];
		this.enthalpy.setData(enthalpyvalue);
		const entropyvalue = activity[this.annoinfo['dataset:ParameterSpecificationEntropy'][this.identifier]];
		this.entropy.setData(entropyvalue);
		const heatcapacityvalue = activity[this.annoinfo['dataset:ParameterSpecificationHeatCapacity'][this.identifier]];
		this.heatcapacity.setData(heatcapacityvalue);
		const templist = activity[this.annoinfo['dataset:JThermodynamicBensonTemperatures'][this.identifier]];
		this.temperaturelist = templist[this.annoinfo['dataset:ThermodynamicTemperature'][this.identifier]];
		//this.temperaturelist = activity['dataset:bensontemperaturelist'];
		
	}
	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = Number(event.value);
		this.temperaturelist.push(value);
	}
	remove(temperature: number): void {
		const index = this.temperaturelist.indexOf(temperature);
		if (index >= 0) {
			this.temperaturelist.splice(index, 1);
		}
	}


}
