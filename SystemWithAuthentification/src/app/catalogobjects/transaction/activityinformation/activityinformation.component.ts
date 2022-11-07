import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivityrepositoryinitialreadlocalfileComponent } from '../../activity/repository/activityrepositoryinitialreadlocalfile/activityrepositoryinitialreadlocalfile.component';
import { ActivityrepositorypartitiontocatalogComponent } from '../../activity/repository/activityrepositorypartitiontocatalog/activityrepositorypartitiontocatalog.component';
import { Ontologyconstants } from '../../../const/ontologyconstants';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ActivityinformationinterpretdisassociationenergyComponent } from '../../activity/repository/activityinformationinterpretdisassociationenergy/activityinformationinterpretdisassociationenergy.component';
import { ActivityinformationinterpretthermodynamicblockComponent } from '../../activity/repository/activityinformationinterpretthermodynamicblock/activityinformationinterpretthermodynamicblock.component';
import { ActivityinformationinterpretvibrationalmodeComponent } from '../../activity/repository/activityinformationinterpretvibrationalmode/activityinformationinterpretvibrationalmode.component';
import { ActivityinformationinterpretsymmetryinformationComponent } from '../../activity/repository/activityinformationinterpretsymmetryinformation/activityinformationinterpretsymmetryinformation.component';
import { ActivityinformationinterpretmetaatomComponent } from '../../activity/repository/activityinformationinterpretmetaatom/activityinformationinterpretmetaatom.component';
import { ActivityinformationdatasetcollectionsetadddatasetComponent } from '../../activity/collectionset/activityinformationdatasetcollectionsetadddataset/activityinformationdatasetcollectionsetadddataset.component';
import { ActivityinformationdatasetcollectionsetcreationComponent } from '../../activity/collectionset/activityinformationdatasetcollectionsetcreation/activityinformationdatasetcollectionsetcreation.component';
@Component({
	selector: 'app-activityinformation',
	templateUrl: './activityinformation.component.html',
	styleUrls: ['./activityinformation.component.scss']
})
export class ActivityinformationComponent implements OnInit {


	@Input() activityname: string;
	@Output() activitysetup = new EventEmitter();

displaydescbutton = 'Press to fill in prerequisite information';
	activityinfoid = 'dataset:activityinfo';
	noactivity = false;
	identifier = Ontologyconstants.dctermsidentifier;
	message: string;
	annoinfo: any;

	bensonformat = 'dataset:TherGasBensonRules';
	structureformat = 'dataset:TherGasSubstructureThermodynamics';
	specifiesformat = 'dataset:ThergasSpeciesThermodynamics';
	frequencyformat = 'dataset:JThermodynamicsVibrationalModes';

	@ViewChild('readlocal') readlocal: ActivityrepositoryinitialreadlocalfileComponent;
	@ViewChild('partition') partition: ActivityrepositorypartitiontocatalogComponent;
	@ViewChild('disassociation') disassociation: ActivityinformationinterpretdisassociationenergyComponent;
	@ViewChild('benson') benson: ActivityinformationinterpretthermodynamicblockComponent;
	@ViewChild('structure') structure: ActivityinformationinterpretthermodynamicblockComponent;
	@ViewChild('species') species: ActivityinformationinterpretthermodynamicblockComponent;
	@ViewChild('frequency') frequency: ActivityinformationinterpretvibrationalmodeComponent;
	@ViewChild('symmetry') symmetry: ActivityinformationinterpretsymmetryinformationComponent;
	@ViewChild('metaatom') metaatom: ActivityinformationinterpretmetaatomComponent;
	@ViewChild('collectionadd') collectionadd: ActivityinformationdatasetcollectionsetadddatasetComponent;
	@ViewChild('collectioncreate') collectioncreate: ActivityinformationdatasetcollectionsetcreationComponent;


	constructor(
		public annotations: OntologycatalogService
	) { }

	ngOnInit(): void {
		if (this.activityname == '') {
			this.noactivity = true;
		} else {
			this.setActivity(this.activityname);
		}
	}

	setActivity(select: any): void {
		this.activityname = select;
		this.getCatalogAnnoationsForActivity();
	}

	setup(): void {
		this.activitysetup.emit();
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
			} else if (this.activityname == 'dataset:ActivityInformationInterpretVibrationalMode') {
				this.frequency.getData(activity);
			} else if (this.activityname == 'dataset:ActivityInformationInterpretSymmetryInformation') {
				this.symmetry.getData(activity);
			} else if (this.activityname == 'dataset:ActivityInformationInterpretMetaAtom') {
				this.metaatom.getData(activity);
			} else if (this.activityname == 'dataset:ActivityInformationDatasetCollectionSetAddDataset') {
				this.collectionadd.getData(activity);
			} else if (this.activityname == 'dataset:ActivityInformationDatasetCollectionSetCreation') {
				this.collectioncreate.getData(activity);
			} else {
				alert('Not known activity information: ' + this.activityname);
			}
		}
	}

	setPrerequisiteData(prerequisite: any): void {
		const activityB = this.activityname == 'dataset:ActivityRepositoryInitialReadLocalFile';
		if (activityB) {
			//this.readlocal.setData(activity);
		} else if (this.activityname == 'dataset:ActivityRepositoryPartitionToCatalog') {
			//this.partition.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretDisassociationEnergy') {
			//this.disassociation.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretBensonRuleData') {
			if (this.benson != null) {
				this.benson.setPrerequisiteData(prerequisite);
			}
		} else if (this.activityname == 'dataset:ActivityInformationInterpretSubstructureThermodynamics') {
			//this.structure.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationMolecularThermodynamics') {
			//this.species.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretVibrationalMode') {
			if(this.frequency != null) {
				this.frequency.setPrerequisiteData(prerequisite);
			}
		} else if (this.activityname == 'dataset:ActivityInformationInterpretSymmetryInformation') {
			//this.symmetry.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretMetaAtom') {
			//this.metaatom.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationDatasetCollectionSetAddDataset') {
			//this.collectionadd.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationDatasetCollectionSetCreation') {
			//this.collectioncreate.setData(activity);
		} else {
			alert('Not known activity information: ' + this.activityname);
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
		} else if (this.activityname == 'dataset:ActivityInformationInterpretVibrationalMode') {
			this.frequency.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretSymmetryInformation') {
			this.symmetry.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationInterpretMetaAtom') {
			this.metaatom.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationDatasetCollectionSetAddDataset') {
			this.collectionadd.setData(activity);
		} else if (this.activityname == 'dataset:ActivityInformationDatasetCollectionSetCreation') {
			this.collectioncreate.setData(activity);
		} else {
			alert('Not known activity information: ' + this.activityname);
		}
	}

	public getCatalogAnnoationsForActivity(): void {
		this.message = 'Waiting for Info call';
		this.annotations.getNewCatalogObject(this.activityname).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.message = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.annoinfo = catalog[Ontologyconstants.annotations];
				} else {
					this.message = responsedata;
				}
			},
			error: (info: any) => { alert('Get Annotations failed:' + this.message); }
		});
	}

}
