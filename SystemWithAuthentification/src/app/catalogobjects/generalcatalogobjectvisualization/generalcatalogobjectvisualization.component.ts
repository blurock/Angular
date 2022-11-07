import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Directive, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { LoadChildDirective } from '../../directives/load-child.directive';
import { DatasetrepositoryfilestagingComponent } from '../repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { RepositoryparsedtofixedblocksizeComponent } from '../repository/partition/repositoryparsedtofixedblocksize/repositoryparsedtofixedblocksize.component';
import {JthermodynamicdisassociationenergyComponent} from '../thermodynamics/jthermodynamicdisassociationenergy/jthermodynamicdisassociationenergy.component';
import {JthermodynamicsvibrationalstructureComponent} from '../thermodynamics/jthermodynamicsvibrationalstructure/jthermodynamicsvibrationalstructure.component';
import { Jthermodynamics2dmoleculethermodynamicsComponent} from '../thermodynamics/jthermodynamics2dmoleculethermodynamics/jthermodynamics2dmoleculethermodynamics.component';
import {Jthermodynamics2dsubstructurethermodynamicsComponent} from '../thermodynamics/jthermodynamics2dsubstructurethermodynamics/jthermodynamics2dsubstructurethermodynamics.component';
import {ThermodynamicbensonruledefinitionComponent} from '../thermodynamics/thermodynamicbensonruledefinition/thermodynamicbensonruledefinition.component';
import {JthermodynamicsmetaatomdefinitionComponent} from '../thermodynamics/jthermodynamicsmetaatomdefinition/jthermodynamicsmetaatomdefinition.component';
import {JthermodynamicssymmetrystructuredefinitionComponent} from '../thermodynamics/jthermodynamicssymmetrystructuredefinition/jthermodynamicssymmetrystructuredefinition.component';
import {RepositorythergasthermodynamicsblockComponent} from '../repository/partition/repositorythergasthermodynamicsblock/repositorythergasthermodynamicsblock.component';
import {ThermodynamicsdatasetcollectionidssetComponent} from '../datasetcollection/thermodynamicsdatasetcollectionidsset/thermodynamicsdatasetcollectionidsset.component';

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
		this.catalogtype = catalogtype;
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
		} else if (catalogtype === 'dataset:JThermodynamics2DSpeciesStructure') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent( Jthermodynamics2dmoleculethermodynamicsComponent);
				this.isNotSetUp = false;
			}			
		} else if (catalogtype === 'dataset:JThermodynamics2DSubstructureThermodynamics') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent( Jthermodynamics2dsubstructurethermodynamicsComponent);
				this.isNotSetUp = false;
			}						
		} else if(catalogtype === 'dataset:ThermodynamicBensonRuleDefinition') {
		    if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent( ThermodynamicbensonruledefinitionComponent);
				this.isNotSetUp = false;
			}						
		} else if(catalogtype === 'dataset:JThermodynamicsMetaAtomDefinition') {
		    if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent( JthermodynamicsmetaatomdefinitionComponent);
				this.isNotSetUp = false;
			}									
		} else if(catalogtype === 'dataset:JThermodynamicsSymmetryStructureDefinition') {
		    if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent( JthermodynamicssymmetrystructuredefinitionComponent);
				this.isNotSetUp = false;
			}									
		} else if(catalogtype === 'dataset:RepositoryTherGasThermodynamicsBlock') {
		    if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent( RepositorythergasthermodynamicsblockComponent);
				this.isNotSetUp = false;
			}									
		} else if(catalogtype === 'dataset:ThermodynamicsDatasetCollectionIDsSet') {
		    if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent( ThermodynamicsdatasetcollectionidssetComponent);
				this.isNotSetUp = false;
			}									
		}
		
		else {
			alert("catalog object not found: '" + catalogtype + "'");
		}
		
	}
	
	getAnnotations(): any {
		return this.componentRef.instance.annoinfo;
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
