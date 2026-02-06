import { Component, ViewChild, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OntologycatalogService } from 'systemprimitives';
import { IdentifiersService } from 'systemconstants';
import { RepositorydatapartitionblockComponent } from '../../repositorydatapartitionblock/repositorydatapartitionblock.component';
import {RepositorythermopartitionblockComponent} from '../repositorythermopartitionblock/repositorythermopartitionblock.component';
import { CatalogbaseComponent } from 'systemprimitives';
import { UserinterfaceconstantsService } from 'systemconstants';
import { MatCardModule } from '@angular/material/card';
import { Ontologyconstants } from 'systemconstants';

@Component({
	selector: 'app-repositorythergasthermodynamicsblock',
	standalone: true,
	imports: [
		MatCardModule,
		RepositorythermopartitionblockComponent,
		RepositorydatapartitionblockComponent
	],
	templateUrl: './repositorythergasthermodynamicsblock.component.html',
	styleUrls: ['./repositorythergasthermodynamicsblock.component.scss']
})
export class RepositorythergasthermodynamicsblockComponent extends CatalogbaseComponent implements AfterViewInit {
	catalogobj: any;
	title = 'TherGas Thermodynamic Block';
	
	@Input() cataloginfo: any;

	@ViewChild('thermo') thermo!: RepositorythermopartitionblockComponent;
	@ViewChild('partition') partition!: RepositorydatapartitionblockComponent;

	constructor(
		constants: UserinterfaceconstantsService,
		public dialog: MatDialog,
		annotations: OntologycatalogService,
		public identifiers: IdentifiersService,
		cdRef: ChangeDetectorRef) {
		super(constants, annotations, cdRef);

		this.catalogtype = 'RepositoryTherGasThermodynamicsBlock';
	}

	ngAfterViewInit(): void {
			if(this.cataloginfo) {
				this.setData(this.cataloginfo);
			}
	}
	

	public override setData(catalog: any) {
		super.setData(catalog);
		this.cataloginfo = catalog;
		if (this.annoinfo != null ) {
			if(this.partition) {
			  this.partition.setData(catalog);
			}
			if(this.thermo) {
				this.thermo.setData(catalog);
			}
			
		}
	}
	
	public override getData(catalog: any) {
		catalog[Ontologyconstants.dctermsidentifier] = Ontologyconstants.RepositoryTherGasThermodynamicsBlock;
		this.thermo.getData(catalog);
		this.partition.getData(catalog);
	}

   public setFormat(cataloginfo: any) {
	   this.partition.setDataFormat(cataloginfo);
   }

}
