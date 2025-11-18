import { ChangeDetectorRef, Component, Type, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { FetchcatalogobjectComponent } from '../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ManageuserserviceService } from '../../services/manageuserservice.service';
import { ViewcatalogandsavetolocalfileComponent } from '../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { SavecatalogdataobjectdialogComponent } from '../../dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import { GeneralcatalogobjectvisualizationComponent } from '../generalcatalogobjectvisualization/generalcatalogobjectvisualization.component'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { RunserviceprocessService } from '../../services/runserviceprocess.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { ManagerdfcatalogidelelementsComponent } from './managerdfcatalogidelelements/managerdfcatalogidelelements.component';
import { ManagerequiredtransactionsComponent } from './managerequiredtransactions/managerequiredtransactions.component';
import { MatIconModule } from '@angular/material/icon';
import { DeletetransactionService } from '../../services/deletetransaction.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';



@Component({
	selector: 'app-managegeneralcatalogobjectvis',
	templateUrl: './managegeneralcatalogobjectvis.component.html',
	styleUrls: ['./managegeneralcatalogobjectvis.component.scss'],
	standalone: true,
	imports: [GeneralcatalogobjectvisualizationComponent,
		ManagerdfcatalogidelelementsComponent,
		ManagerequiredtransactionsComponent,
		MatDialogModule, MatCardModule, MatButtonModule,
		MatGridListModule, MatFormFieldModule, MatTabsModule,
		MatSelectModule,
		MatTooltipModule,
		MatIconModule,
		NgFor
	]
})
export class ManagegeneralcatalogobjectvisComponent {


	readinfailed = 'Read of staging information failed (problem with server)';
	title = 'Manage Catalog Object';

	choices = ['dataset:RepositoryFileStaging',
		'dataset:RepositoryParsedToFixedBlockSize',
		'dataset:RepositoryTherGasThermodynamicsBlock',
		'dataset:JThermodynamicsDisassociationEnergyOfStructure',
		'dataset:JThermodynamicsVibrationalStructureDataSet',
		'dataset:JThermodynamicsVibrationalStructureDatabase',
		'dataset:JThermodynamics2DSpeciesStructure',
		'dataset:JThermodynamics2DSubstructureThermodynamics',
		'dataset:ThermodynamicBensonRuleDefinitionDataSet',
		'dataset:ThermodynamicBensonRuleDefinitionDatabase',
		'dataset:JThermodynamicsMetaAtomDefinitionDataSet',
		'dataset:JThermodynamicsMetaAtomDefinitionDatabase',
		'dataset:JThermodynamicsSymmetryStructureDefinitionDataSet',
		'dataset:JThermodynamicsSymmetryStructureDefinitionDatabase',
		'dataset:JThermodynamics2DSubstructureThermodynamicsDataSet',
		'dataset:JThermodynamics2DSubstructureThermodynamicsDatabase',
		'dataset:ThermodynamicsDatasetCollectionIDsSet'
	];

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
	resultString: string = ""
	resultHtml: SafeHtml = '';
	transactionresultHtml: SafeHtml = '';

	message: string = '';
	catalogobj: any;
	display = false;
	transactionid: any = null;

	catalogtype: string = '';
	transactioncatalogobjects: string;

	parser = new DOMParser();
	resultDocument: Document;


	@ViewChild('catalogvis') catalogvis?: GeneralcatalogobjectvisualizationComponent;
	@ViewChild('transactionobjects') transactionobjects?: ManagerdfcatalogidelelementsComponent;
	@ViewChild('requiredtransactions') requiredtransactions?: ManagerequiredtransactionsComponent;
	@ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
	componentRef!: ComponentRef<GeneralcatalogobjectvisualizationComponent>;
	constructor(
		private sanitizer: DomSanitizer,
		public deletetransaction: DeletetransactionService,
		private componentFactoryResolver: ComponentFactoryResolver,
		public dialog: MatDialog,
		manageuser: ManageuserserviceService,
		private runservice: RunserviceprocessService,
		private cdRef: ChangeDetectorRef,
		public router: Router
	) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		this.transactioncatalogobjects = 'Transaction';

		this.resultDocument = this.parser.parseFromString('', 'text/html');
	}
	transactionReady(transactionID: any): void {
		/*
		const json: Record<string, unknown> = {};
		json[Ontologyconstants.service] = 'RDFTransactionID';
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata[Ontologyconstants.successful];
				this.addMessage(responsedata[Ontologyconstants.message]);
				if (success == 'true') {
					const array = responsedata[Ontologyconstants.catalogobject];
					
				} else {

				}
			}
		});
		*/
	}

	annoReady(annoinfo: any): void {
		this.cdRef.detectChanges();
	}
	messageReady($event: string): void {
		this.addMessage($event);
	}

	fetchInformation() {
		this.annoinfo = this.catalogvis?.getAnnotations();
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: {
				annoinfo: this.annoinfo, maintainer: this.maintainer,
				'fromdatabase': false, 'fromdataset': true, 'catalogtype': this.catalogtype
			},
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result[Ontologyconstants.successful];
				this.addMessage(result[Ontologyconstants.message]);
				if (success == 'true') {
					if (result != null) {
						const catalog = result[Ontologyconstants.catalogobject];
						this.catalogvis?.setData(catalog);
						const transactionid = catalog[Ontologyconstants.TransactionID];
						this.transactioncatalogobjects = 'Transaction:   ' + transactionid;
						this.transactionid = transactionid;
						this.transactionobjects?.fetchtransactionobject(transactionid, this.annoinfo);
						this.requiredtransactions?.fetchrequiredtransactiontree(transactionid);
					}
				} else {
					alert('Error in reading: ' + JSON.stringify(result));
				}
			} else {
				this.addMessage(this.readinfailed);
			}

		});
	}
	displayCatalogInfo(): void {

		const catalog = {};
		this.catalogvis?.getData(catalog);

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
	public deleteTransaction(): void {
		const catalog: any = {};
		this.catalogvis?.getData(catalog);
		const firestoreid = catalog[Ontologyconstants.FirestoreCatalogIDForTransaction];
		this.callDeleteTransaction(firestoreid);
	}

	async callDeleteTransaction(firestoreid: any) {
		try {
			const result = await this.deletetransaction.deleteTransaction(firestoreid);

			// Update the SafeHtml variable for display
			this.transactionresultHtml = result.resultHtml;

			if (result.success) {
				// Call the desired function upon successful deletion
				this.gotoTopWindow();
			} else {
				// Handle unsuccessful deletion
				console.error("Transaction failed or was dismissed.");
			}
		} catch (error) {
			// Handle network errors or exceptions during the promise execution
			console.error("Error during transaction process:", error);
			// Optionally set a general error message
			this.transactionresultHtml = this.sanitizer.bypassSecurityTrustHtml("An unexpected error occurred.");
		}
	};


	gotoTopWindow(): void {
		this.router.navigateByUrl('/toppage');
	}


	public saveCatalog(): void {
		const catalog = {};
		this.catalogvis?.getData(catalog);
		this.openDialog(catalog, this.catalogvis?.getNonModifiedData());
	}

	public openDialog(newcatalog: any, original: any): void {
		const dialogRef = this.dialog.open(SavecatalogdataobjectdialogComponent, {
			data: { catalog: original, newcatalog: newcatalog, annotations: this.annoinfo, transactiontype: 'dataset:CatalogModificationEvent' }
		});

		dialogRef.afterClosed().subscribe(result => {
			alert(result);
		});
	}

	setDatabaseObject(catalog: string): void {
		this.catalogtype = catalog;
		this.catalogvis?.setChild(catalog);
	}
	getFixedTabCount(): number {
		return 2;
	}
	addNewCatalogTab(firestoreid: any): void {
		const json: Record<string, unknown> = {};
		json[Ontologyconstants.service] = 'ReadCatalogObjectWithFirestoreAddress';
		json[Ontologyconstants.FirestoreID] = firestoreid;
		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				this.addMessage(responsedata[Ontologyconstants.message]);
				if (responsedata[Ontologyconstants.successful]) {
					const catalog = responsedata[Ontologyconstants.catalogobject];
					this.componentRef = this.container.createComponent(GeneralcatalogobjectvisualizationComponent);
					this.componentRef.instance.setData(catalog);
					this.componentRef.instance.showCatalogObject.subscribe((firestoreid) => {
						this.addNewCatalogTab(firestoreid);
					});
				} else {
					alert('Error in reading: ' + JSON.stringify(responsedata));
				}
			}
		});


	}


	addMessage(message: string) {
		const doc: Document = this.parser.parseFromString(message, 'text/html');
		if (doc.body) {
			this.mergeDocumentBodies(this.resultDocument, doc);
			const rawHtmlString = this.resultDocument.body.innerHTML;
			this.resultHtml = this.sanitizer.bypassSecurityTrustHtml(rawHtmlString);
		}
	}

	private mergeDocumentBodies(targetDoc: Document, sourceDoc: Document): void {
		const targetBody = targetDoc.body;
		const sourceBody = sourceDoc.body;

		if (targetBody && sourceBody) {
			while (sourceBody.firstChild) {
				targetBody.appendChild(sourceBody.firstChild);
			}
		}
	}

}
