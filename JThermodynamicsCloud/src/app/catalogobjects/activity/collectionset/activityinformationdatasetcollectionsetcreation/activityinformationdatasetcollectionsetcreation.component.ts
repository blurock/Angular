import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ontologyconstants } from 'systemconstants';
import {DatasetcollectionsetrecordidinfoComponent} from '../datasetcollectionsetrecordidinfo/datasetcollectionsetrecordidinfo.component';
import { ManageuserserviceService } from '../../../../services/manageuserservice.service';
import {DatasetspecificationforcollectionsetComponent} from '../../../datasetcollection/datasetspecificationforcollectionset/datasetspecificationforcollectionset.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
	standalone: true,
	imports: [
		MatCardModule,
		MatGridListModule,
		MatTooltipModule,
		MatInputModule,
		ReactiveFormsModule,
		MatFormFieldModule,
	    DatasetcollectionsetrecordidinfoComponent,
		DatasetspecificationforcollectionsetComponent,
	    CommonModule
	],
  selector: 'app-activityinformationdatasetcollectionsetcreation',
  templateUrl: './activityinformationdatasetcollectionsetcreation.component.html',
  styleUrls: ['./activityinformationdatasetcollectionsetcreation.component.scss']
})
export class ActivityinformationdatasetcollectionsetcreationComponent implements OnInit {

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	
	@Input() annoinfo: any;
	maintainer!: string;
	
	objectform: UntypedFormGroup;
	title = 'Activity Information for creating a collection';
	spectitle = 'Default Collection ID Specification';

	@ViewChild('record') record!: DatasetcollectionsetrecordidinfoComponent;
	@ViewChild('collection') collection!: DatasetcollectionsetrecordidinfoComponent;


  constructor(
    manageuser: ManageuserserviceService,
    	private formBuilder: UntypedFormBuilder
  ) {
    		this.objectform = this.formBuilder.group({
            DatasetCollectionType: ['', Validators.required],
			DescriptionTitle: ['', Validators.required],
			DescriptionAbstract: ['', Validators.required],
		});
		this.objectform.get('DatasetCollectionType')!.setValue('dataset:ChemConnectThermodynamicsDatabase');
   		manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;

			} else {
				alert(manageuser.errormaintainer);
			}
		});

   }

  ngOnInit(): void {
  }
  
  invalid(): boolean {
    return this.objectform.invalid ||
    this.record.invalid() ||
    this.collection.invalid(); 
  }
  
  	getData(activity: any): void {
		activity[this.annoinfo['dataset:DatasetCollectionType'][this.identifier]] = this.objectform.get('DatasetCollectionType')!.value;
		activity[this.annoinfo['dataset:DescriptionAbstract'][this.identifier]] = this.objectform.get('DescriptionAbstract')!.value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle')!.value;
		activity['dcterms:identifier'] = this.annoinfo['dataset:ActivityInformationDatasetCollectionSetCreation'][this.identifier];
		const recorddata = {};
		this.record.getData(recorddata);
		activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]] = recorddata;
		const collectiondata = {};
		this.collection.getData(collectiondata);
		activity[this.annoinfo['dataset:DatasetSpecificationForCollectionSet'][this.identifier]] = collectiondata;
	}
	setData(activity: any): void {
		this.objectform.get('DatasetCollectionType')!.setValue(activity[this.annoinfo['dataset:DatasetCollectionType']]);
		this.objectform.get('DescriptionAbstract')!.setValue(activity[this.annoinfo['dataset:DescriptionAbstract']]);
		this.objectform.get('DescriptionTitle')!.setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		const recorddata = activity[this.annoinfo['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]];
		this.record.setData(recorddata);
		const collectiondata = activity[this.annoinfo['dataset:DatasetSpecificationForCollectionSet'][this.identifier]];
		this.collection.setData(collectiondata);
		}

}
