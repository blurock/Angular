import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { NavItem } from '../../../../primitives/nav-item';
import {DatasetcollectionsetrecordidinfoComponent} from '../datasetcollectionsetrecordidinfo/datasetcollectionsetrecordidinfo.component';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import {DatasetspecificationforcollectionsetComponent} from '../../../datasetcollection/datasetspecificationforcollectionset/datasetspecificationforcollectionset.component';


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
	
	maintainer: string;
	objectform: UntypedFormGroup;
	items: NavItem[];
	title = 'Activity Information for adding dataset to collection';
	speciesspec = 'dataset:DatasetCollectionType';
	display = true;
	subtitle = 'Dataset ID to Insert';

	@ViewChild('spec') spec: DatasetspecificationforcollectionsetComponent;
	@ViewChild('record') record: DatasetcollectionsetrecordidinfoComponent;

  constructor(
    manageuser: ManageuserserviceService,
    	private formBuilder: UntypedFormBuilder,
		private menusetup: MenutreeserviceService

  ) {
    		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			DatasetCollectionType: ['', Validators.required],
		});
   		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;

			} else {
				alert(manageuser.errormaintainer);
			}
		});

   }

  ngOnInit(): void {
    this.items = this.menusetup.findChoices(this.annoinfo, this.speciesspec);
  }
  
  public invalid(): boolean {
    let ans = this.objectform.invalid;
    ans = ans || this.spec.invalid();
    ans = ans || this.record.invalid();
    return ans;
  }
  
  	getData(activity: any): void {
		activity[this.annoinfo['dataset:DatasetCollectionType'][this.identifier]] = this.objectform.get('DatabaseObjectType').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		const recorddata = {};
		this.record.getData(recorddata);
		activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]] = recorddata;
		const specvalue = {};
		this.spec.getData(specvalue);
		activity[this.annoinfo['dataset:DatasetSpecificationForCollectionSet'][this.identifier]] = specvalue;
	}
	setData(activity: any): void {
		this.objectform.get('DatabaseObjectType').setValue(activity[this.annoinfo['dataset:DatasetCollectionType']]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		const recorddata = activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]];
		this.record.setData(recorddata);
		const specdata = activity[this.annoinfo['dataset:DatasetSpecificationForCollectionSet'][this.identifier]];
		this.spec.setData(specdata);
		}

    setDatasetCollectionsSetLabel(collectionid: string) {
		this.record.setDatasetCollectionsSetLabel(collectionid);
	}
  
  setObjectType($event: string): void {
    this.objectform.get('DatasetCollectionType').setValue($event);
  }

}
