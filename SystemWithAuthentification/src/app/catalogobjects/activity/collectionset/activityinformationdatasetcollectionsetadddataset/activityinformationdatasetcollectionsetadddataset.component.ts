import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { NavItem } from '../../../../primitives/nav-item';
import {DatasetcollectionsetrecordidinfoComponent} from '../datasetcollectionsetrecordidinfo/datasetcollectionsetrecordidinfo.component';

@Component({
  selector: 'app-activityinformationdatasetcollectionsetadddataset',
  templateUrl: './activityinformationdatasetcollectionsetadddataset.component.html',
  styleUrls: ['./activityinformationdatasetcollectionsetadddataset.component.scss']
})
export class ActivityinformationdatasetcollectionsetadddatasetComponent implements OnInit {

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	
	@Input() annoinfo: any;
	
	objectform: FormGroup;
	items: NavItem[];
	title = 'Activity Information for adding dataset to collection';
	speciesspec = 'dataset:DatabaseObjectType';
	display = true;

	@ViewChild('spec') spec: DatasettransactionspecificationforcollectionComponent;
	@ViewChild('record') record: DatasetcollectionsetrecordidinfoComponent;

  constructor(
    	private formBuilder: FormBuilder,
		private menusetup: MenutreeserviceService

  ) {
    		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			DatabaseObjectType: ['', Validators.required],
		});

   }

  ngOnInit(): void {
    this.items = [];
    		this.items = this.menusetup.findChoices(this.annoinfo, this.speciesspec);
  }
  
  	getData(activity: any): void {
		activity[this.annoinfo['dataset:DatabaseObjectType'][this.identifier]] = this.objectform.get('DatabaseObjectType').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		const recorddata = {};
		this.record.getData(recorddata);
		activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]] = recorddata;
		const specvalue = {};
		this.spec.getData(specvalue);
		activity[this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]] = specvalue;
	}
	setData(activity: any): void {
		this.objectform.get('DatabaseObjectType').setValue(activity[this.annoinfo['dataset:DatabaseObjectType']]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		const recorddata = activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]];
		this.record.setData(recorddata);
		this.spec.setData(activity);
		}

  
  setObjectType($event: string): void {
    this.objectform.get('DatabaseObjectType').setValue($event);
  }

}
