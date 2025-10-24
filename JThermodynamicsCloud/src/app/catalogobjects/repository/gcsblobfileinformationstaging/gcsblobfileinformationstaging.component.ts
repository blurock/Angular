import { Input, Component, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IdentifiersService } from '../../../const/identifiers.service';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { NavItem } from '../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import { MatInputModule } from '@angular/material/input';
import { FileformatmanagerService } from '../../../services/fileformatmanager.service';

@Component({
	selector: 'app-gcsblobfileinformationstaging',
	templateUrl: './gcsblobfileinformationstaging.component.html',
	styleUrls: ['./gcsblobfileinformationstaging.component.scss'],
	standalone: true,
	imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, CommonModule,
		MatGridListModule,MatMenuModule,MenuItemComponent,MatGridListModule, MatInputModule, NgIf
	]
})
export class GcsblobfileinformationstagingComponent implements AfterViewInit {

	objectform: UntypedFormGroup;

	@Input() anno: any;

	items: NavItem[] = [];

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	formatmenulabel = 'dataset:FileSourceFormat';
	
	message = 'GCS Blob initialization information';

	constructor(
		private formBuilder: UntypedFormBuilder,
		public identifiers: IdentifiersService,
		private menusetup: MenutreeserviceService,
		private formatservice: FileformatmanagerService) {
					this.objectform = this.formBuilder.group({
			DescriptionAbstract: ['', Validators.required],
			FileSourceFormat: ['', Validators.required],
			GCSFileName: ['', Validators.required],
			GCSFilePath: ['', Validators.required],
		});

		 }

	ngAfterViewInit(): void {
		this.formatservice.getTherGasCatalogTypes().subscribe(result => {
			this.items = result;
		});
	}

	setData(catalog: any): void {
		this.objectform.get('DescriptionAbstract')?.setValue(catalog[this.identifiers.DescriptionAbstract]);
		this.objectform.get('FileSourceFormat')?.setValue(catalog[this.identifiers.FileSourceFormat]);
		this.objectform.get('GCSFileName')?.setValue(catalog[this.identifiers.GCSFileName]);
		this.objectform.get('GCSFilePath')?.setValue(catalog[this.identifiers.GCSFilePath]);
	}

	getData(catalog: any): void {
		const gcsinfo: Record<string,any> = {};
		catalog[this.identifiers.GCSBlobFileInformationStaging] = gcsinfo;
		gcsinfo[this.identifiers.DescriptionAbstract] = this.objectform.get('DescriptionAbstract')?.value ?? '';
		gcsinfo[this.identifiers.FileSourceFormat] = this.objectform.get('FileSourceFormat')?.value ?? '';
		gcsinfo[this.identifiers.GCSFileName] = this.objectform.get('GCSFileName')?.value ?? '';
		gcsinfo[this.identifiers.GCSFilePath] = this.objectform.get('GCSFilePath')?.value ?? '';
	}
	setFileFormat($event: any): void {
		const format = $event['format'];
		this.objectform.get('FileSourceFormat')?.setValue(format);
	}

}