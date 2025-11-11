import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { IdentifiersService } from '../../../../const/identifiers.service';
import { RepositorydatapartitionblockComponent } from '../../repositorydatapartitionblock/repositorydatapartitionblock.component';
import {RepositorythermopartitionblockComponent} from '../repositorythermopartitionblock/repositorythermopartitionblock.component';
import { CatalogbaseComponent } from '../../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

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
		this.thermo.getData(catalog);
		this.partition.getData(catalog);
	}

   public setFormat(cataloginfo: any) {
	   this.partition.setDataFormat(cataloginfo);
   }

}
