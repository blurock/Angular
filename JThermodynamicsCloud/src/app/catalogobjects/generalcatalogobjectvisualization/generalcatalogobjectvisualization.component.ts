import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef, Output, EventEmitter, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CatalogbaseComponent } from '../../primitives/catalogbase/catalogbase.component';
import { MatCardModule } from '@angular/material/card';
import { DatasetrepositoryfilestagingComponent } from '../repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';
import { RepositoryparsedtofixedblocksizeComponent } from '../repository/partition/repositoryparsedtofixedblocksize/repositoryparsedtofixedblocksize.component';
//import { JthermodynamicdisassociationenergyComponent } from '../thermodynamics/jthermodynamicdisassociationenergy/jthermodynamicdisassociationenergy.component';
//import { JthermodynamicsvibrationalstructureComponent } from '../thermodynamics/jthermodynamicsvibrationalstructure/jthermodynamicsvibrationalstructure.component';
//import { Jthermodynamics2dmoleculethermodynamicsComponent } from '../thermodynamics/jthermodynamics2dmoleculethermodynamics/jthermodynamics2dmoleculethermodynamics.component';
import { Jthermodynamics2dsubstructurethermodynamicsComponent } from '../thermodynamics/jthermodynamics2dsubstructurethermodynamics/jthermodynamics2dsubstructurethermodynamics.component';
import { ThermodynamicbensonruledefinitionComponent } from '../thermodynamics/thermodynamicbensonruledefinition/thermodynamicbensonruledefinition.component';
import { JthermodynamicssymmetrystructuredefinitionComponent } from '../thermodynamics/jthermodynamicssymmetrystructuredefinition/jthermodynamicssymmetrystructuredefinition.component';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TransactioneventobjectComponent } from '../transaction/transactioneventobject/transactioneventobject.component';
import { RepositorythergasthermodynamicsblockComponent } from '../repository/partition/repositorythergasthermodynamicsblock/repositorythergasthermodynamicsblock.component';
import { JthermodynamicsmetaatomdefinitionComponent } from '../thermodynamics/jthermodynamicsmetaatomdefinition/jthermodynamicsmetaatomdefinition.component';
//import { RepositorythergasthermodynamicsblockComponent } from '../repository/partition/repositorythergasthermodynamicsblock/repositorythergasthermodynamicsblock.component';
//import { ThermodynamicsdatasetcollectionidssetComponent } from '../datasetcollection/thermodynamicsdatasetcollectionidsset/thermodynamicsdatasetcollectionidsset.component';

@Component({
	selector: 'app-generalcatalogobjectvisualization',
	standalone: true,
	imports: [MatCardModule, NgIf, MatIconModule],
	templateUrl: './generalcatalogobjectvisualization.component.html',
	styleUrls: ['./generalcatalogobjectvisualization.component.scss']
})
export class GeneralcatalogobjectvisualizationComponent implements AfterViewInit {

	@Input() data = null;

	@Output() messageReady = new EventEmitter<any>();
	@Output() annoReady = new EventEmitter<any>();
	@Output() transactionReady = new EventEmitter<any>();
	@Output() showCatalogObject = new EventEmitter<any>();

	@ViewChild('dynamicChild', { read: ViewContainerRef }) dynamicChild!: ViewContainerRef;

	message = 'Initializing...';

	title = 'Catalog Object Visualization';

	annoinfo: any;
	display = true;

	catalogtype = 'No object';
	isNotSetUp = true;
	componentRef!: ComponentRef<CatalogbaseComponent>;
	constructor(
		private constants: UserinterfaceconstantsService,
		private annotations: OntologycatalogService,
		private cdRef: ChangeDetectorRef
	) { }

	ngAfterViewInit(): void {
		if (this.data) {
			this.setData(this.data);
			this.cdRef.detectChanges();
		}
	}

	toggleDisplay(): void {
		this.display = !this.display;
	}

