import { Component, OnInit, AfterViewInit, ViewChild,EventEmitter  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UploadmenuserviceService } from '../../services/uploadmenuservice.service';
import {UploadfileinformationComponent} from '../uploadfileinformation/uploadfileinformation.component';
import {SubmitfileandinformatioonComponent} from '../submitfileandinformatioon/submitfileandinformatioon.component';
import {InitialreadinofrepositoryfileeventComponent} from '../initialreadinofrepositoryfileevent/initialreadinofrepositoryfileevent.component';
import { Ontologyconstants } from '../../const/ontologyconstants';
import {ParseuploadedfileComponent} from '../parseuploadedfile/parseuploadedfile.component';
import {ParsefiletransactionComponent} from '../parsefiletransaction/parsefiletransaction.component';
import {TransactioninterprettextblockComponent} from '../transactioninterprettextblock/transactioninterprettextblock.component';
import {InterprettextblockresultsComponent} from '../interprettextblockresults/interprettextblockresults.component';

@Component({
	selector: 'app-uploadsteps',
	templateUrl: './uploadsteps.component.html',
	styleUrls: ['./uploadsteps.component.scss'],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true },
		},
	],
})
export class UploadstepsComponent implements OnInit {

	parseinfoform: FormGroup;
	createform: FormGroup;
	references: FormArray;
	uncertaintyInformation: any;
	unitInformation: any;

	parseResult: string;
	interpretResult: string;
	titles: string[];
	titleInformation: any;
	
	public filemediatype = "dataset:FileTypeText";
	public filemediasubtype = "";
	public uploadfilesource = "dataset:LocalFileSystem";
	public maintainer = "Administrator";
	public collectionobjecttype = "";

	unitset = ["quantitykind:MolarEnergy", "quantitykind:MolarEntropy", "quantitykind:MolarHeatCapacity", "quantitykind:Frequency"];
	
	@ViewChild('uploadinfo') uploadinfo: UploadfileinformationComponent;
	@ViewChild('repositoryresults') repositoryresults: InitialreadinofrepositoryfileeventComponent;
	@ViewChild('parse') parse: ParseuploadedfileComponent;
	@ViewChild('parsetransaction') parsetransaction: ParsefiletransactionComponent;
	@ViewChild('interpret') interpret: TransactioninterprettextblockComponent;
	@ViewChild('interprettransaction') interprettransaction: InterprettextblockresultsComponent;
	
	repositorystaging = new EventEmitter<any>();
	parseFile = new EventEmitter<any>();
	
	constructor(
		private _formBuilder: FormBuilder,
		private uploadService: UploadmenuserviceService) { 
		}

	ngOnInit() {
		this.createform = this._formBuilder.group({
		});
		this.references = new FormArray([]);
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
		
	}
	
	repositoryEvent($event): void {
					const catalog = $event[Ontologyconstants.catalogobject][0];
					this.repositoryresults.setCatalog(catalog);
					this.parse.setFileStaging(catalog);		
	}
	uploadTransEvent($event): void {
					const catalog = $event[Ontologyconstants.catalogobject];
					this.repositoryresults.setCatalog(catalog);
					this.parse.setFileStaging(catalog);	
					const format = this.parse.formatValue();
					this.interpret.setFileFormat(format);	
	}
	parsedEvent($event): void {
		const transaction = $event[Ontologyconstants.TransactionEventObject];
		this.parsetransaction.setData(transaction);
		const activity = transaction['dataset:activityinfo'];
		const format = activity['dataset:filesourceformat'];
		this.interpret.setFileFormat(format);
		this.interpret.setPrerequisite(transaction);
	}
	parsedTransactionEvent($event) {
		this.parsetransaction.setData($event);
		this.interpret.setPrerequisite($event);
	}
	interpretEvent($event): void {
		const transaction = $event[Ontologyconstants.TransactionEventObject];
		this.interprettransaction.setData(transaction);		
	}
  interpretTransactionEvent($event) {
	  
  }
}
