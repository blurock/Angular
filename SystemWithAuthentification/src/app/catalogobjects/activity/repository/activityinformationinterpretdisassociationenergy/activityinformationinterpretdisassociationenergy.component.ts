import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { NavItem } from '../../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';

@Component({
	selector: 'app-activityinformationinterpretdisassociationenergy',
	templateUrl: './activityinformationinterpretdisassociationenergy.component.html',
	styleUrls: ['./activityinformationinterpretdisassociationenergy.component.scss']
})
export class ActivityinformationinterpretdisassociationenergyComponent implements OnInit {

	molarenergy: any;
	display = false;
	objectform: FormGroup;

	fileformat = 'dataset:JThermodynamicsDisassociationEnergyFormat';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	speciesspecification = 'dataset:SpeciesSpecificationNancyLinearForm';


	fileformatdata: any;
	items: NavItem[];

	@Input() annoinfo: any;

	molarenergyparameter = ['dataset:ParameterSpecificationHDisassociationEnergy'];
	title = 'This is the Activity Information for Interpreting Hydrogen Disassociation Energy';
	
	structurespecification = 'dataset:JThermodynamicsSpeciesSpecificationType';

	@ViewChild('paramspec') paramspec: DatasettransactionspecificationforcollectionComponent;
	@ViewChild('spec') spec: ParameterspecificationComponent;

	constructor(
		private formBuilder: FormBuilder,
		private menuserver: OntologycatalogService,
		private fileservice: UploadmenuserviceService,
		private menusetup: MenutreeserviceService
	) {
		const set = [];
		set.push(this.molarenergyparameter);
		menuserver.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.molarenergy = data[this.molarenergyparameter[0]];
				this.display = true;
			}
		});

		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			BlockInterpretationMethod: ['', Validators.required],
			FileSourceFormat: ['File Format', Validators.required],
			JThermodynamicsSpeciesSpecificationType: ['dataset:SpeciesSpecificationNancyLinearForm', Validators.required]
		});
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue(this.speciesspecification);

	}

	ngOnInit(): void {
		this.fileservice.getFormatClassification().subscribe({
			next: (data: any) => {
				this.fileformatdata = data;
				const Hdisformat = data[this.fileformat];
				this.objectform.get('FileSourceFormat').setValue(this.fileformat);
				const block = Hdisformat['dataset:interpretMethod'];
				this.objectform.get('BlockInterpretationMethod').setValue(block);
			}
		});
		this.items = this.menusetup.findChoices(this.annoinfo, this.structurespecification);
	}
	
	setPrerequisiteData(prerequisite: any) {
		const activity = prerequisite['dataset:activityinfo'];
		const formatdata = this.fileformatdata[this.fileformat];
		const block = formatdata['dataset:interpretMethod'];
		this.objectform.get('BlockInterpretationMethod').setValue(block);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		this.spec.setData(activity[specid]);
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod').value;
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]] = this.objectform.get('JThermodynamicsSpeciesSpecificationType').value;
		
		this.spec.getData(activity);
		const paramspecvalue = {};
		this.paramspec.getData(paramspecvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationHDisassociationEnergy'][this.identifier]] = paramspecvalue;
	}
	setData(activity: any): void {
		this.objectform.get('BlockInterpretationMethod').setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod']][this.identifier]);
		this.objectform.get('FileSourceFormat').setValue(activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']][this.identifier]);
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue(activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]]);

		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		this.spec.setData(activity[specid]);
		const energy = activity[this.annoinfo['dataset:ParameterSpecificationHDisassociationEnergy'][this.identifier]];
		this.paramspec.setData(energy);
	}
setJThermodynamicsSpeciesSpecificationType($event) {
	this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue($event);
}

}
