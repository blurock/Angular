import { Component, OnInit, ViewChild,ComponentRef, ViewContainerRef} from '@angular/core';
import { CatalogbaseComponent } from '../../primitives/catalogbase/catalogbase.component';
import { MatCardModule } from '@angular/material/card';
import { DatasetrepositoryfilestagingComponent } from '../repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { LoadchildDirective } from '../catalogbaseobjects/loadchild.directive';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';
//import { RepositoryparsedtofixedblocksizeComponent } from '../repository/partition/repositoryparsedtofixedblocksize/repositoryparsedtofixedblocksize.component';
//import { JthermodynamicdisassociationenergyComponent } from '../thermodynamics/jthermodynamicdisassociationenergy/jthermodynamicdisassociationenergy.component';
//import { JthermodynamicsvibrationalstructureComponent } from '../thermodynamics/jthermodynamicsvibrationalstructure/jthermodynamicsvibrationalstructure.component';
//import { Jthermodynamics2dmoleculethermodynamicsComponent } from '../thermodynamics/jthermodynamics2dmoleculethermodynamics/jthermodynamics2dmoleculethermodynamics.component';
//import { Jthermodynamics2dsubstructurethermodynamicsComponent } from '../thermodynamics/jthermodynamics2dsubstructurethermodynamics/jthermodynamics2dsubstructurethermodynamics.component';
//import { ThermodynamicbensonruledefinitionComponent } from '../thermodynamics/thermodynamicbensonruledefinition/thermodynamicbensonruledefinition.component';
//import { JthermodynamicsmetaatomdefinitionComponent } from '../thermodynamics/jthermodynamicsmetaatomdefinition/jthermodynamicsmetaatomdefinition.component';
//import { JthermodynamicssymmetrystructuredefinitionComponent } from '../thermodynamics/jthermodynamicssymmetrystructuredefinition/jthermodynamicssymmetrystructuredefinition.component';
//import { RepositorythergasthermodynamicsblockComponent } from '../repository/partition/repositorythergasthermodynamicsblock/repositorythergasthermodynamicsblock.component';
//import { ThermodynamicsdatasetcollectionidssetComponent } from '../datasetcollection/thermodynamicsdatasetcollectionidsset/thermodynamicsdatasetcollectionidsset.component';

@Component({
	selector: 'app-generalcatalogobjectvisualization',
	standalone: true,
	imports: [MatCardModule],
	templateUrl: './generalcatalogobjectvisualization.component.html',
	styleUrls: ['./generalcatalogobjectvisualization.component.scss']
})
export class GeneralcatalogobjectvisualizationComponent implements OnInit {

	//@ViewChild(LoadChildDirective, { static: true }) dynamicChild!: LoadChildDirective;
	@ViewChild('dynamicChild', { read: ViewContainerRef })  dynamicChild!: ViewContainerRef;
	
	message = 'Initializing...';
	
	annoinfo: any;
	
	catalogtype = 'No object';
	isNotSetUp = true;
	componentRef!: ComponentRef<CatalogbaseComponent>;
	constructor(
		private constants: UserinterfaceconstantsService,
		private annotations: OntologycatalogService,
		//private viewContainerRef: ViewContainerRef 
	) { }

	ngOnInit(): void {
		console.log("ngOnInit GeneralcatalogobjectvisualizationComponent");
		//this.dynamicChild.viewContainerRef = this.viewContainerRef; 
	}

	public setChild(catalogtype: string): void {
		this.catalogtype = catalogtype;
		this.dynamicChild.clear();
		if (catalogtype === 'dataset:RepositoryFileStaging') {
			if (this.isNotSetUp) {
				console.log("Creating DatasetrepositoryfilestagingComponent");
				this.componentRef = this.dynamicChild.createComponent(DatasetrepositoryfilestagingComponent);
				this.componentRef.instance.getCatalogAnnoations();
				console.log("Creating DatasetrepositoryfilestagingComponent after getCatalogAnnoations()");
				//this.componentRef = this.dynamicChild.viewContainerRef.createComponent(DatasetrepositoryfilestagingComponent);
				this.isNotSetUp = false;
			}
		} 
		/*
		else if (catalogtype === 'dataset:RepositoryParsedToFixedBlockSize') {
			alert("dataset:RepositoryParsedToFixedBlockSize");
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
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(Jthermodynamics2dmoleculethermodynamicsComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:JThermodynamics2DSubstructureThermodynamics') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(Jthermodynamics2dsubstructurethermodynamicsComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:ThermodynamicBensonRuleDefinition') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(ThermodynamicbensonruledefinitionComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:JThermodynamicsMetaAtomDefinition') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(JthermodynamicsmetaatomdefinitionComponent);
				this.isNotSetUp = false;
			}
		} else if (catalogtype === 'dataset:JThermodynamicsSymmetryStructureDefinition') {
			if (this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(JthermodynamicssymmetrystructuredefinitionComponent);
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
		}

		else {
			alert('catalog object not found: "' + catalogtype + '""');
		}
*/
	}

	getAnnotations(): any {
		var annoinfo = null;
		if(this.componentRef) {
			annoinfo = this.componentRef.instance.annoinfo;
		}
		return annoinfo
	}
	public setData(catalog: any): void {
		
		if (this.isNotSetUp) {
			const catalogtype = catalog['dataset:objectype'];
			this.setChild(catalogtype);
		}
		alert("setData: " + JSON.stringify(Object.keys(catalog)));
		this.componentRef.instance.setData(catalog);
	}

	public getData(catalog: any): void {
		if (!this.isNotSetUp) {
			this.componentRef.instance.getData(catalog);
		} else {
			alert('catalog object not found');
		}
	}
	public getCatalogAnnoations(): void {
		console.log("getCatalogAnnoations: " + this.catalogtype);
		this.message = this.constants.waiting;
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				if (responsedata) {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					console.log("getCatalogAnnoations: " + JSON.stringify(this.annoinfo));
					this.componentRef.instance.annoinfo = this.annoinfo;
					
				} else {
					this.message = responsedata;
				}
				}
			},
			error: (info: any) => { alert(this.constants.getannotationsfnotsuccessful + this.message); }
		});
	}


}
