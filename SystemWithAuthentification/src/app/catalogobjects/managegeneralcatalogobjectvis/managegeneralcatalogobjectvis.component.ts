import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { ViewcatalogandsavetolocalfileComponent } from '../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { SavecatalogdataobjectdialogComponent } from '../../dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import { FindspecifictransactionindatasetComponent } from '../../dialog/findspecifictransactionindataset/findspecifictransactionindataset.component';
import { GeneralcatalogobjectvisualizationComponent } from '../generalcatalogobjectvisualization/generalcatalogobjectvisualization.component'
import { OntologycatalogService } from '../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../const/ontologyconstants';

@Component({
	selector: 'app-managegeneralcatalogobjectvis',
	templateUrl: './managegeneralcatalogobjectvis.component.html',
	styleUrls: ['./managegeneralcatalogobjectvis.component.scss']
})
export class ManagegeneralcatalogobjectvisComponent implements OnInit {


	readinfailed = 'Read of staging information failed (problem with server)';
	title = 'Manage Catalog Object';
	
	choices = ['dataset:RepositoryFileStaging',
	'dataset:RepositoryParsedToFixedBlockSize',
	'dataset:RepositoryTherGasThermodynamicsBlock',
	'dataset:JThermodynamicsDisassociationEnergyOfStructure',
	'dataset:JThermodynamicsVibrationalStructure',
	'dataset:JThermodynamics2DSpeciesStructure',
	'dataset:JThermodynamics2DSubstructureThermodynamics',
	'dataset:ThermodynamicBensonRuleDefinition',
	'dataset:JThermodynamicsMetaAtomDefinition',
	'dataset:JThermodynamicsSymmetryStructureDefinition',
	'dataset:ThermodynamicsDatasetCollectionIDsSet'];
	
	choice = 'Choose Catalog Object';

	displaydescbutton = 'Display Partition as JSON';
	displaybutton = 'Display';
	savedescr = 'Save to database';
	savebutton = 'Save';
	loadfromdatabase = 'Fetch catalog object from database';
	fetch = 'Database';
	selectcataloglabel = 'Select Catalog Object';
	selectcatalogcomment = 'Select the catalog object to visualize';

	annoinfo: any;
	maintainer: any;
	resultHtml: string;

	message: string;
	catalogobj: any;
	display = false;
	
	catalogtype: string;



	@ViewChild('catalogvis') catalogvis: GeneralcatalogobjectvisualizationComponent;
	constructor(
		public dialog: MatDialog,
		manageuser: ManageuserserviceService,
		private annotations: OntologycatalogService
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
		this.annoinfo = this.catalogvis.getAnnotations();
		alert(JSON.stringify(this.annoinfo));
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.maintainer,
			'fromdatabase': true, 'catalogtype': this.catalogtype },
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					const catalog = result['dataset:simpcatobj'];
					if (catalog != null) {
						this.catalogvis.setData(catalog);
					}
				} else {
					alert('Error in reading: ' + JSON.stringify(result));
				}
			} else {
				this.resultHtml = this.readinfailed;
			}

		});
	}
	displayCatalogInfo(): void {

		const catalog = {};
		this.catalogvis.getData(catalog);

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
		this.catalogvis.getData(catalog);
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

	setDatabaseObject(catalog: string): void {
		this.catalogtype = catalog;
    	this.catalogvis.setChild(catalog);
	}



}
