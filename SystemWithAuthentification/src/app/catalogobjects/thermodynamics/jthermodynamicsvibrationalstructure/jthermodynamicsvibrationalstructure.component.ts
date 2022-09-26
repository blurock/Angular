import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
	identifier = Ontologyconstants.dctermsidentifier;


	@Output() annoReady = new EventEmitter<any>();

	frequencyparameter = 'dataset:ParameterSpecificationStructureVibrationFrequency';
	frequency: any;
	frequencytitle = 'Frequency Associated with Structure';

	catalogtype = 'dataset:JThermodynamicsVibrationalStructure';
	title = 'Frequency Associated with a Structure';

	@ViewChild('base') base: ChemconnectthermodynamicsdatabaseComponent;
	@ViewChild('freqobject') freqobject: ParametervalueComponent;
	@ViewChild('structure') structure: Jthermodynamics2dspeciesstructureComponent;

	constructor(
		public annotations: OntologycatalogService,
	) {
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
		this.base.getData(catalog);
		const value = {};
		this.freqobject.getData(value);
		catalog[this.annoinfo['dataset:StructureVibrationalFrequency'][this.identifier]] = value;
		const struct = {};
		this.structure.getData(struct);
		catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]] = struct;

	}
	setData(catalog: any): void {
		this.base.setData(catalog);
		const value = catalog.get('dataset:StructureVibrationalFrequency').value;
		this.freqobject.setData(value);
		const struct = catalog[this.annoinfo['dataset:JThermodynamics2DSpeciesStructure'][this.identifier]];
		this.structure.setData(struct);
	}

}
