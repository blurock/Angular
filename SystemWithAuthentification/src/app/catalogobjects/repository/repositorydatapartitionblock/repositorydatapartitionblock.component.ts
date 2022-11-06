import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Input } from '@angular/core';
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
import { InterfaceconstantsService } from '../../../const/interfaceconstants.service';

@Component({
	selector: 'app-repositorydatapartitionblock',
	templateUrl: './repositorydatapartitionblock.component.html',
	styleUrls: ['./repositorydatapartitionblock.component.scss']
})
export class RepositorydatapartitionblockComponent implements OnInit, AfterViewInit {

	objectform: FormGroup;
	items: NavItem[];
	partitionitems: NavItem[];
	display = false;
	annoinfo: any
	fixedtype = false;
	postype = 0;

	formatmenulabel = 'dataset:FileSourceFormat';
	partitionmenulabel = 'dataset:FilePartitionMethod';
	title = 'File Partition Element';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;


	@Input() annoReady: EventEmitter<any>;


	@ViewChild('simpledata') simpledata: SimpledatabaseobjectstructureComponent;
	@ViewChild('firestoreid') firestoreid: FiresytorecatalogidComponent;
	@ViewChild('references') references: DatasetreferenceComponent;
	@ViewChild('objectlinks') objectlinks: SetofdataobjectlinksComponent;
	@ViewChild('weblinks') weblinks: SetofsitereferencesComponent;


	constructor(
		private menusetup: MenutreeserviceService,
		private formBuilder: FormBuilder,
		private interfaceconstants: InterfaceconstantsService,
		public identifiers: IdentifiersService) {



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
			this.annoinfo = result;
			this.items = this.menusetup.findChoices(this.annoinfo, this.formatmenulabel);
			this.partitionitems = this.menusetup.findChoices(this.annoinfo, this.partitionmenulabel);
			this.display = true;
		});

	}

	public setDataFormat(typeInfo: any) {
		if(typeInfo != null) {
			this.setDataFormatNonNull(typeInfo);
		} else {
			
		}
	}

    private setDataFormatNonNull(typeInfo: any) {
		const fmt = typeInfo['format'];
		if (fmt == 'dataset:TherGasBensonRules') {
			this.objectform.get('FileSourceFormat').setValue('dataset:TherGasBensonRules');
			this.objectform.get('FilePartitionMethod').setValue('dataset:PartitionTherGasThermodynamics');
			this.postype = 0;
		} else if (fmt == 'dataset:JThermodynamicsDisassociationEnergyFormat') {
			this.objectform.get('FileSourceFormat').setValue('dataset:JThermodynamicsDisassociationEnergyFormat');
			this.objectform.get('FilePartitionMethod').setValue('dataset:PartitionToLineSet');
			this.postype = 1;
		} else if (fmt == 'dataset:JThermodynamicsMetaAtomFormat') {
			this.objectform.get('FileSourceFormat').setValue('dataset:JThermodynamicsMetaAtomFormat');
			this.objectform.get('FilePartitionMethod').setValue('dataset:PartitionToLineSet');
			this.postype = 1;
		} else if (fmt == 'dataset:JThermodynamicsVibrationalModes') {
			this.objectform.get('FileSourceFormat').setValue('dataset:JThermodynamicsVibrationalModes');
			this.objectform.get('FilePartitionMethod').setValue('dataset:PartitionToLineSet');
			this.postype = 1;
		}
		this.fixedtype = true;
	}
	
	private setPosType(fmt:string): void {
		if (fmt == 'dataset:TherGasBensonRules') {
			this.postype = 0;
		} else if (fmt == 'dataset:JThermodynamicsDisassociationEnergyFormat') {
			this.postype = 1;
		} else if (fmt == 'dataset:JThermodynamicsMetaAtomFormat') {
			this.postype = 1;
		} else if (fmt == 'dataset:JThermodynamicsVibrationalModes') {
			this.postype = 1;
		}
		
	}

	public setData(catalog: any): void {
		if (this.simpledata != null) {
			this.objectform.get('FilePartitionMethod').setValue(catalog[this.identifiers.FilePartitionMethod]);
			this.objectform.get('FileSourceFormat').setValue(catalog[this.identifiers.FileSourceFormat]);
			this.setPosition(catalog);
			this.simpledata.setData(catalog);
			const firestoreidvalues = catalog[this.identifiers.FirestoreCatalogID];
			this.firestoreid.setData(firestoreidvalues);
			const refs = catalog[this.identifiers.DataSetReference];
			this.references.setData(refs);
			const olinks = catalog[this.identifiers.DataObjectLink];
			this.objectlinks.setData(olinks);
			const wlinks = catalog[this.identifiers.ObjectSiteReference];
			this.weblinks.setData(wlinks);
		} else {
			alert("Display not set up yes (refresh)")
		}
	}

	setPosition(catalog: any) {
		this.setPosType(catalog[this.identifiers.FileSourceFormat]);
		if (this.postype == 0) {
			const thermoid = this.annoinfo['dataset:RepositoryThermoPartitionBlock'][this.identifier];
			const thermo = catalog[thermoid];
			this.objectform.get('Position').setValue(thermo[this.identifiers.Position]);
		} else {
			this.objectform.get('Position').setValue(catalog[this.identifiers.Position]);
		}
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
		if (!this.fixedtype) {
			this.objectform.get('FileSourceFormat').setValue($event);
		} else {
			this.interfaceconstants.dataFormatInformation($event).subscribe(result => {
				if (result != null) {
					this.setDataFormatNonNull(result);
				} else {
					alert(this.interfaceconstants.errorcatalogtypes);
				}
			});			
		}
	}

setFilePartition($event: string): void {
	if(!this.fixedtype){
	this.objectform.get('FilePartitionMethod').setValue($event);
}
	}


}
