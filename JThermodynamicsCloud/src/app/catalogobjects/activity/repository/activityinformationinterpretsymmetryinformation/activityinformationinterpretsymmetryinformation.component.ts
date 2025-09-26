import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasettransactionspecificationforcollectionComponent } from '../../../datasettransactionspecificationforcollection/datasettransactionspecificationforcollection.component';
import { UploadmenuserviceService } from '../../../../services/uploadmenuservice.service';
import { Ontologyconstants } from '../../../../const/ontologyconstants';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SpecificationfordatasetComponent } from '../../../specificationfordataset/specificationfordataset.component';
import { CatalogactivitybaseComponent } from '../../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { FileformatmanagerService } from '../../../../services/fileformatmanager.service';

@Component({
	selector: 'app-activityinformationinterpretsymmetryinformation',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatGridListModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatMenuModule,
		SpecificationfordatasetComponent
	],
	templateUrl: './activityinformationinterpretsymmetryinformation.component.html',
	styleUrls: ['./activityinformationinterpretsymmetryinformation.component.scss']
})
export class ActivityinformationinterpretsymmetryinformationComponent extends CatalogactivitybaseComponent implements OnInit {

	display = false;
	objectform: FormGroup;

	specsubtitle: string = 'Dataset Specification for Symmetry Group';
	fileformat = 'dataset:JThermodynamicsSymmetryDefinitionFormat';

	fileformatdata: any;

	title = 'This is the Activity Information for Interpreting Symmetry Contributions';

	@ViewChild('spec') spec!: SpecificationfordatasetComponent;

	constructor(
		cd: ChangeDetectorRef,
		constants: UserinterfaceconstantsService,
		annotations: OntologycatalogService,
		private formBuilder: FormBuilder,
		private fileservice: FileformatmanagerService
	) {
		super(constants, annotations, cd);
		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			BlockInterpretationMethod: ['', Validators.required],
			FileSourceFormat: ['File Format', Validators.required]

		});
		this.fileservice.getFormatClassification().subscribe({
			next: (data: any) => {
				this.fileformatdata = data;
				const freqformat = data[this.fileformat];
				this.objectform.get('FileSourceFormat')!.setValue(this.fileformat);
				const block = freqformat['dataset:interpretMethod'];
				this.objectform.get('BlockInterpretationMethod')!.setValue(block);
				this.display = true;
			}
		});
		this.catalogtype = "dataset:ActivityInformationInterpretSymmetryInformation";
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
	}

	invalid(): boolean {
		return this.objectform.invalid;
	}

	override annotationsFound(response: any): void {
		super.annotationsFound(response);
	}

	override setPrerequisiteData(prerequisite: any) {
		if(this.annoinfo != null ) {
		const actinfo = prerequisite['dataset:activityinfo'];
		const shortdescr = prerequisite[Ontologyconstants.ShortTransactionDescription];
		const activity = shortdescr[Ontologyconstants.TransactionEventType];
		var titleid = '';
		titleid = this.annoinfo['dataset:DescriptionTitle'][this.identifier];
		const formatid = this.annoinfo['dataset:FileSourceFormat'][this.identifier];
		this.objectform.get('DescriptionTitle')!.setValue(actinfo[titleid]);
		this.objectform.get('FileSourceFormat')!.setValue(actinfo[formatid]);
		this.spec.setData(actinfo);
		}
	}


	override getData(a: any): void {
		super.getData(a);
		a[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod')?.value ?? '';
		a[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat')?.value ?? '';
		a[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle')?.value ?? '';
		this.spec.getData(a);
	}
	override setData(activity: any): void {
		this.objectform.get('BlockInterpretationMethod')!.setValue(activity[this.annoinfo['dataset:BlockInterpretationMethod']]);
		this.objectform.get('FileSourceFormat')!.setValue(activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]]);
		this.objectform.get('DescriptionTitle')!.setValue(activity[this.annoinfo['dataset:DescriptionTitle']]);
		this.spec.setData(activity);
	}

}
