import { Component, ViewChild, ComponentRef, ViewContainerRef, Output, EventEmitter, Input, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CatalogbaseComponent } from '../../catalogbase/catalogbase/catalogbase.component';
import { MatCardModule } from '@angular/material/card';
import { Ontologyconstants } from 'systemconstants';
import { VISUALIZATION_MAPPING, LazyVisualizationRegistry } from '../visualization-registry';

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
	public isLoading = false;

	catalogtype = 'No object';
	isNotSetUp = true;
	componentRef!: ComponentRef<CatalogbaseComponent>;
	constructor(
		@Inject(VISUALIZATION_MAPPING) private registry: LazyVisualizationRegistry,
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

	public async setChild(catalogtype: string): Promise<void> {
		this.catalogtype = catalogtype;
		this.title = this.catalogtype;
		
		this.dynamicChild.clear();
		const loader = this.registry[catalogtype];
		
		if (this.dynamicChild) {
			this.dynamicChild.clear();
			this.isNotSetUp = false;
			
			if (loader) {
			      this.isLoading = true;
			      try {
			        // 1. Trigger the network request to fetch the component chunk
			        const componentClass = await loader();
					this.isNotSetUp = false;
			        // 2. Create the component once the code arrives
			        this.dynamicChild.createComponent(componentClass);
			      } catch (err) {
			        console.error(`Failed to load component for ${catalogtype}`, err);
			      } finally {
			        this.isLoading = false;
			      }
			    }
			  
			
			if (this.isNotSetUp === false) {
				this.data = null;
				this.annoinfo = null;
				this.componentRef.instance.catalogtype = catalogtype;
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
