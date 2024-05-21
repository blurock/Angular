import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';


@Component({
	selector: 'app-activityrepositorypartitiontocatalog',
	templateUrl: './activityrepositorypartitiontocatalog.component.html',
	styleUrls: ['./activityrepositorypartitiontocatalog.component.scss']
})
export class ActivityrepositorypartitiontocatalogComponent implements OnInit {

	@Input() annoinfo: any;

	parseinfoform: UntypedFormGroup;
	maintainer: string;
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	formatInformation: any;
	filesourcetypechoices: string[];
	showblkcnt = true;
	
	

	blkcntid = '';
	descrtitleid = '';
	formatid = '';
	methodid = '';
	specid = '';

	getannofilefnotsuccessful = 'Error in retrieving File Format information';

	@ViewChild('spec') spec: DatasettransactionspecificationforcollectionComponent;


	constructor(
		private uploadService: UploadmenuserviceService,
		public annotations: OntologycatalogService,
		manageuser: ManageuserserviceService,
		private _formBuilder: UntypedFormBuilder
	) {
		this.parseinfoform = this._formBuilder.group({
			BlockLineCount: ['not applicable'],
			DescriptionTitle: ['', Validators.required],
			FileSourceFormat: ['', Validators.required],
			FilePartitionMethod: ['', Validators.required],
		});

		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(manageuser.determineMaintainer);
			}
		});
		this.uploadService.getFormatClassification().subscribe((data) => {
			this.formatInformation = data;
			this.filesourcetypechoices = Object.keys(data);
			for (const element of Object.entries(data)) {
				const key = element[0];
			}
		}, (error) => {
			alert(this.getannofilefnotsuccessful);
		})


	}

	ngOnInit(): void {
	}
	
	invalid(): boolean {
		return this.parseinfoform.invalid || this.spec.invalid();
	}

	setIDs() {
		this.blkcntid = this.annoinfo['dataset:BlockLineCount'][this.identifier];
		this.descrtitleid = this.annoinfo['dataset:DescriptionTitle'][this.identifier];
		this.formatid = this.annoinfo['dataset:FileSourceFormat'][this.identifier];
		this.methodid = this.annoinfo['dataset:FilePartitionMethod'][this.identifier];
		this.specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];;
	}

	setData(activity: any): void {
		this.setIDs()
		this.parseinfoform.get('BlockLineCount').setValue(activity[this.blkcntid]);
		alert('ActivityrepositorypartitiontocatalogComponent 2');
		this.parseinfoform.get('DescriptionTitle').setValue(activity[this.descrtitleid]);
		this.parseinfoform.get('FileSourceFormat').setValue(activity[this.formatid]);
		this.parseinfoform.get('FilePartitionMethod').setValue(activity[this.methodid]);
		this.spec.setData(activity[this.specid]);
	}
	getData(activity: any): void {
		this.setIDs();
		activity[this.blkcntid] = this.parseinfoform.get('BlockLineCount').value;
		activity[this.descrtitleid] = this.parseinfoform.get('DescriptionTitle').value;
		activity[this.formatid] = this.parseinfoform.get('FileSourceFormat').value;
		activity[this.methodid] = this.parseinfoform.get('FilePartitionMethod').value;
		this.spec.getData(activity);
	}

	selectFileFormat($event): void {
		this.parseinfoform.get('FilePartitionMethod').setValue(this.formatInformation[$event]['dataset:partitionMethod']);
		const blkcnt = this.formatInformation[$event]['dataset:blocklinecount'];
		if (blkcnt.length > 0) {
			this.showblkcnt = true;
		} else {
			this.showblkcnt = false;
		}
		this.parseinfoform.get('BlockLineCount').setValue(blkcnt);
	}

}
