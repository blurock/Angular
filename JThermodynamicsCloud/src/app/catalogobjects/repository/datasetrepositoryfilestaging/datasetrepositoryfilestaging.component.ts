import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { SimpledatabaseobjectstructureComponent } from '../../simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { DatasetreferenceComponent } from '../../datasetreference/datasetreference.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { IdentifiersService } from '../../../const/identifiers.service';
import { SetofdataobjectlinksComponent } from '../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';
import { GcsblobfileinformationstagingComponent } from '../gcsblobfileinformationstaging/gcsblobfileinformationstaging.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CatalogbaseComponent } from '../../../primitives/catalogbase/catalogbase.component';
import { UserinterfaceconstantsService } from '../../../const/userinterfaceconstants.service';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-datasetrepositoryfilestaging',
	templateUrl: './datasetrepositoryfilestaging.component.html',
	styleUrls: ['./datasetrepositoryfilestaging.component.scss'],
	standalone: true,
	imports: [MatCardModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressSpinner,
		CommonModule,
		MatInputModule,
		SimpledatabaseobjectstructureComponent,
		DatasetreferenceComponent,
		FiresytorecatalogidComponent,
		SetofdataobjectlinksComponent,
		SetofsitereferencesComponent,
		DatadatadescriptionComponent,
		GcsblobfileinformationstagingComponent]
})
export class DatasetrepositoryfilestagingComponent extends CatalogbaseComponent implements OnInit {

	descriptionsuffix = 'FileStaging';
	menuclass = "dataset:FileSourceFormat";
	objectform: FormGroup;

	constructor(
		private identifiers: IdentifiersService,
		private formBuilder: FormBuilder,
		annotations: OntologycatalogService,
		cdRef: ChangeDetectorRef,
		constants: UserinterfaceconstantsService
	) {
		super(constants, annotations, cdRef);
		this.catalogtype = 'dataset:RepositoryFileStaging';
		//this.getCatalogAnnoations();
		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required]
		});

	}

	@ViewChild('simpledata') simpledata!: SimpledatabaseobjectstructureComponent;
	@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;
	@ViewChild('references') references!: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks!: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks!: SetofsitereferencesComponent;
	@ViewChild('gcs') gcs!: GcsblobfileinformationstagingComponent;
	@ViewChild('description') description!: DatadatadescriptionComponent;



	ngOnInit(): void {

	}

	public override setData(activity: any): void {
		super.setData(activity);
		if (this.simpledata != null) {
			this.simpledata.setData(this.catalog);
			const firestoreidvalues = this.catalog[this.identifiers.FirestoreCatalogID];
			this.firestoreid.setData(firestoreidvalues);
			const refs = this.catalog[this.identifiers.BibliographicReferenceLink];
			this.references.setData(refs);
			const gcs = this.catalog[this.identifiers.GCSBlobFileInformationStaging];
			this.gcs.setData(gcs);
			const olinks = this.catalog[this.identifiers.DataObjectLink];
			this.objectlinks.setData(olinks);
			const wlinks = this.catalog[this.identifiers.ObjectSiteReference];
			this.weblinks.setData(wlinks);
			const rtitle = this.catalog[this.identifiers.DescriptionTitle];
			const descr = this.catalog['dataset:descrfilestaging'];
			this.description.setData(descr);
			const title = this.catalog[this.identifiers.DescriptionTitle];
			if (title != null) {
				this.objectform.get('DescriptionTitle')?.setValue(title);
			}
		} else {
			alert('Display objects not set up');
		}
	}

	public override getData(catalog: any): void {
		if (this.simpledata != null) {
			this.simpledata.getData(catalog);
			this.references.getData(catalog);
			this.weblinks.getData(catalog);
			this.objectlinks.getData(catalog);
			this.gcs.getData(catalog);
			this.firestoreid.getData(catalog);
			this.description.getData(catalog);
		}
	}

}
