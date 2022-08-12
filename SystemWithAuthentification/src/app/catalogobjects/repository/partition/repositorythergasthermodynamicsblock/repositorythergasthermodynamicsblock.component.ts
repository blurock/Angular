import { Component, OnInit, ViewChild, EventEmitter, Input } from '@angular/core';
import { SavecatalogdataobjectComponent } from '../../../../dialog/savecatalogdataobject/savecatalogdataobject.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { IdentifiersService } from '../../../../const/identifiers.service';
import { RepositorydatapartitionblockComponent } from '../../repositorydatapartitionblock/repositorydatapartitionblock.component';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import {RepositorythermopartitionblockComponent} from '../repositorythermopartitionblock/repositorythermopartitionblock.component';

@Component({
	selector: 'app-repositorythergasthermodynamicsblock',
	templateUrl: './repositorythergasthermodynamicsblock.component.html',
	styleUrls: ['./repositorythergasthermodynamicsblock.component.scss']
})
export class RepositorythergasthermodynamicsblockComponent extends SavecatalogdataobjectComponent implements OnInit {

	catalogtype: string;
	objectform: FormGroup;
	catalogobj: any;
	public annoinfo: any;
	annoReady = new EventEmitter<any>();

	message = 'Initial';
	title = 'TherGas Thermodynamic Block';


	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	display = false;
	
	@Input() cataloginfo: any;

	@ViewChild('thermo') thermo: RepositorythermopartitionblockComponent;
	@ViewChild('partition') partition: RepositorydatapartitionblockComponent;

	constructor(
		private menusetup: MenutreeserviceService,
		public dialog: MatDialog,
		private formBuilder: FormBuilder,
		public annotations: OntologycatalogService,
		public identifiers: IdentifiersService) {
		super(dialog, annotations, identifiers,
		);

		this.catalogtype = 'RepositoryTherGasThermodynamicsBlock';
		this.getCatalogAnnoations();


	}

	ngOnInit(): void {
	}
	
	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				this.message = 'got response';
				this.message = responsedata;
				const response = responsedata;
				this.message = 'response JSON';
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.display = true;
					this.annoReady.emit(this.annoinfo);
					this.partition.setDataFormat(this.cataloginfo);
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});

	}

	public setData(catalog: any) {
		/*
		const cntid = this.annoinfo['dataset:BlockLineCount'][this.identifier];
		this.objectform.get('BlockLineCount').setValue(catalog[cntid]);
		const lnsid = this.annoinfo['dataset:ParsedLine'][this.identifier];
		const lines = catalog[lnsid];
		let text = "\n";
		for (let line of lines) {
			text.concat(line).concat('\n');
		}
		this.objectform.get('ParsedLine').setValue(text);
		*/
		this.partition.setData(catalog);
		this.thermo.setData(catalog);
	}
	
		public getData(catalog: any) {
		this.thermo.getData(catalog);
		this.partition.getData(catalog);
	}

   public setFormat(cataloginfo: any) {
	   this.partition.setDataFormat(cataloginfo);
   }

}
