import { Component, OnInit, ViewChild } from '@angular/core';
import { DatasetrepositoryfilestagingComponent } from '../datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { FetchcatalogobjectComponent } from '../../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { ViewcatalogandsavetolocalfileComponent } from '../../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { SavecatalogdataobjectdialogComponent } from '../../../dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';

@Component({
	selector: 'app-managedatasetrepositoryfilestaging',
	templateUrl: './managedatasetrepositoryfilestaging.component.html',
	styleUrls: ['./managedatasetrepositoryfilestaging.component.scss']
})
export class ManagedatasetrepositoryfilestagingComponent implements OnInit {

	loadfromdatabase = 'Load object from file or database';
	fetchstaging = 'Retrieve';
	readinfailed = 'Read of staging information failed (problem with server)';
	displaydescbutton = 'Display Partition as JSON';
	displaybutton = 'Display';
	savedescr = 'Save to database';
	savebutton = 'Save';
	title = 'File Staging'


	@ViewChild('staging') staging: DatasetrepositoryfilestagingComponent;


	annoinfo: any;
	maintainer: string;
	resultHtml: string;

	constructor(
		public dialogvis: MatDialog,
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
		this.annoinfo = this.staging.annoinfo;
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: true, catalogtype: 'dataset:RepositoryFileStaging' },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					const catalog = result['dataset:simpcatobj'];
					if (catalog != null) {
						this.staging.setData(catalog);
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
		this.staging.getData(catalog);

		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			filename: this.title,
			dataimage: catalog
		};

		const myDialogRef = this.dialogvis.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
		});
	}
	public saveCatalog(): void {
		const catalog = {};
		this.staging.getData(catalog);
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
