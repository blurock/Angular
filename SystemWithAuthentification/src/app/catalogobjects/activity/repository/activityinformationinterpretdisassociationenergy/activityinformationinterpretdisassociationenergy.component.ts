import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { ParameterspecificationComponent } from '../../../parameterspecification/parameterspecification.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';

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

	fileformatdata: any;

	@Input() annoinfo: any;

	molarenergyparameter = ['dataset:ParameterSpecificationHDisassociationEnergy'];
	title = 'This is the Activity Information for Interpreting Hydrogen Disassociation Energy';

	@ViewChild('paramspec') paramspec: DatasettransactionspecificationforcollectionComponent;
	@ViewChild('spec') spec: ParameterspecificationComponent;

	constructor(
		private formBuilder: FormBuilder,
		private menuserver: OntologycatalogService,
		private fileservice: UploadmenuserviceService
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
			FileSourceFormat: ['File Format', Validators.required]
			
		});

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
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod').value;
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		const specvalue = {};
		this.spec.getData(specvalue);
		activity[this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]] = specvalue;
		const paramspecvalue = {};
		this.paramspec.getData(paramspecvalue);
		activity[this.annoinfo['dataset:ParameterSpecificationHDisassociationEnergy'][this.identifier]] = paramspecvalue;
	}
	setData(activity: any): void {
		this.objectform.get('BlockInterpretationMethod').setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod']]);
		this.objectform.get('FileSourceFormat').setValue(activity[this.annoinfo['dataset:FileSourceFormat']]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		this.spec.setData(activity);
		const energy = activity[this.annoinfo['dataset:ParameterSpecificationHDisassociationEnergy'][this.identifier]];
		this.paramspec.setData(energy);
	}


}