import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import { Ontologyconstants } from '../../const/ontologyconstants';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { UserinterfaceconstantsService } from '../../const/userinterfaceconstants.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ManagedatasettransactioneventobjectComponent } from '../../catalogobjects/transaction/managedatasettransactioneventobject/managedatasettransactioneventobject.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FileformatmanagerService } from '../../services/fileformatmanager.service';

@Component({
	selector: 'app-uploadsteps',
	templateUrl: './uploadsteps.component.html',
	styleUrls: ['./uploadsteps.component.scss'],
	standalone: true,
	imports: [MatStepperModule,
		MatIconModule,
		CommonModule,
		MatCardModule,
		MatDividerModule,
		ManagedatasettransactioneventobjectComponent
	],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true },
		},
	],
})
export class UploadstepsComponent implements OnInit, AfterViewInit {

	rdfslabel: string = Ontologyconstants.rdfslabel;
	rdfscomment: string = Ontologyconstants.rdfscomment;
	identifier: string = Ontologyconstants.dctermsidentifier;

	uncertaintyInformation: any;
	unitInformation: any;

	titles: string[] = [];
	titleInformation: any;

	uploadanno: any;
	parseanno: any;
	translateanno: any;

	formatInformation: any;

	public filemediatype = "dataset:FileTypeText";
	public filemediasubtype = "";
	public uploadfilesource = "dataset:LocalFileSystem";
	public maintainer = "Administrator";
	public collectionobjecttype = "";

	activityfileroot = 'Activity';

	initialprerequisiteid = '';
	uploadtransaction: string = Ontologyconstants.InitialReadInOfRepositoryFileTransaction;
	uploadactivitytype: string = Ontologyconstants.InitialReadInOfRepositoryFileActivity;
	uploadfiletitle: string;
	uploadactivitytitle: string;
	uploadtransactiontitle: string;
	uploadprerequisitetype = '';
	showuploadactivity: boolean = true;
	showuploadtransaction: boolean = true;

	partitionprerequisiteid = Ontologyconstants.InitialReadInOfRepositoryFile;
	parseannoinfo: any | null = null;
	parsetransactiontitle: string;
	parsetransaction: string = Ontologyconstants.PartiionSetWithinRepositoryFileTransaction;
	parseactivitytype: string = Ontologyconstants.PartiionSetWithinRepositoryFileActivity;
	parseprerequisitetype: string = Ontologyconstants.InitialReadInOfRepositoryFileTransaction;
	parsefiletitle: string;
	parseactivitytitle: string;

	translateprerequisiteid: string = Ontologyconstants.PartiionSetWithinRepositoryFile;
	translateprerequisitetype: string = Ontologyconstants.PartiionSetWithinRepositoryFileTransaction;
	translateactivitytype: string = Ontologyconstants.TransactionInterpretTextBlockTransaction;
	translatetransaction: string = Ontologyconstants.TransactionInterpretTextBlock;



	unitset = ["quantitykind:MolarEnergy", "quantitykind:MolarEntropy", "quantitykind:MolarHeatCapacity", "quantitykind:Frequency"];




	@ViewChild('initialloadtransaction') initialloadtransaction?: ManagedatasettransactioneventobjectComponent;
	@ViewChild('parsedatatransaction') parsedatatransaction?: ManagedatasettransactioneventobjectComponent;
	@ViewChild('translatedatatransaction') translatedatatransaction?: ManagedatasettransactioneventobjectComponent;

	//repositorystaging = new EventEmitter<any>();
	//parseFile = new EventEmitter<any>();

