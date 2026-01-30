import { Component, OnInit, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from 'systemconstants';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { DatasettransactionspecificationforcollectionComponent } from '../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityinformationComponent } from '../activityinformation/activityinformation.component';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';
import { RunserviceprocessService } from '../../../services/runserviceprocess.service';
import {ListoffirestoreidsComponent} from '../../listoffirestoreids/listoffirestoreids.component';
@Component({
	selector: 'app-datasettransactioneventobject',
	templateUrl: './datasettransactioneventobject.component.html',
	styleUrls: ['./datasettransactioneventobject.component.scss']
})
export class DatasettransactioneventobjectComponent implements OnInit {

	@Input() catalogobj: any;
	@Output() annoReady = new EventEmitter<any>();

	objectform: UntypedFormGroup = new UntypedFormGroup({});
	maintainer: string = '';
	message: string = '';
	annoinfo: any = {};
	transanno: any = {};
	transaction: any = {};

	items: NavItem[] = [];

	display = false;
	displaytransactions = false;
	activitydisplay = false;

    shortdescriptionid: string = '';
    firestorecatid: string = '';
    activityid: string = '';
    specid: string = '';
	typecommentid: string = '';
	transkeyid: string = '';
	eventtypeid: string = '';
	objtypeid: string = '';
	transidid: string = '';
	ownerid: string = '';
	activityinfotype: any = '';

	activityname = 'dataset:ActivityRepositoryInitialReadLocalFile';

	catalogtype = 'dataset:DatasetTransactionEventObject';
	title = 'Dataset Transaction Event';
	transactionlabel = 'Choose Transaction';
	outputtransactions = 'Output Objects';
	inputtransactions = 'Input Objects';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	serviceid = 'service';
	activityinfo = 'dataset:activityinfo';


	@ViewChild('firestoreid') firestoreid?: FiresytorecatalogidComponent;
	@ViewChild('activity') activity?: ActivityinformationComponent;
	@ViewChild('outputobjects') outputobjects?: ListoffirestoreidsComponent;
	@ViewChild('requiredobjects') requiredobjects?: ListoffirestoreidsComponent;
	//@ViewChild('spec') spec?: DatasettransactionspecificationforcollectionComponent;
	private spec: DatasettransactionspecificationforcollectionComponent | undefined;	@ViewChild('base')
	set paramSpecComponent(component: DatasettransactionspecificationforcollectionComponent | undefined) {
		this.spec = component;
		if (component) {
			if (this.transaction) {
				this.setData(this.transaction);
			}
		}
	}


	constructor(
		private formBuilder: UntypedFormBuilder,
		manageuser: ManageuserserviceService,
		public annotations: OntologycatalogService,
		private router: Router,
		private route: ActivatedRoute,
		private runservice: RunserviceprocessService,
		private menusetup: MenutreeserviceService
	) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});

		this.getCatalogAnnoations();
		const json: Record<string,any> = {};
		json[this.serviceid] = 'DatasetCreateTransactionTree';
		const activity = {};
		json[this.activityinfo] = activity;

		this.runservice.run(json).subscribe({
			next: (responsedata: any) => {
				const success = responsedata['dataset:servicesuccessful'];
				if (success == 'true') {
					const classificationresult = responsedata['dataset:simpcatobj'];
					this.transanno = classificationresult['annotations'];
					if (classificationresult != null) {
						this.items = menusetup.findTransactionChoices(classificationresult);
						this.displaytransactions = true;
					} else {
						alert('no classification result');
					}
				} else {
					alert('not successful');
				}
			}
		});

	}

	setTransaction($event: string): void {
		this.activityinfotype = this.transanno[$event];
		if (this.activityinfotype != null) {
			this.activityname = this.activityinfotype['dcterms:source'];
			this.transactionlabel = this.activityname;
			if (this.activityname != null) {
				this.activitydisplay = true;
			}
		}
	}

	setIDs() {
		this.shortdescriptionid = this.annoinfo['dataset:ShortTransactionDescription'][this.identifier];
		this.firestorecatid = this.annoinfo['dataset:FirestoreCatalogID'][this.identifier];
		//this.firestorecatid = 'dataset:firestorecatalog';
		this.specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		this.activityid = this.annoinfo['dataset:ActivityInformationRecord'][this.identifier];
		this.typecommentid = this.annoinfo['dataset:DataTypeComment'][this.identifier];
		this.transkeyid = this.annoinfo['dataset:TransactionKey'][this.identifier];
		this.eventtypeid = this.annoinfo['dataset:TransactionEventType'][this.identifier];
		this.objtypeid = this.annoinfo['dataset:DatabaseObjectType'][this.identifier];
		this.transidid = this.annoinfo['dataset:TransactionID'][this.identifier];
		this.ownerid = this.annoinfo['dataset:CatalogObjectOwner'][this.identifier];
	}

	ngOnInit(): void {

		this.objectform = this.formBuilder.group({
			DataTypeComment: ['', Validators.required],
			TransactionKey: ['', Validators.required],
			TransactionEventType: ['', Validators.required],
			DatabaseObjectType: ['', Validators.required],
			TransactionID: ['', Validators.required],
			CatalogObjectOwner: ['', Validators.required]
		});

	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.display = true;
					this.annoReady.emit(this.annoinfo);
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}

	public getData(catalog: any): void {
		this.setIDs();

        //catalog[this.identifier] = this.annoinfo['dataset:DatasetTransactionEventObject'][this.identifier];
        catalog[this.identifier] = 'dataset:datasettransactionevent';
		catalog[this.objtypeid] = this.objectform.get('DatabaseObjectType')?.value ?? '';
		catalog[this.transidid] = this.objectform.get('TransactionID')?.value;
		catalog[this.ownerid] = this.maintainer;


		const short: Record<string, any> = {};
		catalog[this.shortdescriptionid] = short;
		short[this.typecommentid] = this.objectform.get('DataTypeComment')?.value;
		short[this.transkeyid] = this.objectform.get('TransactionKey')?.value;
		short[this.eventtypeid] = this.objectform.get('TransactionEventType')?.value;
		const fireid = {};
		catalog[this.firestorecatid] = fireid
		this.firestoreid?.getData(fireid);

		const spec = {};
		catalog[this.specid] = spec;
		this.spec?.getData(spec);

		const act = {};
		catalog[this.activityid] = act;
		this.activity?.getData(act);
		const out:Record<string,any>[] = [];
		catalog['dataset:transoutobjid'] = out;
		this.outputobjects?.getData(out);
	}

	public setData(catalog: any): void {
		console.log('set data called');
		this.transaction = catalog;
		this.setIDs();

		this.objectform.get('DatabaseObjectType')?.setValue(catalog[this.objtypeid]);
		this.objectform.get('CatalogObjectOwner')?.setValue(catalog[this.ownerid]);
		this.objectform.get('TransactionID')?.setValue(catalog[this.transidid]);

		const shortdescr = catalog[this.shortdescriptionid];
		this.objectform.get('DataTypeComment')?.setValue(shortdescr[this.typecommentid]);
		this.objectform.get('TransactionKey')?.setValue(shortdescr[this.transkeyid]);
		this.objectform.get('TransactionEventType')?.setValue(shortdescr[this.eventtypeid]);
		
		this.maintainer = catalog[this.ownerid];
		const firestore = catalog[this.firestorecatid];
		this.firestoreid?.setData(firestore);
		const spec = catalog[this.specid];
		this.spec?.setData(spec);
		const act = catalog[this.activityid];
		this.activity?.setData(act);
		const out = catalog['dataset:transoutobjid'];
		this.outputobjects?.setData(out);
		const req = catalog['dataset:requiredtransitionid'];
		this.requiredobjects?.setData(req);
	}

}
