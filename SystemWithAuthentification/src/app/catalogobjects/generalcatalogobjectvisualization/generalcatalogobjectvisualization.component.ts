import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Directive, ViewContainerRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { LoadChildDirective } from '../../directives/load-child.directive';
import { DatasetrepositoryfilestagingComponent } from '../repository/datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import {RepositoryparsedtofixedblocksizeComponent} from '../repository/partition/repositoryparsedtofixedblocksize/repositoryparsedtofixedblocksize.component';
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
	public setData(catalog: any): void {
		this.catalogtype = catalog['dataset:objectype'];
		if (this.catalogtype == 'dataset:RepositoryFileStaging') {
			if(this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(DatasetrepositoryfilestagingComponent);
				this.isNotSetUp = false;
				}
			this.componentRef.instance.setData(catalog);
		} else if(this.catalogtype == 'dataset:RepositoryParsedToFixedBlockSize') {
			if(this.isNotSetUp) {
				this.componentRef = this.dynamicChild.viewContainerRef.createComponent(RepositoryparsedtofixedblocksizeComponent);
				this.isNotSetUp = false;	
				}		
		} else {
			alert("catalog object not found");
		}

	}

}
