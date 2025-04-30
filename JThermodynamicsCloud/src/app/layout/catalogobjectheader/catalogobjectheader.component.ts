import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';

import { ViewandlocalfilesavecatalogobjectService } from '../../services/data/viewandlocalfilesavecatalogobject.service';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { SavecatalogdataobjectdialogComponent } from '../../dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { NavItem } from '../../primitives/nav-item';
import { MenutreeserviceService } from '../../services/menutreeservice.service';

@Component({
	selector: 'app-catalogobjectheader',
	imports: [MatDividerModule, CommonModule, MatGridListModule],
	standalone: true,
	templateUrl: './catalogobjectheader.component.html',
	styleUrl: './catalogobjectheader.component.scss'
})
export class CatalogobjectheaderComponent {

	fetchinfo: string;
	displayinfo: string;
	changeinfo: string;
	saveinfo: string;
	refresh: string;

	readinfailed: string;
	readincanceled: string;
	notimplemented: string;

	saveanno: Record<any, unknown> = {};
	activitytype = 'dataset:ActivityCatalogObjectModification';
	modificationtransaction = 'dataset:CatalogModificationEvent';
	typeclassification = 'dataset:CatalogObjectModificationType';

	message: string = '';
	safeHtml: SafeHtml = '';

	updatetypes: NavItem[] = [];

	@Input() setData?: (catalog: any) => void;
	@Input() getData?: (catalog: any) => void;
	@Input() catalogtype: string = '';
	@Input() original: any = {};
	@Input() filenameroot: string = 'CatalogObject';
	@Input() title: string = 'Catalog Object';


	constructor(
		private constants: UserinterfaceconstantsService,
		private menusetup: MenutreeserviceService,
		public viewandsave: ViewandlocalfilesavecatalogobjectService,
		private display: ViewandlocalfilesavecatalogobjectService,
		public dialog: MatDialog,
		public sanitizer: DomSanitizer,
		public interfaceconst: UserinterfaceconstantsService,
		public annotations: OntologycatalogService,
	) {

		this.refresh = this.constants.refresh;
		this.fetchinfo = this.constants.fetchinfo;
		this.displayinfo = this.constants.displayinfo;
		this.changeinfo = this.constants.changeinfo;
		this.saveinfo = this.constants.saveinfo;

		this.readinfailed = this.constants.fetchInformationfailed;
		this.readincanceled = this.constants.fetchInformationCanceled;
		this.notimplemented = this.constants.notimplemented;

		this.getCatalogAnnoations();
	}


	fetchCatalogObject() {
		this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.fetchinfo + ": " + this.catalogtype);
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.saveanno, maintainer: '', fromdatabase: false, catalogtype: this.catalogtype },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				if (success == 'true') {

					const data = result['dataset:simpcatobj'];
					if (this.setData) {
						this.setData(data);
					} else {
						this.safeHtml = this.sanitizer.bypassSecurityTrustHtml("setData(catalog) " + this.notimplemented);
					}
				} else {
					this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.readinfailed + this.catalogtype);
				}
			} else {
				this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.readincanceled);
			}

		});
	}

	saveCatalogObject() {

		this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.saveinfo + ": " + this.catalogtype);
		const catalog: Record<string, any> = {};
		if (this.getData) {
			this.getData(catalog);
		} else {
			this.safeHtml = this.sanitizer.bypassSecurityTrustHtml("getData(catalog) " + this.notimplemented);
		}
		const dialogRef = this.dialog.open(SavecatalogdataobjectdialogComponent, {
			data: {
				catalog: this.original,
				newcatalog: catalog,
				annotations: this.saveanno,
				transactiontype: 'dataset:CatalogModificationEvent'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if (!result[Ontologyconstants.message]) {
					this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.constants.cancelled);
				} else {
					this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(result[Ontologyconstants.message]);
				}
				if (result[Ontologyconstants.successful]) {
					const catalogarray = result[Ontologyconstants.catalogobject];
					const catalog = catalogarray[0];
					if(this.setData) {
						this.original = catalog;
						this.setData(catalog);
					}
					
				}
					
			} else {
				this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.constants.cancelled);
			}

		});

	}

	refreshCatalogObject() {
		this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.refresh + ": " + this.catalogtype);

		if (this.setData) {
			this.setData(this.original);
		} else {
			this.safeHtml = this.sanitizer.bypassSecurityTrustHtml("setData(catalog) " + this.notimplemented);
		}
	}

	displayCatalogObject() {
		this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.displayinfo + ": " + this.catalogtype);

		const catalog: Record<string, any> = {};
		if (this.getData) {
			this.getData(catalog);
		} else {
			this.safeHtml = this.sanitizer.bypassSecurityTrustHtml("setData(catalog) " + this.notimplemented);
		}
		const root = this.filenameroot;
		const title = this.title;
		this.display.openDialog(catalog, root, title);
	}

	changeCatalogObject() {
		this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.changeinfo + ": " + this.catalogtype);

		const catalog: Record<string, any> = {};
		if (this.getData) {
			this.getData(catalog);
		} else {
			this.safeHtml = this.sanitizer.bypassSecurityTrustHtml("getData(catalog) " + this.notimplemented);
		}
		const root = this.filenameroot + "Changes";
		const title = this.title + " Changes";
		this.display.displayDifference(this.original, catalog, root, title);
	}

	public getCatalogAnnoations(): void {
		this.annotations.getNewCatalogObject(this.activitytype).subscribe({

			next: (responsedata: any) => {
				if(responsedata) {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.saveanno = catalog[Ontologyconstants.annotations];
					this.updatetypes = this.menusetup.findChoices(this.saveanno, this.typeclassification);
				} else {
					this.message = responsedata;
				}
				}
			},
			error: (info: any) => {
				this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.constants.getannotationsfnotsuccessful + this.message);
			}
		});
	}


}
