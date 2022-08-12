import { Component, OnInit, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { DatasettransactionspecificationforcollectionComponent } from '../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ActivityinformationComponent} from '../activityinformation/activityinformation.component';

@Component({
	selector: 'app-datasettransactioneventobject',
	templateUrl: './datasettransactioneventobject.component.html',
	styleUrls: ['./datasettransactioneventobject.component.scss']
})
export class DatasettransactioneventobjectComponent implements OnInit {
  
  @Input() catalogobj: any;
  @Output() annoReady = new EventEmitter<any>();

	objectform: FormGroup;
	maintainer: string;
	message: string;
	annoinfo: any;
	
	display = false;

	typecommentid: string;
	transkeyid: string;
	eventtypeid: string;
	objtypeid: string;
	transidid: string;
	ownerid: string;

	catalogtype = 'dataset:DatasetTransactionEventObject';
	title = 'Dataset Transaction Event';

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;
	@ViewChild('spec') spec: DatasettransactionspecificationforcollectionComponent;
	@ViewChild('activity') activity: ActivityinformationComponent;


	constructor(
		private formBuilder: FormBuilder,
		manageuser: ManageuserserviceService,
		public annotations: OntologycatalogService,
		private router: Router,
		private route: ActivatedRoute
	) {
		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.errormaintainer);
			}
		});

		this.getCatalogAnnoations();
	}

	setIDs() {
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
		alert('DatasettransactioneventobjectComponent getData(catalog: any) 0')
		this.setIDs();
		alert('DatasettransactioneventobjectComponent getData(catalog: any) 1')
		catalog[this.typecommentid] = this.objectform.get('DataTypeComment').value;
		catalog[this.transkeyid] = this.objectform.get('TransactionKey').value;
		catalog[this.eventtypeid] = this.objectform.get('TransactionEventType').value;
		catalog[this.objtypeid] = this.objectform.get('DatabaseObjectType').value;
		catalog[this.transidid] = this.objectform.get('TransactionID').value;
		catalog[this.ownerid] = this.maintainer;
		alert('DatasettransactioneventobjectComponent getData(catalog: any) 2')
		this.firestoreid.getData(catalog);
		alert('DatasettransactioneventobjectComponent getData(catalog: any) 3')
		this.spec.getData(catalog);
		alert('DatasettransactioneventobjectComponent getData(catalog: any) 4 ' + this.activity)
		this.activity.getData(catalog);
	}

	public setData(catalog: any): void {
		this.setIDs();
		this.objectform.get('DataTypeComment').setValue(catalog[this.typecommentid]);
		this.objectform.get('TransactionKey').setValue(catalog[this.transkeyid]);
		this.objectform.get('TransactionEventType').setValue(catalog[this.eventtypeid]);
		this.objectform.get('DatabaseObjectType').setValue(catalog[this.objtypeid]);
		this.objectform.get('CatalogObjectOwner').setValue(catalog[this.transidid]);
		this.maintainer = catalog[this.ownerid];
		this.firestoreid.setData(catalog);
		this.spec.setData(catalog);
		this.activity.getData(catalog);
	}

}
