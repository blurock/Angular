import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivityrepositoryinitialreadlocalfileComponent } from '../../activity/repository/activityrepositoryinitialreadlocalfile/activityrepositoryinitialreadlocalfile.component';
import { ActivityrepositorypartitiontocatalogComponent } from '../../activity/repository/activityrepositorypartitiontocatalog/activityrepositorypartitiontocatalog.component';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ActivityinformationinterpretdisassociationenergyComponent } from '../../activity/repository/activityinformationinterpretdisassociationenergy/activityinformationinterpretdisassociationenergy.component';
import {ActivityinformationinterpretthermodynamicblockComponent} from '../../activity/repository/activityinformationinterpretthermodynamicblock/activityinformationinterpretthermodynamicblock.component';
@Component({
	selector: 'app-activityinformation',
	templateUrl: './activityinformation.component.html',
	styleUrls: ['./activityinformation.component.scss']
})
export class ActivityinformationComponent implements OnInit {

    
	@Input() activityname: string;

	activityinfoid = 'dataset:activityinfo';
	noactivity = false;
	identifier = Ontologyconstants.dctermsidentifier;
	message: string;
	annoinfo: any;
	catalogobj: any;
	display = false;
	
	bensonformat = 'dataset:TherGasBensonRules';
	structureformat = 'dataset:TherGasSubstructureThermodynamics';
	specifiesformat = 'dataset:ThergasSpeciesThermodynamics';

	@ViewChild('readlocal') readlocal: ActivityrepositoryinitialreadlocalfileComponent;
	@ViewChild('partition') partition: ActivityrepositorypartitiontocatalogComponent;
	@ViewChild('disassociation') disassociation: ActivityinformationinterpretdisassociationenergyComponent;
    @ViewChild('benson') benson: ActivityinformationinterpretthermodynamicblockComponent;
    @ViewChild('structure') structure: ActivityinformationinterpretthermodynamicblockComponent;
    @ViewChild('species') species: ActivityinformationinterpretthermodynamicblockComponent;
    
	constructor(
		public annotations: OntologycatalogService
	) { }

	ngOnInit(): void {
		if (this.activityname == '') {
			this.noactivity = true;
		} else {
			this.getCatalogAnnoations();
		}
	}

	setActivity(select: any): void {
		this.display = false;
		this.activityname = select;
		this.getCatalogAnnoations();
	}

	getData(activity: any): void {
		if (!this.noactivity) {
			if (this.activityname == 'dataset:ActivityRepositoryInitialReadLocalFile') {
				this.readlocal.getData(activity);
			} else if (this.activityname == 'dataset:ActivityRepositoryPartitionToCatalog') {
				this.partition.getData(activity);
			} else if (this.activityname == 'dataset:ActivityInformationInterpretDisassociationEnergy') {
				this.disassociation.getData(activity);
			} else if (this.activityname == 'dataset:ActivityInformationInterpretBensonRuleData') {
				this.benson.getData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretSubstructureThermodynamics') {
				this.structure.getData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationMolecularThermodynamics') {
				this.species.getData(activity);
		} else {
				alert('Not known activity information: ' + this.activityname);
			}
		}
	}

	setData(activity: any): void {
		const activityB = this.activityname == 'dataset:ActivityRepositoryInitialReadLocalFile';
		if (activityB) {
			this.readlocal.setData(activity);
		} else if (this.activityname == 'dataset:ActivityRepositoryPartitionToCatalog') {
			this.partition.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretDisassociationEnergy') {
				this.disassociation.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretBensonRuleData') {
				this.benson.getData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretSubstructureThermodynamics') {
				this.structure.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationMolecularThermodynamics') {
				this.species.setData(activity);
		} else {
			alert('Not known activity information: ' + this.activityname);
		}
	}
	
	public getCatalogAnnoations(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.activityname).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.catalogobj = catalog[Ontologyconstants.outputobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
					this.display = true;
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}

}