	public setChild(catalogtype: string): void {
		this.catalogtype = catalogtype;
		this.title = this.catalogtype;
		if (this.dynamicChild) {
			this.dynamicChild.clear();
			this.isNotSetUp = false;
			if (catalogtype === 'dataset:RepositoryFileStaging') {
				this.componentRef = this.dynamicChild.createComponent(DatasetrepositoryfilestagingComponent);
			} else if (catalogtype === 'dataset:RepositoryParsedToFixedBlockSize') {
				this.componentRef = this.dynamicChild.createComponent(RepositoryparsedtofixedblocksizeComponent);
			} else if (catalogtype === 'dataset:JThermodynamicsSymmetryStructureDefinitionDataSet') {
				this.componentRef = this.dynamicChild.createComponent(JthermodynamicssymmetrystructuredefinitionComponent);
				this.componentRef.instance.catalogtype = 'dataset:JThermodynamicsSymmetryStructureDefinitionDataSet';
			} else if (catalogtype === 'dataset:JThermodynamicsSymmetryStructureDefinitionDatabase') {
				this.componentRef = this.dynamicChild.createComponent(JthermodynamicssymmetrystructuredefinitionComponent);
				this.componentRef.instance.catalogtype = 'dataset:JThermodynamicsSymmetryStructureDefinitionDatabase';
			} else if (catalogtype === 'dataset:DatasetTransactionEventObject') {
				this.componentRef = this.dynamicChild.createComponent(TransactioneventobjectComponent);
				this.componentRef.instance.catalogtype = 'dataset:DatasetTransactionEventObject';
			} else if (catalogtype === 'dataset:ThermodynamicBensonRuleDefinitionDataSet') {
				this.componentRef = this.dynamicChild.createComponent(ThermodynamicbensonruledefinitionComponent);
				this.componentRef.instance.catalogtype = 'dataset:ThermodynamicBensonRuleDefinitionDataSet';
			} else if (catalogtype === 'dataset:ThermodynamicBensonRuleDefinitionDatabase') {
				this.componentRef = this.dynamicChild.createComponent(ThermodynamicbensonruledefinitionComponent);
				this.componentRef.instance.catalogtype = 'dataset:ThermodynamicBensonRuleDefinitionDatabase';
			} else if (catalogtype === 'dataset:RepositoryTherGasThermodynamicsBlock') {
				this.componentRef = this.dynamicChild.createComponent(RepositorythergasthermodynamicsblockComponent);
				this.componentRef.instance.catalogtype = 'dataset:RepositoryTherGasThermodynamicsBlock';
			} else if (catalogtype === 'dataset:JThermodynamicsMetaAtomDefinitionDataSet') {
				this.componentRef = this.dynamicChild.createComponent(JthermodynamicsmetaatomdefinitionComponent);
				this.componentRef.instance.catalogtype = 'dataset:JThermodynamicsMetaAtomDefinitionDataSet';
			} else if (catalogtype === 'dataset:JThermodynamicsMetaAtomDefinitionDatabase') {
				this.componentRef = this.dynamicChild.createComponent(JthermodynamicsmetaatomdefinitionComponent);
				this.componentRef.instance.catalogtype = 'dataset:JThermodynamicsMetaAtomDefinitionDatabase';
			} else if (catalogtype === 'dataset:JThermodynamics2DSubstructureThermodynamicsDataSet') {
				this.componentRef = this.dynamicChild.createComponent(Jthermodynamics2dsubstructurethermodynamicsComponent);
				this.componentRef.instance.catalogtype = 'dataset:JThermodynamics2DSubstructureThermodynamicsDataSet';
			} else if (catalogtype === 'dataset:JThermodynamics2DSubstructureThermodynamicsDatabase') {
				this.componentRef = this.dynamicChild.createComponent(Jthermodynamics2dsubstructurethermodynamicsComponent);
				this.componentRef.instance.catalogtype = 'dataset:JThermodynamics2DSubstructureThermodynamicsDatabase';
			} else if (catalogtype === 'dataset:JThermodynamicsVibrationalStructureDataSet') {
				this.componentRef = this.dynamicChild.createComponent(Jthermodynamics2dsubstructurethermodynamicsComponent);
				this.componentRef.instance.catalogtype = 'dataset:JThermodynamicsVibrationalStructureDataSet';
			} else if (catalogtype === 'dataset:JThermodynamicsVibrationalStructureDatabase') {
				this.componentRef = this.dynamicChild.createComponent(Jthermodynamics2dsubstructurethermodynamicsComponent);
				this.componentRef.instance.catalogtype = 'dataset:JThermodynamicsVibrationalStructureDatabase';
			} else {
				//this.componentRef.instance.getCatalogAnnoations();
				this.isNotSetUp = true;
				alert('GeneralcatalogobjectvisualizationComponent catalog object not found: "' + catalogtype + '""');
			}

			/*
			JThermodynamicsVibrationalStructureDataSet
			
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
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(Jthermodynamics2dmoleculethermodynamicsComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:JThermodynamics2DSubstructureThermodynamics') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(Jthermodynamics2dsubstructurethermodynamicsComponent);
				this.isNotSetUp = false;
			}
		}else if (catalogtype === 'dataset:JThermodynamicsMetaAtomDefinition') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(JthermodynamicsmetaatomdefinitionComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:RepositoryTherGasThermodynamicsBlock') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(RepositorythergasthermodynamicsblockComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:ThermodynamicsDatasetCollectionIDsSet') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(ThermodynamicsdatasetcollectionidssetComponent);
				this.isNotSetUp = false;
			}
			*/
			if (this.isNotSetUp === false) {
				this.data = null;
				this.annoinfo = null;
				this.componentRef.instance.catalog = null;
				this.componentRef.instance.annoinfo = null;
				this.componentRef.instance.getCatalogAnnoations();
				this.componentRef.instance.annoReady.subscribe(($event) => {
					this.annoReady.emit($event);
					this.messageReady.emit(this.componentRef.instance.message);
					this.getAnnotations();
				});
				this.componentRef.instance.transactionReady.subscribe((transaction) => {
					this.transactionReady.emit(transaction);

				});
				this.componentRef.instance.showCatalogObject.subscribe((firestoreid) => {
					this.showCatalogObject.emit(firestoreid);
				})
			}
		}
	}


	getAnnotations(): any {
		var annoinfo = null;
		if (this.componentRef) {
			annoinfo = this.componentRef.instance.annoinfo;
			this.annoinfo = annoinfo;
		}
		if (this.data) {
			this.setData(this.data);
			this.cdRef.detectChanges();
		}
		return annoinfo
	}
	public setData(catalog: any): void {
		this.title = '(' + this.catalogtype + ') ' + catalog[Ontologyconstants.ShortDescription];
		this.data = catalog;
		if (this.isNotSetUp) {
			const catalogtype = catalog['dataset:objectype'];
			this.setChild(catalogtype);
		}
		if (this.componentRef) {
			this.componentRef.instance.setData(catalog);
			this.messageReady.emit(this.componentRef.instance.message);
		}

	}
	
	public getNonModifiedData() {
		return  this.componentRef.instance.catalog;
	}

	public getData(catalog: any): void {
		if (!this.isNotSetUp) {
			this.componentRef.instance.getData(catalog);
		} else {
			//alert('catalog object not found');
		}
	}
}
