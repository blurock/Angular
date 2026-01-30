import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from 'systemconstants';
import { MenutreeserviceService } from 'systemprimitives';
import { NavItem } from 'systemprimitives';;
import {DatasetcollectionsetrecordidinfoComponent} from '../datasetcollectionsetrecordidinfo/datasetcollectionsetrecordidinfo.component';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import {DatasetspecificationforcollectionsetComponent} from '../../../datasetcollection/datasetspecificationforcollectionset/datasetspecificationforcollectionset.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MenuItemComponent } from 'systemprimitives';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';


@Component({
	standalone: true,
	imports: [
		MatCardModule,
		MatGridListModule,
		MatTooltipModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
        DatasetcollectionsetrecordidinfoComponent,	
		DatasetspecificationforcollectionsetComponent,
		MenuItemComponent,
		MatMenuModule,
		NgIf
		],
  selector: 'app-activityinformationdatasetcollectionsetadddataset',
  templateUrl: './activityinformationdatasetcollectionsetadddataset.component.html',
  styleUrls: ['./activityinformationdatasetcollectionsetadddataset.component.scss']
})
export class ActivityinformationdatasetcollectionsetadddatasetComponent implements OnInit {

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	
	@Input() annoinfo: any;
	
	maintainer: string = '';
	objectform: UntypedFormGroup;
	items: NavItem[] = [];
	title = 'Activity Information for adding dataset to collection';
	speciesspec = 'dataset:DatasetCollectionType';
	display = true;
	subtitle = 'Dataset ID to Insert';

	@ViewChild('spec') spec!: DatasetspecificationforcollectionsetComponent;
	@ViewChild('record') record!: DatasetcollectionsetrecordidinfoComponent;

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
		activity[this.annoinfo['dataset:DatasetCollectionType'][this.identifier]] = this.objectform.get('DatabaseObjectType')!.value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle')!.value;
		const recorddata = {};
		this.record.getData(recorddata);
		activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]] = recorddata;
		const specvalue = {};
		this.spec.getData(specvalue);
		activity[this.annoinfo['dataset:DatasetSpecificationForCollectionSet'][this.identifier]] = specvalue;
	}
	setData(activity: any): void {
		this.objectform.get('DatabaseObjectType')!.setValue(activity[this.annoinfo['dataset:DatasetCollectionType']]);
		this.objectform.get('DescriptionTitle')!.setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		const recorddata = activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]];
		this.record.setData(recorddata);
		const specdata = activity[this.annoinfo['dataset:DatasetSpecificationForCollectionSet'][this.identifier]];
		this.spec.setData(specdata);
		}

    setCatalogObjectUniqueGenericLabel(collectionid: string) {
		this.record.setCatalogObjectUniqueGenericLabel(collectionid);
	}
  
  setObjectType($event: string): void {
    this.objectform.get('DatasetCollectionType')!.setValue($event);
  }

}
