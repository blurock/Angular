import { Input, Component, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IdentifiersService } from '../../../const/identifiers.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { NavItem } from '../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';

@Component({
	selector: 'app-gcsblobfileinformationstaging',
	templateUrl: './gcsblobfileinformationstaging.component.html',
	styleUrls: ['./gcsblobfileinformationstaging.component.scss'],
	standalone: true,
	imports: []
})
export class GcsblobfileinformationstagingComponent implements AfterViewInit {

	objectform: UntypedFormGroup;

	@Input() anno: any;

	items: NavItem[];

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	formatmenulabel = 'dataset:FileSourceFormat';

	constructor(
		private formBuilder: UntypedFormBuilder,
		public identifiers: IdentifiersService,
		private menusetup: MenutreeserviceService) {
					this.objectform = this.formBuilder.group({
			DescriptionAbstract: ['', Validators.required],
			FileSourceFormat: ['', Validators.required],
			GCSFileName: ['', Validators.required],
			GCSFilePath: ['', Validators.required],
		});

		 }

	ngAfterViewInit(): void {
		this.items = this.menusetup.findChoices(this.anno, this.formatmenulabel);
	}

	setData(catalog: any): void {
		this.objectform.get('DescriptionAbstract').setValue(catalog[this.identifiers.DescriptionAbstract]);
		this.objectform.get('FileSourceFormat').setValue(catalog[this.identifiers.FileSourceFormat]);
		this.objectform.get('GCSFileName').setValue(catalog[this.identifiers.GCSFileName]);
		this.objectform.get('GCSFilePath').setValue(catalog[this.identifiers.GCSFilePath]);
	}

	getData(catalog: any): void {
		const gcsinfo = {};
		catalog[this.identifiers.GCSBlobFileInformationStaging] = gcsinfo;
		gcsinfo[this.identifiers.DescriptionAbstract] = this.objectform.get('DescriptionAbstract').value;
		gcsinfo[this.identifiers.FileSourceFormat] = this.objectform.get('FileSourceFormat').value;
		gcsinfo[this.identifiers.GCSFileName] = this.objectform.get('GCSFileName').value;
		gcsinfo[this.identifiers.GCSFilePath] = this.objectform.get('GCSFilePath').value;
	}
	setFileFormat($event: string): void {
		this.objectform.get('FileSourceFormat').setValue($event);
	}

}