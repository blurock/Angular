import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MenutreeserviceService } from '../../../../services/menutreeservice.service';
import { NavItem } from '../../../../primitives/nav-item';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from '../../../../primitives/menu-item/menu-item.component';
import { CatalogactivitybaseComponent } from '../../../../primitives/catalogactivitybase/catalogactivitybase.component';
import { OntologycatalogService } from '../../../../services/ontologycatalog.service';
import { FileformatmanagerService } from '../../../../services/fileformatmanager.service';
import { UserinterfaceconstantsService } from '../../../../const/userinterfaceconstants.service';
import { MatCardModule } from '@angular/material/card';
import { SpecificationfordatasetComponent } from '../../../specificationfordataset/specificationfordataset.component';

@Component({
	selector: 'app-activityinformationinterpretmetaatom',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatGridListModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatMenuModule,
		MenuItemComponent,
		SpecificationfordatasetComponent
	],
	templateUrl: './activityinformationinterpretmetaatom.component.html',
	styleUrls: ['./activityinformationinterpretmetaatom.component.scss']
})
export class ActivityinformationinterpretmetaatomComponent extends CatalogactivitybaseComponent implements OnInit {

	display = false;
	objectform: UntypedFormGroup;

	fileformat = 'dataset:JThermodynamicsMetaAtomFormat';
	speciesspec = 'dataset:JThermodynamicsSpeciesSpecificationType';
	speciesspecification = 'dataset:SpeciesSpecificationNancyLinearForm';

	fileformatdata: any;
	items: NavItem[] = [];

	specsubtitle: string = 'Meta Atom Location Specification';

	title = 'This is the Activity Information for Interpreting Meta Atoms';

	@ViewChild('spec') spec!: SpecificationfordatasetComponent;

	constructor(
		cd: ChangeDetectorRef,
		constants: UserinterfaceconstantsService,
		annotations: OntologycatalogService,
		private formBuilder: UntypedFormBuilder,
		private menusetup: MenutreeserviceService,
		private fileservice: FileformatmanagerService
	) {
		super(constants, annotations, cd);
		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			BlockInterpretationMethod: ['', Validators.required],
			FileSourceFormat: ['File Format', Validators.required],
			JThermodynamicsSpeciesSpecificationType: [this.speciesspecification, Validators.required]
		});
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue(this.speciesspecification);
		this.catalogtype = "dataset:ActivityInformationInterpretMetaAtom";
	}

	ngOnInit(): void {
		this.fileservice.getFormatClassification().subscribe({
			next: (data: any) => {
				this.fileformatdata = data;
				this.display = true;
			}
		});
		if (this.annoinfo) {
			this.items = this.menusetup.findChoices(this.annoinfo, this.speciesspec);
		}

	}

	invalid(): boolean {
		return this.objectform.invalid;
	}

	override annotationsFound(response: any): void {
		super.annotationsFound(response);
		console.log("ActivityinformationinterpretmetaatomComponent  annotationsFound" + JSON.stringify(this.annoinfo['dataset:DescriptionTitle']));
	}

	override setPrerequisiteData(prerequisite: any): void {
		const activityinfo = prerequisite['dataset:activityinfo'];
		this.setData(activityinfo);
	}

	override getData(activity: any): void {
		console.log("ActivityinformationinterpretmetaatomComponent: getData: ")

		activity[this.annoinfo['dataset:BlockInterpretationMethod'][this.identifier]] = this.objectform.get('BlockInterpretationMethod')?.value ?? '';
		activity[this.annoinfo['dataset:FileSourceFormat'][this.identifier]] = this.objectform.get('FileSourceFormat')?.value ?? '';
		activity[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle')?.value ?? '';
		activity[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]] = this.objectform.get('JThermodynamicsSpeciesSpecificationType')?.value ?? '';
		this.spec.getData(activity);

		console.log("ActivityinformationinterpretmetaatomComponent: getData: " + JSON.stringify(activity));
	}
	override setData(a: any): void {
		super.setData(a);
		if (this.annoinfo) {
			this.objectform.get('FileSourceFormat')!.setValue(this.fileformat);
			if (this.fileformatdata) {
				const formatdata = this.fileformatdata[this.fileformat];
				const block = formatdata['dataset:interpretMethod'];
				this.objectform.get('BlockInterpretationMethod')!.setValue(block);
			}

			this.objectform.get('DescriptionTitle')!.setValue(this.catalog[this.annoinfo['dataset:DescriptionTitle'][this.identifier]]);
			if (this.catalog[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]] != null) {
				this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue(this.catalog[this.annoinfo['dataset:JThermodynamicsSpeciesSpecificationType'][this.identifier]]);
			} else {
				this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue(this.speciesspecification);
			}
			this.spec.setData(this.catalog);

		}
	}

	setSpeciesSpec($event: String): void {
		this.objectform.get('JThermodynamicsSpeciesSpecificationType')!.setValue($event);
	}

}
