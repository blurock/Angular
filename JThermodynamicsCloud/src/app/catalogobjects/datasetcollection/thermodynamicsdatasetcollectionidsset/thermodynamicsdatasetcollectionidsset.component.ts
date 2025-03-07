import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
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
	@ViewChild('substructure') substructure: DatasetspecificationforcollectionsetComponent;

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
    substructuretitle = '2D Substructure Thermodynamics';
	maintainer = "Public";
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
	
	invalid(): boolean {
    return this.benson.invalid()  ||
    this.disassociation.invalid() ||
    this.metaatom.invalid()       ||
    this.symmetry.invalid()       ||
    this.vibrational.invalid()    ||
    this.substructure.invalid();
  }

	public getCatalogAnnoations(): void {
		this.message = 'Setup';
		this.annotations.getNewCatalogObject(this.catalogtype).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = '<p>Setup Success</p> ' + response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
 					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
				} else {
					this.message = '<p>Error in performing setup (try reloading page or logging in again):</p>' +  response[Ontologyconstants.message]
				}
			},
			error: (info: any) => { this.message = '<p>Error in setup (try reloading or logging in again):</p>'}
		});
	}


	public getData(catalog: any): void {
        this.collectionid.getData(catalog);
		const bensoncolid = {};
		this.benson.getData(bensoncolid);
		catalog['dataset:bensonrulecolspec'] = bensoncolid;

		const disassociationcolid = {};
		this.disassociation.getData(disassociationcolid);
		catalog['dataset:disassociationcolspec'] = disassociationcolid;

		const metaatomcolid = {};
		this.metaatom.getData(metaatomcolid);
		catalog['dataset:metaatomdefinitioncolspec'] = metaatomcolid;

		const symmetrycolid = {};
		this.symmetry.getData(symmetrycolid);
		catalog['dataset:symmetrystructuredefinitioncolspec'] = symmetrycolid;

		const vibrationalcolid = {};
		this.vibrational.getData(vibrationalcolid);
		catalog['dataset:vibrationalstructurecolspec'] = vibrationalcolid;
		
		const substructureid = {};
		this.substructure.getData(substructureid);
		catalog['dataset:2dsubstructurethermo'] = substructureid;

	}

	public setData(catalog: any): void {
        this.collectionid.setData(catalog);
		const bensoncolid = catalog['dataset:bensonrule'];
		this.benson.setData(bensoncolid);

		const disassociationcolid = catalog['dataset:disassociation'];
		this.disassociation.setData(disassociationcolid);

		const metaatomcolid = catalog['dataset:metaatomdefinition'];
		this.metaatom.setData(metaatomcolid);

		const symmetrycolid = catalog['dataset:symmetrystructuredefinition'];
		this.symmetry.setData(symmetrycolid);

		const vibrationalcolid = catalog['dataset:vibrationalstructure'];
		this.vibrational.setData(vibrationalcolid);
		
		const substructurecolid = catalog['dataset:2dsubstructurethermo'];
		this.substructure.setData(substructurecolid);
	}


}
