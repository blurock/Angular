import { Component, OnInit, ViewChild } from '@angular/core';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { ThermocalculationsetupComponent } from '../thermocalculationsetup/thermocalculationsetup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewcatalogandsavetolocalfileComponent } from '../../../../dialog/viewcatalogandsavetolocalfile/viewcatalogandsavetolocalfile.component';
import { FetchcatalogobjectComponent } from '../../../../dialog/fetchcatalogobject/fetchcatalogobject.component';
import { RundatabaseserviceComponent } from '../../../../dialog/rundatabaseservice/rundatabaseservice.component';
import {ThermodynamiccontributionsComponent} from '../thermodynamiccontributions/thermodynamiccontributions.component';


@Component({
	selector: 'app-computethermodynamics',
	templateUrl: './computethermodynamics.component.html',
	styleUrls: ['./computethermodynamics.component.scss']
})
export class ComputethermodynamicsComponent implements OnInit {

	title = 'Compute 2D Graphical Thermodynamics';
	displaydescbutton = 'Display input to calculation';
	displaybutton = 'Display';
	loadfromdatabase = 'Load calculation information from a file';
	fetch = 'Fetch';
	submitbutton = 'Calculate';
	submitdescr = 'Submit Calculation with information given';
	message = 'Initialize';
	getannotationsfnotsuccessful = 'Annotations not found';
	rdfslabel = Ontologyconstants.rdfslabel;
	identifier = Ontologyconstants.dctermsidentifier;
	filedefault = 'CalculateThermodynamicsActivity';
	readinfailed = 'Activity Read Failed';
	readincanceled = 'Cancel Read';
	failedsubmission = 'Failed Submission';
	resultHtml: string;
	failedresponse = 'Calculation unsuccessful';

	annoinfo: any;
	calculationresult: string;

	catalogtype = 'dataset:ActivityThermoCalculationSetup';

	@ViewChild('calcsetup') calcsetup: ThermocalculationsetupComponent;
	@ViewChild('thermocontributions') thermocontributions: ThermodynamiccontributionsComponent;

	constructor(
		public annotations: OntologycatalogService,
		public dialog: MatDialog

	) {
		this.getAnnotations();
	}

	ngOnInit(): void {
	}

	invalid(): boolean {
		let ans = true;
		if (this.calcsetup != null) {
			ans = this.calcsetup.invalid();
		}
		return ans;
	}

	showResult(result: any) {
		this.calculationresult = result[Ontologyconstants.catalogobject];
		this.thermocontributions.setData(this.calculationresult);
	}

	getAnnotations() {
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				//this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					//const t = this.annoinfo['dataset:JThermodynamicsComputation'][this.rdfslabel];
				} else {
					alert(this.getannotationsfnotsuccessful);
				}
			},
			error: (info: any) => { alert(this.getannotationsfnotsuccessful + '\n' + info); }
		});

	}

	getServiceData(transaction: any): void {
		const id = this.annoinfo['dataset:JThermodynamicsComputation'][this.identifier];
		const activity = {};
		this.calcsetup.getData(activity);
		const servicename = activity[id];
		transaction.service = servicename.substring(8);
		transaction[Ontologyconstants.ActivityInfo] = activity;
	}

	submit(): void {
		const servicedata = {};
		this.getServiceData(servicedata);
		const dialogRef = this.dialog.open(RundatabaseserviceComponent, {
			data: servicedata
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result['dataset:servicesuccessful'];
				this.resultHtml = result['dataset:serviceresponsemessage'];
				if (success == 'true') {
					this.showResult(result);
				} else {
					alert(this.failedresponse);
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});
	}

	displayCatalogInfo(): void {
		const activity = {};
		this.calcsetup.getData(activity);
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;

		dialogConfig.data = {
			filename: this.filedefault,
			dataimage: activity
		};

		const myDialogRef = this.dialog.open(ViewcatalogandsavetolocalfileComponent, dialogConfig);

		myDialogRef.afterClosed().subscribe(result => {
			if (result != null) {
			}
		});
	}
	fetchInformation(): void {
		const dialogRef = this.dialog.open(FetchcatalogobjectComponent, {
			data: { annoinfo: this.annoinfo, maintainer: this.calcsetup.maintainer, fromdatabase: false, catalogtype: this.catalogtype }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				this.resultHtml = result['dataset:serviceresponsemessage'];
				const success = result['dataset:servicesuccessful'];
				if (success == 'true') {
					this.calcsetup.setData(result['dataset:simpcatobj']);
				} else {
					alert(this.readinfailed);
				}
			} else {
				alert(this.readincanceled);
			}

		});


	}


}
