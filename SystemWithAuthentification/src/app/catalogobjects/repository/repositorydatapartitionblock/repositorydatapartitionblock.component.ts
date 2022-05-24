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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SavecatalogdataobjectdialogComponent } from '../../../dialog/savecatalogdataobjectdialog/savecatalogdataobjectdialog.component';
import { SavecatalogdataobjectComponent } from '../../../dialog/savecatalogdataobject/savecatalogdataobject.component';
import { NavItem } from '../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';

@Component({
	selector: 'app-repositorydatapartitionblock',
	templateUrl: './repositorydatapartitionblock.component.html',
	styleUrls: ['./repositorydatapartitionblock.component.scss']
})
export class RepositorydatapartitionblockComponent extends SavecatalogdataobjectComponent implements OnInit {

	objectform: FormGroup;
	items: NavItem[];
	formatmenulabel = 'dataset:FileSourceFormat';
	partitionitems: NavItem[];
	partitionmenulabel = 'dataset:FilePartitionMethod';

	@ViewChild('simpledata') simpledata: SimpledatabaseobjectstructureComponent;
	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;
	@ViewChild('references') references: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks: SetofsitereferencesComponent;


	constructor(
		private menusetup: MenutreeserviceService,
		public dialog: MatDialog,
		private formBuilder: FormBuilder,
		public annotations: OntologycatalogService,
		public identifiers: IdentifiersService) {
		super(dialog, annotations, identifiers,
		);
		this.catalogtype = 'dataset:RepositoryDataPartitionBlock';
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
		this.objectform = this.formBuilder.group({
			FilePartitionMethod: ['', Validators.required],
			FileSourceFormat: ['File Format', Validators.required],
			Position: ['', Validators.required]
		});
	}

	ngAfterViewInit(): void {
		this.annoReady.subscribe(result => {
			this.items = this.menusetup.findChoices(this.annoinfo, this.formatmenulabel);
			this.partitionitems = this.menusetup.findChoices(this.annoinfo, this.partitionmenulabel);
			alert(this.partitionitems.length);
      });
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
			const olinks = catalog[this.identifiers.DataObjectLink];
			this.objectlinks.setData(olinks);
			const wlinks = catalog[this.identifiers.ObjectSiteReference];
			this.objectlinks.setData(wlinks);
			this.objectform.get('FilePartitionMethod').setValue(catalog[this.identifiers.FilePartitionMethod]);
			this.objectform.get('FileSourceFormat').setValue(catalog[this.identifiers.FileSourceFormat]);
			this.objectform.get('Position').setValue(catalog[this.identifiers.Position]);
		}
	}

	public saveCatalog(): void {
		const catalog = {};
		this.getData(catalog);
		this.openDialog(catalog);
	}
	public getData(catalog: any): void {
		if (this.simpledata != null) {
			catalog[this.identifiers.FilePartitionMethod] = this.objectform.get('FilePartitionMethod').value;
			catalog[this.identifiers.FileSourceFormat] = this.objectform.get('FileSourceFormat').value;
			catalog[this.identifiers.Position] = this.objectform.get('Position').value;
			this.simpledata.getData(catalog);
			this.references.getData(catalog);
			this.weblinks.getData(catalog);
			this.objectlinks.getData(catalog);
			this.firestoreid.getData(catalog);
		}
	}
	setFileFormat($event: string): void {
		this.objectform.get('FileSourceFormat').setValue($event);
	}
	setPartition($event: string): void {
		this.objectform.get('FilePartitionMethod').setValue($event);
	}


}