	constructor(
		private format: FileformatmanagerService,
		constants: UserinterfaceconstantsService,
		private sanitizer: DomSanitizer,
		private uploadService: UploadmenuserviceService) {
		this.uploadfiletitle = constants.uploadfiletitle;
		this.uploadactivitytitle = constants.uploadactivitytitle;
		this.uploadtransactiontitle = constants.uploadtransactiontitle;

		this.parsetransactiontitle = constants.parsetransactiontitle;
		this.parsefiletitle = constants.parsefiletitle;
		this.parseactivitytitle = constants.parseactivitytitle;

		this.initialloadtransaction?.setActivityType(Ontologyconstants.InitialReadInOfRepositoryFileActivity);
		this.parsedatatransaction?.setActivityType(Ontologyconstants.PartiionSetWithinRepositoryFileActivity);

		format.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
		}, (error) => {
			console.log(format.errorclassification);
		});
	}

	ngOnInit() {
		this.uploadService.getTitleChoices().subscribe((data) => {
			this.titleInformation = data;
			this.titles = Object.keys(data);
		}, (error) => {
			console.log("An error accessing getTitleChoices() Service");
		})

		this.uploadService.getUnitSet(this.unitset).subscribe((data) => {
			this.unitInformation = data;
		}, (error) => {
			console.log("An error accessing getUnitSet Service");
		})
		this.uploadService.getUncertaintyChoices().subscribe((data) => {
			this.uncertaintyInformation = data;
		}, (error) => {
			console.log("An error accessing getUnitSet Service");
		})

	}
	ngAfterViewInit() {
		this.initialloadtransaction?.createComponent(this.uploadactivitytype);
		this.parsedatatransaction?.createComponent(this.parseactivitytype);
	}

	toggleUploadactivityShow() {
		this.showuploadactivity = !this.showuploadactivity;
	}
	toggleUploadtransactionShow() {
		this.showuploadtransaction = !this.showuploadtransaction;
	}


	setParseData(catalog: any): void {
		/*
		if (this.parseinfo) {
			this.parseinfo.setData(catalog);
		}
		*/
	}
	setTranslateData(catalog: any): void {
		/*
		if (this.parseinfo) {
			this.parseinfo.setData(catalog);
		}
		*/
	}
	getParseData(catalog: any): void {
		/*
		if (this.parseinfo) {
			this.parseinfo.getData(catalog);
		}
		*/
	}
	setInitialLoadPrerequisiteData(prerequisite: any) {
	}
	setParsePrerequisiteData(prerequisite: any) {
		const activity = prerequisite[Ontologyconstants.ActivityInfo];
		const format = activity['dataset:filesourceformat'];
		console.log("setTranslatePrerequisiteData(prerequisite: " + format);
		this.setFormat(format);
		if(this.translatedatatransaction) {
			this.translatedatatransaction.setActivityPrerequisiteData(prerequisite);
		}
	}

	setTranslatePrerequisiteData(prerequisite: any) {
		const activity = prerequisite[Ontologyconstants.ActivityInfo];
		const format = activity['dataset:filesourceformat'];
		console.log("setTranslatePrerequisiteData(prerequisite: " + format);
		this.setFormat(format);
	}

	uploadInfoAnnoReady() {
		if (this.initialloadtransaction) {
			this.uploadanno = this.initialloadtransaction.annoinfo;
		}
	}
	parseInfoAnnoReady() {
		if (this.parsedatatransaction) {
			this.parseanno = this.parsedatatransaction.annoinfo;
		}
	}

	translateInfoAnnoReady() {
		if(this.translatedatatransaction) {
			this.translatedatatransaction.annoinfo;
		}
	}

	uploadTransitionAnnoReady() {
	}

	parseTransitionAnnoReady() {

	}

	setFormat(formattype: string) {
		const activitytype = this.format.setFileFormat(formattype);
		if (this.translatedatatransaction) {
			this.translatedatatransaction.setActivityType(activitytype);
			this.translatedatatransaction.createComponent(activitytype);
		}
	}
	uploadTransactionEvent(event: any): void {
		const transaction = event[Ontologyconstants.TransactionEventObject];
		const activity = transaction[Ontologyconstants.ActivityInfo];
		const format = activity[this.uploadanno['dataset:FileSourceFormat'][this.identifier]];
		this.setFormat(format);
		if (this.parsedatatransaction) {
			this.parsedatatransaction.setActivityPrerequisiteData(transaction);
		}
		if (this.translatedatatransaction) {
			this.translatedatatransaction.setActivityPrerequisiteData(transaction);
		}
		
	}
	parseTransactionEvent(event: any) {
		const transaction = event[Ontologyconstants.TransactionEventObject];
		const activity = transaction[Ontologyconstants.ActivityInfo];
		const format = activity[this.parseanno['dataset:FileSourceFormat'][this.identifier]];
		this.setFormat(format);
		if (this.translatedatatransaction) {
			this.translatedatatransaction.setActivityPrerequisiteData(transaction);
		}
	}
	translateTransactionEvent($event: any) {
	}
}
