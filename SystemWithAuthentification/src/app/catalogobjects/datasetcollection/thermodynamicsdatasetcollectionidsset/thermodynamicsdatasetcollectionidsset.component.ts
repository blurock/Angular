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

	@Input() annoReady: EventEmitter<any>;

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
					if(this.annoReady != null) {
            			this.annoReady.emit(this.annoinfo);
          			} else {
                  alert("annoReady is null");
                }
					
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

	}

	public setData(catalog: any): void {
        this.collectionid.setData(catalog);
        
		const bensoncolid = catalog['dataset:bensonrulecolspec'];
		this.benson.setData(bensoncolid);

		const disassociationcolid = catalog['dataset:disassociationcolspec'];
		this.disassociation.setData(disassociationcolid);

		const metaatomcolid = catalog['dataset:metaatomdefinitioncolspec'];
		this.metaatom.setData(metaatomcolid);

		const symmetrycolid = catalog['dataset:symmetrystructuredefinitioncolspec'];
		this.symmetry.setData(symmetrycolid);

		const vibrationalcolid = catalog['dataset:vibrationalstructurecolspec'];
		this.vibrational.setData(vibrationalcolid);
	}


}
