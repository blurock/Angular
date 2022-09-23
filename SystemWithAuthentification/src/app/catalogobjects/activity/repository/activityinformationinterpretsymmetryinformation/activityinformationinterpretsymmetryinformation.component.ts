import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
	objectform: FormGroup;

	fileformat = 'dataset:JThermodynamicsSymmetryDefinitionFormat';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	fileformatdata: any;

	@Input() annoinfo: any;

	title = 'This is the Activity Information for Interpreting Symmetry Contributions';

	@ViewChild('spec') spec: DatasettransactionspecificationforcollectionComponent;

	constructor(
		private formBuilder: FormBuilder,
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

	getData(activity: any): void {
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod').value;
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		const specvalue = {};
		this.spec.getData(specvalue);
		activity[this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]] = specvalue;
	}
	setData(activity: any): void {
		this.objectform.get('BlockInterpretationMethod').setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod']]);
		this.objectform.get('FileSourceFormat').setValue(activity[this.annoinfo['dataset:FileSourceFormat']]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		this.spec.setData(activity);
	}

}
