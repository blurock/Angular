import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositorydatapartitionblockComponent } from '../repositorydatapartitionblock/repositorydatapartitionblock.component';
import { FetchcatalogobjectComponent } from '../../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { RepositoryparsedtofixedblocksizeComponent } from '../partition/repositoryparsedtofixedblocksize/repositoryparsedtofixedblocksize.component';
import { RepositorythergasthermodynamicsblockComponent } from '../partition/repositorythergasthermodynamicsblock/repositorythergasthermodynamicsblock.component';
import { ViewcatalogandsavetolocalfileComponent } from '../../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { SavecatalogdataobjectdialogComponent } from '../../../dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import {InterfaceconstantsService} from '../../../const/interfaceconstants.service';

@Component({
	selector: 'app-managerepositorydatapartitionblockcomponent',
	templateUrl: './managerepositorydatapartitionblockcomponent.component.html',
	styleUrls: ['./managerepositorydatapartitionblockcomponent.component.scss']
})
export class ManagerepositorydatapartitionblockcomponentComponent implements OnInit {

	title = 'Manage Repository File Staging';
	readinfailed = 'Catalog object read failed';
	ctypechoice = 'Partition Type to Visualize';
	displaydescbutton = 'Display Partition as JSON';
	displaybutton = 'Display';
	savedescr = 'Save to database';
	savebutton = 'Save';
	fetchdescr = 'Retrieve from Database';
	fetchbutton = 'Retrieve';
	errorcatalogtypes = 'Error in determining catalog types';

	maintainer: string;
	annoinfo: any;
    catalogtypes: any;


	catalogtype: string;
	ctypelabel: string
	ctypeid: number
	cataloginfo: any
	catalog: any;
	message = 'info not initialized';


	@ViewChild('fixedpartitionblock') fixedpartitionblock: RepositoryparsedtofixedblocksizeComponent;
	@ViewChild('thermopartitionblock') thermopartitionblock: RepositorythergasthermodynamicsblockComponent;


	constructor(manageuser: ManageuserserviceService,
	    interfaceconstants: InterfaceconstantsService,
		public dialog: MatDialog,
		public dialogvis: MatDialog) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		
		interfaceconstants.getTherGasCatalogTypes().subscribe(result => {
			if (result != null) {
				this.catalogtypes = result;
			} else {
				alert(interfaceconstants.errorcatalogtypes);
			}
			})
	}

	ngOnInit(): void {
		this.setCatalogType(1);
	}
	public saveCatalog(): void {
		const catalog = {};
		this.getData(catalog);
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

	getAnnotations(): any {
		let annoinfo = {};
		if (this.ctypeid == 0) {
			annoinfo = this.fixedpartitionblock.annoinfo;
		} else if (this.ctypeid == 1) {
			annoinfo = this.thermopartitionblock.annoinfo;
		}
		return annoinfo;
	}

	setData(catalog: any): void {
		if (this.ctypeid == 0) {
			this.fixedpartitionblock.setData(catalog);
		} else if (this.ctypeid == 1) {
			this.thermopartitionblock.setData(catalog);
		}
	}
	getData(catalog: any): void {
		if (this.ctypeid == 0) {
			this.fixedpartitionblock.getData(catalog);
		} else if (this.ctypeid == 1) {
			this.thermopartitionblock.getData(catalog);
		}

	}

	fetchInformation(): void {

		this.annoinfo = this.getAnnotations();
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer, fromdatabase: true, catalogtype: this.catalogtype },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {

				const success = result['dataset:servicesuccessful'];
				this.message = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					this.catalog = result['dataset:simpcatobj'];
					this.setData(this.catalog);
				} else {
					this.message = 'Fail to fetch Partition Block';
				}

			} else {
				this.message = this.readinfailed;
			}

		});

	}

	setCatalogType(ctype: number): void {
		this.ctypelabel = this.catalogtypes[ctype].label;
		this.ctypeid = this.catalogtypes[ctype].id;
		this.catalogtype = this.catalogtypes[ctype].catalog;
		this.cataloginfo = this.catalogtypes[ctype];
		if (this.ctypeid == 0) {
			this.fixedpartitionblock.setFormat(this.cataloginfo);
		} else if (this.ctypeid == 1) {
			this.thermopartitionblock.setFormat(this.cataloginfo);
		}
	}
	displayCatalogInfo(): void {

		const catalog = {};
		this.getData(catalog);
		let title = this.ctypelabel;

		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			filename: title,
			dataimage: catalog
		};

		const myDialogRef = this.dialogvis.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
		});
	}

}
