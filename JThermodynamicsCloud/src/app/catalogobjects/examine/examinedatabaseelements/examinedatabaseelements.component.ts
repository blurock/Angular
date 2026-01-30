import { Component, OnInit, ViewChild } from '@angular/core';
import { RunserviceprocessService } from '../../../services/runserviceprocess.service'
import { Ontologyconstants } from 'systemconstants';
import { OntologycatalogService } from '../../../services/ontologycatalog.service';
import { ManageuserserviceService } from '../../../services/manageuserservice.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavItem } from 'systemprimitives';
import { IdentifiersService } from '../../../const/identifiers.service';
import { MenutreeserviceService } from 'systemprimitives';
import { RundatabaseserviceComponent } from '../../../dialog/rundatabaseservice/rundatabaseservice.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ParameterspecificationComponent } from '../../parameterspecification/parameterspecification.component';


export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
	{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
	{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
	{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
	{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
	{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
	selector: 'app-examinedatabaseelements',
	templateUrl: './examinedatabaseelements.component.html',
	styleUrls: ['./examinedatabaseelements.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		])],
})



export class ExaminedatabaseelementsComponent implements OnInit {


	setuptitle = 'Determine Dataset Collection for Objects';
	maintainer = 'Guest';
	collectiontypelabel = 'Dataset Type';
	collectiontypehint = 'The dataset to be examined';
	submitlabel = 'Submit';
	rdfslabel = Ontologyconstants.rdfslabel;
	rdfscomment = Ontologyconstants.rdfscomment;
	identifier = Ontologyconstants.dctermsidentifier;
	failedsubmission = 'Failed Submission';
	failedresponse = 'Error in finding object';

	molarenthalpyparameter = 'dataset:ParameterSpecificationEnthalpy';
	molarentropyarameter = 'dataset:ParameterSpecificationEntropy';
	molarheatcapacityparameter = 'dataset:ParameterSpecificationHeatCapacity';
	molarenthalpy: any;
	molarentropy: any;
	molarheatcapacity: any;


	tabledata: any;
	searchterms: any;
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	dataSource = ELEMENT_DATA;
	selectedtype: string;
	selectedterm: string;
	searchtypes: any;
	singlesearchtype: string;
	typesearchterms: any;
	singlesearchterms: any;
	keys: any;
	original: any;
	searchkeys: any;

	cataloganno: any;
	methoditemstype = 'dataset:ThermodynamicDatasetCollectionType';

	catalogtype = 'dataset:ActivityExamineDatabaseObject';
	objectform: UntypedFormGroup;
	selected: string;
	resultHtml: string;
	methoditems: NavItem[] = [];

	@ViewChild('enthalpy') enthalpy: ParameterspecificationComponent;
	@ViewChild('entropy') entropy: ParameterspecificationComponent;
	@ViewChild('heatcapacity') heatcapacity: ParameterspecificationComponent;

	constructor(
		private menusetup: MenutreeserviceService,
		private formBuilder: UntypedFormBuilder,
		private annotations: OntologycatalogService,
		private runservice: RunserviceprocessService,
		private manageuser: ManageuserserviceService,
		public dialog: MatDialog,
		private identifiers: IdentifiersService
	) {
		const set = [];
		set.push(this.molarenthalpyparameter);
		set.push(this.molarentropyarameter);
		set.push(this.molarheatcapacityparameter);
		annotations.getParameterSet(set).subscribe({
			next: (data: any) => {
				this.molarenthalpy = data[this.molarenthalpyparameter];
				this.molarentropy = data[this.molarentropyarameter];
				this.molarheatcapacity = data[this.molarheatcapacityparameter];
			}
		});

		this.objectform = this.formBuilder.group({
			DescriptionTitle: ['', Validators.required],
			CatalogDataObjectMaintainer: ['', Validators.required],
			ThermodynamicDatasetCollectionType: ['', Validators.required],
			DatasetCollectionsSetLabel: ['', Validators.required]
		});
		this.getCatalogAnnoations(this.catalogtype);
		this.manageuser.determineMaintainer().subscribe(result => {
			if (result != null) {
				this.maintainer = result;
			} else {
				alert(this.manageuser.errormaintainer);
			}
		});
		this.objectform.get('CatalogDataObjectMaintainer').setValue('systemthermodynamics');
	}

	ngOnInit(): void {
	}

	setCollection($event): void {
		const type = $event['dcat:dataset'];
		var collectionname = $event[this.identifiers.DatasetCollectionsLabel];
		if (type == 'dataset:ThermodynamicsSystemCollectionIDsSet') {
			//collectionname = $event[this.identifiers.CatalogObjectKey];
			this.objectform.get('CatalogDataObjectMaintainer').setValue('systemthermodynamics');
		} else {
			this.objectform.get('CatalogDataObjectMaintainer').setValue(this.maintainer);
		}
		this.objectform.get('DatasetCollectionsSetLabel').setValue(collectionname);
	}

	invalid() {
		return this.objectform.invalid;
	}

	setType($event) {
		this.objectform.get('ThermodynamicDatasetCollectionType').setValue($event);
	}

	submitSystem() {
		const servicedata = {};
		this.getServiceData(servicedata);
		const dialogRef = this.dialog.open(RundatabaseserviceComponent, {
			data: servicedata
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result != null) {
				const success = result[Ontologyconstants.successful];
				this.resultHtml = result[Ontologyconstants.message];
				if (success == 'true') {
					this.showResult(result[Ontologyconstants.catalogobject]);
				} else {
					alert(this.failedresponse);
				}
			} else {
				this.resultHtml = this.failedsubmission;
			}
		});

	}

	showResult(result: any) {
        this.searchkeys = result[Ontologyconstants.SummaryTableSearchKey];
        this.searchterms = result[Ontologyconstants.DatasetObjectSummaryTableSearchTerms]
 		this.displayedColumns = result[Ontologyconstants.SummaryTableDescriptionKey];
		this.tabledata = result[Ontologyconstants.DatasetObjectSummaryTableDescriptors];
		this.original = this.tabledata;
	}
	
	setValue(type: string, key: string) {
    this.tabledata = [];
    for(const element of this.original) {
      const str:string = element[type];
      if(str === key) {
        this.tabledata.push(element);
      }
    }
  }

	getServiceData(servicedata: any): void {
		const activity = {};
		this.getData(activity);
		servicedata.service = 'ExamineDatabaseCollectionSetObject';
		servicedata[Ontologyconstants.ActivityInfo] = activity;
	}


	getData(activity: any) {
		activity[this.cataloganno['dataset:DescriptionTitle'][this.identifier]] = this.objectform.get('DescriptionTitle').value;
		activity[this.cataloganno['dataset:ThermodynamicDatasetCollectionType'][this.identifier]] = this.objectform.get('ThermodynamicDatasetCollectionType').value;
		const recordid = {};
		recordid[this.cataloganno['dataset:CatalogDataObjectMaintainer'][this.identifier]] = this.objectform.get('CatalogDataObjectMaintainer').value;
		recordid[this.cataloganno['dataset:DatasetCollectionsSetLabel'][this.identifier]] = this.objectform.get('DatasetCollectionsSetLabel').value;
		activity[this.cataloganno['dataset:DatasetCollectionSetRecordIDInfo'][this.identifier]] = recordid;

		const enthalpyvalue = {};
		this.enthalpy.getData(enthalpyvalue);
		activity[this.cataloganno['dataset:ParameterSpecificationEnthalpy'][this.identifier]] = enthalpyvalue;
		const entropyvalue = {};
		this.entropy.getData(entropyvalue);
		activity[this.cataloganno['dataset:ParameterSpecificationEntropy'][this.identifier]] = entropyvalue;
		const heatcapacityvalue = {};
		this.heatcapacity.getData(heatcapacityvalue);
		activity[this.cataloganno['dataset:ParameterSpecificationHeatCapacity'][this.identifier]] = heatcapacityvalue;

	}

	public getCatalogAnnoations(type: string): void {
		this.annotations.getNewCatalogObject(type).subscribe({
			next: (responsedata: any) => {
				const response = responsedata;
				this.resultHtml = response[Ontologyconstants.message];
				if (response[Ontologyconstants.successful]) {
					const catalog = response[Ontologyconstants.catalogobject];
					this.cataloganno = catalog[Ontologyconstants.annotations];
					this.methoditems = this.menusetup.findChoices(this.cataloganno, this.methoditemstype);
				}
			},
			error: (info: any) => { alert('Get Annotations failed: see logs'); }
		});
	}


}
