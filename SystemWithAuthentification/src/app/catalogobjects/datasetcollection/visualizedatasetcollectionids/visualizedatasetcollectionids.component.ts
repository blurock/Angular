import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ThermodynamicsdatasetcollectionidssetComponent } from '../../datasetcollection/thermodynamicsdatasetcollectionidsset/thermodynamicsdatasetcollectionidsset.component';
import { FetchcollectiondatasetidsComponent } from '../../../dialog/fetchcollectiondatasetids/fetchcollectiondatasetids.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewcatalogandsavetolocalfileComponent } from '../../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';


@Component({
	selector: 'app-visualizedatasetcollectionids',
	templateUrl: './visualizedatasetcollectionids.component.html',
	styleUrls: ['./visualizedatasetcollectionids.component.scss']
})
export class VisualizedatasetcollectionidsComponent implements OnInit {

	@Output() newCollectionV = new EventEmitter<any>();
	@Input() annoReady: EventEmitter<any>;
	@Input() maintainer: string;
	@Input() annoinfo: any;

	title = 'Collection Set ID';
	readinfailed = 'Could not read in Collection Set';
	readincanceled = 'Fetch canceled';
	loadfromdatabase = 'Load Collection Set';
	fetch = 'fetch';
	displaybutton = 'Display';
	displaydescbutton = 'Display Collection Dataset IDs';

	resultHtml: string;
	catalog: any;

	@ViewChild('thermocollectionset') thermocollectionset: ThermodynamicsdatasetcollectionidssetComponent;


	constructor(
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
/*
		this.newCollection.subscribe(result => {
			this.thermocollectionset.setData(result);
		});
		*/
	}
	
	setData(catalog) {
		this.thermocollectionset.setData(catalog);		
	}

	fetchInformation() {
		const dialogRef = this.dialog.open(FetchcollectiondatasetidsComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: true, catalogtype: 'dataset:ThermodynamicsDatasetCollectionIDsSet' },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					this.catalog = result['dataset:simpcatobj'];
					this.setData(this.catalog);
					this.newCollectionV.emit(this.catalog);
				} else {
					alert(this.readinfailed);
				}
			} else {
				alert(this.readincanceled);
			}

		});


	}
	displayCatalogInfo(): void {

		const collectionset = {};
		this.thermocollectionset.getData(collectionset);

		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			filename: this.title,
			dataimage: collectionset
		};

		const myDialogRef = this.dialog.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
		});
	}

}
