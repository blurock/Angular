import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { ViewandlocalfilesavecatalogobjectService } from '../../../services/data/viewandlocalfilesavecatalogobject.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { RuntransactiondialogComponent } from '../../../dialog/runtransactiondialog/runtransactiondialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { UploadcatalogobjectComponent } from '../../../dialog/uploadcatalogobject/uploadcatalogobject.component';
import { Ontologyconstants } from 'systemconstants';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { FindspecifictransactionindatasetComponent } from '../../../dialog/findspecifictransactionindataset/findspecifictransactionindataset.component';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';

@Component({
	selector: 'app-transactionobjectheader',
	standalone: true,
	imports: [
		CommonModule,
		MatGridListModule,
		MatFormFieldModule,
		MatTooltipModule,
		MatDividerModule
	],
	templateUrl: './transactionobjectheader.component.html',
	styleUrl: './transactionobjectheader.component.scss'
})
export class TransactionobjectheaderComponent implements OnInit {
	prereqdescbutton: string;
	prereqbutton: string;
	displaydescbutton: string;
	displaybutton: string;
	fetchdescription: string;
	fetchbutton: string;
	submitdescr: string;
	submitbutton: string;
	notimplemented: string;
	failedresponse: string;
	failedsubmission: string;
	cancellednofileread: string;
	noprerequisite: string;
	needrepositoryfile: string;
	norerequisitesetup: string;
	fetchactivitytitle: string;

	displayinfo: string;
	catalogtype = 'dataset:ServiceEventFindTransactionFromOwnerAndType';
	fetchtransaction = 'dataset:TransactionEventType';
	fetchanno = {};
	fetchchoices = {};
	annoinfoid = 'annoinfo';
	maintainerid = 'maintainer';
	transactionchoicesid = 'transactionchoices';
	transactionid = 'transaction';
	maintainer = '';
	hasprerequisite: boolean = true;


	prerequisite: any = null;

