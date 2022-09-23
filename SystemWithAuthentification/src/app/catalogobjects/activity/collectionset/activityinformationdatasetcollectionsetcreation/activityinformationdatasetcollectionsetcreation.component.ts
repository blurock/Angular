import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import {DatasetcollectionsetrecordidinfoComponent} from '../datasetcollectionsetrecordidinfo/datasetcollectionsetrecordidinfo.component';

@Component({
  selector: 'app-activityinformationdatasetcollectionsetcreation',
  templateUrl: './activityinformationdatasetcollectionsetcreation.component.html',
  styleUrls: ['./activityinformationdatasetcollectionsetcreation.component.scss']
})
export class ActivityinformationdatasetcollectionsetcreationComponent implements OnInit {

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	
	@Input() annoinfo: any;
	
	objectform: FormGroup;
	title = 'Activity Information for creating a collection';

	@ViewChild('record') record: DatasetcollectionsetrecordidinfoComponent;

  constructor(
    	private formBuilder: FormBuilder
  ) {
    		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			DescriptionAbstract: ['', Validators.required],
		});

   }

  ngOnInit(): void {
  }
  
  	getData(activity: any): void {
		activity[this.annoinfo['dataset:DescriptionAbstract'][this.identifier]] = this.objectform.get('DescriptionAbstract').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		const recorddata = {};
		this.record.getData(recorddata);
		activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]] = recorddata;
	}
	setData(activity: any): void {
		this.objectform.get('DescriptionAbstract').setValue(activity[this.annoinfo['dataset:DescriptionAbstract']]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		const recorddata = activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]];
		this.record.setData(recorddata);
		}

}
