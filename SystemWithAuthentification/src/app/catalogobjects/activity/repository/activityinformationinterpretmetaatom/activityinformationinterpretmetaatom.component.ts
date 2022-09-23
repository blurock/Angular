import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { NavItem } from '../../../../primitives/nav-item';

@Component({
	selector: 'app-activityinformationinterpretmetaatom',
	templateUrl: './activityinformationinterpretmetaatom.component.html',
	styleUrls: ['./activityinformationinterpretmetaatom.component.scss']
})
export class ActivityinformationinterpretmetaatomComponent implements OnInit {

	display = false;
	objectform: FormGroup;

	fileformat = 'dataset:JThermodynamicsMetaAtomFormat';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	speciesspec = 'dataset:JThermodynamicsSpeciesSpecificationType';
	defaultformat = 'dataset:SpeciesSpecificationNancyLinearForm';

	fileformatdata: any;
	items: NavItem[];

	@Input() annoinfo: any;

	title = 'This is the Activity Information for Interpreting Meta Atoms';

	@ViewChild('spec') spec: DatasettransactionspecificationforcollectionComponent;

	constructor(
		private formBuilder: FormBuilder,
		private fileservice: UploadmenuserviceService,
		private menusetup: MenutreeserviceService
	) {

		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			BlockInterpretationMethod: ['', Validators.required],
			FileSourceFormat: ['File Format', Validators.required],
			JThermodynamicsSpeciesSpecificationType: [this.defaultformat, Validators.required]
		});
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue(this.defaultformat);
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
		this.items = this.menusetup.findChoices(this.annoinfo, this.speciesspec);
	}

	getData(activity: any): void {
		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod').value;
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat').value;
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]] = this.objectform.get('JThermodynamicsSpeciesSpecificationType').value;
		const specvalue = {};
		this.spec.getData(specvalue);
		activity[this.annoinfo['dataset:DatasetTransactionSpecificationForCollection'][this.identifier]] = specvalue;
	}
	setData(activity: any): void {
		this.objectform.get('BlockInterpretationMethod').setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod']]);
		this.objectform.get('FileSourceFormat').setValue(activity[this.annoinfo['dataset:FileSourceFormat']]);
		this.objectform.get('DescriptionTitle').setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue(activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType']]);
		this.spec.setData(activity);
		}

	setSpeciesSpec($event: string): void {
        this.objectform.get('JThermodynamicsSpeciesSpecificationType').setValue($event);
}

}
