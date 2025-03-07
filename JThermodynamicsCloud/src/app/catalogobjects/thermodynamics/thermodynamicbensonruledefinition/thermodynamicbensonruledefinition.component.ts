import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ChemconnectthermodynamicsdatabaseComponent } from '../chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { JthermodynamicsbensonrulestructureComponent } from '../jthermodynamicsbensonrulestructure/jthermodynamicsbensonrulestructure.component';
import { JthermodynamicstandardthermodynamicsComponent } from '../jthermodynamicstandardthermodynamics/jthermodynamicstandardthermodynamics.component';
@Component({
	selector: 'app-thermodynamicbensonruledefinition',
	templateUrl: './thermodynamicbensonruledefinition.component.html',
	styleUrls: ['./thermodynamicbensonruledefinition.component.scss']
})
export class ThermodynamicbensonruledefinitionComponent implements OnInit {

	title = 'Benson Rule Definition';

	message: string;
	annoinfo: any;
	catalogobj: any;
	display = false;
	specdisplay = false;
	identifier = Ontologyconstants.dctermsidentifier;
	catalogsetdata = null;

	@Output() annoReady = new EventEmitter<any>();


	catalogtype = 'dataset:ThermodynamicBensonRuleDefinition';

	@ViewChild('bensonstructure') bensonstructure: JthermodynamicsbensonrulestructureComponent;
	@ViewChild('thermo') thermo: JthermodynamicstandardthermodynamicsComponent;
	@ViewChild('base') base: ChemconnectthermodynamicsdatabaseComponent;

	constructor(
		public annotations: OntologycatalogService,
	) {
		this.getCatalogAnnoations();
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
		const benson = {};
		this.bensonstructure.getData(benson);
		catalog[this.annoinfo['dataset:JThermodynamicsBensonRuleStructure'][this.identifier]] = benson;
	}
	setData(catalog: any): void {
		if (this.annoinfo != null) {
			if (this.thermo != null) {



				const thermodata = catalog[this.annoinfo['dataset:JThermodynamicStandardThermodynamics'][this.identifier]];

				this.thermo.setData(thermodata);
				const benson = catalog[this.annoinfo['dataset:JThermodynamicsBensonRuleStructure'][this.identifier]];
				this.bensonstructure.setData(benson);
			} else {
				alert('Refresh data if not shown');
			}
		} else {
			this.catalogsetdata = catalog;

		}
	}

}
