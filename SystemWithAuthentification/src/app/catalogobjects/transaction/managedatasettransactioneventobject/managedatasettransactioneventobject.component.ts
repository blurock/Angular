import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchcatalogobjectComponent } from '../../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { DatasettransactioneventobjectComponent } from '../datasettransactioneventobject/datasettransactioneventobject.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { ViewcatalogandsavetolocalfileComponent } from '../../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { SavecatalogdataobjectdialogComponent } from '../../../dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import {FindspecifictransactionindatasetComponent} from '../../../dialog/findspecifictransactionindataset/findspecifictransactionindataset.component';

@Component({
	selector: 'app-managedatasettransactioneventobject',
	templateUrl: './managedatasettransactioneventobject.component.html',
	styleUrls: ['./managedatasettransactioneventobject.component.scss']
})
export class ManagedatasettransactioneventobjectComponent implements OnInit {

	readinfailed = 'Read of staging information failed (problem with server)';
	title = 'Transaction Event';

	displaydescbutton = 'Display Partition as JSON';
	displaybutton = 'Display';
	savedescr = 'Save to database';
	savebutton = 'Save';
	loadfromdatabase = 'Fetch transition from database';
	fetch = 'Database';

	annoinfo: any;
	maintainer: any;
	resultHtml: string;


	@ViewChild('transevent') transevent: DatasettransactioneventobjectComponent;
	constructor(
		public dialog: MatDialog,
		manageuser: ManageuserserviceService
	) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});

	}

	ngOnInit(): void {
	}

	fetchInformation() {
		this.annoinfo = this.transevent.annoinfo;
		const dialogRef = this.dialog.open(FindspecifictransactionindatasetComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					const catalog = result['dataset:simpcatobj'];
					if (catalog != null) {
						this.transevent.setData(catalog);
					}
				} else {
				}
			} else {
				this.resultHtml = this.readinfailed;
			}

		});
	}
	displayCatalogInfo(): void {

		const catalog = {};
		this.transevent.getData(catalog);

		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			filename: this.title,
			dataimage: catalog
		};

		const myDialogRef = this.dialog.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
		});
	}
	public saveCatalog(): void {
		const catalog = {};
		this.transevent.getData(catalog);
		this.openDialog(catalog);
	}

	public openDialog(catalog: any): void {
		const dialogRef = this.dialog.open(SavecatalogdataobjectdialogComponent, {
			data: { catalog: catalog, annotations: this.annoinfo }
		});

		dialogRef.afterClosed().subscribe(result => {
			alert(result);
		});
	}


}
