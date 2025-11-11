import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { SimpledatabaseobjectstructureComponent } from '../../simpledatabaseobjectstructure/simpledatabaseobjectstructure.component';
import { DatasetreferenceComponent } from '../../datasetreference/datasetreference.component';
import { FiresytorecatalogidComponent } from '../../firesytorecatalogid/firesytorecatalogid.component';
import { IdentifiersService } from '../../../const/identifiers.service';
import { SetofdataobjectlinksComponent } from '../../catalogbaseobjects/setofdataobjectlinks/setofdataobjectlinks.component';
import { SetofsitereferencesComponent } from '../../catalogbaseobjects/setofsitereferences/setofsitereferences.component';
import { UntypedFormBuilder, FormGroup, Validators, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { NavItem } from '../../../primitives/nav-item';
import { MenutreeserviceService } from '../../../services/menutreeservice.service';
import { FileformatmanagerService } from '../../../services/fileformatmanager.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { DatadatadescriptionComponent } from '../../datadatadescription/datadatadescription.component';
import { GcsblobfileinformationstagingComponent } from '../gcsblobfileinformationstaging/gcsblobfileinformationstaging.component';
import { MenuItemComponent } from '../../../primitives/menu-item/menu-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { ChemconnectthermodynamicsdatabaseComponent } from '../../thermodynamics/chemconnectthermodynamicsdatabase/chemconnectthermodynamicsdatabase.component';

@Component({
	selector: 'app-repositorydatapartitionblock',
	templateUrl: './repositorydatapartitionblock.component.html',
	styleUrls: ['./repositorydatapartitionblock.component.scss'],
	standalone: true,
	imports: [
		MatCardModule,
				MatFormFieldModule,
				ReactiveFormsModule,
				CommonModule,
				MatInputModule,
				MatMenuModule,
				ChemconnectthermodynamicsdatabaseComponent,
				//SimpledatabaseobjectstructureComponent,
						//DatasetreferenceComponent,
						//FiresytorecatalogidComponent,
						//SetofdataobjectlinksComponent,
						//SetofsitereferencesComponent,
						MenuItemComponent
				]
})
export class RepositorydatapartitionblockComponent implements OnInit, AfterViewInit {

	objectform: UntypedFormGroup = new UntypedFormGroup({});
	items: NavItem[] = [];
	partitionitems: NavItem[] = [];
	display = false;
	annoinfo: any
	fixedtype = false;
	postype = 0;
	
	catalogtype = '';

	formatmenulabel = 'dataset:FileSourceFormat';
	partitionmenulabel = 'dataset:FilePartitionMethod';
	title = 'File Partition Element';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;

	message = 'Initializing...';

	@Input() annoReady!: EventEmitter<any>;
	@Output() showObject: EventEmitter<any> = new EventEmitter<any>();

/*
	@ViewChild('simpledata') simpledata!: SimpledatabaseobjectstructureComponent;
	@ViewChild('firestoreid') firestoreid!: FiresytorecatalogidComponent;
	@ViewChild('references') references!: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks!: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks!: SetofsitereferencesComponent;
*/
@ViewChild('base') base!: ChemconnectthermodynamicsdatabaseComponent;

	constructor(
		private menusetup: MenutreeserviceService,
		private formBuilder: UntypedFormBuilder,
		private format: FileformatmanagerService,
		public identifiers: IdentifiersService) {

			this.catalogtype = 'dataset:RepositoryParsedToFixedBlockSize';

	}

	ngOnInit(): void {
		this.objectform = this.formBuilder.group({
			FilePartitionMethod: ['', Validators.required],
			FileSourceFormat: ['File Format', Validators.required],
			Position: ['', Validators.required]
		});
	this.annoReady.subscribe(result => {
		this.annoinfo = result;
		this.items = this.menusetup.findChoices(this.annoinfo, this.formatmenulabel);
		this.partitionitems = this.menusetup.findChoices(this.annoinfo, this.partitionmenulabel);
		this.display = true;
	});
	}

	ngAfterViewInit(): void {

	}
	
	showCatalogFromFirestore(firestoreid: any) {
		this.showObject.emit(firestoreid);
	}

	public setDataFormat(typeInfo: any) {
		if (typeInfo != null) {
			this.setDataFormatNonNull(typeInfo);
		} else {

		}
	}

	private setDataFormatNonNull(typeInfo: any) {
		const fmt = typeInfo['format'];
		if (fmt == 'dataset:TherGasBensonRules') {
			this.objectform.get('FileSourceFormat')!.setValue('dataset:TherGasBensonRules');
			this.objectform.get('FilePartitionMethod')!.setValue('dataset:PartitionTherGasThermodynamics');
			this.postype = 0;
		} else if (fmt == 'dataset:JThermodynamicsDisassociationEnergyFormat') {
			this.objectform.get('FileSourceFormat')!.setValue('dataset:JThermodynamicsDisassociationEnergyFormat');
			this.objectform.get('FilePartitionMethod')!.setValue('dataset:PartitionToLineSet');
			this.postype = 1;
		} else if (fmt == 'dataset:JThermodynamicsMetaAtomFormat') {
			this.objectform.get('FileSourceFormat')!.setValue('dataset:JThermodynamicsMetaAtomFormat');
			this.objectform.get('FilePartitionMethod')!.setValue('dataset:PartitionToLineSet');
			this.postype = 1;
		} else if (fmt == 'dataset:JThermodynamicsVibrationalModes') {
			this.objectform.get('FileSourceFormat')!.setValue('dataset:JThermodynamicsVibrationalModes');
			this.objectform.get('FilePartitionMethod')!.setValue('dataset:PartitionToLineSet');
			this.postype = 1;
		}
		this.fixedtype = true;
	}

	private setPosType(fmt: string): void {
		if (fmt == 'dataset:TherGasBensonRules') {
			this.postype = 0;
		} else if (fmt == 'dataset:JThermodynamicsDisassociationEnergyFormat') {
			this.postype = 1;
		} else if (fmt == 'dataset:JThermodynamicsMetaAtomFormat') {
			this.postype = 1;
		} else if (fmt == 'dataset:JThermodynamicsVibrationalModes') {
			this.postype = 1;
		} else if (fmt == 'dataset:JThermodynamicsSymmetryDefinitionFormat') {
			this.postype = 1;
		}

	}

	public setData(catalog: any): void {
		if(this.base) {
			this.base.setData(catalog);
		}
		this.objectform.get('FilePartitionMethod')!.setValue(catalog[this.identifiers.FilePartitionMethod]);
		this.objectform.get('FileSourceFormat')!.setValue(catalog[this.identifiers.FileSourceFormat]);
		this.setPosition(catalog);
	}

	setPosition(catalog: any) {
		this.setPosType(catalog[this.identifiers.FileSourceFormat]);
		if (this.postype == 0) {
			const thermoid = this.annoinfo['dataset:RepositoryThermoPartitionBlock'][this.identifier];
			const thermo = catalog[thermoid];
			this.objectform.get('Position')!.setValue(thermo[this.identifiers.Position]);
		} else {
			this.objectform.get('Position')!.setValue(catalog[this.identifiers.Position]);
		}
	}


	public getData(catalog: any): void {
		this.base.getData(catalog);
		catalog[this.identifiers.FilePartitionMethod] = this.objectform.get('FilePartitionMethod')?.value ?? '';
		catalog[this.identifiers.FileSourceFormat] = this.objectform.get('FileSourceFormat')?.value ?? '';
		catalog[this.identifiers.Position] = this.objectform.get('Position')?.value ?? '';
/*
				if (this.simpledata != null) {
			this.simpledata.getData(catalog);
			this.references.getData(catalog);
			this.weblinks.getData(catalog);
			this.objectlinks.getData(catalog);
			this.firestoreid.getData(catalog);
		}
		*/
	}
	setFileFormat($event: string): void {
		if (!this.fixedtype) {
			this.objectform.get('FileSourceFormat')!.setValue($event);
		} else {
			this.format.dataFormatInformation($event).subscribe(result => {
				if (result != null) {
					this.setDataFormatNonNull(result);
				} else {
					alert(this.format.errorcatalogtypes);
				}
			});
		}
	}

	setFilePartition($event: string): void {
		if (!this.fixedtype) {
			this.objectform.get('FilePartitionMethod')!.setValue($event);
		}
	}


}
