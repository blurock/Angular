import { Input, Component, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IdentifiersService } from '../../../const/identifiers.service';
import { Ontologyconstants } from 'systemconstants';
import { NavItem } from 'systemprimitives';
import { MenutreeserviceService } from 'systemprimitives';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from 'systemprimitives';
import { MatInputModule } from '@angular/material/input';
import { FileformatmanagerService } from '../../../services/fileformatmanager.service';

@Component({
	selector: 'app-gcsblobfileinformationstaging',
	templateUrl: './gcsblobfileinformationstaging.component.html',
	styleUrls: ['./gcsblobfileinformationstaging.component.scss'],
	standalone: true,
	imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, CommonModule,
		MatGridListModule, MatMenuModule, MenuItemComponent, MatGridListModule, MatInputModule, NgIf
	]
})
export class GcsblobfileinformationstagingComponent implements AfterViewInit {

	objectform: UntypedFormGroup;

	@Input() anno: any;

	items: NavItem[] = [];

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	formatmenulabel = 'dataset:FileSourceFormat';

	gcsdata: any = {};

	message = 'GCS Blob initialization information';

	constructor(
		private formBuilder: UntypedFormBuilder,
		public identifiers: IdentifiersService,
		private formatservice: FileformatmanagerService) {
		this.objectform = this.formBuilder.group({
			FileSourceFormat: ['', Validators.required],
			GCSFileName: ['', Validators.required],
			GCSFilePath: ['', Validators.required],
			GCSFullPathWithName: ['', Validators.required],
			FileSourceMediaSubType: ['', Validators.required],
			FileSourceMediaType: ['', Validators.required],
			UploadFileSource: ['', Validators.required],
		});

	}

	ngAfterViewInit(): void {
		this.formatservice.getTherGasCatalogTypes().subscribe(result => {
			this.items = result;
		});
	}

	setData(catalog: any): void {
		this.gcsdata = catalog;
		this.objectform.get('FileSourceFormat')?.setValue(catalog[this.identifiers.FileSourceFormat]);
		this.objectform.get('GCSFileName')?.setValue(catalog[this.identifiers.GCSFileName]);
		this.objectform.get('GCSFilePath')?.setValue(catalog[this.identifiers.GCSFilePath]);
		this.objectform.get('FileSourceMediaType')?.setValue(catalog[this.identifiers.FileSourceMediaType]);
		this.objectform.get('FileSourceMediaSubType')?.setValue(catalog[this.identifiers.FileSourceMediaSubType]);
		this.objectform.get('UploadFileSource')?.setValue(catalog[this.identifiers.UploadFileSource]);
	}

	getData(catalog: any): void {
		const gcsinfo: Record<string, any> = {};
		catalog[this.identifiers.GCSBlobFileInformationStaging] = gcsinfo;
		gcsinfo[this.identifiers.GCSFullPathWithName] = this.gcsdata[this.identifiers.GCSFullPathWithName];
		gcsinfo[this.identifiers.FileSourceMediaType] = this.objectform.get('FileSourceMediaType')?.value ?? '';
		gcsinfo[this.identifiers.FileSourceMediaSubType] = this.objectform.get('FileSourceMediaSubType')?.value ?? '';
		gcsinfo[this.identifiers.FileSourceFormat] = this.objectform.get('FileSourceFormat')?.value ?? '';
		gcsinfo[this.identifiers.GCSFileName] = this.objectform.get('GCSFileName')?.value ?? '';
		gcsinfo[this.identifiers.GCSFilePath] = this.objectform.get('GCSFilePath')?.value ?? '';
		gcsinfo[this.identifiers.UploadFileSource] = this.objectform.get('UploadFileSource')?.value ?? '';
	}
	setFileFormat($event: any): void {
		const format = $event['format'];
		this.objectform.get('FileSourceFormat')?.setValue(format);
	}

}