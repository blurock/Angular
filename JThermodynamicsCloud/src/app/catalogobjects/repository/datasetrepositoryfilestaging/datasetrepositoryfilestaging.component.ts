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
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ChemconnectthermodynamicsdatabaseComponent } from '../../thermodynamics/chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { NavItem } from '../../../primitives/nav-item';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
	selector: 'app-datasetrepositoryfilestaging',
	templateUrl: './datasetrepositoryfilestaging.component.html',
	styleUrls: ['./datasetrepositoryfilestaging.component.scss'],
	standalone: true,
	imports: [MatCardModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MenuItemComponent,
		MatMenuModule,
		MatProgressSpinner,
		CommonModule,
		MatInputModule,
		ChemconnectthermodynamicsdatabaseComponent,
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
	
	inputtypes = 'dataset:InitialReadTypeClass';
	objecttypeitems: NavItem[] = [];

	constructor(
		private identifiers: IdentifiersService,
		private formBuilder: FormBuilder,
		annotations: OntologycatalogService,
		cdRef: ChangeDetectorRef,
		constants: UserinterfaceconstantsService,
		private menusetup: MenutreeserviceService
	) {
		super(constants, annotations, cdRef);
		this.catalogtype = 'dataset:RepositoryFileStaging';
		//this.getCatalogAnnoations();
		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			InitialReadTypeClass: ['', Validators.required]
		});
		
	}

	@ViewChild('base') base!: ChemconnectthermodynamicsdatabaseComponent;
	//@ViewChild('simpledata') simpledata!: SimpledatabaseobjectstructureComponent;
	@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;
	@ViewChild('references') references!: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks!: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks!: SetofsitereferencesComponent;
	@ViewChild('gcs') gcs!: GcsblobfileinformationstagingComponent;
	@ViewChild('description') description!: DatadatadescriptionComponent;



	ngOnInit(): void {

	}
	
	override annotationsFound(response: any): void {
		super.annotationsFound(response);
		this.objecttypeitems = this.menusetup.findChoices(this.annoinfo, this.inputtypes);
	}


	public override setData(activity: any): void {
		super.setData(activity);
		if (this.base != null) {
			this.base.setData(this.catalog);
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
			this.objectform.get('InitialReadTypeClass')?.setValue(this.catalog[this.annoinfo['dataset:InitialReadTypeClass'][this.identifier]]);
		} else {
			alert('Display objects not set up');
		}
	}

	public override getData(catalog: any): void {
		if (this.base != null) {
			catalog[this.annoinfo['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle')?.value ?? '';
			catalog[this.annoinfo['dataset:InitialReadTypeClass'][this.identifier]] = this.objectform.get('InitialReadTypeClass')?.value ?? '';
			catalog[Ontologyconstants.dctermsidentifier] = Ontologyconstants.RepositoryFileStaging;
			catalog[this.annoinfo['dataset:CatalogObjectID'][this.identifier]] = this.catalog[this.annoinfo['dataset:CatalogObjectID'][this.identifier]];
			//this.simpledata.getData(catalog);
			this.references.getData(catalog);
			this.weblinks.getData(catalog);
			this.objectlinks.getData(catalog);
			this.gcs.getData(catalog);
			this.firestoreid.getData(catalog);
			this.description.getData(catalog);
			this.base.getData(catalog);
		}
	}
	setInputTypes(	$event: string): void {
			this.objectform.get('InitialReadTypeClass')!.setValue($event);
			}
}
