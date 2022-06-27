import { Component, OnInit, ViewChild } from '@angular/core';
import { DatasetrepositoryfilestagingComponent } from '../datasetrepositoryfilestaging/datasetrepositoryfilestaging.component';
import { MatDialog } from '@angular/material/dialog';
import { FetchcatalogobjectComponent } from '../../../dialog/fetchcatalogobject/fetchcatalogobject.component';

@Component({
	selector: 'app-managedatasetrepositoryfilestaging',
	templateUrl: './managedatasetrepositoryfilestaging.component.html',
	styleUrls: ['./managedatasetrepositoryfilestaging.component.scss']
})
export class ManagedatasetrepositoryfilestagingComponent implements OnInit {

	title = 'Manage Repository File Staging';
	loadfromdatabase = 'Load object from file or database';
	fetchstaging = 'upload';
	readinfailed = 'Read of staging information failed (problem with server)';

	@ViewChild('staging') staging: DatasetrepositoryfilestagingComponent;


	annoinfo: any;
	maintainer = 'Administrator';
	resultHtml: string;

	constructor(
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
	}

	fetchInformation() {
		this.annoinfo = this.staging.annoinfo;
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: true, catalogtype: 'dataset:RepositoryFileStaging' },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
        alert("Return");
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				alert(success);
				if (success == 'true') {
					const catalog = result['dataset:simpcatobj'];
					alert(catalog);
					alert(JSON.stringify(catalog));
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
}
