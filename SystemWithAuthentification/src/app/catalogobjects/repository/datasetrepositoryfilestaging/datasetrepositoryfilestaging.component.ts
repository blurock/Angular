import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OntologycatalogService } from 'src/app/services/ontologycatalog.service';
import { BaseCatalogInterface } from 'src/app/primitives/basecataloginterface';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { repository } from '../../../const/repositorystagingexample';
import { SimpledatabaseobjectstructureComponent } from '../../simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { DatasetreferenceComponent } from '../../datasetreference/datasetreference.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { IdentifiersService } from '../../../const/identifiers.service';
import { SetofdataobjectlinksComponent } from '../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SavecatalogdataobjectdialogComponent} from '../../../dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import {SavecatalogdataobjectComponent} from '../../../dialog/savecatalogdataobject/savecatalogdataobject.component';
import {DatadatadescriptionComponent} from '../../datadatadescription/datadatadescription.component';

@Component({
	selector: 'app-datasetrepositoryfilestaging',
	templateUrl: './datasetrepositoryfilestaging.component.html',
	styleUrls: ['./datasetrepositoryfilestaging.component.scss']
})
export class DatasetrepositoryfilestagingComponent extends SavecatalogdataobjectComponent implements OnInit, AfterViewInit {

	objectform: FormGroup;
	catalogtype: string;
	
	constructor(
		public dialog: MatDialog,
		private formBuilder: FormBuilder,
		public annotations: OntologycatalogService,
		public identifiers: IdentifiersService) {
		super(dialog,annotations,identifiers,
		);
			this.catalogtype = 'dataset:DatasetRepositoryFileStaging';
	this.getCatalogAnnoations();

	}

	descriptionsuffix = 'FileStaging';
	menuclass = "dataset:FileSourceFormat";

	descr: string;

	@ViewChild('simpledata') simpledata: SimpledatabaseobjectstructureComponent;
	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;
	@ViewChild('references') references: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks: SetofsitereferencesComponent;
	@ViewChild('gcs') gcs: DatasetreferenceComponent;
	@ViewChild('description') description: DatadatadescriptionComponent;


	ngOnInit(): void {
		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required]
		});

	}
	ngAfterViewInit(): void {
}

	public setDefaultData(): void {
		if (this.simpledata != null) {
			this.setData(repository);
		}
		
	}

	public setData(catalog: any): void {
		if (this.simpledata != null) {
			this.simpledata.setData(catalog);
			const firestoreidvalues = catalog[this.identifiers.FirestoreCatalogID];
			this.firestoreid.setData(firestoreidvalues);
			const refs = catalog[this.identifiers.DataSetReference];
			this.references.setData(refs);
			const gcs = catalog[this.identifiers.GCSBlobFileInformationStaging];
			this.gcs.setData(gcs);
			const olinks = catalog[this.identifiers.DataObjectLink];
			this.objectlinks.setData(olinks);
			const wlinks = catalog[this.identifiers.ObjectSiteReference];
			this.objectlinks.setData(wlinks);
		    const rtitle = catalog[this.identifiers.DescriptionTitle];
		    const descr = catalog['descr-filestaging'];
		    this.description.setData(descr);
		    const title = catalog[this.identifiers.DescriptionTitle];
		    if(title != null) {
			this.objectform.get('DescriptionTitle').setValue(title);
			}
		}
	}
	
	public openMenu() {
		
	}

	public saveCatalog(): void {
		const catalog = {};
		this.getData(catalog);
		this.openDialog(catalog);
	}
	public getData(catalog: any): void {
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
