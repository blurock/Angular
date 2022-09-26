import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Directive, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { LoadChildDirective } from '../../directives/load-child.directive';
import { DatasetrepositoryfilestagingComponent } from '../repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { RepositoryparsedtofixedblocksizeComponent } from '../repository/partition/repositoryparsedtofixedblocksize/repositoryparsedtofixedblocksize.component';
import {JthermodynamicdisassociationenergyComponent} from '../thermodynamics/jthermodynamicdisassociationenergy/jthermodynamicdisassociationenergy.component';
import {JthermodynamicsvibrationalstructureComponent} from '../thermodynamics/jthermodynamicsvibrationalstructure/jthermodynamicsvibrationalstructure.component';
@Component({
	selector: 'app-generalcatalogobjectvisualization',
	templateUrl: './generalcatalogobjectvisualization.component.html',
	styleUrls: ['./generalcatalogobjectvisualization.component.scss']
})
export class GeneralcatalogobjectvisualizationComponent implements OnInit {

	@ViewChild(LoadChildDirective, { static: true })
	dynamicChild!: LoadChildDirective;

	catalogtype = 'No object';
	isNotSetUp = true;
	componentRef = null;
	constructor() { }

	ngOnInit(): void {

	}
	
	public setChild(catalogtype: string): void {
		if (catalogtype === 'dataset:RepositoryFileStaging') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(DatasetrepositoryfilestagingComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:RepositoryParsedToFixedBlockSize') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(RepositoryparsedtofixedblocksizeComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:JThermodynamicsDisassociationEnergyOfStructure') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(JthermodynamicdisassociationenergyComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:JThermodynamicsVibrationalStructure') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(JthermodynamicsvibrationalstructureComponent);
				this.isNotSetUp = false;
			}
		} else {
			alert("catalog object not found: '" + catalogtype + "'");
		}
		
	}
	public setData(catalog: any): void {
		if (this.isNotSetUp) {
		const catalogtype = catalog['dataset:objectype'];
		this.setChild(catalogtype);
		}
		this.componentRef.instance.setData(catalog);
}

	public getData(catalog: any): void {
		if (!this.isNotSetUp) {
			this.componentRef.instance.getData(catalog);
		} else {
			alert("catalog object not found");
		}
	}


}
