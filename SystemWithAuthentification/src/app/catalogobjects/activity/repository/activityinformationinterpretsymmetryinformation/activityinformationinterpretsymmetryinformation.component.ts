import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { Ontologyconstants } from '../../../../const/ontologyconstants';

@Component({
  selector: 'app-activityinformationinterpretsymmetryinformation',
  templateUrl: './activityinformationinterpretsymmetryinformation.component.html',
  styleUrls: ['./activityinformationinterpretsymmetryinformation.component.scss']
})
export class ActivityinformationinterpretsymmetryinformationComponent implements OnInit {

	display = false;
	objectform: UntypedFormGroup;
	formattrans: string;

	fileformat = 'dataset:JThermodynamicsSymmetryDefinitionFormat';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	fileformatdata: any;

	@Input() annoinfo: any;

	title = 'This is the Activity Information for Interpreting Symmetry Contributions';

	@ViewChild('spec') spec: DatasettransactionspecificationforcollectionComponent;

	constructor(
		private formBuilder: UntypedFormBuilder,
		private fileservice: UploadmenuserviceService
	) {

		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			BlockInterpretationMethod: ['', Validators.required],
			FileSourceFormat: ['File Format', Validators.required]

		});

	}

	ngOnInit(): void {
		this.fileservice.getFormatClassification().subscribe({
			next: (data: any) => {
				this.fileformatdata = data;
				const freqformat = data[this.fileformat];
				this.objectform.get('FileSourceFormat').setValue(this.fileformat);
				const block = freqformat['dataset:interpretMethod'];
				this.objectform.get('BlockInterpretationMethod').setValue(block); 
				this.display = true;
			}
		});
	}
	
	invalid(): boolean {
    	return this.objectform.invalid;
  }
	
	setPrerequisiteData(prerequisite: any) {
		const actinfo = prerequisite['dataset:activityinfo'];
		const titleid = this.annoinfo['dataset:DescriptionTitle'][this.identifier];
		const formatid = this.annoinfo['dataset:FileSourceFormat'][this.identifier];
		this.objectform.get('DescriptionTitle').setValue(actinfo[titleid]);
		this.objectform.get('FileSourceFormat').setValue(actinfo[formatid]);
		const specid = this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier];
		const specdata = actinfo[specid];
		this.spec.setData(specdata);
	}


	getData(activity: any): void {
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod').value;
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		this.spec.getData(activity);
	}
	setData(activity: any): void {
		this.objectform.get('BlockInterpretationMethod').setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod']]);
		this.objectform.get('FileSourceFormat').setValue(activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		const specdata = activity[this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]];
		this.spec.setData(specdata);
	}

}
