import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { DatasetspecificationforcollectionsetComponent } from '../datasetspecificationforcollectionset/datasetspecificationforcollectionset.component';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import {ChemconnectdatasetcollectionidssetComponent} from '../chemconnectdatasetcollectionidsset/chemconnectdatasetcollectionidsset.component';

@Component({
  selector: 'app-thermodynamicsdatasetcollectionidsset',
  templateUrl: './thermodynamicsdatasetcollectionidsset.component.html',
  styleUrls: ['./thermodynamicsdatasetcollectionidsset.component.scss']
})
export class ThermodynamicsdatasetcollectionidssetComponent implements OnInit {

    @ViewChild('collectionid') collectionid: ChemconnectdatasetcollectionidssetComponent;
    
	@ViewChild('benson') benson: DatasetspecificationforcollectionsetComponent;
	@ViewChild('disassociation') disassociation: DatasetspecificationforcollectionsetComponent;
	@ViewChild('metaatom') metaatom: DatasetspecificationforcollectionsetComponent;
	@ViewChild('symmetry') symmetry: DatasetspecificationforcollectionsetComponent;
	@ViewChild('vibrational') vibrational: DatasetspecificationforcollectionsetComponent;

	@Output() annoReady = new EventEmitter<any>();

	transspec: any;

	catalogtype = 'dataset:ThermodynamicsDatasetCollectionIDsSet';
	annoinfo: any;
	catalogobj: any;

	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	subtitle = 'Thermodynamics Collection Set IDs';
	message = 'Read Annotations';

	bensontitle = 'Benson Rules';
	disassociationtitle = 'Disassociation Energy';
	metaatomtitle = 'Meta Atom Definition';
	symmetrytitle = 'Symmetry Structures';
	vibrationaltitle = 'Vibrational Energy Structures';

	maintainer: string;
	waiting = 'waiting for annotations ';


	constructor(
		public annotations: OntologycatalogService,
		private manageuser: ManageuserserviceService
	) {
		this.manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
				this.collectionid.setMaintainer(this.maintainer);
				
				
			} else {
				alert(manageuser.errormaintainer);
			}
		});
		this.getCatalogAnnoations();
	}

	ngOnInit(): void {
	}

	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.annoReady.emit(this.annoinfo);
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}


	public getData(catalog: any): void {

        this.collectionid.getData(catalog);
		const bensoncolid = {};
		this.benson.getData(bensoncolid);
		catalog[this.annoinfo['dataset:DatasetSpecificationBensonRuleDefinition'][this.identifier]] = bensoncolid;

		const disassociationcolid = {};
		this.disassociation.getData(disassociationcolid);
		catalog[this.annoinfo['dataset:DatasetSpecificationDisassociationEnergyOfStructure'][this.identifier]] = disassociationcolid;

		const metaatomcolid = {};
		this.metaatom.getData(metaatomcolid);
		catalog[this.annoinfo['dataset:DatasetSpecificationMetaAtomDefinition'][this.identifier]] = metaatomcolid;

		const symmetrycolid = {};
		this.symmetry.getData(symmetrycolid);
		catalog[this.annoinfo['dataset:DatasetSpecificationSymmetryStructureDefinition'][this.identifier]] = symmetrycolid;

		const vibrationalcolid = {};
		this.vibrational.getData(vibrationalcolid);
		catalog[this.annoinfo['dataset:DatasetSpecificationVibrationalStructure'][this.identifier]] = vibrationalcolid;

	}

	public setData(catalog: any): void {
    
        this.collectionid.setData(catalog);
		
		const bensoncolid = catalog[this.annoinfo['dataset:DatasetSpecificationBensonRuleDefinition'][this.identifier]];
		this.benson.setData(bensoncolid);

		const disassociationcolid = catalog[this.annoinfo['dataset:DatasetSpecificationDisassociationEnergyOfStructure'][this.identifier]];
		this.disassociation.setData(disassociationcolid);

		const metaatomcolid = catalog[this.annoinfo['dataset:DatasetSpecificationMetaAtomDefinition'][this.identifier]];
		this.metaatom.setData(metaatomcolid);

		const symmetrycolid = catalog[this.annoinfo['dataset:DatasetSpecificationSymmetryStructureDefinition'][this.identifier]];
		this.symmetry.setData(symmetrycolid);

		const vibrationalcolid = catalog[this.annoinfo['dataset:DatasetSpecificationVibrationalStructure'][this.identifier]];
		this.vibrational.getData(vibrationalcolid);
	}


}
