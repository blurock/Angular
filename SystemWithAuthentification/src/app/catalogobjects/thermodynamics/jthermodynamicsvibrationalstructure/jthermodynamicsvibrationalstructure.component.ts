import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { ParametervalueComponent } from '../../parametervalue/parametervalue.component';
import { Jthermodynamics2dspeciesstructureComponent } from '../jthermodynamics2dspeciesstructure/jthermodynamics2dspeciesstructure.component';

@Component({
  selector: 'app-jthermodynamicsvibrationalstructure',
  templateUrl: './jthermodynamicsvibrationalstructure.component.html',
  styleUrls: ['./jthermodynamicsvibrationalstructure.component.scss']
})
export class JthermodynamicsvibrationalstructureComponent implements OnInit {

	message: string;
	annoinfo: any;
	catalogobj: any;
	display = false;
	specdisplay = false;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	
	idForm: UntypedFormGroup;

	@Output() annoReady = new EventEmitter<any>();
    annowaiting = 'Waiting for annotations setup';
	frequencyparameter = 'dataset:ParameterSpecificationStructureVibrationFrequency';
	frequency: any;
	frequencytitle = 'Frequency Associated with Structure';

	catalogtype = 'dataset:JThermodynamicsVibrationalStructure';
	title = 'Frequency Contribution to Thermodynamics';

	@ViewChild('base') base: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('freqobject') freqobject: ParametervalueComponent;
	@ViewChild('structure') structure: Jthermodynamics2dspeciesstructureComponent;

	constructor(
		public fb: UntypedFormBuilder,
		public annotations: OntologycatalogService,
	) {
    	this.idForm = this.fb.group({
			JThermodynamicsVibrationalModeLabel: ['', Validators.required],
			StructureVibrationalFrequencySymmetry: ['', Validators.required],
		});

    
		this.getCatalogAnnoations();
		const set = [];
		set.push(this.frequencyparameter);
		annotations.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.frequency = data[this.frequencyparameter];
				this.specdisplay = true;
			}
		});
	}

	ngOnInit(): void {
	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.display = true;
					this.annoReady.emit(this.annoinfo);
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}
	getData(catalog: any): void {
		//this.base.getData(catalog);
		catalog[this.annoinfo['dataset:JThermodynamicsVibrationalModeLabel'][this.identifier]] = this.idForm.get('JThermodynamicsVibrationalModeLabel').value;
		catalog[this.annoinfo['dataset:StructureVibrationalFrequencySymmetry'][this.identifier]] = this.idForm.get('StructureVibrationalFrequencySymmetry').value;

		const value = {};
		this.freqobject.getData(value);
		catalog[this.annoinfo['dataset:StructureVibrationalFrequency'][this.identifier]] = value;
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	setData(catalog: any): void {
    	const name = catalog[this.annoinfo['dataset:JThermodynamicsVibrationalModeLabel'][this.identifier]];
		this.idForm.get('JThermodynamicsVibrationalModeLabel').setValue(name);
		const symmetry = catalog[this.annoinfo['dataset:StructureVibrationalFrequencySymmetry'][this.identifier]];
		this.idForm.get('StructureVibrationalFrequencySymmetry').setValue(symmetry);

    
		const value = catalog[this.annoinfo['dataset:StructureVibrationalFrequency'][this.identifier]];
		this.freqobject.setData(value);
		const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
        this.base.setData(catalog);
	}

}