	constructor(
		constants: UserinterfaceconstantsService,
		manageuser: ManageuserserviceService,
		private menusetup: MenutreeserviceService,
		private annotations: OntologycatalogService,
		private display: ViewandlocalfilesavecatalogobjectService,
		private sanitizer: DomSanitizer,
		private dialog: MatDialog
	) {
		this.prereqdescbutton = constants.prereqdescbutton;
		this.prereqbutton = constants.prereqbutton;
		this.displaybutton = constants.displayactivitybutton
		this.displaydescbutton = constants.displayactivitydescbutton
		this.fetchbutton = constants.fetchactivtybutton;
		this.fetchdescription = constants.fetchactivitydescription;
		this.submitbutton = constants.submittransactionbutton;
		this.submitdescr = constants.submittransactiondescr;

		this.displayinfo = constants.displayinfo;
		this.notimplemented = constants.notimplemented;
		this.failedresponse = constants.failedtransaction;
		this.failedsubmission = constants.failedsubmission;
		this.cancellednofileread = constants.cancellednofileread;
		this.noprerequisite = constants.noprerequisite;
		this.needrepositoryfile = constants.needrepositoryfile;
		this.norerequisitesetup = constants.norerequisitesetup;
		this.fetchactivitytitle = constants.fetchactivtytitle;

		this.hasprerequisite = this.prerequisiteid.length > 0;


		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});

		this.getCatalogAnnoations();

	}

	ngOnInit(): void {
	}
	
	@Input() invalid?: () => boolean;
	@Input() prerequisiteid: string = '';
	@Input() setData?: (catalog: any) => void;
	@Input() getData?: (catalog: any) => void;
	@Input() setPrerequisiteData?: (prerequisite: any) => void;
	@Input() annoinfo?: any;
	@Input() transaction?: string;
	@Input() prerequisitetype?: string;
	@Input() activitytype: string = '';
	@Input() filenameroot: string = 'CatalogObject';
	@Input() title: string = 'Catalog Object';
	@Output() safeHtml = new EventEmitter<SafeHtml>();

	@Output() transactionSuccess = new EventEmitter();

	activitysetup(): void {
		if (this.prerequisiteid.length > 0) {
			if (this.prerequisite != null) {
				if (this.setPrerequisiteData) {
					this.setPrerequisiteData(this.prerequisite);
				}
			} else {
				const datainfo: Record<string, unknown> = {};
				datainfo[this.annoinfoid] = this.fetchanno;
				datainfo[this.maintainerid] = this.maintainer;
				datainfo[this.transactionid] = this.prerequisitetype;
				const dialogRef = this.dialog.open(FindspecifictransactionindatasetComponent, {
					data: datainfo
				});
				dialogRef.afterClosed().subscribe(result => {
					if (result != null) {
						this.prerequisite = result;
						if (this.setPrerequisiteData) {
							this.setPrerequisiteData(this.prerequisite);
							const output = this.sanitizer.bypassSecurityTrustHtml('TransactioninterprettextblockComponent: prerequisite set up' + JSON.stringify(result));
							this.safeHtml.emit(output);
						} else {
						const output = this.sanitizer.bypassSecurityTrustHtml('TransactioninterprettextblockComponent: prerequisite not set up');
						this.safeHtml.emit(output);

						}
					} else {
						const output = this.sanitizer.bypassSecurityTrustHtml('TransactioninterprettextblockComponent: prerequisite not set up');
						this.safeHtml.emit(output);
					}
				});
			}
		}
	}
	
	headerInValid(): boolean {
		var ans: boolean = true;
		if(this.invalid) {
			ans = this.invalid();
		}
		return ans;
	}

	displayActivity(): void {
		this.safeHtml.emit(this.sanitizer.bypassSecurityTrustHtml(this.displayinfo + ": " + this.activitytype));
		const catalog: Record<string, any> = {};
		if (this.getData) {
			this.getData(catalog);
		} else {
			this.safeHtml.emit(this.sanitizer.bypassSecurityTrustHtml("setData(catalog) " + this.notimplemented));
		}
		const root = this.filenameroot;
		const title = this.title;
		this.display.openDialog(catalog, root, title);

	}
	fetchActivity(): void {
		const dialogRef = this.dialog.open(UploadcatalogobjectComponent, {
			data: { title: this.fetchactivitytitle }
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if (result[Ontologyconstants.successful]) {
					this.safeHtml.emit(this.sanitizer.bypassSecurityTrustHtml(result[Ontologyconstants.message]))
					if (result[Ontologyconstants.catalogobject]) {
						var activity = result[Ontologyconstants.catalogobject];
						if(activity['prov:activity'] != null) {
							activity = activity['dataset:activityinfo'];
						}
						if (this.setData) {
							this.setData(activity);
						}

					}
				}
			} else {
				this.safeHtml.emit(this.sanitizer.bypassSecurityTrustHtml(this.cancellednofileread));
			}

		});
	}
	setPrerequisiteValue(prerequisite: any): void {
		this.prerequisite = prerequisite;
	}
	submit(): void {
		const transaction = {};
		this.setUpTransactionData(transaction);
		const dialogRef = this.dialog.open(RuntransactiondialogComponent, {
			data: transaction
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result[Ontologyconstants.successful];
				if (success == 'true') {
					this.transactionSuccess.emit(result);
				} else {
					alert(this.failedresponse);
					this.safeHtml.emit(this.sanitizer.bypassSecurityTrustHtml(result[Ontologyconstants.message]));
				}
			} else {
				this.safeHtml.emit(this.sanitizer.bypassSecurityTrustHtml(this.failedsubmission));
			}
		});

	}


	setUpTransactionData(transaction: any) {
		if (this.getData) {
			transaction['prov:activity'] = this.transaction;
			const jsonact = {};
			transaction['dataset:activityinfo'] = jsonact;
			this.getData(jsonact);
			if (this.prerequisite != null) {
				const firestoreid = this.prerequisite['dataset:firestorecatalog'];
				const prerequisites: Record<string, unknown> = {};
				if (this.prerequisiteid) {
					if (this.prerequisiteid.length > 0) {
						prerequisites[this.prerequisiteid] = firestoreid;
					}
				}
				transaction['dataset:transreqobj'] = prerequisites;
			} else {
				if (this.prerequisiteid.length > 0) {
					alert(this.noprerequisite);
				}

			}

		} else {
			alert(this.needrepositoryfile);
		}
		return transaction;
	}

	public getCatalogAnnoations(): void {
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				if (responsedata) {
					const response = responsedata;
					if (response[Ontologyconstants.successful]) {
						const catalog = response[Ontologyconstants.catalogobject];
						this.fetchanno = catalog[Ontologyconstants.annotations];

					} else {
					}
				}
			},
		});
	}


}
